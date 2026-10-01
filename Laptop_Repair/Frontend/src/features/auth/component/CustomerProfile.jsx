import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Stat Card ─────────────────────────────── */
const StatCard = ({ value, label, icon, color }) => (
  <div className={`${color} rounded-2xl p-4 flex flex-col items-center text-center`}>
    <span className="text-2xl mb-1">{icon}</span>
    <p className="text-2xl font-black">{value}</p>
    <p className="text-xs font-semibold opacity-70 mt-0.5">{label}</p>
  </div>
);

/* ─── Menu Row ────────────────────────────────── */
const MenuRow = ({ icon, label, desc, badge, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group
      ${danger
        ? 'bg-red-50 border-red-100 hover:border-red-300 hover:bg-red-100'
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
    {badge && (
      <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{badge}</span>
    )}
    {!danger && (
      <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
      </svg>
    )}
  </button>
);

/* ─── Booking Card ────────────────────────────── */
const BookingCard = ({ service, brand, status, price, date, techName }) => {
  const statusConfig = {
    completed:  { label: 'Completed',  cls: 'bg-green-100 text-green-700' },
    ongoing:    { label: 'In Progress', cls: 'bg-blue-100 text-blue-700' },
    scheduled:  { label: 'Scheduled',  cls: 'bg-amber-100 text-amber-700' },
    cancelled:  { label: 'Cancelled',  cls: 'bg-red-100 text-red-600' },
  };
  const s = statusConfig[status] || statusConfig.completed;
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-black text-slate-900 text-sm">{service}</p>
          <p className="text-xs text-slate-500 mt-0.5">{brand} • {date}</p>
          {techName && <p className="text-xs text-indigo-600 font-semibold mt-1">👨‍🔧 {techName}</p>}
        </div>
        <div className="text-right flex-shrink-0">
          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${s.cls}`}>{s.label}</span>
          <p className="text-base font-black text-slate-900 mt-1">₹{price.toLocaleString()}</p>
        </div>
      </div>
      {status === 'completed' && (
        <div className="mt-3 pt-3 border-t border-slate-50 flex gap-2">
          <button className="flex-1 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 py-2 rounded-xl transition-colors">Re-book</button>
          <button className="flex-1 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 py-2 rounded-xl transition-colors">Rate Service</button>
        </div>
      )}
      {status === 'ongoing' && (
        <div className="mt-3 pt-3 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full w-2/3 animate-pulse" />
            </div>
            <span className="text-xs text-blue-600 font-bold">~20 min left</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Main CustomerProfile ─────────────────────── */
export default function CustomerProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Arjun Sharma',
    email: 'arjun.sharma@gmail.com',
    phone: '+91 98765 43210',
    city: 'Arera Colony, Bhopal',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  });
  const [form, setForm] = useState({ ...profile });

  const bookings = [
    { id: 1, service: 'Screen Replacement', brand: 'Apple MacBook', status: 'ongoing', price: 2499, date: 'Today, 4:30 PM', techName: 'Rizwan Manihar' },
    { id: 2, service: 'Battery Replacement', brand: 'Dell Laptop', status: 'completed', price: 1499, date: 'Sep 18, 2026', techName: 'Amit Singh' },
    { id: 3, service: 'OS Installation', brand: 'HP Laptop', status: 'completed', price: 399, date: 'Sep 10, 2026', techName: 'Prashant D.' },
    { id: 4, service: 'Keyboard Repair', brand: 'Lenovo ThinkPad', status: 'cancelled', price: 1099, date: 'Sep 5, 2026', techName: null },
  ];

  const saveProfile = () => {
    setProfile({ ...form });
    setEditMode(false);
  };

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
          <button
            onClick={() => setEditMode(e => !e)}
            className="ml-auto text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors px-3 py-1.5 bg-indigo-50 rounded-xl"
          >
            {editMode ? 'Cancel' : '✏️ Edit'}
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* ── Profile Card ── */}
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 rounded-3xl p-6 relative overflow-hidden text-white">
          {/* BG circles */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full" />

          <div className="relative flex items-center gap-5">
            <div className="relative">
              <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-white/30 shadow-xl" />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-2 border-white rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full" />
              </span>
            </div>
            <div>
              <h2 className="text-xl font-black leading-tight">{profile.name}</h2>
              <p className="text-indigo-200 text-sm mt-0.5">{profile.email}</p>
              <p className="text-indigo-300 text-xs mt-0.5">📍 {profile.city}</p>
              <span className="inline-block mt-2 bg-white/15 border border-white/20 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                ⭐ LOYAL CUSTOMER
              </span>
            </div>
          </div>
        </div>

        {/* ── Edit Form ── */}
        {editMode && (
          <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4 shadow-sm">
            <h3 className="font-black text-slate-900">Edit Details</h3>
            {[
              { key: 'name', label: 'Full Name', type: 'text', icon: '👤' },
              { key: 'email', label: 'Email', type: 'email', icon: '📧' },
              { key: 'phone', label: 'Phone', type: 'tel', icon: '📱' },
              { key: 'city', label: 'Address / City', type: 'text', icon: '📍' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">{field.label}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base">{field.icon}</span>
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={saveProfile}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl transition-colors shadow-lg shadow-indigo-200"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard value="4" label="Total Repairs" icon="🔧" color="bg-indigo-50 text-indigo-700" />
          <StatCard value="4.9★" label="Avg Rating" icon="⭐" color="bg-amber-50 text-amber-700" />
          <StatCard value="₹5.4k" label="Total Spent" icon="💳" color="bg-emerald-50 text-emerald-700" />
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl">
          {['bookings', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
            >
              {tab === 'bookings' ? '📋 Bookings' : '⚙️ Settings'}
            </button>
          ))}
        </div>

        {/* ── Bookings Tab ── */}
        {activeTab === 'bookings' && (
          <div className="space-y-3">
            {bookings.map(b => (
              <BookingCard key={b.id} {...b} />
            ))}
          </div>
        )}

        {/* ── Settings Tab ── */}
        {activeTab === 'settings' && (
          <div className="space-y-3">
            <MenuRow icon="🔔" label="Notifications" desc="Manage alerts & reminders" onClick={() => {}} />
            <MenuRow icon="📍" label="Saved Addresses" desc="Arera Colony, Bhopal" onClick={() => {}} />
            <MenuRow icon="💳" label="Payment Methods" desc="UPI, Cards & Wallets" onClick={() => {}} />
            <MenuRow icon="🎁" label="Refer & Earn" desc="Get ₹200 per referral" badge="NEW" onClick={() => {}} />
            <MenuRow icon="🔒" label="Privacy & Security" desc="Password, 2FA" onClick={() => {}} />
            <MenuRow icon="🆘" label="Help & Support" desc="24/7 live chat" onClick={() => {}} />
            <MenuRow icon="📄" label="Terms & Privacy Policy" desc="" onClick={() => {}} />

            <div className="pt-2">
              <MenuRow icon="🚪" label="Log Out" desc="" danger onClick={() => navigate('/login')} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
