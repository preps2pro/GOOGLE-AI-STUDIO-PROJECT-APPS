import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  Globe, 
  Lock, 
  Newspaper, 
  Search, 
  Shield, 
  ShieldAlert, 
  Trophy, 
  UserCheck, 
  Users 
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { FOOTBALL_RESOURCES } from '../data/mockData';

export const FootballNetworkView: React.FC = () => {
  const { setBlestoModalOpen, blestoRequestStatus } = useCommandCenter();
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = FOOTBALL_RESOURCES.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === 'ALL') return matchesSearch;
    if (filterType === 'PRO') return matchesSearch && (res.status === 'Restricted' || res.status === 'Authorized Only' || res.classification === 'Pro Scouting');
    if (filterType === 'PREP') return matchesSearch && (res.classification === 'Confirmed Publication' || res.classification === 'Internal Workspace');
    if (filterType === 'INTL') return matchesSearch && (res.classification === 'Subdomain');
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-amber-950/40 border border-amber-500/20 p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono-code mb-1">
              <Trophy className="w-4 h-4" />
              <span>SECTION 45-50 • SPECIALIZED SCOUTING & MEDIA MATRIX</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Football Industry <span className="text-amber-400">Network</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Engineered to bifurcate open-access media resources from restricted professional scouting bureau tools (BLESTO & NFS Combine APT Portal), backed by our Christian Prep & international pipelines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBlestoModalOpen(true)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition flex items-center space-x-1.5 ${
                blestoRequestStatus.submitted
                  ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300 hover:bg-rose-900/50'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>
                {blestoRequestStatus.submitted 
                  ? `BLESTO Status: ${blestoRequestStatus.ticketId}` 
                  : 'Request BLESTO Access'}
              </span>
            </button>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterType === 'ALL' ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Resources ({FOOTBALL_RESOURCES.length})
            </button>
            <button
              onClick={() => setFilterType('PRO')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterType === 'PRO' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Pro Scouting & Bureaus
            </button>
            <button
              onClick={() => setFilterType('PREP')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterType === 'PREP' ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Prep & Media Portals
            </button>
            <button
              onClick={() => setFilterType('INTL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterType === 'INTL' ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              International (AFSI)
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scouting network..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900/90 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Blueprint Section 4 & 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const isBlesto = res.name.toLowerCase().includes('blesto');

          return (
            <div 
              key={res.name} 
              className="executive-card p-6 flex flex-col justify-between border-slate-800/80 hover:border-cyan-500/40 transition group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 font-mono-code">
                    {res.type}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${res.badgeColor}`}>
                    {res.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition flex items-center gap-2">
                  {res.name}
                  {res.requiresAuth && !res.url && (
                    <Lock className="w-4 h-4 text-rose-400" />
                  )}
                </h3>

                <div className="text-[11px] text-slate-500 font-mono-code mt-0.5 mb-3">
                  Classification: <span className="text-slate-300">{res.classification}</span>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                {res.url ? (
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-md shadow-cyan-500/20 transition flex items-center justify-center space-x-2"
                  >
                    <span>Launch Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : isBlesto ? (
                  <button
                    onClick={() => setBlestoModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-950/40 hover:bg-rose-900/40 border border-rose-500/40 text-rose-300 font-bold text-xs transition flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{blestoRequestStatus.submitted ? 'Check BLESTO Clearance' : 'Request Access / Portal'}</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-500 font-semibold text-xs cursor-not-allowed flex items-center justify-center space-x-1"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Restricted Access</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Directory Status Table for Operational Clarity */}
      <div className="executive-card p-6">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Scouting Infrastructure Clearance Roster
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono-code">Enterprise Verification</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-slate-400 font-mono-code uppercase text-[10px]">
                <th className="py-2.5 px-3">Resource Node</th>
                <th className="py-2.5 px-3">Primary URL / Subdomain</th>
                <th className="py-2.5 px-3">Clearance Tier</th>
                <th className="py-2.5 px-3">Target Ecosystem</th>
                <th className="py-2.5 px-3 text-right">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr className="hover:bg-white/5 transition">
                <td className="py-3 px-3 font-semibold text-white">Christian Prep Football News</td>
                <td className="py-3 px-3 font-mono-code text-cyan-300">
                  <a href="https://christianprepfootballnews.com" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                    https://christianprepfootballnews.com <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="py-3 px-3">Confirmed Publication</td>
                <td className="py-3 px-3 text-slate-400">High School & Faith-based Prep</td>
                <td className="py-3 px-3 text-right">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active Syndication
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-white/5 transition">
                <td className="py-3 px-3 font-semibold text-white">American Football Scouting Int. (AFSI)</td>
                <td className="py-3 px-3 font-mono-code text-violet-300">
                  <a href="https://afsi.preps2pro.com" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                    https://afsi.preps2pro.com <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="py-3 px-3">Subdomain (Planned)</td>
                <td className="py-3 px-3 text-slate-400">Europe, Mexico, Japan IPP Pipelines</td>
                <td className="py-3 px-3 text-right">
                  <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Subdomain Mapped
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-white/5 transition">
                <td className="py-3 px-3 font-semibold text-white">Preps2Press Media Portal</td>
                <td className="py-3 px-3 font-mono-code text-amber-300">
                  <a href="https://preps2pro.com/portal" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                    https://preps2pro.com/portal <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="py-3 px-3">Internal Workspace</td>
                <td className="py-3 px-3 text-slate-400">Reporter Directory & Live Press Box</td>
                <td className="py-3 px-3 text-right">
                  <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Core Workspace
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-white/5 transition">
                <td className="py-3 px-3 font-semibold text-white">BLESTO Scouting Bureau</td>
                <td className="py-3 px-3 font-mono-code text-slate-400">Direct Member Network Portal</td>
                <td className="py-3 px-3">Restricted</td>
                <td className="py-3 px-3 text-slate-400">Partner NFL Franchises (8 Clubs)</td>
                <td className="py-3 px-3 text-right">
                  <span className="inline-flex items-center gap-1 text-rose-400 font-semibold">
                    <Lock className="w-3.5 h-3.5" /> {blestoRequestStatus.submitted ? 'Clearance Pending' : 'Restricted Portal'}
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-white/5 transition">
                <td className="py-3 px-3 font-semibold text-white">NFS APT Portal</td>
                <td className="py-3 px-3 font-mono-code text-sky-300">
                  <a href="https://secure.nationalfootballscouting.com/aptportal/" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                    secure.nationalfootballscouting.com/aptportal/ <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="py-3 px-3">Authorized Only</td>
                <td className="py-3 px-3 text-slate-400">Certified Combine Personnel</td>
                <td className="py-3 px-3 text-right">
                  <span className="inline-flex items-center gap-1 text-sky-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Dual-Auth SSL
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
