import React from "react";

import { AuthForm } from "../auth-form";
import { fireEvent, render, screen } from "@testing-library/react-native";

const mockValues = {
  isLogin: false,
  onSubmit: jest.fn(),
  credentialsInvalid: {
    confirmEmail: true,
    confirmPassword: true,
    email: true,
    password: true,
  },
};

const mockSubmitHandler = jest.fn();
const mockUpdateInputValueHandler = jest.fn();

jest.mock("../auth-form.hook", () => ({
  useAuthForm: () => ({
    submitHandler: mockSubmitHandler,
    updateInputValueHandler: mockUpdateInputValueHandler,
  }),
}));

describe("components/auth/auth-form/<AuthForm />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders screen properly when is signUp", () => {
    render(<AuthForm {...mockValues} />);

    expect(screen.getByText("Email Address")).toBeTruthy();
    expect(screen.getByText("Confirm Email Address")).toBeTruthy();
    expect(screen.getByText("Password")).toBeTruthy();
    expect(screen.getByText("Confirm Password")).toBeTruthy();

    expect(screen.getByText("Sign Up")).toBeTruthy();
  });

  it("renders screen properly when is login", () => {
    render(<AuthForm {...mockValues} isLogin />);

    expect(screen.getByText("Email Address")).toBeTruthy();
    expect(screen.getByText("Password")).toBeTruthy();

    expect(screen.queryByText("Confirm Email Address")).toBeNull();
    expect(screen.queryByText("Confirm Password")).toBeNull();

    expect(screen.getByText("Log In")).toBeTruthy();
  });

  it("calls onSubmit when button is pressed", () => {
    render(<AuthForm {...mockValues} />);

    fireEvent.press(screen.getByText("Sign Up"));

    expect(mockSubmitHandler).toHaveBeenCalledTimes(1);
  });

  it("calls updateInputValueHandler when the input is typed", () => {
    render(<AuthForm {...mockValues} />);

    fireEvent(
      screen.getByTestId("components.auth.input.text-input-email"),
      "changeText",
      "teste",
    );

    expect(mockUpdateInputValueHandler).toHaveBeenCalledTimes(1);
  });
});
