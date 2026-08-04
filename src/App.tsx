import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { RouterProvider, useRouter } from "./router/SimpleRouter";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import ChatPage from "./pages/ChatPage";
import { CoreBrainLogo } from "./components/UI/CoreBrainLogo";

function AppRoutes() {
  const { path } = useRouter();
  const { user, isLoading } = useAuth();

  // OAuth redirect lands here regardless of auth state.
  if (path === "/auth/callback") return <AuthCallbackPage />;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-app-bg gap-4">
        <CoreBrainLogo size="lg" showText={false} showSubtitle={false} />
      </div>
    );
  }

  if (!user) {
    if (path === "/signup") return <SignupPage />;
    return <LoginPage />;
  }

  return <ChatPage />;
}

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </RouterProvider>
  );
}
