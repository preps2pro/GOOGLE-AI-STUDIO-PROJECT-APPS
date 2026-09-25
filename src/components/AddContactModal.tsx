import React, { useState } from 'react';
import { Database, Star, UserPlus, X } from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';

export const AddContactModal: React.FC = () => {
  const { addContactModalOpen, setAddContactModalOpen, addContact } = useCommandCenter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [org, setOrg] = useState('');
  const [role, setRole] = useState('National Scout');
  const [strength, setStrength] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [territory, setTerritory] = useState('');
  const [notes, setNotes] = useState('');

  if (!addContactModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email) return;

    addContact({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || '+1 (555) 000-0000',
      organization: org || 'Independent Sports Network',
      source_type: 'manual',
      scouting_role: role,
      relationship_strength: strength,
      metadata: {
        territory: territory || 'National',
        notes: notes || 'Created manually via Command Center'
      }
    });

    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setOrg('');
    setNotes('');
    setAddContactModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="executive-card w-full max-w-lg p-6 border-cyan-500/40 shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Add Contact to System of Record</h2>
          </div>
          <button 
            onClick={() => setAddContactModalOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">First Name *</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Marcus"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Vance"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="scout@nflcombine.net"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 font-mono-code"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (214) 555-0182"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 font-mono-code"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Organization</label>
              <input
                type="text"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                placeholder="BLESTO / NFS / Media"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Scouting Role / Title</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Director of Personnel"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Relationship strength rating 1-5 */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              Relationship Strength Indicator (1-5 Scale)
            </label>
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setStrength(star as any)}
                  className="focus:outline-none hover:scale-110 transition p-1"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= strength ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-mono-code text-cyan-400 font-bold ml-2">
                Tier {strength}: {strength === 5 ? 'Key Decision Maker' : strength === 4 ? 'Close Collaborator' : strength === 3 ? 'Active Contact' : strength === 2 ? 'Occasional Reach' : 'Initial Prospect'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Territory / Conference</label>
              <input
                type="text"
                value={territory}
                onChange={(e) => setTerritory(e.target.value)}
                placeholder="SEC / Big 12 / National"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Deal / Context</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Sponsorship or Combine Access"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setAddContactModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
            >
              Save to Database
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
