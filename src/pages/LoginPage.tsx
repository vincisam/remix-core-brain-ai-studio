import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "../router/SimpleRouter";
import { CoreBrainLogo } from "../components/UI/CoreBrainLogo";
import { OAuthButtons } from "../components/Auth/OAuthButtons";

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  google_not_configured: "Google sign-in isn't set up on this server yet.",
  github_not_configured: "GitHub sign-in isn't set up on this server yet.",
  google_oauth_failed: "We couldn't sign you in with Google. Please try again.",
  github_oauth_failed: "We couldn't sign you in with GitHub. Please try again.",
};

export default function LoginPage() {
  const { login, error, clearError } = useAuth();
  const { navigate } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const oauthErrorCode = params.get("error");
  const oauthError = oauthErrorCode ? OAUTH_ERROR_MESSAGES[oauthErrorCode] || "Sign-in failed. Please try again." : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = await login(email, password);
    setSubmitting(false);
    if (ok) navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <CoreBrainLogo size="lg" showText={false} showSubtitle={false} />
        </div>

        <h1 className="text-2xl font-bold text-text-main text-center mb-2">Welcome back</h1>
        <p className="text-sm text-text-muted text-center mb-8">Sign in to your Core Brain workspace.</p>

        {(error || oauthError) && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {error || oauthError}
          </div>
        )}

        <OAuthButtons />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError();
                }}
                placeholder="you@example.com"
                className="w-full bg-card-bg border border-border-color text-text-main rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError();
                }}
                placeholder="••••••••"
                className="w-full bg-card-bg border border-border-color text-text-main rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-accent-color text-white font-medium py-2.5 rounded-xl hover:opacity-90 transition disabled:opacity-50 mt-2"
          >
            {submitting ? "Signing in…" : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="text-accent-color hover:underline font-medium">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
