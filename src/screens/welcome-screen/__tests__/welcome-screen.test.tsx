import React from "react";
import { render, screen } from "@testing-library/react-native";

import { WelcomeScreen } from "../welcome-screen";

const mockNavigation = {
  setOptions: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigation: mockNavigation,
  }),
}));

describe("screens/welcome-screen/<WelcomeScreen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders screen properly", () => {
    render(<WelcomeScreen navigation={mockNavigation} />);

    expect(screen.getByText("Welcome!")).toBeTruthy();
    expect(screen.getByText("You authenticated successfully!")).toBeTruthy();
  });
});
