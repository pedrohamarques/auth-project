import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthStack } from "./stacks";

export function Navigation() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
