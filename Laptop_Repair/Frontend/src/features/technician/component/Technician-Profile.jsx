import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Helpers ──────────────────────────────── */
const StatCard = ({ value, label, icon, color }) => (
  <div className={`${color} rounded-2xl p-4 text-center`}>
    <span className="text-2xl block mb-1">{icon}</span>
    <p className="text-xl font-black">{value}</p>
    <p className="text-[11px] font-semibold opacity-70 mt-0.5 leading-tight">{label}</p>
  </div>
);

const MenuRow = ({ icon, label, desc, badge, onClick, danger, value }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group
      ${danger
        ? 'bg-red-50 border-red-100 hover:border-red-300'
        : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-sm'
      }`}
  >
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${danger ? 'bg-red-100' : 'bg-slate-100 group-hover:bg-indigo-50'}`}>
      <span className="text-xl">{icon}</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className={`font-bold text-sm ${danger ? 'text-red-600' : 'text-slate-900'}`}>{label}</p>
      {desc && <p className="text-xs text-slate-400 truncate mt-0.5">{desc}</p>}
    </div>
    {badge && <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0">{badge}</span>}
    {value && <span className="text-sm font-bold text-slate-700 flex-shrink-0">{value}</span>}
    {!danger && (
      <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
      </svg>
    )}
  </button>
);

