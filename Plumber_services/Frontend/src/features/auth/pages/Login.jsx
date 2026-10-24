import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/* ─── Password Field ────────────────────────────────────────────────── */
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

/* ─── Field Component ───────────────────────────────────────────────── */
function Field({ label, type = 'text', name, value, onChange, placeholder, icon, required }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base select-none">{icon}</span>
        )}
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
      </div>
    </div>
  );
}

/* ─── Trust Metrics ─────────────────────────────────────────────────── */
const TRUST = [
  { icon: '✅', label: '10,000+ Repairs Done' },
  { icon: '⭐', label: '4.9 Star Rating' },
  { icon: '🛡️', label: '90-Day Warranty' },
];

/* ─── Main Login Page ───────────────────────────────────────────────── */
export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: '', // email or phone
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  }

  /* ─── Detect if identifier is email or phone ─────────────────────── */
  function buildPayload() {
    const id = form.identifier.trim();
    const isEmail = id.includes('@');
    return {
      password: form.password,
      ...(isEmail ? { email: id } : { contact: id }),
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(buildPayload()),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed. Please check your credentials.');
      } else {
        // Role-based redirect
        const role = data.user?.role;
        if (role === 'technician') {
          navigate('/Technician-Dashboard');
        } else {
          navigate('/');
        }
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  /* ─── Forgot Password ─────────────────────────────────────────────── */
  function handleForgotPassword() {
    navigate('/forgot-passwordpage');
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
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-base">💻</div>
            <span className="text-base font-black text-indigo-600">FixIt<span className="text-slate-900">Now</span></span>
          </button>
          <div className="text-sm text-slate-500 font-medium">
            New here?{' '}
            <Link to="/register" className="text-indigo-600 font-bold hover:underline">Create Account</Link>
          </div>
        </div>
      </header>

      {/* ── Main ─────────────────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
              Welcome Back
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Log in to{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                FixItNow
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Your doorstep laptop repair service
            </p>
          </div>

          {/* Trust Strip */}
          <div className="flex justify-center gap-5 mb-6">
            {TRUST.map(t => (
              <div key={t.label} className="flex flex-col items-center gap-0.5">
                <span className="text-lg">{t.icon}</span>
                <span className="text-[10px] font-bold text-slate-500 text-center">{t.label}</span>
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 p-6 sm:p-8 space-y-5">

            {/* Google Login */}
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

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-semibold">or sign in with email / phone</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email or Phone */}
              <Field
                label="Email Address or Phone Number"
                type="text"
                name="identifier"
                value={form.identifier}
                onChange={handleChange}
                placeholder="rajesh@email.com or +91 98765 43210"
                icon="✉️"
                required
              />

              {/* Password */}
              <div>
                <PasswordField
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <div className="flex justify-end mt-1.5">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-indigo-500 font-bold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 font-medium">
                  <span className="mt-0.5 flex-shrink-0">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-black text-sm tracking-wide shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Signing in…
                  </span>
                ) : '🚀 Log In to My Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="border-t border-slate-100 pt-4 space-y-3">

              {/* Resend Verification */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-lg mt-0.5">📧</span>
                <div>
                  <p className="text-xs font-bold text-slate-700">Didn't receive your verification email?</p>
                  <button
                    type="button"
                    onClick={() => navigate('/resend-verification')}
                    className="text-xs text-indigo-500 font-bold hover:underline mt-0.5"
                  >
                    Resend verification email →
                  </button>
                </div>
              </div>

              {/* Technician portal hint */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-lg mt-0.5">🔧</span>
                <div>
                  <p className="text-xs font-bold text-emerald-800">Are you a Technician Partner?</p>
                  <p className="text-[11px] text-emerald-600 mt-0.5">
                    Log in with your partner credentials — you'll be redirected to your dashboard automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 font-black hover:underline">Register for Free →</Link>
          </p>

          {/* Trust footer */}
          <div className="mt-5 flex justify-center gap-5 text-[11px] text-slate-400 font-semibold">
            <span>🔒 Secure Login</span>
            <span>🛡️ Encrypted Data</span>
            <span>🌐 OAuth Protected</span>
          </div>
        </div>
      </main>
    </div>
  );
}
