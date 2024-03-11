import React from "react";
import { StyleSheet, View } from "react-native";

import { FlatButton } from "@components/ui/";
import { AuthForm } from "@components/auth/auth-form";

import { Colors } from "@constants/styles";

import { useAuthContent } from "./auth-content.hook";

import type { AuthContentProps } from "./types";

export function AuthContent({ isLogin, onAuthenticate }: AuthContentProps) {
  const { credentialsInvalid, submitHandler, switchAuthModeHandler } =
    useAuthContent({ isLogin, onAuthenticate });

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
