import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "../router/SimpleRouter";
import { CoreBrainLogo } from "../components/UI/CoreBrainLogo";

export default function AuthCallbackPage() {
  const { setToken } = useAuth();
  const { navigate } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      setToken(token);
      navigate("/", { replace: true });
    } else {
      navigate("/login?error=oauth_failed", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-app-bg gap-4">
      <CoreBrainLogo size="lg" showText={false} showSubtitle={false} />
      <p className="text-sm text-text-muted">Signing you in…</p>
    </div>
  );
}
