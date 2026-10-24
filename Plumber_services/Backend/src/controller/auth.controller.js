import { response, Router } from "express";
import { validatedAndFormate } from "../validator/contact.validator.js";
import UserModel from "../models/auth.model.js";
import { Config } from "../config/config.js";
import jwt from "jsonwebtoken";
import { Sendmail } from "../service/email.service.js";
import {
  clientWelcomeEmail,
  technicianWelcomeEmail,
  loginSuccessEmail,
  resetPasswordEmail,
} from "../utils/emailTemplates.js";
import bcrypt from "bcryptjs";
import BlackListModel from "../models/Blacklist.model.js";

// ──────────────────────────────────────────────
//  HELPER : Sign JWT & send cookie + JSON
// ──────────────────────────────────────────────
async function SendTokenResponse(user, res, message) {
  const token = jwt.sign(
    {
      id: user._id,
      FullName: user.FullName,
      email: user.email,
      role: user.role,
    },
    Config.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: Config.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    message,
    success: true,
    user: {
      FullName: user.FullName,
      email: user.email,
      contact: user.contact,
      city: user.city,
      role: user.role,
      isVerifiedTech: user.isVerifiedTech,
      experienceYears: user.experienceYears,
    },
  });
}

// ──────────────────────────────────────────────
//  REGISTER CONTROLLER
//  Sends role-specific welcome email on sign-up
// ──────────────────────────────────────────────
export async function RegisterController(req, res) {
  try {
    const {
      FullName,
      email,
      contact,
      city,
      isVerifiedTech,
      experienceYears,
      role,
      password,
    } = req.body;

    console.log("📥 Register attempt:", { FullName, email, role });

    // ── Validate phone number ──
    const ValidContact = await validatedAndFormate(contact);
    if (!ValidContact) {
      return res.status(400).json({ message: "Invalid Contact Number" });
    }

    // ── Create user in DB ──
    const user = await UserModel.create({
      FullName,
      email,
      contact: ValidContact,
      city,
      isVerifiedTech,
      experienceYears,
      role,
      password,
    });

    // ── Generate email-verification token (7d) ──
    const verifyToken = jwt.sign({ email: user.email }, Config.JWT_SECRET, {
      expiresIn: "7d",
    });

    const verifyUrl = `${
      Config.BASE_URL || "http://localhost:3000"
    }/api/auth/verify-email?token=${verifyToken}`;

    // ── Choose email template based on role ──
    let emailHtml;
    let emailSubject;

    if (role === "technician") {
      // ── Technician welcome ──
      emailSubject =
        "🔧 Welcome to Ghar-Baithe-Laptop-Repair Partner Network — Verify Your Email";
      emailHtml = technicianWelcomeEmail({
        FullName,
        email,
        experienceYears,
        city,
        verifyUrl,
      });
    } else {
      // ── Client / Customer welcome ──
      emailSubject =
        "🎉 Welcome to Ghar-Baithe-Laptop-Repair — Verify Your Email";
      emailHtml = clientWelcomeEmail({
        FullName,
        email,
        verifyUrl,
      });
    }

    // ── Send welcome email ──
    await Sendmail({
      to: email,
      subject: emailSubject,
      text: `Hi ${FullName},\n\nWelcome to Ghar-Baithe-Laptop-Repair!\n\nPlease verify your email by clicking the link below:\n\n${verifyUrl}\n\nThis link expires in 7 days.\n\n— Ghar-Baithe-Laptop-Repair Team`,
      html: emailHtml,
    });

    console.log(`✅ Welcome email sent to: ${email} (role: ${role})`);

    // ── Respond with token cookie ──
    await SendTokenResponse(
      user,
      res,
      "Account created successfully! Please check your email to verify your account.",
    );
  } catch (err) {
    console.error("❌ RegisterController Error:", err);

    // Handle duplicate email
    if (err.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists.",
        success: false,
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
}

// ──────────────────────────────────────────────────────────
//  RESEND VERIFICATION EMAIL CONTROLLER
//  POST /api/auth/resend-verification
//  Body: { email }
//  Supports 1M+ scale: rate-limiting & role-aware notifications
// ──────────────────────────────────────────────────────────
export async function ResendMailController(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email address is required.",
      });
    }

    const user = await UserModel.findOne({ email });

    // Protect privacy: uniform response even if user doesn't exist
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If this email is registered and unverified, a verification link has been sent.",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "Your account is already verified! Please proceed to login.",
      });
    }

    // Rate-limiting check: 60 seconds cooldown to protect SMTP quota
    const lastSent = user.updatedAt ? new Date(user.updatedAt).getTime() : 0;
    const now = Date.now();
    const COOLDOWN_MS = 60 * 1000;

    if (now - lastSent < COOLDOWN_MS) {
      const waitSeconds = Math.ceil((COOLDOWN_MS - (now - lastSent)) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${waitSeconds}s before requesting a new verification email.`,
        retryAfter: waitSeconds,
      });
    }

    // Generate secure 7-day token
    const verifyToken = jwt.sign({ email: user.email }, Config.JWT_SECRET, {
      expiresIn: "7d",
    });

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${verifyToken}`;

    let emailHtml;
    let emailSubject;

    if (user.role === "technician") {
      emailSubject =
        "🔧 Ghar-Baithe-Laptop-Repair — Verify Technician Partner Account";
      emailHtml = technicianWelcomeEmail({
        FullName: user.FullName,
        email: user.email,
        experienceYears: user.experienceYears || 0,
        city: user.city || "India",
        verifyUrl,
      });
    } else {
      emailSubject = "🎉 Ghar-Baithe-Laptop-Repair — Verify Your Account";
      emailHtml = clientWelcomeEmail({
        FullName: user.FullName,
        email: user.email,
        verifyUrl,
      });
    }

    await Sendmail({
      to: user.email,
      subject: emailSubject,
      text: `Hello ${user.FullName},\n\nClick the link below to verify your Ghar-Baithe-Laptop-Repair account:\n${verifyUrl}\n\nValid for 7 days.\n\n— Ghar-Baithe-Laptop-Repair Team`,
      html: emailHtml,
    });

    // Update timestamp for rate limit tracking
    user.updatedAt = new Date();
    await user.save({ timestamps: false });

    console.log(
      `✅ Resent verification email to: ${user.email} (${user.role})`,
    );
    await SendTokenResponse(
      user,
      res,
      "Verification email has been resent successfully. Please check your inbox or spam folder.",
    );
  } catch (err) {
    console.error("❌ ResendMailController Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to resend verification email. Please try again later.",
      error: err.message,
    });
  }
}

