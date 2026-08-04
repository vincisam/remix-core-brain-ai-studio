import { Router } from "express";
import crypto from "crypto";
import { getDb } from "../db/database";
import { hashPassword, verifyPassword, signToken, verifyToken } from "../utils/authUtils";

const router = Router();

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getAppUrl(req: any): string {
  // APP_URL is auto-injected in AI Studio deployments; fall back to the request origin.
  return process.env.APP_URL || `${req.protocol}://${req.get("host")}`;
}

function publicUser(u: any) {
  return { id: u.id, name: u.name, email: u.email, avatarUrl: u.avatar_url || null };
}

// ---------------------------------------------------------------------------
// Email + password
// ---------------------------------------------------------------------------

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !String(name).trim()) {
      return res.status(400).json({ success: false, error: "Please enter your name." });
    }
    if (!email || !isValidEmail(String(email))) {
      return res.status(400).json({ success: false, error: "Please enter a valid email address." });
    }
    if (!password || String(password).length < 8) {
      return res.status(400).json({ success: false, error: "Password must be at least 8 characters." });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const db = await getDb();
    const existing = await db.get("SELECT id FROM users WHERE email = ?", normalizedEmail);
    if (existing) {
      return res.status(409).json({ success: false, error: "An account with this email already exists." });
    }

    const { salt, hash } = hashPassword(password);
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    await db.run(
      `INSERT INTO users (id, name, email, password_hash, password_salt, provider, created_at)
       VALUES (?, ?, ?, ?, ?, 'local', ?)`,
      id,
      String(name).trim(),
      normalizedEmail,
      hash,
      salt,
      now
    );

    const token = signToken({ sub: id, email: normalizedEmail });
    return res.status(201).json({
      success: true,
      token,
      user: { id, name: String(name).trim(), email: normalizedEmail, avatarUrl: null },
    });
  } catch (err: any) {
    console.error("Signup error:", err);
    return res.status(500).json({ success: false, error: "Failed to create your account. Please try again." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required." });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const db = await getDb();
    const user = await db.get("SELECT * FROM users WHERE email = ?", normalizedEmail);

    if (!user || !user.password_hash || !user.password_salt) {
      return res.status(401).json({ success: false, error: "Invalid email or password." });
    }
    if (!verifyPassword(password, user.password_salt, user.password_hash)) {
      return res.status(401).json({ success: false, error: "Invalid email or password." });
    }

    const token = signToken({ sub: user.id, email: user.email });
    return res.json({ success: true, token, user: publicUser(user) });
  } catch (err: any) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, error: "Failed to log in. Please try again." });
  }
});

router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Not authenticated." });
    }
    const payload = verifyToken(authHeader.slice("Bearer ".length));
    const db = await getDb();
    const user = await db.get("SELECT * FROM users WHERE id = ?", payload.sub);
    if (!user) {
      return res.status(401).json({ success: false, error: "User not found." });
    }
    return res.json({ success: true, user: publicUser(user) });
  } catch {
    return res.status(401).json({ success: false, error: "Invalid or expired session." });
  }
});

// ---------------------------------------------------------------------------
// OAuth: which providers are configured (so the frontend can hide missing ones)
// ---------------------------------------------------------------------------

router.get("/oauth/providers", (req, res) => {
  res.json({
    google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    github: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
  });
});

// ---------------------------------------------------------------------------
// OAuth: Google
// ---------------------------------------------------------------------------

router.get("/oauth/google", (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) return res.redirect("/login?error=google_not_configured");

  const redirectUri = `${getAppUrl(req)}/api/auth/oauth/google/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    prompt: "select_account",
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
});

router.get("/oauth/google/callback", async (req, res) => {
  try {
    const code = req.query.code as string | undefined;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!code || !clientId || !clientSecret) throw new Error("Google OAuth is not configured.");

    const redirectUri = `${getAppUrl(req)}/api/auth/oauth/google/callback`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    const tokenData: any = await tokenRes.json();
    if (!tokenData.access_token) throw new Error("Failed to obtain a Google access token.");

    const profileRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile: any = await profileRes.json();
    if (!profile.email) throw new Error("Google did not return an email address.");

    const normalizedEmail = String(profile.email).toLowerCase();
    const db = await getDb();

    let user = await db.get("SELECT * FROM users WHERE provider = 'google' AND provider_id = ?", profile.sub);
    if (!user) user = await db.get("SELECT * FROM users WHERE email = ?", normalizedEmail);

    if (!user) {
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      await db.run(
        `INSERT INTO users (id, name, email, provider, provider_id, avatar_url, created_at)
         VALUES (?, ?, ?, 'google', ?, ?, ?)`,
        id,
        profile.name || normalizedEmail,
        normalizedEmail,
        profile.sub,
        profile.picture || null,
        now
      );
      user = await db.get("SELECT * FROM users WHERE id = ?", id);
    }

    const token = signToken({ sub: user.id, email: user.email });
    res.redirect(`/auth/callback?token=${encodeURIComponent(token)}`);
  } catch (err: any) {
    console.error("Google OAuth error:", err);
    res.redirect("/login?error=google_oauth_failed");
  }
});

// ---------------------------------------------------------------------------
// OAuth: GitHub
// ---------------------------------------------------------------------------

router.get("/oauth/github", (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) return res.redirect("/login?error=github_not_configured");

  const redirectUri = `${getAppUrl(req)}/api/auth/oauth/github/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "read:user user:email",
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
});

router.get("/oauth/github/callback", async (req, res) => {
  try {
    const code = req.query.code as string | undefined;
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    if (!code || !clientId || !clientSecret) throw new Error("GitHub OAuth is not configured.");

    const redirectUri = `${getAppUrl(req)}/api/auth/oauth/github/callback`;

    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
    });
    const tokenData: any = await tokenRes.json();
    if (!tokenData.access_token) throw new Error("Failed to obtain a GitHub access token.");

    const profileRes = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${tokenData.access_token}`, "User-Agent": "core-brain-app" },
    });
    const profile: any = await profileRes.json();

    let email: string | undefined = profile.email;
    if (!email) {
      const emailsRes = await fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${tokenData.access_token}`, "User-Agent": "core-brain-app" },
      });
      const emails: any = await emailsRes.json();
      if (Array.isArray(emails)) {
        email = (emails.find((e: any) => e.primary) || emails[0])?.email;
      }
    }
    if (!email) throw new Error("Could not retrieve an email address from GitHub.");

    const normalizedEmail = String(email).toLowerCase();
    const db = await getDb();

    let user = await db.get(
      "SELECT * FROM users WHERE provider = 'github' AND provider_id = ?",
      String(profile.id)
    );
    if (!user) user = await db.get("SELECT * FROM users WHERE email = ?", normalizedEmail);

    if (!user) {
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      await db.run(
        `INSERT INTO users (id, name, email, provider, provider_id, avatar_url, created_at)
         VALUES (?, ?, ?, 'github', ?, ?, ?)`,
        id,
        profile.name || profile.login || normalizedEmail,
        normalizedEmail,
        String(profile.id),
        profile.avatar_url || null,
        now
      );
      user = await db.get("SELECT * FROM users WHERE id = ?", id);
    }

    const token = signToken({ sub: user.id, email: user.email });
    res.redirect(`/auth/callback?token=${encodeURIComponent(token)}`);
  } catch (err: any) {
    console.error("GitHub OAuth error:", err);
    res.redirect("/login?error=github_oauth_failed");
  }
});

export default router;
