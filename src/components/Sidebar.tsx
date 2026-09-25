import React, { useState } from 'react';
import { 
  BarChart3, 
  BookOpen, 
  CheckSquare, 
  ChevronLeft, 
  ChevronRight, 
  Database, 
  ExternalLink, 
  FileAudio, 
  GraduationCap, 
  Grid3X3, 
  HeartHandshake, 
  Layers, 
  LayoutDashboard, 
  Lock, 
  PlaySquare, 
  Radio, 
  Settings, 
  Share2, 
  ShieldCheck, 
  TrendingUp, 
  Trophy, 
  UploadCloud, 
  Users, 
  Video 
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { ActiveTab } from '../types';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setLauncherModalOpen,
    setBlestoModalOpen,
    setSettingsModalOpen,
    crmProvider 
  } = useCommandCenter();

  const [collapsed, setCollapsed] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const tacticalNav = [
    {
      id: 'dashboard',
      label: 'Executive Dashboard',
      icon: LayoutDashboard,
      target: 'dashboard' as ActiveTab,
      flyout: [
        { name: 'Priority Queue', desc: 'Overdue calls & active sponsors', action: () => setActiveTab('dashboard') },
        { name: 'Intelligence Feed', desc: 'Sportico, SBJ & Front Office Sports', action: () => setActiveTab('dashboard') },
        { name: 'Scouting Quick Links', desc: 'NFS & Combine status', action: () => setActiveTab('football') }
      ]
    },
    {
      id: 'crm',
      label: 'CRM & System of Record',
      icon: Users,
      target: 'crm' as ActiveTab,
      badge: crmProvider === 'SYSTEM_OF_RECORD' ? 'Postgres' : crmProvider === 'HUBSPOT' ? 'HubSpot' : 'Pipedrive',
      flyout: [
        { name: 'All Contacts & Scouts', desc: 'Relationship strength 1-5 matrix', action: () => setActiveTab('crm') },
        { name: 'CSV Staging Engine', desc: 'Column mapping & deduplication', action: () => setActiveTab('staging') },
        { name: 'Organization Registry', desc: 'NFL clubs, agencies & media', action: () => setActiveTab('crm') },
        { name: 'Sync To External CRM', desc: 'Push validated records to HubSpot', action: () => setActiveTab('crm') }
      ]
    },
    {
      id: 'football',
      label: 'Football Network (45-50)',
      icon: Trophy,
      target: 'football' as ActiveTab,
      badge: '6 Hubs',
      flyout: [
        { name: 'Christian Prep News', desc: 'christianprepfootballnews.com', url: 'https://christianprepfootballnews.com' },
        { name: 'AFSI International', desc: 'afsi.preps2pro.com portal', url: 'https://afsi.preps2pro.com' },
        { name: 'Preps2Press Portal', desc: 'preps2pro.com/portal reporter hub', url: 'https://preps2pro.com/portal' },
        { name: 'BLESTO Evaluation', desc: 'Restricted NFL franchise access', action: () => setBlestoModalOpen(true) },
        { name: 'NFS APT Secure Portal', desc: 'Medical & testing logs', url: 'https://secure.nationalfootballscouting.com/aptportal/' }
      ]
    },
    {
      id: 'ventureCapital',
      label: 'Venture Capital & Tech',
      icon: TrendingUp,
      target: 'ventureCapital' as ActiveTab,
      flyout: [
        { name: 'SuperScout.co Radar', desc: 'Sports-tech startup discovery', url: 'https://superscout.co' },
        { name: 'Master VC Sheet', desc: 'Categorized by funding stage', action: () => setActiveTab('ventureCapital') },
        { name: 'Pre-Seed & Seed Funds', desc: 'Techstars Sports, SeventySix, Kaptyn', action: () => setActiveTab('ventureCapital') },
        { name: 'Series A & Growth PE', desc: 'Courtside, Sapphire, Arctos, RedBird', action: () => setActiveTab('ventureCapital') }
      ]
    },
    {
      id: 'intelligence',
      label: 'Spotrac & Intelligence',
      icon: BarChart3,
      target: 'intelligence' as ActiveTab,
      flyout: [
        { name: 'Spotrac Salary Cap Ledger', desc: 'Player contracts & guarantees', action: () => setActiveTab('intelligence') },
        { name: 'KennectedReader.com', desc: 'Aggregated sports media reader', url: 'https://kennectedreader.com' },
        { name: 'Media Rights Tracker', desc: 'Valuations & broadcast packages', action: () => setActiveTab('intelligence') }
      ]
    },
    {
      id: 'training',
      label: 'Learn-AI-Workforce',
      icon: GraduationCap,
      target: 'training' as ActiveTab,
      badge: 'AI Hub',
      flyout: [
        { name: 'Learn-AI-Workforce.com', desc: 'Executive learning academy', url: 'https://learn-ai-workforce.com' },
        { name: 'AI Sponsorship Prompts', desc: 'Automated prospecting workflows', action: () => setActiveTab('training') },
        { name: 'Scouting Computer Vision', desc: 'Film tagging & telemetry primers', action: () => setActiveTab('training') }
      ]
    },
    {
      id: 'transcription',
      label: 'Conversational Intel',
      icon: FileAudio,
      target: 'transcription' as ActiveTab,
      flyout: [
        { name: 'File Conversion Center', desc: 'Async dropzone for .mp4 & .wav', action: () => setActiveTab('transcription') },
        { name: 'AssemblyAI Diarization', desc: 'Agent vs Athlete vs Scout tags', action: () => setActiveTab('transcription') },
        { name: 'Brightcove Video Sync', desc: 'Time-coded video indexing', action: () => setActiveTab('transcription') }
      ]
    },
    {
      id: 'philanthropy',
      label: 'One Heart Project',
      icon: HeartHandshake,
      target: 'philanthropy' as ActiveTab,
      flyout: [
        { name: 'Philanthropy Network', desc: 'One Heart Project initiatives', action: () => setActiveTab('philanthropy') },
        { name: 'Youth Athlete Rehabilitation', desc: 'Mentorship programs & impact', action: () => setActiveTab('philanthropy') }
      ]
    }
  ];

  return (
    <aside 
      className={`executive-glass-sidebar sticky top-[57px] h-[calc(100vh-57px)] flex flex-col justify-between transition-all duration-300 z-40 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Upper Tactical Menu */}
      <div className="p-3 space-y-1 overflow-y-auto">
        <div className="flex items-center justify-between px-2 py-1 mb-2 text-slate-400">
          {!collapsed && (
            <span className="text-[11px] font-mono-code uppercase tracking-wider text-cyan-400 font-semibold">
              Tactical Layer
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-white/5 text-slate-400 hover:text-white transition ml-auto"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {tacticalNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.target;

          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setHoveredTab(item.id)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <button
                onClick={() => setActiveTab(item.target)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition group ${
                  isActive 
                    ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/40 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-950/40' 
                    : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                {!collapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] rounded-full bg-slate-800 text-cyan-300 border border-slate-700 font-mono-code">
                    {item.badge}
                  </span>
                )}
              </button>

              {/* Hover-Trigger Fly-out Tabs */}
              {hoveredTab === item.id && (
                <div 
                  className={`absolute z-50 top-0 executive-glass-dropdown rounded-xl p-3 w-72 border border-white/10 shadow-2xl animate-in fade-in slide-in-from-left-2 duration-150 ${
                    collapsed ? 'left-16' : 'left-full ml-1'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-semibold text-cyan-300">
                    <span className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      {item.label}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {item.flyout.map((sub, idx) => (
                      <div key={idx}>
                        {sub.url ? (
                          <a
                            href={sub.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block p-2 rounded-lg hover:bg-white/5 transition group"
                          >
                            <div className="text-xs font-medium text-slate-200 group-hover:text-cyan-400 flex items-center justify-between">
                              <span>{sub.name}</span>
                              <ExternalLink className="w-3 h-3 text-cyan-400 opacity-60 group-hover:opacity-100" />
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">{sub.desc}</div>
                          </a>
                        ) : (
                          <button
                            onClick={() => {
                              if (sub.action) sub.action();
                              setHoveredTab(null);
                            }}
                            className="w-full text-left p-2 rounded-lg hover:bg-white/5 transition group"
                          >
                            <div className="text-xs font-medium text-slate-200 group-hover:text-cyan-400">
                              {sub.name}
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
          );
        })}
      </div>

      {/* Bottom Launcher & Settings Dock */}
      <div className="p-3 border-t border-white/5 bg-[#040609]/70 space-y-2">
        <button
          onClick={() => setLauncherModalOpen(true)}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800/60 hover:text-cyan-300 transition group border border-slate-800/80"
          title="Productivity App Launcher (Notion, ClickUp, Kennect2Tech, Brightcove)"
        >
          <Grid3X3 className="w-4 h-4 text-amber-400 shrink-0" />
          {!collapsed && (
            <div className="flex-1 text-left">
              <span className="block text-slate-200 group-hover:text-cyan-300">App Launcher</span>
              <span className="block text-[10px] text-slate-500">Notion, ClickUp, Tech</span>
            </div>
          )}
        </button>

        <button
          onClick={() => setSettingsModalOpen(true)}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800/60 hover:text-slate-100 transition group"
          title="Architecture & Environment Secrets"
        >
          <Settings className="w-4 h-4 text-violet-400 shrink-0" />
          {!collapsed && (
            <div className="flex-1 text-left">
              <span className="block text-slate-200">System Architecture</span>
              <span className="block text-[10px] text-slate-500">Netlify / Supabase Env</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};
