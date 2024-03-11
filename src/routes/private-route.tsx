import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { WelcomeScreen } from "@screens/welcome-screen";

import { Colors } from "@constants/styles";

const Stack = createNativeStackNavigator();

export function PrivateStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}
