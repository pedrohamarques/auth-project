import { AuthContext } from "@stores/auth-context";
import { useContext } from "react";

export function useWelcomeScreen() {
  const { logout } = useContext(AuthContext);

  function onLogoutHandler() {
    logout();
  }

  return {
    onLogoutHandler,
  };
}
