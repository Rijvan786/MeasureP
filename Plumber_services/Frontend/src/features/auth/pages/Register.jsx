import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/* ─── Role Options ──────────────────────────────────────────────────── */
const ROLES = [
  {
    id: 'customer',
    label: 'Customer',
    icon: '🧑',
    desc: 'Book doorstep laptop repairs',
    accent: 'border-indigo-500 bg-indigo-50',
    badge: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'technician',
    label: 'Technician',
    icon: '🔧',
    desc: 'Join as a repair partner & earn',
    accent: 'border-emerald-500 bg-emerald-50',
    badge: 'bg-emerald-100 text-emerald-700',
  },
];

/* ─── Cities ────────────────────────────────────────────────────────── */
const CITIES = [
  'Bhopal', 'Indore', 'Delhi', 'Mumbai', 'Bangalore',
  'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur',
  'Surat', 'Ahmedabad', 'Lucknow', 'Nagpur', 'Noida',
];

/* ─── Input Field Component ─────────────────────────────────────────── */
function Field({ label, type = 'text', name, value, onChange, placeholder, icon, required, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base select-none">
            {icon}
          </span>
        )}
        {children || (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            style={{ paddingLeft: icon ? '2.5rem' : '1rem' }}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Password Field with Toggle ────────────────────────────────────── */
function PasswordField({ label, name, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base select-none">🔒</span>
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-11 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors text-sm font-bold"
          tabIndex={-1}
        >
          {show ? '🙈' : '👁️'}
        </button>
      </div>
    </div>
  );
}

/* ─── Main Register Page ────────────────────────────────────────────── */
export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    FullName: '',
    email: '',
    contact: '',
    city: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    experienceYears: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isTechnician = form.role === 'technician';

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        FullName: form.FullName,
        email: form.email,
        contact: form.contact,
        city: form.city,
        password: form.password,
        role: form.role,
        ...(isTechnician && { experienceYears: Number(form.experienceYears) }),
      };

      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed. Please try again.');
      } else {
        setSuccess('🎉 Account created! Please check your email to verify your account.');
        setTimeout(() => navigate('/login'), 2500);
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  /* ─── Google OAuth ──────────────────────────────────────────────── */
  function handleGoogle() {
    window.location.href = 'http://localhost:3000/api/auth/google';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-violet-50 flex flex-col">

      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="bg-white/80 backdrop-blur border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-base">💻</div>
            <span className="text-base font-black text-indigo-600">FixIt<span className="text-slate-900">Now</span></span>
          </button>
          <div className="text-sm text-slate-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-bold hover:underline">Log In</Link>
          </div>
        </div>
      </header>

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <main className="flex-1 flex items-start justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-lg">

          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
              Create Your Account
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Join{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Ghar-Baithe-Laptop-Repair
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {isTechnician
                ? 'Start earning ₹40k+ monthly as a verified repair partner'
                : 'Get your laptop repaired at home — fast, affordable, warrantied'}
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 p-6 sm:p-8 space-y-5">

            {/* ── Role Selector ──────────────────────────────────────── */}
            <div>
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">I am a</p>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map(role => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, role: role.id }))}
                    className={`flex flex-col items-center gap-1 p-4 rounded-2xl border-2 transition-all ${
                      form.role === role.id
                        ? role.accent + ' shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-2xl">{role.icon}</span>
                    <span className={`text-xs font-black ${form.role === role.id ? '' : 'text-slate-700'}`}>
                      {role.label}
                    </span>
                    <span className="text-[10px] text-slate-500 text-center leading-tight">{role.desc}</span>
                    {form.role === role.id && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${role.badge}`}>
                        ✓ Selected
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Google OAuth ───────────────────────────────────────── */}
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-slate-800 font-bold text-sm py-3 rounded-2xl transition-all active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Continue with Google
            </button>

            {/* ── Divider ────────────────────────────────────────────── */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-semibold">or fill in your details</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* ── Form ───────────────────────────────────────────────── */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name */}
              <Field
                label="Full Name"
                name="FullName"
                value={form.FullName}
                onChange={handleChange}
                placeholder="Rajesh Kumar"
                icon="👤"
                required
              />

              {/* Email */}
              <Field
                label="Email Address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="rajesh@email.com"
                icon="✉️"
                required
              />

              {/* Phone + City */}
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Phone Number"
                  type="tel"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  icon="📱"
                  required
                />

                <Field label="City" name="city" value={form.city} onChange={handleChange}>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base select-none">📍</span>
                    <select
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="">City</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </Field>
              </div>

              {/* Experience Years — Technician only */}
              {isTechnician && (
                <Field
                  label="Years of Experience"
                  type="number"
                  name="experienceYears"
                  value={form.experienceYears}
                  onChange={handleChange}
                  placeholder="e.g. 3"
                  icon="⭐"
                  required
                />
              )}

              {/* Password */}
              <PasswordField
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
              />

              {/* Confirm Password */}
              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
              />

              {/* Error / Success */}
              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 font-medium">
                  <span className="mt-0.5 flex-shrink-0">⚠️</span>
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 font-medium">
                  <span className="mt-0.5 flex-shrink-0">✅</span>
                  <span>{success}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-2xl text-white font-black text-sm tracking-wide transition-all active:scale-[0.98] shadow-lg ${
                  isTechnician
                    ? 'bg-gradient-to-r from-emerald-600 to-green-500 shadow-emerald-200 hover:from-emerald-700 hover:to-green-600'
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-200 hover:from-indigo-700 hover:to-violet-700'
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Creating account…
                  </span>
                ) : (
                  isTechnician ? '🔧 Register as Partner' : '🚀 Create My Account'
                )}
              </button>

              {/* Terms */}
              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                By registering you agree to our{' '}
                <a href="#" className="text-indigo-500 hover:underline font-semibold">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="text-indigo-500 hover:underline font-semibold">Privacy Policy</a>.
              </p>
            </form>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex justify-center gap-6 text-[11px] text-slate-400 font-semibold">
            <span>🛡️ Secure & Encrypted</span>
            <span>🔒 Privacy Protected</span>
            <span>⚡ Instant Setup</span>
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-black hover:underline">Log In →</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
