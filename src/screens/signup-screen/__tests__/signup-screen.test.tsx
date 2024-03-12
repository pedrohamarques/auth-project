import React from "react";
import { render, screen } from "@testing-library/react-native";

import { SignUpScreen } from "../signup-screen";

const mockHookValues = {
  isAuthenticating: true,
  signUpHandler: jest.fn(),
};

const mockUseSignUpScreen = jest.fn();

jest.mock("../signup-screen.hook", () => ({
  useSignUpScreen: () => mockUseSignUpScreen(),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("screens/login-screen/<SignUpScreen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSignUpScreen.mockReturnValue(mockHookValues);
  });

  it("renders screen properly when it is authenticating", () => {
    render(<SignUpScreen />);

    expect(screen.getByText("Creating user...")).toBeTruthy();
    expect(
      screen.queryByTestId("components.auth.auth-content.auth-form"),
    ).toBeNull();
  });

  it("renders screen properly when it is not authenticating", () => {
    mockUseSignUpScreen.mockReturnValue({
      ...mockHookValues,
      isAuthenticating: false,
    });

    render(<SignUpScreen />);

    expect(screen.queryByTestId("Creating user...")).toBeNull();
    expect(
      screen.getByTestId("components.auth.auth-content.auth-form"),
    ).toBeTruthy();
  });
});
