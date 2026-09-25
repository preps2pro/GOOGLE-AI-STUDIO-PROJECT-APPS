import React, { useState } from 'react';
import { CheckCircle2, Lock, ShieldAlert, X } from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';

export const BlestoAccessModal: React.FC = () => {
  const { blestoModalOpen, setBlestoModalOpen, blestoRequestStatus, submitBlestoRequest } = useCommandCenter();
  const [orgName, setOrgName] = useState('Preps2Pro Global Scouting Network');
  const [role, setRole] = useState('Executive Director of Player Evaluation');
  const [nflAffiliation, setNflAffiliation] = useState('Cooperative Advisory Board / Combine Credentials');
  const [submitted, setSubmitted] = useState(blestoRequestStatus.submitted);

  if (!blestoModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitBlestoRequest(orgName, role, nflAffiliation);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="executive-card w-full max-w-lg p-6 border-rose-500/40 shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-bold text-white">BLESTO Scouting Access Clearance</h2>
          </div>
          <button 
            onClick={() => setBlestoModalOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Access Request Under Review</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your credentials request has been queued for member franchise verification.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono-code text-xs text-slate-300">
              Ticket ID: <span className="text-cyan-400">{blestoRequestStatus.ticketId || 'BLESTO-REQ-984102'}</span><br />
              Authorized Email: <span className="text-white">{blestoRequestStatus.applicantEmail}</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Notice: BLESTO is a proprietary cooperative bureau servicing authorized partner NFL franchises.
            </p>
            <button
              onClick={() => setBlestoModalOpen(false)}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-300">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <Lock className="w-3.5 h-3.5" /> Restricted Professional Resource (Section 45-50)
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                BLESTO portal access is restricted to verified NFL personnel and partner evaluations. Complete verification details to obtain secure token access.
              </p>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Organization / Entity *</label>
              <input
                type="text"
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Scouting / Front Office Role *</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">NFL Credential / Affiliation Note</label>
              <input
                type="text"
                value={nflAffiliation}
                onChange={(e) => setNflAffiliation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Verified Applicant Email</label>
              <input
                type="text"
                disabled
                value="Preps2Pro@gmail.com"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 font-mono-code cursor-not-allowed"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setBlestoModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold"
              >
                Submit BLESTO Access Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
