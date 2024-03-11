import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { Button } from "../button";
import { Text } from "react-native";

const mockOnPress = jest.fn();

describe("components/ui/button/<Button />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component properly", () => {
    render(
      <Button onPress={mockOnPress}>
        <Text>Teste</Text>
      </Button>,
    );

    expect(screen.getByText("Teste")).toBeTruthy();
  });

  it("calls onPress when component is pressed", () => {
    render(
      <Button onPress={mockOnPress}>
        <Text>Teste</Text>
      </Button>,
    );

    fireEvent.press(screen.getByText("Teste"));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
