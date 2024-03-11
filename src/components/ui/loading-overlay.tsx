import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type LoadingOverlayProps = {
  message: string;
  testID?: string;
};

export function LoadingOverlay({ message, testID }: LoadingOverlayProps) {
  return (
    <View style={styles.rootContainer} testID={testID}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator
        size="large"
        testID="components.ui.loading-overlay.activity-indicator"
      />
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
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
