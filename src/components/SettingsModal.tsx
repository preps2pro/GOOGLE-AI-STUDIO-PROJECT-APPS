import React from 'react';
import { 
  CheckCircle2, 
  Cpu, 
  Database, 
  Globe, 
  KeyRound, 
  Lock, 
  Server, 
  ShieldCheck, 
  X 
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';

export const SettingsModal: React.FC = () => {
  const { settingsModalOpen, setSettingsModalOpen, crmProvider } = useCommandCenter();

  if (!settingsModalOpen) return null;

  const envVars = [
    { key: 'DATABASE_URL', purpose: 'PostgreSQL System of Record Connection Pool', status: 'Provisioned / Active' },
    { key: 'HUBSPOT_ACCESS_TOKEN', purpose: 'Private App Token for CRM sync (crm.objects.contacts.read/write)', status: 'Connected (Scoped)' },
    { key: 'BRIGHTCOVE_CLIENT_ID / SECRET', purpose: 'Video Cloud asset sync & diarization indexing', status: 'Active (v2 Token)' },
    { key: 'ASSEMBLYAI_API_KEY', purpose: 'Speaker Diarization (Agent vs Athlete vs Scout)', status: 'Operational' },
    { key: 'ATTIO_APP_INTEGRATION', purpose: 'Third-party CRM tool status', status: 'Omitted & Permanently Erased' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="executive-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 border-violet-500/40 shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-violet-950/80 border border-violet-500/40 flex items-center justify-center text-violet-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">System Architecture & Netlify Secrets</h2>
              <p className="text-xs text-slate-400">Enterprise Operating System Infrastructure Blueprint.</p>
            </div>
          </div>
          <button 
            onClick={() => setSettingsModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-xs">
          {/* Architecture Status */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-white font-bold">
              <span className="flex items-center gap-1.5 text-cyan-400 font-mono-code">
                <Cpu className="w-4 h-4" /> Production Architecture Layer
              </span>
              <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono-code font-bold">
                Healthy
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Single Page Application framework configured with Netlify Functions (Serverless) to bypass execution timeouts on large audio/video file conversions via webhook callbacks.
            </p>
          </div>

          {/* Function Scoped Secrets Monitor */}
          <div>
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-violet-400" />
              Environment Variables & API Bridges
            </h3>

            <div className="space-y-2">
              {envVars.map((item) => (
                <div key={item.key} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-mono-code font-bold text-slate-200">{item.key}</div>
                    <div className="text-[11px] text-slate-400">{item.purpose}</div>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-mono-code rounded font-bold shrink-0 ${
                    item.key.includes('ATTIO')
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Subdomain Umbrella Strategy */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Domain & Subdomain Architecture (Preps2Pro Umbrella)
            </h3>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              <li>• <span className="font-mono-code text-cyan-300">christianprepfootballnews.com</span>: Confirmed National High School Media Publication</li>
              <li>• <span className="font-mono-code text-violet-300">afsi.preps2pro.com</span>: Subdomain for American Football Scouting International</li>
              <li>• <span className="font-mono-code text-amber-300">preps2pro.com/portal</span>: Internal Workspace for Preps2Press live reporter operations</li>
              <li>• <span className="font-mono-code text-emerald-300">learn-ai-workforce.com</span>: Executive AI Workforce Academy</li>
              <li>• <span className="font-mono-code text-sky-300">kennect2tech.com & kennectedreader.com</span>: Core software & executive reader portal</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={() => setSettingsModalOpen(false)}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};
