import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Ionicons } from "@expo/vector-icons";

import { IconButton } from "../icon-button";

const mockOnPress = jest.fn();

const mockValues = {
  onPress: mockOnPress,
  size: 24,
  icon: "star" as keyof typeof Ionicons.glyphMap,
};

describe("components/ui/icon-button/<IconButton />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component properly", () => {
    render(<IconButton {...mockValues} />);

    expect(
      screen.getByTestId("components.ui.icon-button.pressable"),
    ).toBeTruthy();
  });

  it("calls onPress when component is pressed", () => {
    render(<IconButton {...mockValues} />);

    fireEvent.press(screen.getByTestId("components.ui.icon-button.pressable"));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
