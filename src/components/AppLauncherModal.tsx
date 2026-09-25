import React from 'react';
import { 
  BarChart, 
  CheckSquare, 
  Cloud, 
  ExternalLink, 
  FileAudio, 
  FileText, 
  Globe, 
  GraduationCap, 
  Grid3X3, 
  HeartHandshake, 
  Layers, 
  Newspaper, 
  Radar, 
  Radio, 
  TrendingUp, 
  Trophy, 
  Video, 
  X 
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';

export const AppLauncherModal: React.FC = () => {
  const { launcherModalOpen, setLauncherModalOpen, setActiveTab } = useCommandCenter();

  if (!launcherModalOpen) return null;

  const appNetwork = [
    {
      category: 'Core Sports Assets & Portals',
      apps: [
        {
          name: 'Christian Prep Football News',
          desc: 'Confirmed National High School Media Publication',
          url: 'https://christianprepfootballnews.com',
          icon: Newspaper,
          tag: 'Publication',
          color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40'
        },
        {
          name: 'American Football Scouting Int. (AFSI)',
          desc: 'afsi.preps2pro.com International IPP Pipeline',
          url: 'https://afsi.preps2pro.com',
          icon: Globe,
          tag: 'Subdomain',
          color: 'text-violet-400 border-violet-500/40 bg-violet-950/40'
        },
        {
          name: 'Preps2Press Media Portal',
          desc: 'preps2pro.com/portal Reporter & Press Management',
          url: 'https://preps2pro.com/portal',
          icon: Trophy,
          tag: 'Internal Portal',
          color: 'text-amber-400 border-amber-500/40 bg-amber-950/40'
        }
      ]
    },
    {
      category: 'Strategic Partner Tech & Intelligence',
      apps: [
        {
          name: 'Kennect2Tech.com',
          desc: 'Core Tech & Software Integration Management',
          url: 'https://kennect2tech.com',
          icon: Layers,
          tag: 'Core Software',
          color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40'
        },
        {
          name: 'KennectedReader.com',
          desc: 'Executive News & Intelligence Aggregation Engine',
          url: 'https://kennectedreader.com',
          icon: Radio,
          tag: 'Intelligence',
          color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40'
        },
        {
          name: 'Learn-AI-Workforce.com',
          desc: 'Executive AI Literacy & Training Academy',
          url: 'https://learn-ai-workforce.com',
          icon: GraduationCap,
          tag: 'Executive AI',
          color: 'text-amber-400 border-amber-500/40 bg-amber-950/40'
        },
        {
          name: 'SuperScout.co Radar',
          desc: 'Venture Capital Startup Discovery & Radar',
          url: 'https://superscout.co',
          icon: Radar,
          tag: 'VC Discovery',
          color: 'text-violet-400 border-violet-500/40 bg-violet-950/40'
        },
        {
          name: 'Spotrac.com',
          desc: 'Player Contracts, Cap Tracker & Financial Ledger',
          url: 'https://spotrac.com',
          icon: BarChart,
          tag: 'Cap Ledger',
          color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40'
        }
      ]
    },
    {
      category: 'Executive Productivity & Cloud Stack',
      apps: [
        {
          name: 'Notion Workspace',
          desc: 'Sports Business Wiki, Media Kits & Brand Guidelines',
          url: 'https://notion.so',
          icon: FileText,
          tag: 'Wiki & Docs',
          color: 'text-slate-300 border-slate-700 bg-slate-900'
        },
        {
          name: 'ClickUp Boards',
          desc: 'Task Management for One Heart & Preps2Press Outreach',
          url: 'https://clickup.com',
          icon: CheckSquare,
          tag: 'Tasks',
          color: 'text-pink-400 border-pink-500/40 bg-pink-950/40'
        },
        {
          name: 'Brightcove Video Cloud',
          desc: 'Enterprise Video Hosting & Diarized Timecode Sync',
          url: 'https://brightcove.com',
          icon: Video,
          tag: 'Video CDN',
          color: 'text-amber-400 border-amber-500/40 bg-amber-950/40'
        },
        {
          name: 'Google Workspace',
          desc: 'Executive Mail, Drive, Docs, Calendar & Sheets',
          url: 'https://workspace.google.com',
          icon: Globe,
          tag: 'Productivity',
          color: 'text-blue-400 border-blue-500/40 bg-blue-950/40'
        }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="executive-card w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 border-cyan-500/40 shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Grid3X3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Executive App Launcher & Ecosystem Hub</h2>
              <p className="text-xs text-slate-400">Direct launch shortcuts for your integrated sports-business platforms.</p>
            </div>
          </div>
          <button 
            onClick={() => setLauncherModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {appNetwork.map((cat, idx) => (
            <div key={idx} className="space-y-3">
              <div className="text-xs font-mono-code uppercase tracking-wider text-slate-400 font-bold">
                {cat.category}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cat.apps.map((app) => {
                  const Icon = app.icon;

                  return (
                    <a
                      key={app.name}
                      href={app.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition group flex items-start justify-between"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg border ${app.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition flex items-center gap-1.5">
                            {app.name}
                            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 text-cyan-400" />
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{app.desc}</div>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 text-[9px] rounded font-mono-code font-bold bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                        {app.tag}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
