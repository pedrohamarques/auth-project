import { useState } from "react";

import { useAuthRequests } from "@utils/auth";

import type { onAuthenticateProps } from "@typings/credentials";
import { Alert } from "react-native";

export function useSignUpScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { createUser } = useAuthRequests();

  async function signUpHandler({ email, password }: onAuthenticateProps) {
    setIsAuthenticating(true);
    try {
      await createUser(email, password);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        " Could not create uer, please check your input and try again later.",
      );
    }
    setIsAuthenticating(false);
  }

  return {
    isAuthenticating,
    signUpHandler,
  };
}