// ──────────────────────────────────────────────────────────
//  EMAIL VERIFICATION CONTROLLER (Renders Modern Web Page)
//  GET /api/auth/verify-email?token=xxx
// ──────────────────────────────────────────────────────────
export async function EmailVerification(req, res) {
  const { token } = req.query;

  if (!token) {
    return res
      .status(400)
      .send(verificationPage("error", "No verification token provided."));
  }

  try {
    const decoded = jwt.verify(token, Config.JWT_SECRET);
    const user = await UserModel.findOne({ email: decoded.email });

    if (!user) {
      return res
        .status(404)
        .send(
          verificationPage("error", "Account not found or link has expired."),
        );
    }

    if (user.verified) {
      return res
        .status(200)
        .send(verificationPage("already", user.FullName, user.role));
    }

    user.verified = true;
    await user.save();

    console.log(`🎉 Account verified: ${user.email} (${user.role})`);
    return res
      .status(200)
      .send(verificationPage("success", user.FullName, user.role));
  } catch (error) {
    console.error("❌ EmailVerification Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(410).send(verificationPage("expired", ""));
    }
    return res
      .status(400)
      .send(
        verificationPage("error", "Invalid or expired verification token."),
      );
  }
}

// ──────────────────────────────────────────────────────────────────────────
//  MODERN PRODUCT-LEVEL VERIFICATION PAGE
//  Inspired by: Urban Company, Cashify, ServiceOnWheel
//  Scale: Optimized for 1M+ user trust, conversion & frictionless UX
// ──────────────────────────────────────────────────────────────────────────
function verificationPage(type, name = "User", role = "customer") {
  const isTechnician = role === "technician";
  const firstName = name
    ? name.split(" ")[0]
    : isTechnician
      ? "Partner"
      : "Valued Customer";
  const year = new Date().getFullYear();

  const configs = {
    success: {
      badge: isTechnician
        ? "Technician Account Activated"
        : "Email Successfully Verified",
      title: isTechnician
        ? `Welcome Aboard, ${firstName}! 🛠️`
        : `Welcome to Ghar-Baithe-Laptop-Repair! 🎉`,
      subtitle: isTechnician
        ? "Your partner onboarding is unlocked. Start completing your service checklist to receive doorstep laptop repair leads in your city."
        : "Your account is 100% verified. You can now book certified doorstep repair experts with 30-day warranty & transparent pricing.",
      primaryAction: isTechnician
        ? "Open Partner Dashboard"
        : "Book Doorstep Repair",
      primaryUrl: isTechnician ? "/technician/dashboard" : "/",
      accentColor: isTechnician ? "#059669" : "#2563EB",
      themeGradient: isTechnician
        ? "linear-gradient(135deg, #064E3B 0%, #059669 50%, #10B981 100%)"
        : "linear-gradient(135deg, #1E3A8A 0%, #2563EB 55%, #0284C7 100%)",
      statusIcon: isTechnician ? "✅" : "✨",
      confetti: true,
    },
    already: {
      badge: "Account Already Active",
      title: `You're Already Verified, ${firstName}! 👍`,
      subtitle:
        "Your profile is active and ready to use. Proceed straight to your portal or explore our instant doorstep repair services.",
      primaryAction: isTechnician
        ? "Go to Partner Dashboard"
        : "Go to Homepage",
      primaryUrl: isTechnician ? "/technician/dashboard" : "/",
      accentColor: "#2563EB",
      themeGradient: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
      statusIcon: "⚡",
      confetti: false,
    },
    expired: {
      badge: "Token Expired",
      title: "Verification Link Expired ⏳",
      subtitle:
        "Security links expire after 7 days to protect your account. Request a brand new verification link in one click below.",
      primaryAction: "Request New Verification Link",
      primaryUrl: "/resend-verification",
      accentColor: "#D97706",
      themeGradient: "linear-gradient(135deg, #78350F 0%, #D97706 100%)",
      statusIcon: "⚠️",
      confetti: false,
    },
    error: {
      badge: "Verification Issue",
      title: "Unable to Verify Account ❌",
      subtitle:
        name ||
        "This verification link is invalid or has already been used. Please reach out to customer care for instant assistance.",
      primaryAction: "Contact 24/7 Support",
      primaryUrl: "mailto:support@gharbaithe.in",
      accentColor: "#DC2626",
      themeGradient: "linear-gradient(135deg, #7F1D1D 0%, #DC2626 100%)",
      statusIcon: "🚫",
      confetti: false,
    },
  };

  const state = configs[type] || configs.error;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${state.title} | Ghar-Baithe-Laptop-Repair</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${state.accentColor};
      --bg: #090D16;
      --card-bg: rgba(17, 24, 39, 0.85);
      --card-border: rgba(255, 255, 255, 0.08);
      --text-main: #F9FAFB;
      --text-muted: #9CA3AF;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      background-image:
        radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.15) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.12) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(15, 23, 42, 0.6) 0px, transparent 100%);
      font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      line-height: 1.5;
      overflow-x: hidden;
    }

    /* Top Brand Navigation */
    .brand-nav {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 18px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--card-border);
      backdrop-filter: blur(12px);
      background: rgba(9, 13, 22, 0.75);
      z-index: 10;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.3px;
      color: #FFFFFF;
      text-decoration: none;
    }
    .brand-logo-icon {
      width: 34px;
      height: 34px;
      background: linear-gradient(135deg, #2563EB, #10B981);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    .brand-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      color: #10B981;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.25);
      padding: 5px 12px;
      border-radius: 100px;
    }

    /* Main Container */
    .container {
      width: 100%;
      max-width: 580px;
      margin-top: 60px;
      position: relative;
      z-index: 5;
    }

    /* Card Wrapper */
    .main-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 28px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7);
      overflow: hidden;
      animation: cardAppear 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes cardAppear {
      from { opacity: 0; transform: translateY(24px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* Banner Header */
    .card-banner {
      background: ${state.themeGradient};
      padding: 38px 32px 30px;
      text-align: center;
      position: relative;
    }
    .status-bubble {
      width: 72px;
      height: 72px;
      margin: 0 auto 16px;
      background: rgba(255, 255, 255, 0.18);
      border: 2px solid rgba(255, 255, 255, 0.35);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 34px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.25);
      backdrop-filter: blur(8px);
    }
    .pill-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 100px;
      margin-bottom: 10px;
    }
    .banner-title {
      font-size: 24px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.5px;
      line-height: 1.25;
    }

    /* Card Content */
    .card-body {
      padding: 32px;
    }
    .lead-text {
      font-size: 15px;
      color: var(--text-muted);
      text-align: center;
      line-height: 1.6;
      margin-bottom: 28px;
    }

    /* Primary Button */
    .btn-action {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 16px 24px;
      background: ${state.themeGradient};
      color: #FFFFFF;
      font-size: 15px;
      font-weight: 700;
      border-radius: 14px;
      text-decoration: none;
      box-shadow: 0 8px 25px -4px rgba(37, 99, 235, 0.45);
      transition: all 0.2s ease;
      cursor: pointer;
      border: none;
    }
    .btn-action:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px -4px rgba(37, 99, 235, 0.6);
    }

    /* Metrics Grid (Urban Company Style) */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin: 24px 0;
      padding: 16px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      text-align: center;
    }
    .metric-item h4 {
      font-size: 17px;
      font-weight: 800;
      color: #FFFFFF;
    }
    .metric-item p {
      font-size: 11px;
      font-weight: 500;
      color: var(--text-muted);
      margin-top: 2px;
    }

    /* Workflow Stepper */
    .step-box {
      margin: 24px 0;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 20px;
    }
    .step-header {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: #60A5FA;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .step-row {
      display: flex;
      gap: 14px;
      margin-bottom: 14px;
    }
    .step-row:last-child { margin-bottom: 0; }
    .step-number {
      width: 28px;
      height: 28px;
      background: rgba(37, 99, 235, 0.2);
      border: 1px solid rgba(37, 99, 235, 0.4);
      color: #93C5FD;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      flex-shrink: 0;
    }
    .step-content h5 {
      font-size: 13px;
      font-weight: 700;
      color: #E5E7EB;
    }
    .step-content p {
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.4;
      margin-top: 2px;
    }

    /* Trust & Guarantees (Cashify / Urban Company style) */
    .trust-strip {
      display: flex;
      justify-content: space-around;
      gap: 12px;
      padding: 14px 10px;
      border-top: 1px solid var(--card-border);
      font-size: 11px;
      color: #9CA3AF;
      text-align: center;
    }
    .trust-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Support Callout */
    .support-bar {
      margin-top: 20px;
      padding: 12px 16px;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
    }
    .support-bar a {
      color: #34D399;
      font-weight: 700;
      text-decoration: none;
    }

    /* Footer */
    .footer {
      margin-top: 24px;
      text-align: center;
      font-size: 11px;
      color: #6B7280;
    }
    .footer a {
      color: #9CA3AF;
      text-decoration: none;
    }

    @media (max-width: 480px) {
      .brand-nav { padding: 14px 18px; }
      .card-body { padding: 22px 18px; }
      .card-banner { padding: 30px 20px 24px; }
      .banner-title { font-size: 21px; }
      .metrics-grid { grid-template-columns: 1fr; gap: 8px; text-align: left; padding: 12px 16px; }
    }
  </style>
