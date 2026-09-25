import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  BarChart3, 
  BookOpen, 
  DollarSign, 
  ExternalLink, 
  Globe, 
  Newspaper, 
  Radio, 
  Search, 
  TrendingUp, 
  Zap 
} from 'lucide-react';
import { MOCK_NEWS_ITEMS, SPOTRAC_HIGHLIGHTS } from '../data/mockData';

export const IntelligenceCenterView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredContracts = SPOTRAC_HIGHLIGHTS.filter(c => 
    c.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900/90 via-emerald-950/30 to-slate-900/80 border border-emerald-500/20 p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono-code">
              <DollarSign className="w-4 h-4" />
              <span>THE LEDGER & THE BRIEFING • SPOTRAC & KENNECTEDREADER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Sports Financial <span className="text-emerald-400">Intelligence Center</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
              Real-time NFL salary cap benchmarking, guaranteed compensation metrics, media rights valuation matrices, and executive news aggregation powered by <strong>KennectedReader.com</strong> and <strong>Spotrac.com</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://spotrac.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition flex items-center space-x-2 shadow-lg"
            >
              <span>Spotrac.com Ledger</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://kennectedreader.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition flex items-center space-x-2 shadow-lg"
            >
              <span>KennectedReader.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Spotrac Contract Ledger Table */}
      <div className="executive-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Spotrac Benchmark Ledger (Contract & Cap Hit Tracker)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Benchmark player guarantees and annual average values to guide contract negotiation and scouting valuation models.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search player, team, position..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-slate-400 font-mono-code uppercase text-[10px]">
                <th className="py-2.5 px-3">Player / Athlete</th>
                <th className="py-2.5 px-3">Franchise & Position</th>
                <th className="py-2.5 px-3">Total Value</th>
                <th className="py-2.5 px-3">Avg Annual Value</th>
                <th className="py-2.5 px-3">Guaranteed at Sign</th>
                <th className="py-2.5 px-3">2026 Cap Hit</th>
                <th className="py-2.5 px-3 text-right">FA Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredContracts.map((c) => (
                <tr key={c.player} className="hover:bg-white/5 transition">
                  <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                    <span>{c.player}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono-code font-bold">
                      {c.position}
                    </span>
                    <span className="ml-2 text-slate-300">{c.team}</span>
                  </td>
                  <td className="py-3 px-3 font-mono-code font-semibold text-slate-200">{c.contractValue}</td>
                  <td className="py-3 px-3 font-mono-code font-bold text-emerald-400">{c.avgAnnual}</td>
                  <td className="py-3 px-3 font-mono-code text-cyan-300">{c.guaranteed}</td>
                  <td className="py-3 px-3 font-mono-code text-amber-300">{c.capHit2026}</td>
                  <td className="py-3 px-3 text-right font-mono-code font-bold text-slate-400">{c.freeAgentYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Aggregated Sports News Feed (Sportico, SBJ, Front Office Sports, KennectedReader) */}
      <div className="executive-card p-6">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-bold text-white">
              Curated Executive Sports Briefings
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono-code">5 Integrated Feeds</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_NEWS_ITEMS.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition group">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-cyan-300 border border-slate-700">
                  {item.source}
                </span>
                <span className="text-slate-500 font-mono-code text-[11px]">{item.timestamp}</span>
              </div>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-sm font-bold text-white group-hover:text-cyan-300 transition line-clamp-2"
              >
                {item.title}
              </a>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-2">
                {item.highlight}
              </p>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                <span className="text-slate-400">Category: <strong className="text-slate-300">{item.category}</strong></span>
                <a href={item.url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 font-medium">
                  Read Source <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
