import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "../router/SimpleRouter";
import { CoreBrainLogo } from "../components/UI/CoreBrainLogo";
import { OAuthButtons } from "../components/Auth/OAuthButtons";

export default function SignupPage() {
  const { signup, error, clearError } = useAuth();
  const { navigate } = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const ok = await signup(name, email, password);
    setSubmitting(false);
    if (ok) navigate("/", { replace: true });
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <CoreBrainLogo size="lg" showText={false} showSubtitle={false} />
        </div>

        <h1 className="text-2xl font-bold text-text-main text-center mb-2">Create your account</h1>
        <p className="text-sm text-text-muted text-center mb-8">Join Core Brain and start building.</p>

        {displayError && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {displayError}
          </div>
        )}

        <OAuthButtons />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setLocalError(null);
                  clearError();
                }}
                placeholder="Ada Lovelace"
                className="w-full bg-card-bg border border-border-color text-text-main rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition"
              />
            </div>
          </div>

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
                  setLocalError(null);
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
                  setLocalError(null);
                  clearError();
                }}
                placeholder="At least 8 characters"
                className="w-full bg-card-bg border border-border-color text-text-main rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setLocalError(null);
                }}
                placeholder="Repeat your password"
                className="w-full bg-card-bg border border-border-color text-text-main rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-accent-color text-white font-medium py-2.5 rounded-xl hover:opacity-90 transition disabled:opacity-50 mt-2"
          >
            {submitting ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-accent-color hover:underline font-medium">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