</head>
<body>

  <!-- Brand Navigation -->
  <nav class="brand-nav">
    <a href="/" class="brand-logo">
      <div class="brand-logo-icon">💻</div>
      <span>Ghar-Baithe<span style="color:#10B981;">.in</span></span>
    </a>
    <div class="brand-badge">
      <span>●</span> 100% Verified Safe
    </div>
  </nav>

  <!-- Container -->
  <div class="container">
    <div class="main-card">

      <!-- Header Banner -->
      <div class="card-banner">
        <div class="pill-tag">
          <span>●</span> ${state.badge}
        </div>
        <div class="status-bubble">${state.statusIcon}</div>
        <h1 class="banner-title">${state.title}</h1>
      </div>

      <!-- Card Body -->
      <div class="card-body">
        <p class="lead-text">${state.subtitle}</p>

        <!-- Main Conversion Action -->
        <a href="${state.primaryUrl}" class="btn-action">
          ${state.primaryAction} →
        </a>

        <!-- Service / Trust Metrics -->
        <div class="metrics-grid">
          <div class="metric-item">
            <h4>${isTechnician ? "₹40k+" : "10,000+"}</h4>
            <p>${isTechnician ? "Avg. Monthly Income" : "Laptops Repaired"}</p>
          </div>
          <div class="metric-item">
            <h4>${isTechnician ? "8-12" : "60 Mins"}</h4>
            <p>${isTechnician ? "Daily Job Alerts" : "Doorstep Turnaround"}</p>
          </div>
          <div class="metric-item">
            <h4>${isTechnician ? "0% Fee" : "30 Days"}</h4>
            <p>${isTechnician ? "First Month Joining" : "Service Warranty"}</p>
          </div>
        </div>

        <!-- Next Steps Workflow -->
        <div class="step-box">
          <div class="step-header">
            <span>⚡</span> ${isTechnician ? "Quick Partner Onboarding" : "How Doorstep Repair Works"}
          </div>

          ${
            isTechnician
              ? `
            <div class="step-row">
              <div class="step-number">1</div>
              <div class="step-content">
                <h5>Upload KYC Documents</h5>
                <p>Provide Aadhaar & skill certification for trusted technician status.</p>
              </div>
            </div>
            <div class="step-row">
              <div class="step-number">2</div>
              <div class="step-content">
                <h5>Get Job Alerts in Your Pin Code</h5>
                <p>Accept doorstep repair requests directly in your nearby vicinity.</p>
              </div>
            </div>
            <div class="step-row">
              <div class="step-number">3</div>
              <div class="step-content">
                <h5>Instant Weekly Bank Payouts</h5>
                <p>Track all completed services and receive direct weekly settlement.</p>
              </div>
            </div>
          `
              : `
            <div class="step-row">
              <div class="step-number">1</div>
              <div class="step-content">
                <h5>Select Your Laptop Issue</h5>
                <p>Screen repair, slow performance, liquid damage, battery & keyboard.</p>
              </div>
            </div>
            <div class="step-row">
              <div class="step-number">2</div>
              <div class="step-content">
                <h5>Technician Visits Your Doorstep</h5>
                <p>Background-verified expert with professional diagnostics kit arrives at your slot.</p>
              </div>
            </div>
            <div class="step-row">
              <div class="step-number">3</div>
              <div class="step-content">
                <h5>Pay Only After 100% Satisfaction</h5>
                <p>Complete peace of mind with 30-day warranty and genuine spare parts.</p>
              </div>
            </div>
          `
          }
        </div>

        <!-- 24/7 Helpline -->
        <div class="support-bar">
          <span>💬 Need urgent help or have a query?</span>
          <a href="https://wa.me/919876543210" target="_blank">Chat on WhatsApp →</a>
        </div>

      </div>

      <!-- Trust Strip -->
      <div class="trust-strip">
        <div class="trust-item">🛡️ Verified Technicians</div>
        <div class="trust-item">🔒 Data Privacy Guarantee</div>
        <div class="trust-item">⚡ 30-Day Warranty</div>
      </div>

    </div>

    <!-- Page Footer -->
    <div class="footer">
      <p>© ${year} Ghar-Baithe-Laptop-Repair Network. Built for India's 1 Million+ Devices.</p>
      <p style="margin-top:4px;">
        <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms of Service</a> · <a href="mailto:support@gharbaithe.in">support@gharbaithe.in</a>
      </p>
    </div>
  </div>

  ${
    state.confetti
      ? `
  <canvas id="confetti" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999;"></canvas>
  <script>
    (function(){
      const canvas = document.getElementById('confetti');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const pieces = Array.from({length: 80}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 3,
        color: ['#2563EB','#10B981','#F59E0B','#EC4899','#6366F1'][Math.floor(Math.random()*5)],
        speed: Math.random() * 3 + 2,
        osc: Math.random() * 20
      }));
      let count = 0;
      function anim() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x + Math.sin(count/15)*p.osc, p.y, p.r, 0, Math.PI*2);
          ctx.fillStyle = p.color;
          ctx.fill();
          p.y += p.speed;
          if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
        });
        count++;
        if (count < 220) requestAnimationFrame(anim);
        else ctx.clearRect(0,0,canvas.width,canvas.height);
      }
      anim();
    })();
  </script>
  `
      : ""
  }

