import { render, screen } from "@testing-library/react-native";
import React from "react";
import { AuthContent } from "../auth-content";

const mockValues = {
  onAuthenticate: jest.fn(),
  isLogin: true,
};

jest.mock("../auth-content.hook", () => ({
  useAuthContent: () => ({
    navigation: jest.fn(),
    credentialsInvalid: {
      email: false,
      password: false,
      confirmEmail: false,
      confirmPassword: false,
    },
  }),
}));

describe("components/auth/auth-content/<AuthContent />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders screen properly when it is to sign up", () => {
    render(<AuthContent {...mockValues} />);

    expect(
      screen.getByTestId("components.auth.auth-content.auth-form"),
    ).toBeTruthy();
    expect(screen.getByText("Create a new user")).toBeTruthy();

    expect(screen.queryByTestId("Log in instead")).toBeNull();
  });

  it("renders screen properly when it is to login", () => {
    render(<AuthContent {...mockValues} isLogin={false} />);

    expect(
      screen.getByTestId("components.auth.auth-content.auth-form"),
    ).toBeTruthy();
    expect(screen.getByText("Log in instead")).toBeTruthy();

    expect(screen.queryByTestId("Create a new user")).toBeNull();
  });
});
