import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthStack, PrivateStack } from "./stacks";
import { useNavigationRoutes } from "./navigation.hook";

export function Navigation() {
  const { appIsReady, isAuthenticated } = useNavigationRoutes();

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <PrivateStack />}
    </NavigationContainer>
  );
}
