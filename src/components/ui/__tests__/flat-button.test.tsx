import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { FlatButton } from "../flat-button";
import { Text } from "react-native";

const mockOnPress = jest.fn();

describe("components/ui/flat-button/<FlatButton />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component properly", () => {
    render(
      <FlatButton onPress={mockOnPress}>
        <Text>Teste</Text>
      </FlatButton>,
    );

    expect(screen.getByText("Teste")).toBeTruthy();
  });

  it("calls onPress when component is pressed", () => {
    render(
      <FlatButton onPress={mockOnPress}>
        <Text>Teste</Text>
      </FlatButton>,
    );

    fireEvent.press(screen.getByText("Teste"));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
