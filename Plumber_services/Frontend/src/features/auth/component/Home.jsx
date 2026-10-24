import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── 12 Laptop Brands ──────────────────────────────────────────────── */
const BRANDS = [
  { id: 'apple',    name: 'Apple',     emoji: '🍎', color: 'bg-slate-900',   text: 'text-white',   img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80' },
  { id: 'dell',     name: 'Dell',      emoji: '🖥️', color: 'bg-blue-700',    text: 'text-white',   img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80' },
  { id: 'hp',       name: 'HP',        emoji: '💻', color: 'bg-sky-600',     text: 'text-white',   img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80' },
  { id: 'lenovo',   name: 'Lenovo',    emoji: '🔴', color: 'bg-red-600',     text: 'text-white',   img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80' },
  { id: 'asus',     name: 'Asus',      emoji: '⚡', color: 'bg-indigo-600',  text: 'text-white',   img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80' },
  { id: 'acer',     name: 'Acer',      emoji: '🌿', color: 'bg-green-600',   text: 'text-white',   img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80' },
  { id: 'msi',      name: 'MSI',       emoji: '🎮', color: 'bg-rose-700',    text: 'text-white',   img: 'https://images.unsplash.com/photo-1603481546238-487240415921?w=400&q=80' },
  { id: 'samsung',  name: 'Samsung',   emoji: '🌀', color: 'bg-violet-600',  text: 'text-white',   img: 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=400&q=80' },
  { id: 'toshiba',  name: 'Toshiba',   emoji: '🔵', color: 'bg-cyan-700',    text: 'text-white',   img: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&q=80' },
  { id: 'razer',    name: 'Razer',     emoji: '🐍', color: 'bg-emerald-700', text: 'text-white',   img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80' },
  { id: 'surface',  name: 'Surface',   emoji: '🪟', color: 'bg-orange-500',  text: 'text-white',   img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80' },
  { id: 'lg',       name: 'LG',        emoji: '🟥', color: 'bg-pink-600',    text: 'text-white',   img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=80' },
];

/* ─── Quick Repair Issues ──────────────────────────────────────────── */
const ISSUES = [
  { label: 'Screen Crack',    icon: '🖥️' },
  { label: 'Battery Drain',   icon: '🔋' },
  { label: 'OS Install',      icon: '💿' },
  { label: 'Keyboard Fix',    icon: '⌨️' },
  { label: 'RAM Upgrade',     icon: '🧠' },
  { label: 'Virus Removal',   icon: '🦠' },
  { label: 'Hinge Repair',    icon: '🔩' },
  { label: 'Data Recovery',   icon: '💾' },
];

/* ─── How It Works steps ──────────────────────────────────────────── */
const HOW_IT_WORKS = [
  { step: '01', title: 'Pick Brand & Issue', desc: 'Choose your laptop brand and select the repair type.', icon: '🔍' },
  { step: '02', title: 'Book a Slot',        desc: 'Choose a time slot — same-day visits available.',       icon: '📅' },
  { step: '03', title: 'Tech Arrives',       desc: 'A verified technician arrives at your door.',           icon: '🚴' },
  { step: '04', title: 'Pay & Relax',        desc: 'Repair done, warranty issued, pay only on completion.',  icon: '✅' },
];

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = BRANDS.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">

      {/* ══ STICKY HEADER ══════════════════════════════════════════════ */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo + location */}
          <div className="flex flex-col cursor-pointer min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Delivering to
            </span>
            <h2 className="text-sm font-black text-slate-900 truncate max-w-[180px] sm:max-w-xs">Arera Colony, Bhopal</h2>
          </div>

          {/* Brand name */}
          <span className="text-lg font-black text-indigo-600 tracking-tight hidden sm:block">FixIt<span className="text-slate-900">Now</span></span>

          {/* Profile avatar */}
          <button onClick={() => navigate('/customer/profile')} className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-200 hover:border-indigo-500 transition-colors flex-shrink-0">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80" alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 pt-6">

        {/* ══ SEARCH + HERO BANNER ══════════════════════════════════════ */}
        <section className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-5 sm:p-7 relative overflow-hidden">
          {/* decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/10 rounded-full -ml-16 -mb-16" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Technicians Available Now</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1 leading-tight">
              Laptop Repair at Your Doorstep
            </h1>
            <p className="text-indigo-200 text-sm mb-5">Genuine parts · 90-day warranty · Same-day service</p>

            {/* Search bar */}
            <div className="flex items-center bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="pl-4 text-slate-400 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search brand or issue…"
                className="flex-1 py-3.5 px-3 text-slate-900 font-semibold placeholder-slate-400 focus:outline-none text-sm"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3.5 text-sm transition-colors whitespace-nowrap">
                Search
              </button>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['✅ Verified Techs', '⚡ 60-min Service', '🛡️ 90-day Warranty', '💳 Pay on Delivery'].map(t => (
                <span key={t} className="bg-white/10 border border-white/20 text-white/90 text-[11px] font-semibold px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ══ QUICK ISSUE CHIPS ════════════════════════════════════════ */}
        <section>
          <h2 className="text-base font-black text-slate-900 mb-3">Quick Fix</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {ISSUES.map(issue => (
              <button
                key={issue.label}
                className="flex-shrink-0 flex items-center gap-2 bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-full transition-all active:scale-95 shadow-sm"
              >
                <span>{issue.icon}</span>
                {issue.label}
              </button>
            ))}
          </div>
        </section>

        {/* ══ BRAND GRID ══════════════════════════════════════════════ */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">Select Your Brand</h2>
              <p className="text-slate-400 text-sm mt-0.5">{filtered.length} brands supported</p>
            </div>
            <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-1.5 rounded-full">All Brands</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {filtered.map(brand => (
              <button
                key={brand.id}
                onClick={() => navigate(`/view/${brand.id}`)}
                className="group flex flex-col items-center bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-indigo-200 hover:shadow-lg transition-all active:scale-95"
              >
                {/* Image */}
                <div className="w-full h-20 sm:h-24 overflow-hidden relative bg-slate-100">
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* colour overlay */}
                  <div className={`absolute inset-0 ${brand.color} opacity-30 group-hover:opacity-10 transition-opacity`} />
                </div>
                {/* Label */}
                <div className="w-full px-2 py-2 text-center">
                  <span className="text-xs font-black text-slate-800">{brand.name}</span>
                </div>
              </button>
            ))}
          </div>

          {search && filtered.length === 0 && (
            <p className="text-center text-slate-400 text-sm py-8">No brands match "<span className="font-bold">{search}</span>"</p>
          )}
        </section>

        {/* ══ HOW IT WORKS ════════════════════════════════════════════ */}
        <section className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8">
          <h2 className="text-xl font-black text-slate-900 mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl mb-3 group-hover:bg-indigo-100">
                  {step.icon}
                </div>
                <span className="text-[10px] font-black text-indigo-400 tracking-widest mb-1">STEP {step.step}</span>
                <h3 className="font-black text-slate-900 text-sm mb-1">{step.title}</h3>
                <p className="text-slate-400 text-[11px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ PROMO BANNER ════════════════════════════════════════════ */}
        <section className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full" />
          <div className="relative z-10">
            <p className="text-white font-black text-lg">🎁 First Repair — Flat ₹200 Off</p>
            <p className="text-slate-400 text-sm mt-1">Use code <span className="text-indigo-400 font-black">FIXIT200</span> at checkout</p>
          </div>
          <button
            onClick={() => navigate('/register')}
            className="relative z-10 bg-white text-indigo-700 font-black text-sm px-6 py-3 rounded-2xl hover:bg-indigo-50 transition-colors flex-shrink-0"
          >
            Claim Offer →
          </button>
        </section>

      </main>

      {/* ══ BOTTOM NAV ═══════════════════════════════════════════════ */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-5xl mx-auto flex justify-around py-2">
          {[
            { label: 'Home',     icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', active: true,  path: '/' },
            { label: 'Bookings', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',             active: false, path: '/' },
            { label: 'Support',  icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', active: false, path: '/' },
            { label: 'Profile',  icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',                                                                               active: false, path: '/customer/profile' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors ${item.active ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={item.active ? '2.5' : '2'} d={item.icon} />
              </svg>
              <span className={`text-[10px] font-bold ${item.active ? 'text-indigo-600' : 'text-slate-400'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

    </div>
  );
}