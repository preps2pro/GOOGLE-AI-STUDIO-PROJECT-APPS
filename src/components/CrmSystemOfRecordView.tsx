import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  Database, 
  Download, 
  FileSpreadsheet, 
  Filter, 
  Layers, 
  Mail, 
  Phone, 
  Plus, 
  RefreshCw, 
  Search, 
  Star, 
  Trash2, 
  Upload, 
  UserCheck, 
  Users, 
  Zap 
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Contact, CrmProvider, StagingContact } from '../types';

export const CrmSystemOfRecordView: React.FC = () => {
  const { 
    contacts, 
    stagingContacts, 
    crmProvider, 
    setCrmProvider, 
    updateRelationshipStrength, 
    deleteContact, 
    importRawCsvData, 
    commitStagingToCrm, 
    clearStaging, 
    syncToExternalCrm, 
    isSyncing, 
    lastSyncedAt,
    setAddContactModalOpen 
  } = useCommandCenter();

  const [activeSubTab, setActiveSubTab] = useState<'live' | 'staging' | 'import'>('live');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [csvInput, setCsvInput] = useState('');
  const [importResult, setImportResult] = useState<{ added: number; duplicates: number } | null>(null);
  const [syncAlert, setSyncAlert] = useState<string | null>(null);

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = `${c.first_name} ${c.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.scouting_role.toLowerCase().includes(searchQuery.toLowerCase());

    if (roleFilter === 'ALL') return matchesSearch;
    if (roleFilter === 'SCOUT') return matchesSearch && c.scouting_role.toLowerCase().includes('scout');
    if (roleFilter === 'MEDIA') return matchesSearch && (c.scouting_role.toLowerCase().includes('media') || c.organization.toLowerCase().includes('media') || c.organization.toLowerCase().includes('sports'));
    if (roleFilter === 'VC') return matchesSearch && (c.scouting_role.toLowerCase().includes('vc') || c.scouting_role.toLowerCase().includes('valuation') || c.organization.toLowerCase().includes('partners') || c.organization.toLowerCase().includes('sport'));
    return matchesSearch;
  });

  const handleCsvImport = () => {
    if (!csvInput.trim()) return;
    const res = importRawCsvData(csvInput);
    setImportResult(res);
    setCsvInput('');
    setActiveSubTab('staging');
  };

  const handleCommitStaging = () => {
    const count = commitStagingToCrm();
    setSyncAlert(`Successfully ingested ${count} validated contacts into the System of Record database.`);
    setTimeout(() => setSyncAlert(null), 4000);
    setActiveSubTab('live');
  };

  const handleSyncClick = async () => {
    const res = await syncToExternalCrm(crmProvider);
    setSyncAlert(`Bi-directional sync completed with ${crmProvider}. ${res.count} records synchronized.`);
    setTimeout(() => setSyncAlert(null), 4000);
  };

  const sampleCsvData = `Marcus,Vance,m.vance@nflscoutcentral.org,+12145550182,National Football Scouting,Senior National Scout
Bryce,Gallagher,bgallagher@rivalsrecruiting.com,+14695551920,Rivals / Yahoo Sports,National Recruiting Analyst
Derek,Holliday,dholliday@christianprepfootballnews.com,+19725554301,Christian Prep Football News,Managing Editor
Gerry,Cardinale,gcardinale@redbirdcap.com,+12125558900,RedBird Capital Partners,Managing Partner
Sean,Pomeroy,spomeroy@combineeval.org,+13175558199,NFL Scouting Combine Staff,Director of Medical Operations`;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & CRM Engine Switcher */}
      <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-cyan-950/40 border border-white/10 p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono-code mb-1">
              <Database className="w-4 h-4" />
              <span>POSTGRESQL ARCHITECTURE • SYSTEM OF RECORD & STAGING ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Enterprise CRM & <span className="text-cyan-400">System of Record</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Staging table architecture prevents database pollution. Incoming CSV imports undergo deduplication against Email and LinkedIn URLs before being committed to PostgreSQL and synced to HubSpot or Pipedrive.
            </p>
          </div>

          {/* CRM Provider Switch & Sync Action */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-900/90 border border-slate-700/80 p-2 rounded-xl flex items-center space-x-2">
              <span className="text-[11px] font-mono-code text-slate-400 uppercase">Provider:</span>
              <button
                onClick={() => setCrmProvider('SYSTEM_OF_RECORD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  crmProvider === 'SYSTEM_OF_RECORD'
                    ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                System of Record
              </button>
              <button
                onClick={() => setCrmProvider('HUBSPOT')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  crmProvider === 'HUBSPOT'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                HubSpot
              </button>
              <button
                onClick={() => setCrmProvider('PIPEDRIVE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  crmProvider === 'PIPEDRIVE'
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Pipedrive
              </button>
            </div>

            <button
              onClick={handleSyncClick}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-xs font-bold transition flex items-center space-x-2 shadow-lg"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-400' : 'text-cyan-400'}`} />
              <span>{isSyncing ? 'Syncing...' : `Sync to ${crmProvider}`}</span>
            </button>
          </div>
        </div>

        {/* Sync alert banner */}
        {syncAlert && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2 animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{syncAlert}</span>
          </div>
        )}

        {/* Sub-tab Navigation */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveSubTab('live')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                activeSubTab === 'live'
                  ? 'bg-cyan-500 text-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Live System of Record ({contacts.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('staging')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                activeSubTab === 'staging'
                  ? 'bg-amber-500 text-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Staging Table ({stagingContacts.length})</span>
              {stagingContacts.some(s => s.status === 'duplicate') && (
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
              )}
            </button>

            <button
              onClick={() => setActiveSubTab('import')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                activeSubTab === 'import'
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>CSV Ingestion Engine</span>
            </button>
          </div>

          <button
            onClick={() => setAddContactModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black text-xs font-bold transition flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Contact</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: LIVE CONTACTS */}
      {activeSubTab === 'live' && (
        <div className="executive-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {['ALL', 'SCOUT', 'MEDIA', 'VC'].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    roleFilter === role
                      ? 'bg-slate-700 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {role === 'ALL' ? 'All Roles' : role === 'SCOUT' ? 'Scouts & NFL' : role === 'MEDIA' ? 'Media & Rep' : 'VC & Capital'}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, organization, email..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          {/* Contacts Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 font-mono-code uppercase text-[10px]">
                  <th className="py-3 px-3">Name & Organization</th>
                  <th className="py-3 px-3">Scouting Role / Title</th>
                  <th className="py-3 px-3">Relationship Strength (1-5★)</th>
                  <th className="py-3 px-3">Email & Phone</th>
                  <th className="py-3 px-3">Sync Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-white/5 transition group">
                    <td className="py-3 px-3">
                      <div className="font-bold text-white group-hover:text-cyan-300 transition">
                        {contact.first_name} {contact.last_name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {contact.organization}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-200 border border-slate-700">
                        {contact.scouting_role}
                      </span>
                      {contact.metadata?.territory && (
                        <div className="text-[10px] text-slate-500 mt-1 font-mono-code">
                          {contact.metadata.territory}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-1" title="Click to adjust Relationship Strength">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => updateRelationshipStrength(contact.id, star as any)}
                            className="focus:outline-none hover:scale-125 transition"
                          >
                            <Star 
                              className={`w-3.5 h-3.5 ${
                                star <= contact.relationship_strength 
                                  ? 'text-amber-400 fill-amber-400' 
                                  : 'text-slate-600'
                              }`} 
                            />
                          </button>
                        ))}
                        <span className="text-[10px] text-slate-400 ml-1.5 font-mono-code font-bold">
                          {contact.relationship_strength}/5
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono-code text-[11px]">
                      <div className="text-slate-300 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-500" />
                        {contact.email}
                      </div>
                      <div className="text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-600" />
                        {contact.phone}
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      {contact.hubspot_id ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-orange-950/60 text-orange-400 border border-orange-500/30">
                          <CheckCircle2 className="w-3 h-3" /> HubSpot Synced
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                          <Database className="w-3 h-3" /> Postgres Stored
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition"
                        title="Delete Contact"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: STAGING TABLE & DEDUPLICATION */}
      {activeSubTab === 'staging' && (
        <div className="executive-card p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                CSV Staging Table (Pre-Ingestion Validation)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Staged records are verified against existing primary keys (Email / LinkedIn) before committing to the System of Record.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearStaging}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Clear Staging
              </button>
              <button
                onClick={handleCommitStaging}
                disabled={stagingContacts.filter(s => s.status === 'ready').length === 0}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition shadow-md shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Commit Valid Records ({stagingContacts.filter(s => s.status === 'ready').length})</span>
              </button>
            </div>
          </div>

          {stagingContacts.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              Staging table is currently empty. Use the CSV Ingestion Engine tab to parse and validate new contact lists.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-slate-400 font-mono-code uppercase text-[10px]">
                    <th className="py-2.5 px-3">Candidate Contact</th>
                    <th className="py-2.5 px-3">Organization & Role</th>
                    <th className="py-2.5 px-3">Parsed Email / Phone</th>
                    <th className="py-2.5 px-3">Validation Status</th>
                    <th className="py-2.5 px-3 text-right">Deduplication State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {stagingContacts.map((stg) => (
                    <tr key={stg.id} className="hover:bg-white/5 transition">
                      <td className="py-3 px-3 font-semibold text-white">
                        {stg.raw_first_name} {stg.raw_last_name}
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-slate-200">{stg.raw_org}</div>
                        <div className="text-[11px] text-slate-400">{stg.raw_role}</div>
                      </td>
                      <td className="py-3 px-3 font-mono-code text-[11px]">
                        <div className="text-slate-300">{stg.raw_email}</div>
                        <div className="text-slate-500">{stg.raw_phone}</div>
                      </td>
                      <td className="py-3 px-3">
                        {stg.status === 'ready' && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Validated
                          </span>
                        )}
                        {stg.status === 'duplicate' && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-400 border border-rose-800 font-bold inline-flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Duplicate Detected
                          </span>
                        )}
                        {stg.status === 'missing_fields' && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-950 text-amber-400 border border-amber-800 font-bold">
                            Missing Fields
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right text-[11px]">
                        {stg.status === 'duplicate' ? (
                          <span className="text-rose-400 font-mono-code">
                            Matches existing record ({stg.duplicate_with_id || 'Email Collision'})
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-mono-code">
                            Ready for PostgreSQL Ingestion
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: CSV INGESTION & PARSER ENGINE */}
      {activeSubTab === 'import' && (
        <div className="executive-card p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-violet-400" />
              CSV Ingestion & Column Mapping Engine
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Paste standard comma-delimited data. The staging engine automatically maps columns:
              <br />
              <code className="text-cyan-300 font-mono-code">Column A (First Name) • Column B (Last Name) • Column C (Email) • Column D (Phone) • Column E (Organization) • Column F (Scouting Role)</code>
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Paste Raw CSV Records (or use sample below):
              </label>
              <button
                onClick={() => setCsvInput(sampleCsvData)}
                className="text-xs text-cyan-400 hover:underline font-semibold"
              >
                Load Sports Scouting Sample CSV
              </button>
            </div>

            <textarea
              rows={7}
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder="First,Last,Email,Phone,Organization,Role..."
              className="w-full p-3 text-xs bg-slate-900 border border-slate-700 rounded-xl text-slate-100 font-mono-code focus:outline-none focus:border-cyan-500"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Automatic deduplication will run immediately upon staging.
              </span>
              <button
                onClick={handleCsvImport}
                disabled={!csvInput.trim()}
                className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition shadow-md shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5"
              >
                <span>Stage and Validate CSV</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
