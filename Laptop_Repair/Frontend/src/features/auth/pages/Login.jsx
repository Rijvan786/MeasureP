import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EyeIcon = ({ open }) => open ? (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
) : (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const InputField = ({ label, type = 'text', placeholder, icon, rightSlot }) => (
  <div>
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">{label}</label>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all"
      />
      {rightSlot && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">{rightSlot}</span>
      )}
    </div>
  </div>
);

export default function Login() {
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate(role === 'technician' ? '/Technician-Dashboard' : '/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* ── LEFT PANEL (desktop) ──────────────────────────────── */}
      <div className="hidden lg:flex w-5/12 xl:w-1/2 relative overflow-hidden flex-col">
        {/* BG image */}
        <img
          src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1200&q=80"
          alt="Repair"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-indigo-800/80 to-violet-900/70" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-10 xl:p-14">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-auto">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-white font-black text-xl tracking-tight">FixIt<span className="text-indigo-300">Now</span></span>
          </div>

          {/* Headline */}
          <div className="mb-auto">
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4">
              Expert repair,<br />
              <span className="text-indigo-300">at your door.</span>
            </h2>
            <p className="text-indigo-200 text-base leading-relaxed max-w-sm">
              Join thousands of customers who get same-day laptop repairs from verified technicians.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mt-8">
              {[['50K+', 'Happy Customers'], ['1K+', 'Technicians'], ['4.9★', 'Avg Rating']].map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-black text-white">{v}</p>
                  <p className="text-indigo-300 text-xs font-semibold">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Review pill */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mt-8">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80" alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            <div>
              <div className="flex">{'★★★★★'.split('').map((s, i) => <span key={i} className="text-amber-400 text-sm">{s}</span>)}</div>
              <p className="text-white/90 text-xs mt-0.5">"Fixed my MacBook screen in 45 mins. Incredible!" — Priya S.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Login Form ──────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-black text-xl text-slate-900">FixIt<span className="text-indigo-600">Now</span></span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">Welcome back 👋</h1>
          <p className="text-slate-400 text-sm mb-7">Sign in to continue to your account</p>

          {/* Role toggle */}
          <div className="flex p-1 bg-slate-100 rounded-2xl mb-7">
            {[['customer', '👤 Customer'], ['technician', '🔧 Technician']].map(([r, label]) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${role === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <InputField
              label="Email or Phone"
              type="text"
              placeholder="Enter your email or phone"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-500">Forgot?</a>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all"
                />
                <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input id="rem" type="checkbox" className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
              <label htmlFor="rem" className="text-sm text-slate-600">Remember me</label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
              Sign In
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium">or continue with</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-2xl bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                <img className="h-4 w-4" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-2xl bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                <span className="text-base">📱</span>
                OTP Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-black text-indigo-600 hover:text-indigo-500">
              Create one →
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}