</body>
</html>`;
}

export async function LoginController(req, res) {
  try {
    const { email, contact, password } = req.body;
    console.log(email, password);
    // ── Build query by email or contact ──
    // ── Find user with password included ──

   const user=await UserModel.findOne({
    $or:[
      {email:email},{contact:contact}
    ]
   }).select("+password")

    console.log(user.password,"USER.PASSWORD");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found with provided email or contact number.",
      });
    }

    // ── Check if email is verified ──
    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message:
          "Your account is not verified yet. Please check your email inbox to verify your account or request a resend.",
      });
    }

    // ── Verify password ──
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid password. Please check your credentials and try again.",
      });
    }

    // ── Generate JWT token ──
    const token = jwt.sign(
      {
        id: user._id,
        FullName: user.FullName,
        email: user.email,
        role: user.role,
      },    
      Config.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // ── Set Cookie ──
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ── Send Logged-In Success Email Notification ──
    const loginTimeStr = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // const emailHtml = loginSuccessEmail({
    //   FullName: user.FullName,
    //   email: user.email,
    //   role: user.role,
    //   loginTime: loginTimeStr,
    // });

    // const emailSubject = user.role === "technician"
    //   ? "🔧 Security Alert: Technician Partner Login Detected"
    //   : "🔐 Security Alert: Successful Account Login — Ghar-Baithe-Laptop-Repair";

    // // Send email via Sendmail service
    // Sendmail({
    //   to: user.email,
    //   subject: emailSubject,
    //   text: `Hello ${user.FullName},\n\nYou have successfully logged in to your Ghar-Baithe-Laptop-Repair account on ${loginTimeStr} IST.\n\nIf you did not initiate this login, please secure your account immediately.\n\n— Ghar-Baithe-Laptop-Repair Security Team`,
    //   html: emailHtml,
    // }).then(() => {
    //   console.log(`📧 Login notification email sent to: ${user.email} (${user.role})`);
    // }).catch((emailErr) => {
    //   console.error(`⚠️ Failed to send login notification email to ${user.email}:`, emailErr.message);
    // });

    // ── Send JSON Response ──
    return await SendTokenResponse(
      user,
      res,
      `Welcome back, ${user.FullName}! Logged in successfully.`,
    );
  } catch (error) {
    console.error("❌ LoginController Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error during login.",
      error: error.message,
    });
  }
}

export async function ResetPasswordMailController(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email address is required.",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not found",
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: "User is unauthorized",
      });
    }

    // ── Generate 1-hour secure password reset token ──
    const resetToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      Config.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // ── Redirect URL: http://localhost:5173/forgot-passwordpage ──
    const frontendBaseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetUrl = `${frontendBaseUrl}/forgot-passwordpage?token=${resetToken}&email=${encodeURIComponent(user.email)}`;

    // ── Product-level modern HTML email template ──
    const emailHtml = resetPasswordEmail({
      FullName: user.FullName,
      email: user.email,
      role: user.role,
      resetUrl,
    });

    const emailSubject =
      user.role === "technician"
        ? "🔧 Security Alert: Reset Password Request — Technician Partner Portal"
        : "🔐 Password Reset Request — Ghar-Baithe-Laptop-Repair";

    // ── Send email via Nodemailer service ──
    await Sendmail({
      to: user.email,
      subject: emailSubject,
      text: `Hello ${user.FullName},\n\nWe received a request to reset your Ghar-Baithe-Laptop-Repair password.\n\nPlease click the link below to set a new password:\n${resetUrl}\n\nNote: This link will expire in 1 hour.\n\nIf you did not request a password reset, please ignore this email.\n\n— Ghar-Baithe-Laptop-Repair Security Team`,
      html: emailHtml,
    });

    console.log(
      `🔑 Password reset email sent to: ${user.email} (${user.role})`,
    );

    return res.status(200).json({
      success: true,
      message:
        "Password reset link sent to your email successfully. Please check your inbox or spam folder.",
      resetUrl: process.env.NODE_ENV === "development" ? resetUrl : undefined,
    });
  } catch (error) {
    console.error("❌ ResetPasswordMail Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send password reset email. Please try again later.",
      error: error.message,
    });
  }
}

export async function ForgetPasswordController(req, res) {
  try {
    const { email, NewPassword } = req.body;
    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      });
    }
    if (!user.verified) {
      return res.status(403).json({
        message: "User is not verified",
      });
    }
    await UserModel.findOneAndUpdate(
      { email: email },
      { password: await bcrypt.hash(NewPassword, 10) },
      { new: true },
    );

    await SendTokenResponse(user, res, "Forget Password Successfully");
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function LogoutController(req, res) {
  const token = req.cookies.token;
  const user = req.user;

  res.clearCookie("token");

  await BlackListModel.create({ token: token });

  await SendTokenResponse(user, res, "User logout successfully");
}

export async function GetMeController(req, res) {
  const userid = req.user.id;

  const user = await UserModel.findOne({
    _id: userid,
  });

  await SendTokenResponse(user, res, "User is fetch successfully");
}

// ──────────────────────────────────────────────────────────
// Modern Product-Level Email Generator for Google OAuth
// Scale: 1M+ users, supports both Customer & Technician roles
// ──────────────────────────────────────────────────────────
function generateGoogleAuthEmail({
  FullName,
  email,
  role,
  isNewUser,
  redirectUrl,
}) {
  const isTechnician = role === "technician";
  const firstName = FullName
    ? FullName.split(" ")[0]
    : isTechnician
      ? "Partner"
      : "User";
  const year = new Date().getFullYear();
  const themeColor = isTechnician ? "#059669" : "#2563EB";
  const themeGradient = isTechnician
    ? "linear-gradient(135deg, #064E3B 0%, #059669 50%, #10B981 100%)"
    : "linear-gradient(135deg, #1E3A8A 0%, #2563EB 55%, #0284C7 100%)";
  const loginTimeStr = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Google Sign-In Alert | Ghar-Baithe-Laptop-Repair</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #F8FAFC;
      font-family: 'Plus Jakarta Sans', 'Inter', Arial, sans-serif;
      color: #0F172A;
      padding: 32px 16px;
      line-height: 1.6;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #FFFFFF;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
      border: 1px solid #E2E8F0;
    }
    .header {
      background: ${themeGradient};
      padding: 36px 32px 30px;
      text-align: center;
      color: #FFFFFF;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.35);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 100px;
      margin-bottom: 12px;
    }
    .header h1 {
      font-size: 23px;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1.25;
    }
    .body {
      padding: 32px;
    }
    .intro {
      font-size: 15px;
      color: #475569;
      margin-bottom: 24px;
    }
    .info-box {
      background: #F1F5F9;
      border-left: 4px solid ${themeColor};
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 13px;
    }
    .info-row:last-child { margin-bottom: 0; }
    .info-label { color: #64748B; font-weight: 600; }
    .info-val { color: #0F172A; font-weight: 700; }
    .cta-btn {
      display: block;
      width: 100%;
      text-align: center;
      padding: 16px 24px;
      background: ${themeGradient};
      color: #FFFFFF !important;
      font-size: 15px;
      font-weight: 700;
      border-radius: 14px;
      text-decoration: none;
      box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4);
      margin: 24px 0 16px;
    }
    .link-fallback {
      background: #F8FAFC;
      border: 1px dashed #CBD5E1;
      border-radius: 12px;
      padding: 14px 18px;
      font-size: 11px;
      color: #64748B;
      word-break: break-all;
    }
    .footer {
      background: #0F172A;
      color: #94A3B8;
      padding: 24px 32px;
      text-align: center;
      font-size: 12px;
    }
    .footer a { color: #60A5FA; text-decoration: none; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="badge">🌐 Google Security Authorization</div>
      <h1>${isNewUser ? `Welcome to Ghar-Baithe-Laptop-Repair, ${firstName}! 🎉` : `Google Login Detected, ${firstName}! 🔐`}</h1>
    </div>
    <div class="body">
      <p class="intro">
        ${
          isNewUser
            ? `Your account was successfully created via Google OAuth. You can now book doorstep laptop repair services or manage your profile.`
            : `You have successfully signed in to your Ghar-Baithe-Laptop-Repair account using Google OAuth.`
        }
      </p>

      <div class="info-box">
        <div class="info-row"><span class="info-label">Account Name:</span><span class="info-val">${FullName}</span></div>
        <div class="info-row"><span class="info-label">Email Address:</span><span class="info-val">${email}</span></div>
        <div class="info-row"><span class="info-label">Account Role:</span><span class="info-val">${isTechnician ? "🔧 Technician Partner" : "🧑 Customer"}</span></div>
        <div class="info-row"><span class="info-label">Authentication:</span><span class="info-val">Google OAuth 2.0</span></div>
        <div class="info-row"><span class="info-label">Timestamp:</span><span class="info-val">${loginTimeStr} IST</span></div>
      </div>

      <p style="font-size:13px; color:#475569;">
        Need to set or change your account password? Click the button below to go directly to our secure password management page:
      </p>

      <a href="${redirectUrl}" class="cta-btn" target="_blank">
        🔑 Manage Account Password / Reset Page →
      </a>

      <div class="link-fallback">
        <strong>Direct Link:</strong><br/>
        <a href="${redirectUrl}" style="color:#2563EB;">${redirectUrl}</a>
      </div>
    </div>
    <div class="footer">
      <p>© ${year} Ghar-Baithe-Laptop-Repair Network. All rights reserved.</p>
      <p style="margin-top:6px;"><a href="mailto:support@gharbaithe.in">support@gharbaithe.in</a> · 24/7 Doorstep Support</p>
    </div>
  </div>
</body>
</html>`;
}

