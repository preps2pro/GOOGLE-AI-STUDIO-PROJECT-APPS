import React, { useState } from 'react';
import { 
  Building2, 
  ChevronRight, 
  DollarSign, 
  Download, 
  ExternalLink, 
  Filter, 
  Plus, 
  Radar, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Users 
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { VCFirm } from '../types';

export const VentureCapitalView: React.FC = () => {
  const { vcFirms, addVcFirm, vcStageFilter, setVcStageFilter } = useCommandCenter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Fund Form State
  const [newName, setNewName] = useState('');
  const [newStage, setNewStage] = useState<'Pre-Seed & Seed' | 'Series A & B' | 'Growth & Private Equity'>('Pre-Seed & Seed');
  const [newFocus, setNewFocus] = useState('');
  const [newCheckSize, setNewCheckSize] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [newThesis, setNewThesis] = useState('');

  const filteredFirms = vcFirms.filter(firm => {
    const matchesStage = vcStageFilter === 'All' || firm.stage === vcStageFilter;
    const matchesSearch = firm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      firm.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      firm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      firm.portfolioHighlights.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStage && matchesSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addVcFirm({
      name: newName,
      stage: newStage,
      focus: newFocus || 'Athlete Performance Tech',
      keyFirmsOrPeople: ['Managing Director'],
      checkSize: newCheckSize || '$500K - $2M',
      location: newLocation || 'United States',
      portfolioHighlights: ['Strategic Seed Portfolio'],
      website: newWebsite.startsWith('http') ? newWebsite : `https://${newWebsite || 'example.com'}`,
      status: 'Active Dealflow',
      thesisNotes: newThesis || 'Sports-tech pure play excluding wagering entities.'
    });

    setNewName('');
    setNewFocus('');
    setNewCheckSize('');
    setNewLocation('');
    setNewWebsite('');
    setNewThesis('');
    setIsAddModalOpen(false);
  };

  const handleExportCsv = () => {
    const headers = ['Firm Name', 'Stage', 'Check Size', 'Focus Area', 'Location', 'Status', 'Website'];
    const rows = filteredFirms.map(f => [
      `"${f.name}"`,
      `"${f.stage}"`,
      `"${f.checkSize}"`,
      `"${f.focus}"`,
      `"${f.location}"`,
      `"${f.status}"`,
      `"${f.website}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Master_VC_Sheet_${vcStageFilter.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* SuperScout.co Radar Hero Header */}
      <div className="bg-gradient-to-r from-slate-900/90 via-violet-950/40 to-cyan-950/40 border border-violet-500/20 p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-violet-400 text-xs font-mono-code">
              <Radar className="w-4 h-4 animate-spin text-cyan-400" />
              <span>THE RADAR & THE PIPELINE • MASTER VC DIRECTORY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Venture Capital & <span className="text-violet-400">Sports Tech</span> Command
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Synthesizing <strong>SuperScout.co</strong> portfolio discovery with our internal <strong>Master VC Sheet</strong>. Structured strictly by funding stage (Pre-Seed to PE) and filtered by non-gambling athletic innovation mandates.
            </p>
          </div>

          {/* SuperScout.co Radar Integration Card */}
          <div className="bg-slate-900/90 border border-cyan-500/30 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 shadow-xl">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                <span className="font-bold text-white text-sm">SuperScout.co Live Radar</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                VC Portfolio Intelligence & Startup Discovery
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://superscout.co"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs transition shadow-md shadow-cyan-500/20 flex items-center space-x-1"
              >
                <span>Launch Radar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Strict exclusion notice & filter controls */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Investment Mandate: Zero Gambling / Sportsbook Exclusion Active</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add VC Fund</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stage Filter Rail & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Pre-Seed & Seed', 'Series A & B', 'Growth & Private Equity'].map((stage) => (
            <button
              key={stage}
              onClick={() => setVcStageFilter(stage)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                vcStageFilter === stage
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {stage} {stage === 'All' ? `(${vcFirms.length})` : ''}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search VC by name, thesis, portfolio..."
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-900/90 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
          />
        </div>
      </div>

      {/* Master VC Sheet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFirms.map((firm) => (
          <div 
            key={firm.id}
            className="executive-card p-5 flex flex-col justify-between border-slate-800/80 hover:border-violet-500/40 transition group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase font-mono-code ${
                  firm.stage === 'Pre-Seed & Seed' 
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                    : firm.stage === 'Series A & B'
                    ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/30'
                    : 'bg-violet-950/60 text-violet-300 border border-violet-500/30'
                }`}>
                  {firm.stage}
                </span>

                <span className="text-[10px] text-slate-400 font-mono-code font-bold">
                  {firm.checkSize}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                <span>{firm.name}</span>
                <a
                  href={firm.website}
                  target="_blank"
                  rel="noreferrer"
                  title="Visit Website"
                  className="text-slate-500 hover:text-cyan-400 p-1"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>

              <div className="text-[11px] text-slate-400 mt-1 mb-3">
                {firm.location} • Key: <span className="text-slate-300">{firm.keyFirmsOrPeople.join(', ')}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/70 border border-white/5 mb-3">
                <div className="text-[10px] font-mono-code uppercase text-slate-400 font-semibold mb-1">
                  Investment Focus
                </div>
                <div className="text-xs text-slate-200 font-medium leading-snug">
                  {firm.focus}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  <span className="text-slate-500 font-mono-code">Thesis: </span>
                  {firm.thesisNotes}
                </div>

                <div>
                  <div className="text-[10px] uppercase font-mono-code text-slate-400 mb-1">Portfolio Highlights:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {firm.portfolioHighlights.map((co, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[10px] rounded bg-slate-800/80 text-slate-300 border border-slate-700">
                        {co}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                firm.status === 'Active Dealflow' 
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : firm.status === 'Portfolio Company'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {firm.status}
              </span>

              <a
                href={firm.website}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Research Portfolio <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add New VC Fund Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="executive-card w-full max-w-lg p-6 border-violet-500/40 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-violet-400" />
                <h2 className="text-lg font-bold text-white">Add Fund to Master VC Sheet</h2>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Firm Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Courtside Ventures"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Stage Category</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="Pre-Seed & Seed">Pre-Seed & Seed</option>
                    <option value="Series A & B">Series A & B</option>
                    <option value="Growth & Private Equity">Growth & Private Equity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Check Size</label>
                  <input
                    type="text"
                    value={newCheckSize}
                    onChange={(e) => setNewCheckSize(e.target.value)}
                    placeholder="e.g. $1M - $5M"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Focus Area</label>
                <input
                  type="text"
                  value={newFocus}
                  onChange={(e) => setNewFocus(e.target.value)}
                  placeholder="e.g. Scaled Media, Fan Tech, Youth Sports SaaS"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Website URL</label>
                  <input
                    type="text"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Investment Thesis Notes</label>
                <textarea
                  rows={3}
                  value={newThesis}
                  onChange={(e) => setNewThesis(e.target.value)}
                  placeholder="Specific sports technology focus (remember: strictly zero sportsbook / gambling)..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold"
                >
                  Save to Master Sheet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
