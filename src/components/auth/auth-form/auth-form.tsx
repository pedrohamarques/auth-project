import React from "react";
import { StyleSheet, View } from "react-native";

import { Button } from "@components/ui";
import { Input } from "@components/auth/input";

import { useAuthForm } from "./auth-form.hook";

import type { AuthFormProps } from "./types";

export function AuthForm({
  isLogin,
  onSubmit,
  credentialsInvalid,
}: AuthFormProps) {
  const {
    enteredConfirmEmail,
    enteredConfirmPassword,
    enteredEmail,
    enteredPassword,
    submitHandler,
    updateInputValueHandler,
  } = useAuthForm({ onSubmit });

  const {
    confirmEmail: emailsDontMatch,
    confirmPassword: passwordsDontMatch,
    email: emailIsInvalid,
    password: passwordIsInvalid,
  } = credentialsInvalid;

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={(value: string) =>
            updateInputValueHandler("email", value)
          }
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            onUpdateValue={(value: string) =>
              updateInputValueHandler("confirmEmail", value)
            }
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={(value: string) =>
            updateInputValueHandler("password", value)
          }
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={(value: string) =>
              updateInputValueHandler("confirmPassword", value)
            }
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
