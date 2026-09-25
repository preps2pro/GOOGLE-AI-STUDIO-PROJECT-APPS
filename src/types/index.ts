export type NavigationBucket = 
  | 'commandCenter'
  | 'intelligence'
  | 'crm'
  | 'footballNetwork'
  | 'salesVideo'
  | 'impact'
  | 'tools'
  | 'ventureCapital';

export type ActiveTab = 
  | 'dashboard'
  | 'crm'
  | 'staging'
  | 'football'
  | 'ventureCapital'
  | 'venture'
  | 'intelligence'
  | 'training'
  | 'transcription'
  | 'philanthropy'
  | 'launcher'
  | 'settings';

export type CrmProvider = 'SYSTEM_OF_RECORD' | 'HUBSPOT' | 'PIPEDRIVE';

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organization: string;
  source_type: 'csv_import' | 'manual' | 'nfs_portal' | 'web';
  hubspot_id?: string;
  pipedrive_id?: string;
  scouting_role: string;
  relationship_strength: 1 | 2 | 3 | 4 | 5;
  last_contact_at: string;
  metadata?: {
    territory?: string;
    targetDeal?: string;
    notes?: string;
    linkedin?: string;
  };
}

export interface StagingContact {
  id: string;
  raw_first_name: string;
  raw_last_name: string;
  raw_email: string;
  raw_phone: string;
  raw_org: string;
  raw_role: string;
  status: 'valid' | 'duplicate' | 'missing_fields' | 'ready';
  duplicate_with_id?: string;
  relationship_strength: 1 | 2 | 3 | 4 | 5;
}

export interface VCFirm {
  id: string;
  name: string;
  stage: 'Pre-Seed & Seed' | 'Series A & B' | 'Growth & Private Equity';
  focus: string;
  keyFirmsOrPeople: string[];
  checkSize: string;
  location: string;
  portfolioHighlights: string[];
  website: string;
  status: 'Active Dealflow' | 'Portfolio Company' | 'In Discussions' | 'Monitored';
  thesisNotes: string;
}

export interface FootballResource {
  name: string;
  classification: 'Confirmed Publication' | 'Subdomain' | 'Internal Workspace' | 'Pro Scouting' | 'Public' | 'Secure Portal';
  status: 'Restricted' | 'Verified' | 'Authorized Only' | 'User-Owned' | 'Live Publication';
  type: string;
  url: string | null;
  requiresAuth: boolean;
  description: string;
  badgeColor: string;
}

export interface SpotracContract {
  player: string;
  team: string;
  position: string;
  contractValue: string;
  avgAnnual: string;
  guaranteed: string;
  freeAgentYear: number;
  capHit2026: string;
}

export interface TranscriptionJob {
  id: string;
  filename: string;
  fileSize: string;
  duration: string;
  status: 'queued' | 'processing' | 'diarizing' | 'completed' | 'failed';
  uploadedAt: string;
  speakers: string[];
  tags: string[];
  brightcoveVideoId?: string;
  summary: string;
  segments: {
    speaker: 'Agent' | 'Athlete' | 'Scout' | 'Executive';
    time: string;
    text: string;
  }[];
}

export interface NewsItem {
  id: string;
  source: 'Sportico' | 'SBJ' | 'Front Office Sports' | 'SportsTechie' | 'KennectedReader' | 'Christian Prep News';
  title: string;
  category: 'Media Rights' | 'Sponsorship' | 'Tech Watch' | 'Scouting' | 'VC & Capital';
  timestamp: string;
  url: string;
  highlight: string;
}
