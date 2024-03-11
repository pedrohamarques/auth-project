import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "@screens/login-screen";
import { SignUpScreen } from "@screens/signup-screen";

import { Colors } from "@constants/styles";

import { AuthRoutes, type AuthRoutesNavigation } from "@routes/types";

const Stack = createNativeStackNavigator<AuthRoutesNavigation>();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name={AuthRoutes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={AuthRoutes.SIGNUP} component={SignUpScreen} />
    </Stack.Navigator>
  );
}
