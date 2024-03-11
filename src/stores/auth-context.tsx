import React, { useState, createContext } from "react";

import type { InitialDataProps } from "./types";

const initialState = {
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
};

export const AuthContext = createContext<InitialDataProps>(initialState);

export function AuthContextProvider({ children }: React.PropsWithChildren) {
  const [authToken, setAuthToken] = useState<string | null>(null);

  function authenticate(token: string) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken(null);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
