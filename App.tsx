import React from "react";
import { StatusBar } from "expo-status-bar";

import { Navigation } from "@routes/navigation";

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <Navigation />
    </>
  );
}
