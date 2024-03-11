import { useContext } from "react";

import { AuthContext } from "@stores/auth-context";

export function useWelcomeScreen() {
  const { logout } = useContext(AuthContext);

  function onLogoutHandler() {
    logout();
  }

  return {
    onLogoutHandler,
  };
}