const JobCard = ({ service, customer, price, status, date, rating }) => {
  const s = {
    completed: { label: 'Completed', cls: 'bg-green-100 text-green-700' },
    ongoing:   { label: 'In Progress', cls: 'bg-blue-100 text-blue-700' },
    scheduled: { label: 'Upcoming', cls: 'bg-amber-100 text-amber-700' },
  }[status] || { label: status, cls: 'bg-slate-100 text-slate-700' };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-black text-slate-900 text-sm truncate">{service}</p>
          <p className="text-xs text-slate-500 mt-0.5">👤 {customer} • {date}</p>
          {rating && (
            <div className="flex items-center gap-1 mt-1">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className={`w-3 h-3 ${i <= rating ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${s.cls}`}>{s.label}</span>
          <p className="text-base font-black text-slate-900 mt-1">₹{price.toLocaleString()}</p>
        </div>
      </div>
      {status === 'ongoing' && (
        <div className="mt-3 pt-3 border-t border-slate-50 flex gap-2">
          <button className="flex-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 py-2 rounded-xl transition-colors">Mark Complete</button>
          <button className="flex-1 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 py-2 rounded-xl transition-colors">Contact Customer</button>
        </div>
      )}
    </div>
  );
};

/* ─── Toggle Switch ────────────────────────── */
const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-green-500' : 'bg-slate-300'}`}
  >
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

/* ─── Main TechnicianProfile ───────────────── */
export default function TechnicianProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');
  const [isAvailable, setIsAvailable] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [profile] = useState({
    name: 'Rizwan Manihar',
    role: 'Senior Certified Hardware Technician',
    email: 'rizwan.tech@gmail.com',
    phone: '+91 97432 10876',
    city: 'MP Nagar, Bhopal',
    experience: '6 Years Experience',
    avatar: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&q=80',
    rating: 4.9,
    reviews: 214,
    totalJobs: 1248,
    monthlyEarnings: 42800,
    specializations: ['Apple MacBook', 'Dell', 'HP', 'Motherboard Repair', 'Screen Replacement'],
  });

  const jobs = [
    { id: 1, service: 'Screen Replacement — Apple MacBook', customer: 'Arjun Sharma', status: 'ongoing', price: 2499, date: 'Today, 4:30 PM', rating: null },
    { id: 2, service: 'Battery Replacement — Dell Laptop', customer: 'Priya Verma', status: 'completed', price: 1499, date: 'Sep 22, 2026', rating: 5 },
    { id: 3, service: 'OS Installation — HP Laptop', customer: 'Rohan Gupta', status: 'completed', price: 399, date: 'Sep 20, 2026', rating: 4 },
    { id: 4, service: 'Motherboard Diagnosis — Lenovo', customer: 'Sneha Joshi', status: 'scheduled', price: 699, date: 'Sep 25, 4:00 PM', rating: null },
  ];

  /* Earnings chart bars (last 7 days, arbitrary values) */
  const earningsBar = [3200, 5400, 2800, 6100, 4900, 3600, 7200];
  const maxBar = Math.max(...earningsBar);

  return (
    <div className="min-h-screen bg-slate-50 pb-28">

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-100 px-4 py-4 sticky top-0 z-30">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-black text-slate-900">My Profile</h1>

          {/* Availability toggle */}
          <div className="ml-auto flex items-center gap-2">
            <span className={`text-xs font-bold ${isAvailable ? 'text-green-600' : 'text-slate-400'}`}>
              {isAvailable ? '🟢 Online' : '⚫ Offline'}
            </span>
            <Toggle checked={isAvailable} onChange={setIsAvailable} />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* ── Profile Hero Card ── */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 rounded-3xl overflow-hidden relative">
          {/* decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500/10 rounded-full" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-violet-500/10 rounded-full" />

          <div className="relative p-6">
            <div className="flex items-start gap-5">
              <div className="relative flex-shrink-0">
                <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-2xl object-cover border-2 border-white/20 shadow-2xl" />
                <span className={`absolute -bottom-1.5 -right-1.5 w-7 h-7 ${isAvailable ? 'bg-green-400' : 'bg-slate-400'} border-2 border-slate-900 rounded-full flex items-center justify-center transition-colors`}>
                  {isAvailable && <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-black text-white leading-tight">{profile.name}</h2>
                <p className="text-slate-400 text-xs mt-0.5">{profile.role}</p>
                <p className="text-slate-500 text-xs mt-0.5">📍 {profile.city} • {profile.experience}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className={`w-4 h-4 ${i <= Math.round(profile.rating) ? 'text-amber-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-amber-400 font-black text-sm">{profile.rating}</span>
                  <span className="text-slate-500 text-xs">({profile.reviews} reviews)</span>
                </div>

                {/* Verified badge */}
                <div className="inline-flex items-center gap-1.5 mt-3 bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] font-black px-3 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  BACKGROUND VERIFIED
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.specializations.map(s => (
                <span key={s} className="bg-white/10 border border-white/10 text-white/80 text-[10px] font-semibold px-2.5 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>

          {/* Earnings stripe */}
          <div className="bg-indigo-600/30 border-t border-indigo-500/20 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-indigo-300 font-semibold uppercase tracking-wide">This Month's Earnings</p>
              <p className="text-2xl font-black text-white mt-0.5">₹{profile.monthlyEarnings.toLocaleString()}</p>
            </div>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold px-4 py-2 rounded-xl transition-colors">
              Withdraw 💸
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard value={profile.totalJobs} label="Total Jobs" icon="🔧" color="bg-indigo-50 text-indigo-700" />
          <StatCard value={`${profile.rating}★`} label="Avg Rating" icon="⭐" color="bg-amber-50 text-amber-700" />
          <StatCard value="98%" label="Completion" icon="✅" color="bg-green-50 text-green-700" />
        </div>

        {/* ── Earnings Chart ── */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-slate-900 text-sm">Earnings — Last 7 Days</h3>
            <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-full">₹{earningsBar.reduce((a, b) => a + b, 0).toLocaleString()} total</span>
          </div>
          <div className="flex items-end gap-2 h-24">
            {earningsBar.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-indigo-500 hover:bg-indigo-600 rounded-t-lg transition-all cursor-default"
                  style={{ height: `${(val / maxBar) * 80}px` }}
                  title={`₹${val.toLocaleString()}`}
                />
                <span className="text-[9px] text-slate-400 font-semibold">
                  {['M','T','W','T','F','S','S'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl">
          {['jobs', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
            >
              {tab === 'jobs' ? '🗂️ My Jobs' : '⚙️ Settings'}
            </button>
          ))}
        </div>

        {/* ── Jobs Tab ── */}
        {activeTab === 'jobs' && (
          <div className="space-y-3">
            {jobs.map(j => <JobCard key={j.id} {...j} />)}
          </div>
        )}

        {/* ── Settings Tab ── */}
        {activeTab === 'settings' && (
          <div className="space-y-3">
            <MenuRow icon="✅" label="Background Verification" desc="Aadhar & Police Verified — Jan 2026" value="Done ✓" onClick={() => {}} />
            <MenuRow icon="💳" label="Bank Account & Payouts" desc="Manage earnings & withdrawal methods" onClick={() => {}} />
            <MenuRow icon="📋" label="Certifications" desc="Add or update your repair certifications" badge="2 Added" onClick={() => {}} />
            <MenuRow icon="🔔" label="Job Notifications" desc="Alerts for new job requests" onClick={() => {}} />
            <MenuRow icon="📍" label="Service Area" desc="MP Nagar & nearby zones" onClick={() => {}} />
            <MenuRow icon="🔒" label="Privacy & Security" desc="Password, 2FA, account" onClick={() => {}} />
            <MenuRow icon="🆘" label="Help & Support" desc="Contact FixIt Now support team" onClick={() => {}} />
            <div className="pt-2">
              <MenuRow icon="🚪" label="Log Out" danger onClick={() => navigate('/login')} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}