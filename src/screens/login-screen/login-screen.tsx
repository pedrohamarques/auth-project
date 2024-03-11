import React from "react";

import { AuthContent } from "@components/auth/auth-content";
import { useLoginScreen } from "./login-screen.hook";
import { LoadingOverlay } from "@components/ui";

export function LoginScreen() {
  const { isAuthenticating, signInHandler } = useLoginScreen();

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={signInHandler} />;
}