export async function GoogleCallback(req, res) {
  try {
    const { id, displayName, emails, photos } = req.user;
    const email = emails[0].value;
    const photo = photos?.[0]?.value || null;
    const userFullName = displayName || "Google User";

    let user = await UserModel.findOne({ email });
    const isNewUser = !user;

    if (isNewUser) {
      user = await UserModel.create({
        googleId: id,
        FullName: userFullName,
        email,
        photo,
        verified: true,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        FullName: user.FullName,
        role: user.role || "customer",
      },
      Config.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: Config.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ── Target redirect URL: http://localhost:5173/forgot-passwordpage ──
    const redirectUrl = `http://localhost:5173/forgot-passwordpage?token=${token}&email=${encodeURIComponent(user.email)}`;

    // ── Generate & send modern email notification via Nodemailer ──
    const emailHtml = generateGoogleAuthEmail({
      FullName: user.FullName,
      email: user.email,
      role: user.role || "customer",
      isNewUser,
      redirectUrl,
    });

    const emailSubject =
      user.role === "technician"
        ? "🔧 Security Alert: Google Partner Sign-In — Ghar-Baithe-Laptop-Repair"
        : "🔐 Security Alert: Google Sign-In Successful — Ghar-Baithe-Laptop-Repair";

    // Dispatch email asynchronously via Nodemailer (Sendmail service)
    Sendmail({
      to: user.email,
      subject: emailSubject,
      text: `Hello ${user.FullName},\n\nYou have successfully logged in via Google OAuth.\n\nTo set or update your password, visit: ${redirectUrl}\n\n— Ghar-Baithe-Laptop-Repair Team`,
      html: emailHtml,
    })
      .then(() => {
        console.log(
          `📧 Google OAuth notification email sent to: ${user.email}`,
        );
      })
      .catch((emailErr) => {
        console.error(
          `⚠️ Failed to send Google callback email to ${user.email}:`,
          emailErr.message,
        );
      });

    // Redirect to requested URL: http://localhost:5173/forgot-passwordpage
    return res.redirect("http://localhost:5173/forgot-passwordpage");
  } catch (error) {
    console.error("❌ GoogleCallback Error:", error.message);
    return res.redirect(
      "http://localhost:5173/forgot-passwordpage?error=google_failed",
    );
  }
}
