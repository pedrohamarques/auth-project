import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { IconButton } from "@components/ui";

import { useWelcomeScreen } from "./welcome-screen.hook";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { PrivateRoutesNavigation } from "@routes/types";

type WelcomeScreenNavigationParams = {
  navigation: Pick<
    NativeStackNavigationProp<PrivateRoutesNavigation>,
    "setOptions"
  >;
};

export function WelcomeScreen({ navigation }: WelcomeScreenNavigationParams) {
  const { onLogoutHandler } = useWelcomeScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="exit"
          color={tintColor}
          size={24}
          onPress={onLogoutHandler}
        />
      ),
    });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
