import React, { useState } from 'react';
import { 
  Building2, 
  ChevronDown, 
  Database, 
  ExternalLink, 
  FileAudio, 
  GraduationCap, 
  Grid3X3, 
  HeartHandshake, 
  Layers, 
  Lock, 
  Radio, 
  RefreshCw, 
  Search, 
  ShieldAlert, 
  TrendingUp, 
  Trophy, 
  Users, 
  Zap 
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { ActiveTab, CrmProvider } from '../types';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery, 
    crmProvider, 
    setCrmProvider,
    setBlestoModalOpen,
    setLauncherModalOpen,
    setSettingsModalOpen,
    setAddContactModalOpen,
    isSyncing,
    lastSyncedAt,
    syncToExternalCrm,
    blestoRequestStatus
  } = useCommandCenter();

  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);

  const handleCrmChange = (newProvider: CrmProvider) => {
    setCrmProvider(newProvider);
    syncToExternalCrm(newProvider);
  };

  const navItems = [
    {
      id: 'commandCenter',
      label: 'Command Center',
      tabTarget: 'dashboard' as ActiveTab,
      sections: [
        { name: 'Dashboard Overview', desc: 'Real-time priorities & deal flow', action: () => setActiveTab('dashboard') },
        { name: 'Executive Priorities', desc: 'Overdue follow-ups & high-value items', action: () => setActiveTab('dashboard') },
        { name: 'Schedule & Calendar', desc: 'Combine dates & sponsor meetings', action: () => setActiveTab('dashboard') },
        { name: 'System of Record', desc: 'PostgreSQL staging & live CRM', action: () => setActiveTab('crm') }
      ]
    },
    {
      id: 'intelligence',
      label: 'Intelligence & Deals',
      tabTarget: 'intelligence' as ActiveTab,
      sections: [
        { name: 'Spotrac Contracts Ledger', desc: 'Cap hits, guarantees & benchmark metrics', action: () => setActiveTab('intelligence') },
        { name: 'KennectedReader.com', desc: 'Executive news & aggregation engine', url: 'https://kennectedreader.com' },
        { name: 'Media Rights & Valuations', desc: 'Broadcast contracts & streaming rights', action: () => setActiveTab('intelligence') },
        { name: 'Sponsorship & NIL Watch', desc: 'Brand deal tracking & collective audits', action: () => setActiveTab('intelligence') }
      ]
    },
    {
      id: 'footballNetwork',
      label: 'Football Network',
      tabTarget: 'football' as ActiveTab,
      badge: 'Sec 45-50',
      sections: [
        { name: 'Christian Prep Football News', desc: 'Confirmed national publication portal', url: 'https://christianprepfootballnews.com' },
        { name: 'American Football Scouting Int.', desc: 'afsi.preps2pro.com global database', url: 'https://afsi.preps2pro.com' },
        { name: 'Preps2Press Media Portal', desc: 'preps2pro.com/portal reporter directory', url: 'https://preps2pro.com/portal' },
        { name: 'BLESTO Scouting System', desc: 'Restricted partner-only NFL bureau', action: () => setBlestoModalOpen(true), isRestricted: true },
        { name: 'NFS / NFL Combine', desc: 'nflcombine.net verified official hub', url: 'https://www.nflcombine.net/' },
        { name: 'NFS APT Secure Portal', desc: 'Authorized scout medical & testing portal', url: 'https://secure.nationalfootballscouting.com/aptportal/' }
      ]
    },
    {
      id: 'ventureCapital',
      label: 'Venture Capital',
      tabTarget: 'ventureCapital' as ActiveTab,
      sections: [
        { name: 'SuperScout.co Radar', desc: 'Startup discovery & VC portfolio tracking', url: 'https://superscout.co' },
        { name: 'Master VC Sheet', desc: 'Categorized by Pre-Seed, Series A & PE', action: () => setActiveTab('ventureCapital') },
        { name: 'Pre-Seed & Seed Focus', desc: 'Athlete tech & youth sports SaaS', action: () => { setActiveTab('ventureCapital'); } },
        { name: 'Growth & Franchise PE', desc: 'Team stakes & stadium infrastructure', action: () => { setActiveTab('ventureCapital'); } }
      ]
    },
    {
      id: 'salesTraining',
      label: 'AI Training & Video',
      tabTarget: 'training' as ActiveTab,
      sections: [
        { name: 'Learn-AI-Workforce.com', desc: 'Executive education & workforce portal', url: 'https://learn-ai-workforce.com' },
        { name: 'Conversational Intelligence', desc: 'AssemblyAI diarization & call review', action: () => setActiveTab('transcription') },
        { name: 'Brightcove Video Sync', desc: 'Video player tags & indexed transcripts', action: () => setActiveTab('transcription') },
        { name: 'C-Suite Pitch Playbook', desc: 'AI-assisted sponsorship deck scripts', action: () => setActiveTab('training') }
      ]
    },
    {
      id: 'impact',
      label: 'Philanthropy',
      tabTarget: 'philanthropy' as ActiveTab,
      sections: [
        { name: 'One Heart Project', desc: 'Juvenile justice reform & athlete mentorship', action: () => setActiveTab('philanthropy') },
        { name: 'Charitable Partner Network', desc: 'Sports foundations & civic initiatives', action: () => setActiveTab('philanthropy') },
        { name: 'Scholarship Endowments', desc: 'Underrepresented student-athlete grants', action: () => setActiveTab('philanthropy') }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-50 executive-glass-nav text-white">
      {/* Top utility ticker strip */}
      <div className="border-b border-white/5 bg-[#030508]/80 px-4 py-1.5 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 font-mono-code text-[11px] text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>SYSTEM LIVE: NETLIFY FUNCTION MESH</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <div className="hidden md:flex items-center space-x-2 text-slate-400">
            <span className="text-slate-500 font-medium">Domain Network:</span>
            <a href="https://christianprepfootballnews.com" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-cyan-400 transition">christianprepfootballnews.com</a>
            <span className="text-slate-700">•</span>
            <a href="https://afsi.preps2pro.com" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-violet-400 transition">afsi.preps2pro.com</a>
            <span className="text-slate-700">•</span>
            <a href="https://learn-ai-workforce.com" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-amber-400 transition">learn-ai-workforce.com</a>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Active CRM Toggle (NO ATTIO!) */}
          <div className="flex items-center space-x-1.5 bg-slate-900/90 border border-slate-700/60 rounded-lg px-2.5 py-0.5 text-xs">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">CRM Engine:</span>
            <select
              value={crmProvider}
              onChange={(e) => handleCrmChange(e.target.value as CrmProvider)}
              className="bg-transparent text-cyan-300 font-semibold text-xs focus:outline-none cursor-pointer"
            >
              <option value="SYSTEM_OF_RECORD" className="bg-slate-950 text-slate-200">System of Record (PostgreSQL/Local)</option>
              <option value="HUBSPOT" className="bg-slate-950 text-slate-200">HubSpot Enterprise</option>
              <option value="PIPEDRIVE" className="bg-slate-950 text-slate-200">Pipedrive Sales CRM</option>
            </select>
          </div>

          <button
            onClick={() => syncToExternalCrm(crmProvider)}
            title="Sync CRM State"
            className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-cyan-300 transition"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
            <span className="hidden sm:inline">Synced {lastSyncedAt}</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Brand / Title */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center space-x-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-violet-600 to-amber-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition">
            <div className="w-full h-full bg-[#05070a] rounded-[10px] flex items-center justify-center">
              <Trophy className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-bold tracking-tight text-lg sm:text-xl text-white">
                Sports Business <span className="text-cyan-400">Command Center</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono-code font-bold uppercase rounded bg-violet-950/80 border border-violet-500/40 text-violet-300 hidden sm:inline">
                OS v2.6
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide hidden sm:block">
              Lead Architect Executive Operating System
            </p>
          </div>
        </div>

        {/* Center: Mega Menu strategy navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setOpenMegaMenu(item.id)}
              onMouseLeave={() => setOpenMegaMenu(null)}
            >
              <button
                onClick={() => setActiveTab(item.tabTarget)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition ${
                  activeTab === item.tabTarget 
                    ? 'bg-cyan-950/50 text-cyan-300 border border-cyan-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1 py-0.2 text-[9px] rounded bg-cyan-900/60 text-cyan-300 border border-cyan-500/30">
                    {item.badge}
                  </span>
                )}
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Mega-menu dropdown */}
              {openMegaMenu === item.id && (
                <div className="absolute left-0 mt-1 w-80 executive-glass-dropdown rounded-xl p-3 z-50 border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="text-[10px] uppercase font-mono-code tracking-widest text-slate-400 px-2 py-1 mb-1 border-b border-white/5">
                    {item.label} Workspace
                  </div>
                  <div className="space-y-1">
                    {item.sections.map((sub, idx) => (
                      <div key={idx}>
                        {sub.url ? (
                          <a
                            href={sub.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-start justify-between p-2 rounded-lg hover:bg-white/5 transition group"
                          >
                            <div>
                              <div className="text-xs font-medium text-slate-200 group-hover:text-cyan-400 flex items-center gap-1.5">
                                {sub.name}
                                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 text-cyan-400" />
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5">{sub.desc}</div>
                            </div>
                          </a>
                        ) : (
                          <button
                            onClick={() => {
                              if (sub.action) sub.action();
                              setOpenMegaMenu(null);
                            }}
                            className="w-full text-left p-2 rounded-lg hover:bg-white/5 transition group"
                          >
                            <div className="text-xs font-medium text-slate-200 group-hover:text-cyan-400 flex items-center gap-1.5">
                              {sub.name}
                              {Boolean((sub as any).isRestricted) && (
                                <Lock className="w-3 h-3 text-rose-400" />
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">{sub.desc}</div>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side quick actions & search */}
        <div className="flex items-center space-x-2">
          {/* Global search input */}
          <div className="relative w-36 sm:w-56 hidden sm:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 50+ modules..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900/80 border border-slate-700/60 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition"
            />
          </div>

          {/* Quick App Launcher */}
          <button
            onClick={() => setLauncherModalOpen(true)}
            title="App Launcher (Kennect2Tech, Notion, ClickUp, Brightcove)"
            className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-white/5 text-slate-300 hover:text-white transition"
          >
            <Grid3X3 className="w-4 h-4 text-cyan-400" />
          </button>

          {/* BLESTO Access status quick pill */}
          <button
            onClick={() => setBlestoModalOpen(true)}
            className={`hidden xl:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition ${
              blestoRequestStatus.submitted 
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-300' 
                : 'bg-rose-950/30 border-rose-500/30 text-rose-300 hover:bg-rose-900/40'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>BLESTO {blestoRequestStatus.submitted ? 'Pending' : 'Restricted'}</span>
          </button>

          {/* New Contact CTA */}
          <button
            onClick={() => setAddContactModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs shadow-md shadow-cyan-500/20 transition flex items-center space-x-1"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+ Contact</span>
          </button>
        </div>
      </div>
    </header>
  );
};
