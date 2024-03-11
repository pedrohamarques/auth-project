import { useState } from "react";
import { Alert } from "react-native";

import { useAuthRequests } from "@utils/auth";

import type { onAuthenticateProps } from "@typings/credentials";

export function useLoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { signInUser } = useAuthRequests();

  async function signInHandler({ email, password }: onAuthenticateProps) {
    setIsAuthenticating(true);
    try {
      await signInUser(email, password);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        " Could not log you in. Please check your credentials or try again later!",
      );
    }
    setIsAuthenticating(false);
  }

  return {
    isAuthenticating,
    signInHandler,
  };
}
