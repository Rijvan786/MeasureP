// ============================================================
//  emailTemplates.js  —  Ghar Baithe Laptop Repairing Service
//  Modern, production-level HTML email templates
//  Inspired by: UrbanCompany, Cashify, ServiceOnWheel
// ============================================================

const BRAND = {
  name: "Ghar-Baithe-Laptop-Repair",
  tagline: "Doorstep Laptop Repair Service",
  primaryColor: "#2563EB",       // Bold blue — trust & tech
  accentColor: "#10B981",        // Green  — success / verified
  darkBg: "#0F172A",             // Deep navy
  cardBg: "#1E293B",
  lightGray: "#94A3B8",
  white: "#F8FAFC",
  website: "https://Ghar-Baithe-Laptop-Repair.in",
  supportEmail: "support@Ghar-Baithe-Laptop-Repair.in",
  socialFacebook: "https://facebook.com/Ghar-Baithe-Laptop-Repair",
  socialInstagram: "https://instagram.com/Ghar-Baithe-Laptop-Repair",
  logoText: "Ghar-Baithe-<span style='color:#10B981'>Laptop-Repair</span>",
};

/* ───────────────────────────────────────────────
   SHARED LAYOUT HELPERS
─────────────────────────────────────────────── */
const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #EFF6FF;
    font-family: 'Inter', Arial, sans-serif;
    color: #1E293B;
    -webkit-font-smoothing: antialiased;
  }
  .email-wrapper {
    max-width: 600px;
    margin: 32px auto;
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(37,99,235,0.10);
    border: 1px solid #DBEAFE;
  }

  /* ── HEADER ── */
  .header {
    background: linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #0EA5E9 100%);
    padding: 40px 40px 36px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .header::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    background: rgba(255,255,255,0.06);
    border-radius: 50%;
  }
  .header::after {
    content: '';
    position: absolute;
    bottom: -40px; left: -40px;
    width: 150px; height: 150px;
    background: rgba(16,185,129,0.12);
    border-radius: 50%;
  }
  .logo-wrap { position: relative; z-index: 1; }
  .logo-icon {
    display: inline-block;
    background: rgba(255,255,255,0.15);
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 16px;
    padding: 14px 20px;
    font-size: 28px;
    margin-bottom: 12px;
    backdrop-filter: blur(4px);
  }
  .logo-name {
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.5px;
    line-height: 1;
  }
  .logo-name span { color: #6EE7B7; }
  .logo-tagline {
    font-size: 12px;
    color: rgba(255,255,255,0.75);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 6px;
    font-weight: 500;
  }

  /* ── HERO BADGE ── */
  .hero-badge-wrap {
    background: linear-gradient(135deg, #DBEAFE, #EFF6FF);
    padding: 28px 40px 0;
    text-align: center;
  }
  .hero-badge {
    display: inline-block;
    padding: 6px 18px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  /* ── BODY ── */
  .body { padding: 32px 40px 28px; }
  .greeting-name {
    font-size: 24px;
    font-weight: 800;
    color: #0F172A;
    margin-bottom: 8px;
    line-height: 1.2;
  }
  .greeting-name span { color: #2563EB; }
  .intro-text {
    font-size: 15px;
    color: #475569;
    line-height: 1.7;
    margin-bottom: 28px;
  }

  /* ── DIVIDER ── */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #BFDBFE, transparent);
    margin: 24px 0;
  }

  /* ── CTA BUTTON ── */
  .cta-wrap { text-align: center; margin: 28px 0; }
  .cta-btn {
    display: inline-block;
    padding: 16px 44px;
    background: linear-gradient(135deg, #2563EB, #1D4ED8);
    color: #ffffff !important;
    text-decoration: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.3px;
    box-shadow: 0 8px 24px rgba(37,99,235,0.35);
    transition: all 0.2s;
  }
  .cta-btn-green {
    background: linear-gradient(135deg, #059669, #10B981) !important;
    box-shadow: 0 8px 24px rgba(16,185,129,0.35) !important;
  }

  /* ── INFO CARD ── */
  .info-card {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-left: 4px solid #2563EB;
    border-radius: 12px;
    padding: 20px 24px;
    margin: 20px 0;
  }
  .info-card-row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
    color: #334155;
  }
  .info-card-row:last-child { margin-bottom: 0; }
  .info-card-label {
    color: #94A3B8;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    width: 120px;
    flex-shrink: 0;
  }
  .info-card-value {
    color: #1E293B;
    font-weight: 600;
    font-size: 14px;
  }

  /* ── FEATURE GRID ── */
  .features-grid {
    display: table;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 20px 0;
  }
  .feature-item {
    display: table-cell;
    width: 33.33%;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 18px 14px;
    text-align: center;
    vertical-align: top;
  }
  .feature-icon { font-size: 26px; margin-bottom: 8px; }
  .feature-title { font-size: 12px; font-weight: 700; color: #1E293B; margin-bottom: 4px; }
  .feature-desc { font-size: 11px; color: #94A3B8; line-height: 1.4; }

  /* ── STEPS ── */
  .steps-wrap { margin: 20px 0; }
  .step-row {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  .step-num {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #2563EB, #1D4ED8);
    border-radius: 50%;
    color: white;
    font-size: 13px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 14px;
    margin-top: 2px;
  }
  .step-content { flex: 1; }
  .step-title { font-size: 14px; font-weight: 700; color: #1E293B; margin-bottom: 2px; }
  .step-desc { font-size: 13px; color: #64748B; line-height: 1.5; }

  /* ── NOTICE BOX ── */
  .notice-box {
    background: #FEF9C3;
    border: 1px solid #FDE047;
    border-radius: 10px;
    padding: 14px 18px;
    font-size: 13px;
    color: #713F12;
    line-height: 1.6;
    margin: 20px 0;
  }
  .notice-box strong { color: #92400E; }

  /* ── STATS ROW ── */
  .stats-row {
    background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
    border-radius: 14px;
    padding: 20px;
    margin: 20px 0;
    text-align: center;
  }
  .stat-item { display: inline-block; margin: 0 18px; }
  .stat-num { font-size: 22px; font-weight: 800; color: #2563EB; }
  .stat-label { font-size: 11px; color: #64748B; font-weight: 500; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.5px; }

  /* ── FOOTER ── */
  .footer {
    background: #0F172A;
    padding: 28px 40px;
    text-align: center;
  }
  .footer-logo { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px; }
  .footer-logo span { color: #34D399; }
  .footer-tagline { font-size: 12px; color: #64748B; margin-bottom: 16px; }
  .footer-links a {
    color: #94A3B8;
    text-decoration: none;
    font-size: 12px;
    margin: 0 10px;
  }
  .footer-links a:hover { color: #60A5FA; }
  .footer-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 16px 0; }
  .footer-copy { font-size: 11px; color: #475569; line-height: 1.6; }
  .footer-copy a { color: #60A5FA; text-decoration: none; }

  /* ── SOCIAL ── */
  .social-wrap { margin: 14px 0; }
  .social-btn {
    display: inline-block;
    width: 34px;
    height: 34px;
    line-height: 34px;
    border-radius: 8px;
    font-size: 16px;
    margin: 0 5px;
    background: rgba(255,255,255,0.08);
    text-decoration: none;
  }
`;

/* ───────────────────────────────────────────────
   WRAPPER FUNCTION
─────────────────────────────────────────────── */
function buildBase(content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="color-scheme" content="light"/>
  <title>${BRAND.name}</title>
  <style>${baseStyles}</style>
</head>
<body>
<div class="email-wrapper">
  ${content}
  <div class="footer">
    <div class="footer-logo">Ghar-Baithe-<span>Laptop-Repair</span></div>
    <div class="footer-tagline">🔧 Doorstep Laptop Repair — Fast · Reliable · Trusted</div>
    <div class="footer-divider"></div>
    <div class="footer-links">
      <a href="${BRAND.website}">Website</a>
      <a href="mailto:${BRAND.supportEmail}">Support</a>
      <a href="${BRAND.website}/privacy">Privacy</a>
      <a href="${BRAND.website}/terms">Terms</a>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-copy">
      © ${new Date().getFullYear()} Ghar-Baithe-Laptop-Repair. All rights reserved.<br/>
      123, Tech Lane, Cyber City, India · <a href="mailto:${BRAND.supportEmail}">${BRAND.supportEmail}</a><br/>
      <span style="color:#334155;font-size:10px;">You received this email because you registered on Ghar-Baithe-Laptop-Repair. 
      <a href="${BRAND.website}/unsubscribe">Unsubscribe</a></span>
    </div>
  </div>
</div>
</body>
</html>`;
}

/* ═══════════════════════════════════════════════════════════
   ① CLIENT WELCOME EMAIL
   Tone: Warm, friendly, consumer-facing (like UrbanCompany)
═══════════════════════════════════════════════════════════ */
export function clientWelcomeEmail({ FullName, email, verifyUrl }) {
  const firstName = FullName?.split(" ")[0] || "there";

  const content = `
  <!-- HEADER -->
  <div class="header">
    <div class="logo-wrap">
      <div class="logo-icon">💻</div>
      <div class="logo-name">Ghar-Baithe-<span>Laptop-Repair</span></div>
      <div class="logo-tagline">Doorstep Laptop Repair Service</div>
    </div>
  </div>

  <!-- HERO BADGE -->
  <div class="hero-badge-wrap">
    <div style="padding: 24px 0 20px;">
      <div class="hero-badge" style="background: #DCFCE7; color: #166534;">
        🎉 Account Created Successfully
      </div>
      <h1 class="greeting-name">Welcome, <span>${firstName}!</span></h1>
      <p class="intro-text">
        Your Ghar-Baithe-Laptop-Repair account is ready. Get professional laptop repair 
        delivered right to your doorstep — no travel, no hassle.
      </p>
    </div>
  </div>

  <!-- BODY -->
  <div class="body">

    <!-- VERIFY CTA -->
    <div class="cta-wrap">
      <a href="${verifyUrl}" class="cta-btn">
        ✅ &nbsp;Verify My Email Address
      </a>
      <p style="font-size:12px; color:#94A3B8; margin-top:12px;">
        Link expires in <strong>7 days</strong>. One click to activate your account.
      </p>
    </div>

    <div class="divider"></div>

    <!-- ACCOUNT INFO CARD -->
    <div class="info-card">
      <div style="font-size:12px; font-weight:700; color:#2563EB; text-transform:uppercase; letter-spacing:1px; margin-bottom:14px;">
        📋 Your Account Details
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="info-card-label">Name</td>
          <td class="info-card-value">${FullName}</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Email</td>
          <td class="info-card-value">${email}</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Account Type</td>
          <td class="info-card-value" style="color:#10B981;">🧑 Customer</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Status</td>
          <td class="info-card-value" style="color:#F59E0B;">⏳ Pending Verification</td>
        </tr>
      </table>
    </div>

    <div class="divider"></div>

    <!-- STATS -->
    <div class="stats-row">
      <div class="stat-item">
        <div class="stat-num">500+</div>
        <div class="stat-label">Happy Customers</div>
      </div>
      <div class="stat-item">
        <div class="stat-num">4.9★</div>
        <div class="stat-label">Avg Rating</div>
      </div>
      <div class="stat-item">
        <div class="stat-num">60min</div>
        <div class="stat-label">Avg Fix Time</div>
      </div>
    </div>

    <!-- HOW IT WORKS -->
    <div style="margin: 24px 0;">
      <div style="font-size:13px; font-weight:700; color:#0F172A; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:16px;">
        🚀 How Ghar-Baithe-Laptop-Repair Works
      </div>
      <div class="steps-wrap">
        <div class="step-row">
          <div class="step-num">1</div>
          <div class="step-content">
            <div class="step-title">Book Your Repair</div>
            <div class="step-desc">Choose your issue — screen, battery, keyboard, software or anything else. Book in under 2 minutes.</div>
          </div>
        </div>
        <div class="step-row">
          <div class="step-num">2</div>
          <div class="step-content">
            <div class="step-title">Technician Arrives at Your Door</div>
            <div class="step-desc">A verified, background-checked expert comes to your home or office at your chosen time slot.</div>
          </div>
        </div>
        <div class="step-row">
          <div class="step-num">3</div>
          <div class="step-content">
            <div class="step-title">Watch It Get Fixed</div>
            <div class="step-desc">Most repairs done in 60 minutes. Pay only after you're 100% satisfied. 30-day service warranty included.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- FEATURES ROW (table-based for email clients) -->
    <table width="100%" cellpadding="8" cellspacing="8" style="margin: 16px 0;">
      <tr>
        <td width="33%" style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:12px; padding:18px 12px; text-align:center; vertical-align:top;">
          <div style="font-size:26px; margin-bottom:8px;">🛡️</div>
          <div style="font-size:12px; font-weight:700; color:#166534; margin-bottom:4px;">Verified Experts</div>
          <div style="font-size:11px; color:#4ADE80;">Background-checked & certified technicians</div>
        </td>
        <td width="33%" style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:12px; padding:18px 12px; text-align:center; vertical-align:top;">
          <div style="font-size:26px; margin-bottom:8px;">💰</div>
          <div style="font-size:12px; font-weight:700; color:#1D4ED8; margin-bottom:4px;">Transparent Pricing</div>
          <div style="font-size:11px; color:#60A5FA;">No hidden charges. Pay after service.</div>
        </td>
        <td width="33%" style="background:#FFF7ED; border:1px solid #FED7AA; border-radius:12px; padding:18px 12px; text-align:center; vertical-align:top;">
          <div style="font-size:26px; margin-bottom:8px;">⚡</div>
          <div style="font-size:12px; font-weight:700; color:#C2410C; margin-bottom:4px;">Same-Day Service</div>
          <div style="font-size:11px; color:#FB923C;">Book now, get repaired today.</div>
        </td>
      </tr>
    </table>

    <div class="divider"></div>

    <!-- NOTICE -->
    <div class="notice-box">
      <strong>⚠️ Didn't create this account?</strong><br/>
      If you didn't sign up on Ghar-Baithe-Laptop-Repair, please ignore this email. Your email address will not be used. 
      Contact us at <strong>${BRAND.supportEmail}</strong> if you have concerns.
    </div>

    <!-- SECONDARY CTA -->
    <div class="cta-wrap" style="margin-top: 20px;">
      <a href="${BRAND.website}" class="cta-btn" style="background: linear-gradient(135deg, #0EA5E9, #0284C7); font-size:13px; padding:12px 32px;">
        🌐 &nbsp;Explore Ghar-Baithe-Laptop-Repair
      </a>
    </div>

  </div>`;

  return buildBase(content);
}

/* ═══════════════════════════════════════════════════════════
   ② TECHNICIAN WELCOME EMAIL
   Tone: Professional, empowering (like Cashify partner portal)
═══════════════════════════════════════════════════════════ */
export function technicianWelcomeEmail({ FullName, email, experienceYears, city, verifyUrl }) {
  const firstName = FullName?.split(" ")[0] || "Partner";

  const content = `
  <!-- HEADER — green accent for technicians -->
  <div class="header" style="background: linear-gradient(135deg, #064E3B 0%, #065F46 50%, #059669 100%);">
    <div class="logo-wrap">
      <div class="logo-icon">🔧</div>
      <div class="logo-name">Ghar-Baithe-<span>Laptop-Repair</span></div>
      <div class="logo-tagline">Professional Partner Network</div>
    </div>
  </div>

  <!-- HERO BADGE -->
  <div class="hero-badge-wrap" style="background: linear-gradient(135deg, #DCFCE7, #F0FDF4);">
    <div style="padding: 24px 0 20px;">
      <div class="hero-badge" style="background: #D1FAE5; color: #065F46;">
        🛠️ Technician Partner Application Received
      </div>
      <h1 class="greeting-name">Welcome Aboard, <span style="color:#059669;">${firstName}!</span></h1>
      <p class="intro-text">
        You've just joined India's fastest-growing doorstep laptop repair network. 
        Verify your email to complete your technician profile and start receiving jobs.
      </p>
    </div>
  </div>

  <!-- BODY -->
  <div class="body">

    <!-- VERIFY CTA — Green -->
    <div class="cta-wrap">
      <a href="${verifyUrl}" class="cta-btn cta-btn-green">
        ✅ &nbsp;Verify Email & Activate Profile
      </a>
      <p style="font-size:12px; color:#94A3B8; margin-top:12px;">
        Link expires in <strong>7 days</strong>. Verify to unlock your technician dashboard.
      </p>
    </div>

    <div class="divider"></div>

    <!-- PROFILE SUMMARY CARD -->
    <div class="info-card" style="border-left-color: #10B981;">
      <div style="font-size:12px; font-weight:700; color:#059669; text-transform:uppercase; letter-spacing:1px; margin-bottom:14px;">
        🧑‍💼 Your Partner Profile
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="info-card-label">Full Name</td>
          <td class="info-card-value">${FullName}</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Email</td>
          <td class="info-card-value">${email}</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Service City</td>
          <td class="info-card-value">📍 ${city || "To be updated"}</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Experience</td>
          <td class="info-card-value">⭐ ${experienceYears || 0} Year${(experienceYears || 0) !== 1 ? "s" : ""}</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Partner Type</td>
          <td class="info-card-value" style="color:#059669;">🔧 Technician Partner</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Verification</td>
          <td class="info-card-value" style="color:#F59E0B;">⏳ Under Review</td>
        </tr>
      </table>
    </div>

    <div class="divider"></div>

    <!-- EARNING POTENTIAL STATS -->
    <div class="stats-row" style="background: linear-gradient(135deg, #ECFDF5, #D1FAE5);">
      <div class="stat-item">
        <div class="stat-num" style="color:#059669;">₹40k+</div>
        <div class="stat-label">Monthly Earnings</div>
      </div>
      <div class="stat-item">
        <div class="stat-num" style="color:#059669;">8–12</div>
        <div class="stat-label">Jobs Per Day</div>
      </div>
      <div class="stat-item">
        <div class="stat-num" style="color:#059669;">0%</div>
        <div class="stat-label">Commission (First Month)</div>
      </div>
    </div>

    <!-- ONBOARDING STEPS -->
    <div style="margin: 24px 0;">
      <div style="font-size:13px; font-weight:700; color:#0F172A; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:16px;">
        📋 Your Onboarding Checklist
      </div>
      <div class="steps-wrap">
        <div class="step-row">
          <div class="step-num" style="background: linear-gradient(135deg,#059669,#10B981);">1</div>
          <div class="step-content">
            <div class="step-title">✅ Verify Your Email</div>
            <div class="step-desc">Click the button above to confirm your email and unlock your account dashboard.</div>
          </div>
        </div>
        <div class="step-row">
          <div class="step-num" style="background: linear-gradient(135deg,#059669,#10B981);">2</div>
          <div class="step-content">
            <div class="step-title">📄 Upload Documents</div>
            <div class="step-desc">Submit your ID proof, skill certificate, and a selfie via your partner dashboard for KYC verification.</div>
          </div>
        </div>
        <div class="step-row">
          <div class="step-num" style="background: linear-gradient(135deg,#059669,#10B981);">3</div>
          <div class="step-content">
            <div class="step-title">🎓 Complete Training Module</div>
            <div class="step-desc">Finish our 30-minute online training to learn our service standards and customer communication protocols.</div>
          </div>
        </div>
        <div class="step-row">
          <div class="step-num" style="background: linear-gradient(135deg,#059669,#10B981);">4</div>
          <div class="step-content">
            <div class="step-title">🚀 Start Receiving Jobs</div>
            <div class="step-desc">Once verified, you'll start getting real-time job alerts in your city. Accept & earn!</div>
          </div>
        </div>
      </div>
    </div>

    <!-- PARTNER BENEFITS -->
    <table width="100%" cellpadding="8" cellspacing="8" style="margin: 16px 0;">
      <tr>
        <td width="50%" style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:12px; padding:18px 14px; text-align:center; vertical-align:top;">
          <div style="font-size:24px; margin-bottom:8px;">💼</div>
          <div style="font-size:12px; font-weight:700; color:#166534; margin-bottom:4px;">Flexible Schedule</div>
          <div style="font-size:11px; color:#4ADE80; line-height:1.4;">Work on your own time. Accept jobs when you're available.</div>
        </td>
        <td width="50%" style="background:#FFF7ED; border:1px solid #FED7AA; border-radius:12px; padding:18px 14px; text-align:center; vertical-align:top;">
          <div style="font-size:24px; margin-bottom:8px;">💳</div>
          <div style="font-size:12px; font-weight:700; color:#C2410C; margin-bottom:4px;">Weekly Payouts</div>
          <div style="font-size:11px; color:#FB923C; line-height:1.4;">Get paid every week directly to your bank account.</div>
        </td>
      </tr>
      <tr>
        <td width="50%" style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:12px; padding:18px 14px; text-align:center; vertical-align:top;">
          <div style="font-size:24px; margin-bottom:8px;">🛡️</div>
          <div style="font-size:12px; font-weight:700; color:#1D4ED8; margin-bottom:4px;">Insurance Cover</div>
          <div style="font-size:11px; color:#60A5FA; line-height:1.4;">Accidental damage cover during every service job.</div>
        </td>
        <td width="50%" style="background:#FDF4FF; border:1px solid #E9D5FF; border-radius:12px; padding:18px 14px; text-align:center; vertical-align:top;">
          <div style="font-size:24px; margin-bottom:8px;">📈</div>
          <div style="font-size:12px; font-weight:700; color:#7C3AED; margin-bottom:4px;">Growth Ranking</div>
          <div style="font-size:11px; color:#A78BFA; line-height:1.4;">Top-rated partners get premium jobs & higher pay.</div>
        </td>
      </tr>
    </table>

    <div class="divider"></div>

    <!-- SUPPORT NOTICE -->
    <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:18px 22px; margin: 16px 0;">
      <div style="font-size:13px; font-weight:700; color:#0F172A; margin-bottom:8px;">
        📞 Partner Support
      </div>
      <div style="font-size:13px; color:#475569; line-height:1.7;">
        Our partner success team is available <strong>Mon–Sat, 9 AM to 8 PM</strong>.<br/>
        📧 Email: <a href="mailto:${BRAND.supportEmail}" style="color:#2563EB;">${BRAND.supportEmail}</a><br/>
        📱 WhatsApp: <strong>+91 98765 43210</strong>
      </div>
    </div>

    <!-- NOTICE -->
    <div class="notice-box">
      <strong>⚠️ Note:</strong> Your profile will remain in <em>pending review</em> status until our team 
      verifies your documents. This typically takes <strong>24–48 hours</strong> after document submission. 
      You'll receive a separate email once approved.
    </div>

    <!-- CTA DASHBOARD -->
    <div class="cta-wrap" style="margin-top: 20px;">
      <a href="${BRAND.website}/partner/dashboard" class="cta-btn cta-btn-green" style="font-size:13px; padding:12px 32px;">
        🖥️ &nbsp;Go to Partner Dashboard
      </a>
    </div>

  </div>`;

  return buildBase(content);
}


/* ═══════════════════════════════════════════════════════════
   ③ LOGIN SUCCESS EMAIL (Client & Technician)
   Tone: Product-level Security Alert & Welcome Back
═══════════════════════════════════════════════════════════ */
export function loginSuccessEmail({ FullName, email, role, loginTime }) {
  const isTechnician = role === "technician";
  const firstName = FullName?.split(" ")[0] || (isTechnician ? "Partner" : "Customer");
  const timeFormatted = loginTime || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const content = `
  <!-- HEADER -->
  <div class="header" style="${isTechnician ? "background: linear-gradient(135deg, #064E3B 0%, #065F46 50%, #059669 100%);" : ""}">
    <div class="logo-wrap">
      <div class="logo-icon">${isTechnician ? "🔧" : "💻"}</div>
      <div class="logo-name">Ghar-Baithe-<span>Laptop-Repair</span></div>
      <div class="logo-tagline">${isTechnician ? "Technician Partner Portal" : "Doorstep Laptop Repair Service"}</div>
    </div>
  </div>

  <!-- HERO BADGE -->
  <div class="hero-badge-wrap" style="${isTechnician ? "background: linear-gradient(135deg, #DCFCE7, #F0FDF4);" : ""}">
    <div style="padding: 24px 0 20px;">
      <div class="hero-badge" style="${isTechnician ? "background: #D1FAE5; color: #065F46;" : "background: #DBEAFE; color: #1E40AF;"}">
        🛡️ Successful Login Detected
      </div>
      <h1 class="greeting-name">Welcome Back, <span style="${isTechnician ? "color:#059669;" : "color:#2563EB;"}">${firstName}!</span></h1>
      <p class="intro-text">
        ${isTechnician 
          ? "You have successfully signed in to your Technician Partner Dashboard."
          : "You have successfully signed in to your Ghar-Baithe-Laptop-Repair account."}
      </p>
    </div>
  </div>

  <!-- BODY -->
  <div class="body">

    <!-- LOGIN ACTIVITY CARD -->
    <div class="info-card" style="${isTechnician ? "border-left-color: #10B981;" : "border-left-color: #2563EB;"}">
      <div style="font-size:12px; font-weight:700; color:${isTechnician ? "#059669" : "#2563EB"}; text-transform:uppercase; letter-spacing:1px; margin-bottom:14px;">
        🔒 Login Activity Details
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="info-card-label">Account Name</td>
          <td class="info-card-value">${FullName}</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Email Address</td>
          <td class="info-card-value">${email}</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Account Role</td>
          <td class="info-card-value" style="color:${isTechnician ? "#059669" : "#2563EB"};">${isTechnician ? "🔧 Technician Partner" : "🧑 Customer"}</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Login Time</td>
          <td class="info-card-value">📅 ${timeFormatted} (IST)</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Security Status</td>
          <td class="info-card-value" style="color:#10B981;">🟢 Verified Session</td>
        </tr>
      </table>
    </div>

    <div class="divider"></div>

    <!-- QUICK ACTIONS -->
    <div style="margin: 24px 0;">
      <div style="font-size:13px; font-weight:700; color:#0F172A; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:16px;">
        ⚡ Quick Actions
      </div>
      <table width="100%" cellpadding="8" cellspacing="8">
        <tr>
          ${isTechnician ? `
          <td width="50%" style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:12px; padding:16px 12px; text-align:center;">
            <div style="font-size:22px; margin-bottom:6px;">📋</div>
            <div style="font-size:12px; font-weight:700; color:#166534; margin-bottom:2px;">View Active Jobs</div>
            <div style="font-size:11px; color:#15803D;">Check new repair requests near you</div>
          </td>
          <td width="50%" style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:12px; padding:16px 12px; text-align:center;">
            <div style="font-size:22px; margin-bottom:6px;">💰</div>
            <div style="font-size:12px; font-weight:700; color:#1D4ED8; margin-bottom:2px;">Earnings Overview</div>
            <div style="font-size:11px; color:#1E40AF;">Track your weekly payouts</div>
          </td>
          ` : `
          <td width="50%" style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:12px; padding:16px 12px; text-align:center;">
            <div style="font-size:22px; margin-bottom:6px;">🔧</div>
            <div style="font-size:12px; font-weight:700; color:#1D4ED8; margin-bottom:2px;">Book Repair</div>
            <div style="font-size:11px; color:#1E40AF;">Schedule doorstep laptop service</div>
          </td>
          <td width="50%" style="background:#F0FDF4; border:1px solid #BBF7D0; border-radius:12px; padding:16px 12px; text-align:center;">
            <div style="font-size:22px; margin-bottom:6px;">📦</div>
            <div style="font-size:12px; font-weight:700; color:#166534; margin-bottom:2px;">Track Bookings</div>
            <div style="font-size:11px; color:#15803D;">Check technician status</div>
          </td>
          `}
        </tr>
      </table>
    </div>

    <!-- CTA DASHBOARD -->
    <div class="cta-wrap" style="margin-top: 24px;">
      <a href="${BRAND.website}${isTechnician ? "/partner/dashboard" : "/customer/profile"}" class="cta-btn ${isTechnician ? "cta-btn-green" : ""}">
        ${isTechnician ? "🖥️ Go to Partner Dashboard" : "🚀 Go to My Account"} →
      </a>
    </div>

    <div class="divider"></div>

    <!-- SECURITY NOTICE -->
    <div class="notice-box">
      <strong>🔒 Didn't sign in?</strong><br/>
      If you did not perform this login, your account password may be compromised. 
      Please change your password immediately or email us at <strong>${BRAND.supportEmail}</strong>.
    </div>

  </div>`;

  return buildBase(content);
}


/* ═══════════════════════════════════════════════════════════
   ④ RESET PASSWORD EMAIL (Client & Technician)
   Tone: Product-level High-Trust Security Authorization
═══════════════════════════════════════════════════════════ */
export function resetPasswordEmail({ FullName, email, role, resetUrl }) {
  const isTechnician = role === "technician";
  const firstName = FullName?.split(" ")[0] || (isTechnician ? "Partner" : "User");

  const content = `
  <!-- HEADER -->
  <div class="header" style="${isTechnician ? "background: linear-gradient(135deg, #064E3B 0%, #065F46 50%, #059669 100%);" : ""}">
    <div class="logo-wrap">
      <div class="logo-icon">🔑</div>
      <div class="logo-name">Ghar-Baithe-<span>Laptop-Repair</span></div>
      <div class="logo-tagline">${isTechnician ? "Technician Partner Network" : "Doorstep Laptop Repair Service"}</div>
    </div>
  </div>

  <!-- HERO BADGE -->
  <div class="hero-badge-wrap" style="${isTechnician ? "background: linear-gradient(135deg, #DCFCE7, #F0FDF4);" : "background: linear-gradient(135deg, #FEF3C7, #FFFBEB);"}">
    <div style="padding: 24px 0 20px;">
      <div class="hero-badge" style="${isTechnician ? "background: #D1FAE5; color: #065F46;" : "background: #FEF3C7; color: #92400E;"}">
        🔒 Password Reset Authorization
      </div>
      <h1 class="greeting-name">Hello, <span style="${isTechnician ? "color:#059669;" : "color:#D97706;"}">${firstName}</span></h1>
      <p class="intro-text">
        We received a request to reset the password for your 
        <strong>${isTechnician ? "Technician Partner Account" : "Ghar-Baithe-Laptop-Repair Account"}</strong>.
      </p>
    </div>
  </div>

  <!-- BODY -->
  <div class="body">

    <!-- VERIFY/RESET CTA -->
    <div class="cta-wrap" style="margin: 28px 0 16px;">
      <a href="${resetUrl}" class="cta-btn" style="${isTechnician ? "background: linear-gradient(135deg, #059669, #10B981);" : "background: linear-gradient(135deg, #D97706, #B45309); box-shadow: 0 8px 24px rgba(217,119,6,0.35);"}" target="_blank">
        🔑 &nbsp;Reset My Password
      </a>
    </div>

    <p style="font-size:12px; text-align:center; color:#94A3B8; margin-bottom: 24px;">
      ⏳ This reset link will automatically expire in <strong>1 hour</strong>.
    </p>

    <div class="divider"></div>

    <!-- ACCOUNT SUMMARY CARD -->
    <div class="info-card" style="${isTechnician ? "border-left-color: #10B981;" : "border-left-color: #F59E0B;"}">
      <div style="font-size:12px; font-weight:700; color:${isTechnician ? "#059669" : "#D97706"}; text-transform:uppercase; letter-spacing:1px; margin-bottom:14px;">
        📋 Request Summary
      </div>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="info-card-label">Account Name</td>
          <td class="info-card-value">${FullName}</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Email Address</td>
          <td class="info-card-value">${email}</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Account Role</td>
          <td class="info-card-value" style="color:${isTechnician ? "#059669" : "#2563EB"};">${isTechnician ? "🔧 Technician Partner" : "🧑 Customer"}</td>
        </tr>
        <tr><td colspan="2" style="padding:5px 0;"></td></tr>
        <tr>
          <td class="info-card-label">Link Status</td>
          <td class="info-card-value" style="color:#F59E0B;">⏳ Single-Use Active Link</td>
        </tr>
      </table>
    </div>

    <!-- LINK FALLBACK BOX -->
    <div style="background:#F8FAFC; border:1px dashed #CBD5E1; border-radius:12px; padding:16px 20px; margin: 20px 0; word-break:break-all;">
      <div style="font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:6px;">
        🔗 Button not working? Copy & Paste this link into your browser:
      </div>
      <a href="${resetUrl}" style="font-size:12px; color:#2563EB; text-decoration:underline;">${resetUrl}</a>
    </div>

    <div class="divider"></div>

    <!-- SECURITY NOTICE -->
    <div class="notice-box">
      <strong>⚠️ Didn't request a password reset?</strong><br/>
      If you did not ask to reset your password, you can safely ignore this email. 
      Your password will remain unchanged, and your account stays completely secure.
      If you suspect unauthorized access, contact <strong>${BRAND.supportEmail}</strong>.
    </div>

  </div>`;

  return buildBase(content);
}
