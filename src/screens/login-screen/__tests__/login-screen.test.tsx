import React from "react";
import { render, screen } from "@testing-library/react-native";

import { LoginScreen } from "../login-screen";

const mockHookValues = {
  isAuthenticating: true,
  signInHandler: jest.fn(),
};

const mockUseLoginScreen = jest.fn();

jest.mock("../login-screen.hook", () => ({
  useLoginScreen: () => mockUseLoginScreen(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("screens/login-screen/<LoginScreen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLoginScreen.mockReturnValue(mockHookValues);
  });

  it("renders screen properly when it is authenticating", () => {
    render(<LoginScreen />);

    expect(screen.getByText("Logging you in...")).toBeTruthy();
    expect(
      screen.queryByTestId("components.auth.auth-content.auth-form"),
    ).toBeNull();
  });

  it("renders screen properly when it is not authenticating", () => {
    mockUseLoginScreen.mockReturnValue({
      ...mockHookValues,
      isAuthenticating: false,
    });

    render(<LoginScreen />);

    expect(screen.queryByTestId("Logging you in...")).toBeNull();
    expect(
      screen.getByTestId("components.auth.auth-content.auth-form"),
    ).toBeTruthy();
  });
});
