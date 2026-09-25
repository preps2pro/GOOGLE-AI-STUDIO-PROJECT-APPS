import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_CONTACTS, INITIAL_TRANSCRIPTIONS, VC_FIRM_DIRECTORY } from '../data/mockData';
import { ActiveTab, Contact, CrmProvider, StagingContact, TranscriptionJob, VCFirm } from '../types';

interface CommandCenterContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  crmProvider: CrmProvider;
  setCrmProvider: (provider: CrmProvider) => void;
  contacts: Contact[];
  stagingContacts: StagingContact[];
  vcFirms: VCFirm[];
  vcStageFilter: string;
  setVcStageFilter: (filter: string) => void;
  transcriptionJobs: TranscriptionJob[];
  blestoModalOpen: boolean;
  setBlestoModalOpen: (open: boolean) => void;
  launcherModalOpen: boolean;
  setLauncherModalOpen: (open: boolean) => void;
  settingsModalOpen: boolean;
  setSettingsModalOpen: (open: boolean) => void;
  addContactModalOpen: boolean;
  setAddContactModalOpen: (open: boolean) => void;
  isSyncing: boolean;
  lastSyncedAt: string;
  addContact: (contact: Omit<Contact, 'id' | 'last_contact_at'>) => void;
  updateRelationshipStrength: (id: string, strength: 1 | 2 | 3 | 4 | 5) => void;
  deleteContact: (id: string) => void;
  importRawCsvData: (csvText: string) => { added: number; duplicates: number };
  commitStagingToCrm: () => number;
  clearStaging: () => void;
  syncToExternalCrm: (provider: CrmProvider) => Promise<{ success: boolean; count: number }>;
  addVcFirm: (firm: Omit<VCFirm, 'id'>) => void;
  createTranscriptionJob: (filename: string, fileSize: string) => Promise<string>;
  blestoRequestStatus: { submitted: boolean; applicantEmail: string; ticketId?: string };
  submitBlestoRequest: (orgName: string, role: string, nflAffiliation: string) => void;
}

const CommandCenterContext = createContext<CommandCenterContextType | undefined>(undefined);

