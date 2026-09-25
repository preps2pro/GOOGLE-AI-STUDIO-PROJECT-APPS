import React from 'react';
import { 
  AlertCircle, 
  ArrowUpRight, 
  Award, 
  BarChart3, 
  Bell, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  DollarSign, 
  ExternalLink, 
  FileAudio, 
  Flame, 
  GraduationCap, 
  HeartHandshake, 
  Layers, 
  Lock, 
  Radio, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  Trophy, 
  Users 
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { FOOTBALL_RESOURCES, MOCK_NEWS_ITEMS, SPOTRAC_HIGHLIGHTS } from '../data/mockData';

export const DashboardView: React.FC = () => {
  const { 
    setActiveTab, 
    contacts, 
    vcFirms, 
    transcriptionJobs, 
    setBlestoModalOpen,
    setLauncherModalOpen,
    blestoRequestStatus,
    crmProvider 
  } = useCommandCenter();

  // Calculate high level metrics
  const highPriorityContacts = contacts.filter(c => c.relationship_strength >= 4);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Executive Welcome & Key KPI Rail */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-cyan-950/40 border border-white/10 p-5 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono-code mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE COMMAND SYSTEM • PRODUCTION MESH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Sports Business Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-amber-300">Command Center</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
            Lead Product Architect OS coordinating football scouting syndication, sports-tech venture capital, enterprise CRM pipelines, and conversational intelligence.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('staging')}
            className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 transition flex items-center space-x-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>CSV Staging Table</span>
          </button>
          <button
            onClick={() => setActiveTab('football')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold transition shadow-lg shadow-cyan-500/25 flex items-center space-x-1.5"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Football Hub (Sec 45-50)</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="executive-card p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">System of Record</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white">{contacts.length} Contacts</div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
            <span>{highPriorityContacts.length} key partners (Rating 4-5★)</span>
          </div>
        </div>

        <div className="executive-card p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">VC & Capital Funds</span>
            <TrendingUp className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white">{vcFirms.length} Funds Tracked</div>
          <div className="text-[11px] text-violet-300 mt-1 flex items-center gap-1">
            <span>Pre-Seed to PE (No Sportsbooks)</span>
          </div>
        </div>

        <div className="executive-card p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Football Network</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white">6 Primary Nodes</div>
          <div className="text-[11px] text-amber-300 mt-1 flex items-center gap-1">
            <span>BLESTO • NFS APT • AFSI • CPFN</span>
          </div>
        </div>

        <div className="executive-card p-4">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Audio / Video Calls</span>
            <FileAudio className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white">{transcriptionJobs.length} Indexed</div>
          <div className="text-[11px] text-emerald-300 mt-1 flex items-center gap-1">
            <span>AssemblyAI Diarization Ready</span>
          </div>
        </div>
      </div>

      {/* Main Modular Grid (Section 3 of Blueprint) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Priority Card (Overdue follow-ups and high-value sponsorship opportunities) */}
        <div className="executive-card p-5 lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Executive Priority Queue
                </h2>
              </div>
              <span className="px-2 py-0.5 text-[10px] rounded bg-rose-950/60 text-rose-300 border border-rose-500/30 font-mono-code font-bold">
                Action Required
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition group">
                <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold mb-1">
                  <span className="flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> High-Value Sponsorship
                  </span>
                  <span>$450,000</span>
                </div>
                <div className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition">
                  Apparel Rights Exclusivity Rider
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  SEC Pro Day activation package awaiting contract review with Lead Brand Sponsor & One Heart Project grant matching.
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="text-rose-400 font-medium">Follow-up Overdue by 48h</span>
                  <button 
                    onClick={() => setActiveTab('transcription')}
                    className="text-cyan-400 hover:underline flex items-center gap-0.5"
                  >
                    View Diarized Call <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition group">
                <div className="flex items-center justify-between text-[11px] text-cyan-400 font-semibold mb-1">
                  <span className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" /> Pro Scouting Access
                  </span>
                  <span>NFS / BLESTO</span>
                </div>
                <div className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition">
                  Combine APT Portal Authorization
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Coordinate medical standard approvals and credentialing for AFSI international prospect pipeline.
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Contact: Marcus Vance (NFS)</span>
                  <button 
                    onClick={() => setActiveTab('football')}
                    className="text-cyan-400 hover:underline flex items-center gap-0.5"
                  >
                    Open Matrix <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-violet-500/40 transition group">
                <div className="flex items-center justify-between text-[11px] text-violet-400 font-semibold mb-1">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> VC Syndicate Round
                  </span>
                  <span>$2.5M Target</span>
                </div>
                <div className="text-xs font-bold text-slate-100 group-hover:text-violet-300 transition">
                  Sapphire Sport & Courtside Term Sheet Sync
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Review athlete-vision computer vision metrics pulled from Preps2Press game archives.
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Stage: Series A</span>
                  <button 
                    onClick={() => setActiveTab('ventureCapital')}
                    className="text-violet-400 hover:underline flex items-center gap-0.5"
                  >
                    VC Radar <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Active CRM: <strong className="text-slate-200">{crmProvider}</strong></span>
            <button 
              onClick={() => setActiveTab('crm')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              Open Full CRM Pipeline <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Column: Intelligence Feed (Sportico, SBJ, Front Office Sports, Spotrac) */}
        <div className="executive-card p-5 lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Sports Business Intelligence Feed
                </h2>
              </div>
              <span className="text-[10px] text-slate-400 font-mono-code">Live Feeds</span>
            </div>

            <div className="space-y-3">
              {MOCK_NEWS_ITEMS.map((item) => (
                <div 
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span className="font-semibold text-cyan-400 uppercase tracking-wider">{item.source}</span>
                    <span className="text-slate-500">{item.timestamp}</span>
                  </div>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-semibold text-slate-200 hover:text-cyan-300 transition line-clamp-2"
                  >
                    {item.title}
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {item.highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Integrated with Spotrac & KennectedReader</span>
            <button 
              onClick={() => setActiveTab('intelligence')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
            >
              Spotrac Cap Ledger <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Football Quick-Link & Philanthropy Spotlight */}
        <div className="space-y-6 lg:col-span-1">
          {/* Football Quick-Link: NFS APT Portal and BLESTO status */}
          <div className="executive-card p-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Football Industry Hub
                </h2>
              </div>
              <span className="px-2 py-0.5 text-[10px] rounded bg-amber-950/60 text-amber-300 border border-amber-500/30 font-mono-code font-bold">
                Section 45-50
              </span>
            </div>

            <div className="space-y-2.5">
              {/* NFS APT Portal */}
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-sky-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                    NFS APT Portal
                    <span className="px-1.5 py-0.2 text-[9px] rounded bg-sky-950 text-sky-400 border border-sky-800">Authorized Only</span>
                  </div>
                  <div className="text-[11px] text-slate-400">National Football Scouting secure records</div>
                </div>
                <a
                  href="https://secure.nationalfootballscouting.com/aptportal/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 transition flex items-center gap-1"
                >
                  Open Portal <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* BLESTO Quick Card */}
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-rose-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    BLESTO Scouting Bureau
                    <span className="px-1.5 py-0.2 text-[9px] rounded bg-rose-950 text-rose-400 border border-rose-800">Restricted</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {blestoRequestStatus.submitted 
                      ? `Request Submitted (${blestoRequestStatus.ticketId})` 
                      : 'NFL Franchise Clearance Required'}
                  </div>
                </div>
                <button
                  onClick={() => setBlestoModalOpen(true)}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition"
                >
                  {blestoRequestStatus.submitted ? 'Status' : 'Request Access'}
                </button>
              </div>

              {/* Christian Prep Football News */}
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    Christian Prep Football News
                    <span className="px-1.5 py-0.2 text-[9px] rounded bg-cyan-950 text-cyan-400 border border-cyan-800">Publication</span>
                  </div>
                  <div className="text-[11px] text-slate-400">National Christian athletic coverage</div>
                </div>
                <a
                  href="https://christianprepfootballnews.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition flex items-center gap-1"
                >
                  Launch <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* AFSI International */}
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-violet-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
                    AFSI Scouting Database
                    <span className="px-1.5 py-0.2 text-[9px] rounded bg-violet-950 text-violet-400 border border-violet-800">Subdomain</span>
                  </div>
                  <div className="text-[11px] text-slate-400">afsi.preps2pro.com international hub</div>
                </div>
                <a
                  href="https://afsi.preps2pro.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/40 transition flex items-center gap-1"
                >
                  Launch <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Philanthropy Spotlight: Current "One Heart Project" initiatives */}
          <div className="executive-card p-5 border-amber-500/30 bg-gradient-to-b from-amber-950/20 to-slate-900/80">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center space-x-2">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Philanthropy Spotlight
                </h2>
              </div>
              <span className="text-[11px] font-bold text-amber-400 font-mono-code">One Heart Project</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Empowering at-risk youth and system-impacted juveniles through structured athletic mentorship, corporate apprenticeships, and second-chance initiatives.
            </p>

            <div className="mt-3 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Current Campaign:</span>
                <span className="font-semibold text-white">2026 Athlete Mentorship Gala</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Pledged Sponsorship:</span>
                <span className="font-bold text-amber-400">$185,000 / $250,000</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full w-[74%] rounded-full"></div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Executive Director: Grover Norcross</span>
              <button 
                onClick={() => setActiveTab('philanthropy')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                View Impact Hub <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Spotrac Quick Ticker Strip */}
      <div className="executive-card p-4">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-400 border-b border-white/10 pb-2">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200 uppercase tracking-wider">Spotrac Market Financial Benchmarks</span>
            <span className="text-slate-500 hidden md:inline">• Real-time NFL Franchise Cap Hit Tracking</span>
          </div>
          <button 
            onClick={() => setActiveTab('intelligence')}
            className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
          >
            Open Full Spotrac Ledger <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {SPOTRAC_HIGHLIGHTS.map((contract) => (
            <div key={contract.player} className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs">
              <div className="font-bold text-white truncate">{contract.player}</div>
              <div className="text-[11px] text-slate-400">{contract.position} • {contract.team}</div>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Avg Annual:</span>
                <span className="font-mono-code font-bold text-emerald-400">{contract.avgAnnual}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">2026 Cap Hit:</span>
                <span className="font-mono-code text-slate-300">{contract.capHit2026}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
