import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthStack } from "./auth-route";

export function Navigation() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
