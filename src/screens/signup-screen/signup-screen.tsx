import React from "react";

import { AuthContent } from "@components/auth/auth-content";
import { LoadingOverlay } from "@components/ui";

import { useSignUpScreen } from "./signup-screen.hook";

export function SignUpScreen() {
  const { signUpHandler, isAuthenticating } = useSignUpScreen();

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}
