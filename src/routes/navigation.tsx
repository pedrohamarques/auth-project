import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "@stores/auth-context";

import { AuthStack, PrivateStack } from "./stacks";

export function Navigation() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <PrivateStack />}
    </NavigationContainer>
  );
}
