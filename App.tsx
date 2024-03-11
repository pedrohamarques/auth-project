import React from "react";
import { StatusBar } from "expo-status-bar";

import { Navigation } from "@routes/navigation";
import { AuthContextProvider } from "@stores/auth-context";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