export const CommandCenterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [crmProvider, setCrmProvider] = useState<CrmProvider>('SYSTEM_OF_RECORD');
  const [vcStageFilter, setVcStageFilter] = useState('All');

  const [blestoModalOpen, setBlestoModalOpen] = useState(false);
  const [launcherModalOpen, setLauncherModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [addContactModalOpen, setAddContactModalOpen] = useState(false);

  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string>(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  const [blestoRequestStatus, setBlestoRequestStatus] = useState<{ submitted: boolean; applicantEmail: string; ticketId?: string }>({
    submitted: false,
    applicantEmail: 'Preps2Pro@gmail.com'
  });

  // Local persistence for contacts
  const [contacts, setContacts] = useState<Contact[]>(() => {
    try {
      const cached = localStorage.getItem('sbtc_contacts_v1');
      return cached ? JSON.parse(cached) : INITIAL_CONTACTS;
    } catch {
      return INITIAL_CONTACTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sbtc_contacts_v1', JSON.stringify(contacts));
    } catch (e) {
      console.error('Storage save error:', e);
    }
  }, [contacts]);

  // Staging table for CSV import engine
  const [stagingContacts, setStagingContacts] = useState<StagingContact[]>([
    {
      id: 'stg-01',
      raw_first_name: 'Bryce',
      raw_last_name: 'Gallagher',
      raw_email: 'bgallagher@rivalsrecruiting.com',
      raw_phone: '+1 (469) 555-1920',
      raw_org: 'Rivals / Yahoo Sports',
      raw_role: 'National Recruiting Analyst',
      status: 'ready',
      relationship_strength: 4
    },
    {
      id: 'stg-02',
      raw_first_name: 'Marcus',
      raw_last_name: 'Vance',
      raw_email: 'm.vance@nflscoutcentral.org',
      raw_phone: '+1 (214) 555-0182',
      raw_org: 'National Football Scouting (NFS)',
      raw_role: 'Senior National Scout',
      status: 'duplicate',
      duplicate_with_id: 'cnt-01',
      relationship_strength: 5
    }
  ]);

  const [vcFirms, setVcFirms] = useState<VCFirm[]>(() => {
    try {
      const cached = localStorage.getItem('sbtc_vc_firms_v1');
      return cached ? JSON.parse(cached) : VC_FIRM_DIRECTORY;
    } catch {
      return VC_FIRM_DIRECTORY;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sbtc_vc_firms_v1', JSON.stringify(vcFirms));
    } catch (e) {
      console.error('Storage save error:', e);
    }
  }, [vcFirms]);

  const [transcriptionJobs, setTranscriptionJobs] = useState<TranscriptionJob[]>(INITIAL_TRANSCRIPTIONS);

  const addContact = (contactData: Omit<Contact, 'id' | 'last_contact_at'>) => {
    const newContact: Contact = {
      ...contactData,
      id: `cnt-${Date.now().toString(36)}`,
      last_contact_at: new Date().toISOString()
    };
    setContacts(prev => [newContact, ...prev]);
  };

  const updateRelationshipStrength = (id: string, strength: 1 | 2 | 3 | 4 | 5) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, relationship_strength: strength } : c));
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  // CSV Staging & Ingestion Parser
  const importRawCsvData = (csvText: string) => {
    const lines = csvText.trim().split('\n');
    let addedCount = 0;
    let duplicateCount = 0;
    const newStaged: StagingContact[] = [];

    // Parse header and rows
    lines.forEach((line, idx) => {
      // skip pure header row if looks like first_name, last_name
      if (idx === 0 && line.toLowerCase().includes('first') && line.toLowerCase().includes('email')) {
        return;
      }
      const cols = line.split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
      if (cols.length >= 3) {
        const firstName = cols[0] || 'Unknown';
        const lastName = cols[1] || '';
        const email = cols[2] || '';
        const phone = cols[3] || '';
        const org = cols[4] || 'Independent';
        const role = cols[5] || 'Scouting / Media';

        // Check deduplication
        const isDuplicate = contacts.some(c => c.email.toLowerCase() === email.toLowerCase()) ||
          newStaged.some(s => s.raw_email.toLowerCase() === email.toLowerCase());

        const stagedItem: StagingContact = {
          id: `stg-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
          raw_first_name: firstName,
          raw_last_name: lastName,
          raw_email: email,
          raw_phone: phone,
          raw_org: org,
          raw_role: role,
          status: isDuplicate ? 'duplicate' : (email ? 'ready' : 'missing_fields'),
          relationship_strength: 3
        };

        if (isDuplicate) {
          duplicateCount++;
        } else {
          addedCount++;
        }
        newStaged.push(stagedItem);
      }
    });

    setStagingContacts(prev => [...prev, ...newStaged]);
    return { added: addedCount, duplicates: duplicateCount };
  };

  const commitStagingToCrm = () => {
    const readyItems = stagingContacts.filter(s => s.status === 'ready');
    if (readyItems.length === 0) return 0;

    const converted: Contact[] = readyItems.map(item => ({
      id: `cnt-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      first_name: item.raw_first_name,
      last_name: item.raw_last_name,
      email: item.raw_email,
      phone: item.raw_phone,
      organization: item.raw_org,
      source_type: 'csv_import',
      scouting_role: item.raw_role,
      relationship_strength: item.relationship_strength,
      last_contact_at: new Date().toISOString(),
      metadata: {
        notes: 'Imported via CSV Staging Validator Engine'
      }
    }));

    setContacts(prev => [...converted, ...prev]);
    // remove committed items
    setStagingContacts(prev => prev.filter(s => s.status !== 'ready'));
    return readyItems.length;
  };

  const clearStaging = () => {
    setStagingContacts([]);
  };

  const syncToExternalCrm = async (provider: CrmProvider): Promise<{ success: boolean; count: number }> => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 900));
    setIsSyncing(false);
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSyncedAt(now);
    return { success: true, count: contacts.length };
  };

  const addVcFirm = (firmData: Omit<VCFirm, 'id'>) => {
    const newFirm: VCFirm = {
      ...firmData,
      id: `vc-${Date.now().toString(36)}`
    };
    setVcFirms(prev => [newFirm, ...prev]);
  };

  const createTranscriptionJob = async (filename: string, fileSize: string): Promise<string> => {
    const jobId = `job-${Date.now().toString(36)}`;
    const newJob: TranscriptionJob = {
      id: jobId,
      filename,
      fileSize,
      duration: '18m 40s',
      status: 'processing',
      uploadedAt: new Date().toISOString(),
      speakers: ['Agent (Lead)', 'Front Office Scout'],
      tags: ['Sales Call Review', 'Scouting Intel', 'NFS Alignment'],
      summary: 'Automated speaker diarization in progress via Netlify Function / AssemblyAI pipeline...',
      segments: []
    };

    setTranscriptionJobs(prev => [newJob, ...prev]);

    // Simulate async pipeline stages
    setTimeout(() => {
      setTranscriptionJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'diarizing' } : j));
    }, 1800);

    setTimeout(() => {
      setTranscriptionJobs(prev => prev.map(j => j.id === jobId ? {
        ...j,
        status: 'completed',
        summary: 'Call verified: Discussions centered on Christian Prep Football News syndication, Preps2Press live reporter feeds, and NFS APT medical clearance standards.',
        segments: [
          {
            speaker: 'Agent',
            time: '00:00:15',
            text: 'We are locking in the regional evaluation schedule with the Southeast combine staff.'
          },
          {
            speaker: 'Scout',
            time: '00:01:42',
            text: 'Everything looks clear on the medical logs. The video highlights have been indexed to our Brightcove asset library.'
          },
          {
            speaker: 'Agent',
            time: '00:03:10',
            text: 'Confirmed. We will record the interaction in our System of Record and push to HubSpot.'
          }
        ]
      } : j));
    }, 3800);

    return jobId;
  };

  const submitBlestoRequest = (orgName: string, role: string, nflAffiliation: string) => {
    setBlestoRequestStatus({
      submitted: true,
      applicantEmail: 'Preps2Pro@gmail.com',
      ticketId: `BLESTO-REQ-${Math.floor(100000 + Math.random() * 900000)}`
    });
  };

  return (
    <CommandCenterContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        crmProvider,
        setCrmProvider,
        contacts,
        stagingContacts,
        vcFirms,
        vcStageFilter,
        setVcStageFilter,
        transcriptionJobs,
        blestoModalOpen,
        setBlestoModalOpen,
        launcherModalOpen,
        setLauncherModalOpen,
        settingsModalOpen,
        setSettingsModalOpen,
        addContactModalOpen,
        setAddContactModalOpen,
        isSyncing,
        lastSyncedAt,
        addContact,
        updateRelationshipStrength,
        deleteContact,
        importRawCsvData,
        commitStagingToCrm,
        clearStaging,
        syncToExternalCrm,
        addVcFirm,
        createTranscriptionJob,
        blestoRequestStatus,
        submitBlestoRequest
      }}
    >
      {children}
    </CommandCenterContext.Provider>
  );
};

export const useCommandCenter = () => {
  const context = useContext(CommandCenterContext);
  if (!context) {
    throw new Error('useCommandCenter must be used within a CommandCenterProvider');
  }
  return context;
};
