import React, { useState } from 'react';
import { 
  Bot, 
  BrainCircuit, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  FileText, 
  GraduationCap, 
  Play, 
  Send, 
  Sparkles, 
  Terminal, 
  Video, 
  Zap 
} from 'lucide-react';

export const AiWorkforceTrainingView: React.FC = () => {
  const [selectedPromptCategory, setSelectedPromptCategory] = useState<'sponsorship' | 'scouting' | 'cap' | 'media'>('sponsorship');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const promptPlaybook = {
    sponsorship: [
      {
        id: 'p-1',
        title: 'Tier-1 Brand Sponsorship Outreach Generator',
        prompt: `Act as a Senior Vice President of Sports Partnerships. Draft a high-impact executive outreach email to the VP of Global Sports Marketing at a Fortune 500 beverage company. Reference our Preps2Press regional broadcast audience (1.2M monthly prep viewers), exclusive Christian Prep Football News syndication, and alignment with One Heart Project youth athletic mentorship. Include clear ROI metrics and a request for a 15-minute briefing on 2026 collegiate activation riders.`
      },
      {
        id: 'p-2',
        title: 'NIL Collective Value Matrix Audit',
        prompt: `Analyze the following athlete engagement metrics across Instagram, TikTok, and localized game attendance. Generate a tiered NIL fair-market valuation range benchmarked against current SEC/Big 12 athlete collective disclosures. Flag potential FTC disclosure compliance requirements and character endorsement covenants.`
      }
    ],
    scouting: [
      {
        id: 'p-3',
        title: 'NFS APT Scouting Report Executive Summary',
        prompt: `Synthesize the raw athletic testing metrics from this morning's regional combine (40-yard dash: 4.42s, vertical: 38.5in, broad jump: 10ft 4in, wingspan: 79in). Format the evaluation into the standard NFL Franchise Grade Matrix (Grade 6.5 - 7.0 Pro Bowl caliber starter). Detail schematic fit for both 4-3 Under and 3-4 Hybrid front fronts.`
      },
      {
        id: 'p-4',
        title: 'AFSI International Prospect Readiness Briefing',
        prompt: `Generate an International Player Pathway (IPP) transition analysis for a 22-year-old European league defensive end. Compare his pass-rush win rate on American-sized hash marks versus collegiate FBS competition. Include recommendations for pre-draft combine training in Tampa.`
      }
    ],
    cap: [
      {
        id: 'p-5',
        title: 'Spotrac Salary Cap Restructure Scenario',
        prompt: `Review the franchise's 2026 cap liability. Propose two compliant salary cap restructuring scenarios for a top-5 quarterback contract with $44.5M cap hit, converting $25M of base salary into a signing bonus prorated over 5 void years. Calculate the net cap relief for the upcoming free agency window.`
      }
    ],
    media: [
      {
        id: 'p-6',
        title: 'Preps2Press Broadcast Rights Term Sheet',
        prompt: `Draft a non-binding Term Sheet for digital syndication rights between Preps2Press and an OTT sports network. Outline territorial exclusivity, live-streaming latency requirements (under 4 seconds), digital advertising revenue split (70/30 in favor of rights holder), and archival on-demand rights.`
      }
    ]
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900/90 via-amber-950/30 to-violet-950/40 border border-amber-500/20 p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono-code">
              <GraduationCap className="w-4 h-4" />
              <span>LEARN-AI-WORKFORCE.COM • EXECUTIVE TRAINING ACADEMY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Executive AI Workforce & <span className="text-amber-400">Skills Portal</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Empowering sports business executives, scouts, and sales directors with modern AI tools. Featuring enterprise curricula from <strong>Learn-AI-Workforce.com</strong> and pre-tested prompt frameworks.
            </p>
          </div>

          <a
            href="https://learn-ai-workforce.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-amber-500/20 flex items-center space-x-2 shrink-0"
          >
            <span>Launch Learn-AI-Workforce.com</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 4 Core Competency Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="executive-card p-4 border-cyan-500/30">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-3">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Automated Sponsorship</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Extract brand alignment signals from athlete social profiles and generate custom multi-tier proposal decks in minutes.
          </p>
        </div>

        <div className="executive-card p-4 border-violet-500/30">
          <div className="w-9 h-9 rounded-lg bg-violet-950/80 border border-violet-500/40 flex items-center justify-center text-violet-400 mb-3">
            <Video className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Computer Vision Tagging</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            AI-assisted game film indexing that flags separation speed, tackle angles, and coverage recognition 14x faster.
          </p>
        </div>

        <div className="executive-card p-4 border-emerald-500/30">
          <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Predictive Cap Modeling</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Correlate historical Spotrac guarantees with future franchise cap inflation rates to model optimized contract extensions.
          </p>
        </div>

        <div className="executive-card p-4 border-amber-500/30">
          <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3">
            <Bot className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Conversational Intel</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            AssemblyAI automated diarization separating Agent, Scout, and Athlete voices to ensure compliance and track action items.
          </p>
        </div>
      </div>

      {/* Interactive Executive Prompt Playbook */}
      <div className="executive-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Executive Sports Business Prompt Playbook
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Production-grade prompts tested for sports agency negotiations, front office analytics, and sponsor acquisitions.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'sponsorship', label: 'Sponsorship & NIL' },
              { id: 'scouting', label: 'Scouting & Combine' },
              { id: 'cap', label: 'Spotrac Salary Cap' },
              { id: 'media', label: 'Media Rights' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedPromptCategory(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedPromptCategory === tab.id
                    ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {promptPlaybook[selectedPromptCategory].map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  {item.title}
                </span>

                <button
                  onClick={() => handleCopy(item.prompt, item.id)}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold transition flex items-center space-x-1"
                >
                  {copiedPromptId === item.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono-code text-xs text-slate-300 leading-relaxed">
                {item.prompt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
