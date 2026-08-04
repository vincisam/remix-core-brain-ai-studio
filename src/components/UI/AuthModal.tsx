import React, { useState } from "react";
import { X, Mail, Lock, Github, Check } from "lucide-react";
import { CoreBrainLogo } from "./CoreBrainLogo";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-panel-bg w-full max-w-md rounded-2xl border border-border-color shadow-2xl overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-text-muted hover:text-text-main hover:bg-card-bg rounded-lg transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <CoreBrainLogo size="lg" showText={false} showSubtitle={false} />
          </div>
          
          <h2 className="text-2xl font-bold text-text-main text-center mb-2">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-text-muted text-center mb-8">
            {mode === "login" 
              ? "Enter your details to access your workspace." 
              : "Join CORE_BRAIN AI Studio and start building."}
          </p>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8" />
              </div>
              <p className="text-emerald-500 font-medium">
                {mode === "login" ? "Successfully logged in!" : "Account created successfully!"}
              </p>
            </div>
          ) : (
            <>
              {/* OAuth Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center justify-center space-x-2 bg-card-bg border border-border-color hover:border-accent-color/50 text-text-main py-2.5 rounded-xl font-medium transition group">
                  <Github className="w-5 h-5 text-text-muted group-hover:text-text-main transition" />
                  <span>Continue with GitHub</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-card-bg border border-border-color hover:border-accent-color/50 text-text-main py-2.5 rounded-xl font-medium transition group">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <div className="flex-1 h-px bg-border-color"></div>
                <span className="text-xs text-text-muted font-medium">OR</span>
                <div className="flex-1 h-px bg-border-color"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full bg-app-bg border border-border-color text-text-main rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full bg-app-bg border border-border-color text-text-main rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent-color focus:ring-1 focus:ring-accent-color transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-color text-white font-medium py-2.5 rounded-xl hover:opacity-90 transition disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </span>
                  ) : (
                    mode === "login" ? "Log In" : "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-text-muted">
                {mode === "login" ? (
                  <p>
                    Don't have an account?{" "}
                    <button onClick={() => setMode("signup")} className="text-accent-color hover:underline font-medium">
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button onClick={() => setMode("login")} className="text-accent-color hover:underline font-medium">
                      Log in
                    </button>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
