import { useContext, useState } from "react";
import { Alert } from "react-native";

import { useAuthRequests } from "@utils/auth";

import { AuthContext } from "@stores/auth-context";

import type { onAuthenticateProps } from "@typings/credentials";

export function useLoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { authenticate } = useContext(AuthContext);

  const { signInUser } = useAuthRequests();

  async function signInHandler({ email, password }: onAuthenticateProps) {
    setIsAuthenticating(true);
    try {
      const token = await signInUser(email, password);
      authenticate(token);
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
