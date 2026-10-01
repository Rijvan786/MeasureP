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

/* ── Reusable input with icon ────────────────────────── */
const Field = ({ label, type = 'text', placeholder, iconPath, trailing }) => (

  <div>
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">{label}</label>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
        </svg>
      </span>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="w-full pl-10 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all"
      />
      {trailing && <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">{trailing}</span>}
    </div>
  </div>
);

/* ── Perks shown on the right panel ─────────────────── */
const PERKS = [
  { icon: '🚀', title: 'Same-day Service', desc: 'Technicians arrive within 60 mins' },
  { icon: '🛡️', title: '90-Day Warranty',  desc: 'On every repair, no questions asked' },
  { icon: '💸', title: 'Pay on Completion', desc: 'No advance — pay only when done' },
  { icon: '✅', title: 'Verified Experts',  desc: 'Background-checked professionals' },
];

export default function Register() {
  const [role, setRole] = useState('customer')
  console.log(role);;
  const [showPw, setShowPw] = useState(false);
  const [step, setStep] = useState(1); // step 1 = basic info, step 2 = extra
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    navigate(role === 'technician' ? '/Technician-Dashboard' : '/');
  };

  /* The right panel swaps content based on role */
  const panel = role === 'customer'
    ? { img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80', from: 'from-indigo-900', via: 'via-indigo-800', headline: 'Repair, in under 60 mins.', sub: 'Book a certified tech for any laptop brand — at your doorstep.' }
    : { img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1200&q=80', from: 'from-slate-900', via: 'via-slate-800', headline: 'Earn on your terms.', sub: 'Accept jobs near you, build your ratings, get paid instantly.' };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* ── FORM PANEL ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-7 lg:hidden">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-black text-xl text-slate-900">FixIt<span className="text-indigo-600">Now</span></span>
          </div>

          {/* Progress bar */}
          <div className="flex gap-2 mb-6">
            {[1, 2].map(s => (
              <div key={s} className={`flex-1 h-1.5 rounded-full transition-all ${s <= step ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
            {step === 1 ? 'Create Account ✨' : 'Almost done! 🎉'}
          </h1>
          <p className="text-slate-400 text-sm mb-6">
            {step === 1 ? 'Join FixItNow — it only takes 2 minutes.' : 'Just a few more details to set up your account.'}
          </p>

          {/* Role toggle */}
          <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
            {[['customer', '👤 Customer'], ['technician', '🔧 Technician']].map(([r, label]) => (
              
              <button
                key={r}
                onClick={() => { setRole(r); setStep(1); console.log(label); }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${role === r ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleNext} className="space-y-4">
            {step === 1 && (
              <>
                <Field
                  label="Full Name"
                  placeholder="Arjun Sharma"
                  iconPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
                <Field
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  iconPath="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
                <Field
                  label="Email Address"
                  type="email"
                  placeholder="arjun@example.com"
                  iconPath="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </>
            )}

            {step === 2 && (
              <>
                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Password</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showPw ? 'text' : 'password'}
                      required
                      placeholder="Min. 8 characters"
                      className="w-full pl-10 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    />
                    <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <EyeIcon open={showPw} />
                    </button>
                  </div>
                </div>
 {console.log()}
                {/* City */}
                <Field
                  label="City / Area"
                  placeholder="e.g. Arera Colony, Bhopal"
                  iconPath="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />

                {/* Technician extra */}
                {role === 'technician' && (
                  <>
                    <Field
                      label="Years of Experience"
                      type="number"
                      placeholder="e.g. 4"
                      iconPath="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                      <span className="text-amber-500 text-lg flex-shrink-0">⚠️</span>
                      <p className="text-xs text-amber-800 leading-relaxed font-medium">
                        You'll need to submit an Aadhar ID for background verification after registration. This keeps our platform safe for everyone.
                      </p>
                    </div>
                  </>
                )}

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input type="checkbox" required id="terms" className="mt-0.5 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
                  <label htmlFor="terms" className="text-xs text-slate-500 leading-relaxed">
                    I agree to the <span className="text-indigo-600 font-bold cursor-pointer">Terms of Service</span> and <span className="text-indigo-600 font-bold cursor-pointer">Privacy Policy</span>
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 mt-2"
            >
              {step === 1 ? (
                <> Continue <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg> </>
              ) : (
                <> Create Account 🎉 </>
              )}
            </button>

            {step === 2 && (
              <button type="button" onClick={() => setStep(1)} className="w-full text-slate-500 font-semibold text-sm py-2 hover:text-slate-700 transition-colors">
                ← Back
              </button>
            )}

            {/* Divider */}
            {step === 1 && (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs text-slate-400 font-medium">or sign up with</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-2xl bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                    <img className="h-4 w-4" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                    Google
                  </button>
                  <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-2xl bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                    <span className="text-base">📱</span>
                    OTP
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-black text-indigo-600 hover:text-indigo-500">Sign in →</Link>
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL (desktop) ─────────────────────────── */}
      <div className="hidden lg:flex w-5/12 xl:w-1/2 relative overflow-hidden flex-col">
        <img
          src={panel.img}
          alt="Role"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${panel.from} ${panel.via} to-violet-900/70`} />

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

          <div className="mb-auto mt-16">
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4">{panel.headline}</h2>
            <p className="text-indigo-200 text-base leading-relaxed max-w-sm">{panel.sub}</p>
          </div>

          {/* Perks list */}
          <div className="space-y-3 mt-8">
            {PERKS.map(p => (
              <div key={p.title} className="flex items-center gap-3 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-3">
                <span className="text-xl w-8 text-center flex-shrink-0">{p.icon}</span>
                <div>
                  <p className="text-white font-bold text-sm">{p.title}</p>
                  <p className="text-white/60 text-xs">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}