import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconButtonProps = {
  color?: string;
  size: number;
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  testID?: string;
};

export function IconButton({
  icon,
  color,
  size,
  onPress,
  testID = "components.ui.icon-button.pressable",
}: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
      testID={testID}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
