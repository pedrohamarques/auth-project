import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { WelcomeScreen } from "@screens/welcome-screen";

import { Colors } from "@constants/styles";

import { PrivateRoutes, type PrivateRoutesNavigation } from "@routes/types";

const Stack = createNativeStackNavigator<PrivateRoutesNavigation>();

export function PrivateStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name={PrivateRoutes.WELCOME} component={WelcomeScreen} />
    </Stack.Navigator>
  );
}
