import { useContext, useState } from "react";
import { Alert } from "react-native";

import { useAuthRequests } from "@utils/auth";

import { AuthContext } from "@stores/auth-context";

import type { onAuthenticateProps } from "@typings/credentials";

export function useSignUpScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { authenticate } = useContext(AuthContext);

  const { createUser } = useAuthRequests();

  async function signUpHandler({ email, password }: onAuthenticateProps) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
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
