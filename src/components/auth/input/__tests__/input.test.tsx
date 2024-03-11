import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { Input } from "../input";

const mockOnUpdateValue = jest.fn();

const mockValues = {
  label: "Some label",
  onUpdateValue: mockOnUpdateValue,
  isInvalid: false,
  value: "value",
};

describe("components/auth/input/<Input />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component properly", () => {
    render(<Input {...mockValues} />);

    expect(screen.getByText("Some label")).toBeTruthy();
    expect(screen.getByTestId("components.auth.input.text-input")).toBeTruthy();
  });

  it("calls onUpdateValue when the input changes", () => {
    render(<Input {...mockValues} />);

    fireEvent(
      screen.getByTestId("components.auth.input.text-input"),
      "changeText",
      "test",
    );

    expect(mockOnUpdateValue).toHaveBeenCalledTimes(1);
  });
});
