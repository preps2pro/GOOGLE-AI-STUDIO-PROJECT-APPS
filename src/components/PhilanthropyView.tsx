import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  DollarSign, 
  ExternalLink, 
  GraduationCap, 
  Heart, 
  HeartHandshake, 
  ShieldCheck, 
  Sparkles, 
  Users 
} from 'lucide-react';

export const PhilanthropyView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900/90 via-amber-950/40 to-slate-900/80 border border-amber-500/25 p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono-code">
              <HeartHandshake className="w-4 h-4" />
              <span>THE IMPACT NETWORK • ONE HEART PROJECT SPOTLIGHT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Philanthropy & <span className="text-amber-400">One Heart Project</span> Hub
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Bridging professional sports franchises, collegiate athlete leaders, and institutional sponsors with juvenile justice reform, second-chance apprenticeships, and youth athlete character development.
            </p>
          </div>

          <div className="px-4 py-3 rounded-xl bg-black/40 border border-amber-500/30 text-xs shrink-0 space-y-1">
            <div className="text-amber-300 font-bold">Executive Director</div>
            <div className="text-white font-semibold">Grover Norcross</div>
            <div className="text-[11px] text-slate-400">gnorcross@oneheartproject.org</div>
          </div>
        </div>
      </div>

      {/* 3 Impact Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="executive-card p-5 border-amber-500/30">
          <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Athlete Mentorship Corps</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Pairing high-character college and NFL draft prospects with system-impacted youth in detention and diversion programs for weekly character sessions.
          </p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-400">Active Mentors:</span>
            <span className="font-bold text-amber-400 font-mono-code">142 Athletes</span>
          </div>
        </div>

        <div className="executive-card p-5 border-cyan-500/30">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Corporate Second Chance</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Partnering with enterprise sports sponsors to fund vocational apprenticeships, life-skills coaching, and job placement upon completion of diversion.
          </p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-400">Job Placement Rate:</span>
            <span className="font-bold text-cyan-400 font-mono-code">89.4% Verified</span>
          </div>
        </div>

        <div className="executive-card p-5 border-violet-500/30">
          <div className="w-10 h-10 rounded-xl bg-violet-950/80 border border-violet-500/40 flex items-center justify-center text-violet-400 mb-3">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Prep Athletic Grants</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            In partnership with Christian Prep Football News, awarding educational tuition assistance and athletic gear grants to underserved student-athletes.
          </p>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-400">Grants Awarded:</span>
            <span className="font-bold text-violet-300 font-mono-code">$320,000 in 2026</span>
          </div>
        </div>
      </div>

      {/* Active Campaign Tracker */}
      <div className="executive-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white">2026 Sponsorship Matching Campaign</h2>
          </div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono-code font-bold bg-amber-950 text-amber-400 border border-amber-800">
            Gala Goal: $250,000
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold">National Athlete Mentorship Gala & Youth Apprenticeships</span>
            <span className="font-mono-code font-bold text-amber-400 text-sm">$185,000 (74%)</span>
          </div>

          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 h-full w-[74%] rounded-full shadow-lg shadow-amber-500/30"></div>
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-400">
            <span>Lead sponsor matching: <strong>$65,000 remaining</strong></span>
            <span>Tax-Exempt 501(c)(3) Foundation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
