import { act, renderHook } from "@testing-library/react-native";

import { useAuthForm } from "../auth-form.hook";

const mockOnSubmit = jest.fn();

const mockHookParams = {
  onSubmit: mockOnSubmit,
};

describe("components/auth/auth-form/UseAuthForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("saves the entered text when the field is typed", () => {
    const { result } = renderHook(() => useAuthForm(mockHookParams));

    act(() => result.current.updateInputValueHandler("email", "teste"));
    expect(result.current.enteredEmail).toBe("teste");

    act(() => result.current.updateInputValueHandler("password", "teste2"));
    expect(result.current.enteredPassword).toBe("teste2");

    act(() => result.current.updateInputValueHandler("confirmEmail", "teste3"));
    expect(result.current.enteredConfirmEmail).toBe("teste3");

    act(() =>
      result.current.updateInputValueHandler("confirmPassword", "teste4"),
    );
    expect(result.current.enteredConfirmPassword).toBe("teste4");
  });

  it("calls onSubmit when submitHandler is called", () => {
    const { result } = renderHook(() => useAuthForm(mockHookParams));

    act(() => result.current.updateInputValueHandler("email", "teste"));

    act(() => result.current.submitHandler());

    expect(mockHookParams.onSubmit).toHaveBeenCalledTimes(1);
    expect(mockHookParams.onSubmit).toHaveBeenCalledWith({
      email: "teste",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    });
  });
});
