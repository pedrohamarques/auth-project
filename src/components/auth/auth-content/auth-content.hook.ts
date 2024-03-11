import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import type { CredentialProps } from "@typings/credentials";
import type { AuthContentProps } from "./types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutes, AuthRoutesNavigation } from "@routes/types";

export function useAuthContent({ isLogin, onAuthenticate }: AuthContentProps) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesNavigation>>();

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace(AuthRoutes.SIGNUP);
    } else {
      navigation.replace(AuthRoutes.LOGIN);
    }
  }

  function submitHandler(credentials: CredentialProps) {
    let { email, password } = credentials;
    const { confirmEmail, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate?.({ email, password });
  }

  return {
    credentialsInvalid,
    submitHandler,
    switchAuthModeHandler,
  };
}
