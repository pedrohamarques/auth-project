import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@stores/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export function useNavigationRoutes() {
  const { isAuthenticated, authenticate } = useContext(AuthContext);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authenticate(storedToken);
      }
      setAppIsReady(true);
    }
    fetchToken();
  }, []);

  useEffect(() => {
    async function appReadyHandler() {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    }
    appReadyHandler();
  }, [appIsReady]);

  return {
    isAuthenticated,
    appIsReady,
  };
}
