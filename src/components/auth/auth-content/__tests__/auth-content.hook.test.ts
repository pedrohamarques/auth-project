import { act, renderHook } from "@testing-library/react-native";
import { useAuthContent } from "../auth-content.hook";
import { AuthRoutes } from "@routes/types";
import {
  dummyCredentialsWithEmailError,
  dummyCredentialsWithNotEqualEmail,
  dummyCredentialsWithPasswordError,
} from "./dummy";
import { Alert } from "react-native";

const mockOnAuthenticate = jest.fn();

const mockHookParams = {
  isLogin: true,
  onAuthenticate: mockOnAuthenticate,
};

const mockReplace = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    replace: mockReplace,
  }),
}));

const spyAlert = jest.spyOn(Alert, "alert");

describe("components/auth/useAuthContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("navigates to signUp screen when it is login", () => {
    const { result } = renderHook(() => useAuthContent(mockHookParams));

    act(() => result.current.switchAuthModeHandler());

    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith(AuthRoutes.SIGNUP);
  });

  it("navigates to login screen when it is not login", () => {
    const mockHookParamsWithoutLogin = {
      ...mockHookParams,
      isLogin: false,
    };
    const { result } = renderHook(() =>
      useAuthContent(mockHookParamsWithoutLogin),
    );

    act(() => result.current.switchAuthModeHandler());

    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith(AuthRoutes.LOGIN);
  });

  it("sends an alert when email is not valid", () => {
    const { result } = renderHook(() => useAuthContent(mockHookParams));

    act(() => result.current.submitHandler(dummyCredentialsWithEmailError));

    expect(spyAlert).toHaveBeenCalledTimes(1);
    expect(spyAlert).toHaveBeenCalledWith(
      "Invalid input",
      "Please check your entered credentials.",
    );

    expect(result.current.credentialsInvalid).toEqual({
      email: true,
      confirmEmail: true,
      password: false,
      confirmPassword: false,
    });
  });

  it("sends an alert when password is less than 7 characters", () => {
    const { result } = renderHook(() => useAuthContent(mockHookParams));

    act(() => result.current.submitHandler(dummyCredentialsWithPasswordError));

    expect(spyAlert).toHaveBeenCalledTimes(1);
    expect(spyAlert).toHaveBeenCalledWith(
      "Invalid input",
      "Please check your entered credentials.",
    );

    expect(result.current.credentialsInvalid).toEqual({
      email: false,
      confirmEmail: false,
      password: true,
      confirmPassword: true,
    });
  });

  it("sends an alert when email and confirmEmail are not equal", () => {
    const mockHookParamsWithoutLogin = {
      ...mockHookParams,
      isLogin: false,
    };

    const { result } = renderHook(() =>
      useAuthContent(mockHookParamsWithoutLogin),
    );

    act(() => result.current.submitHandler(dummyCredentialsWithNotEqualEmail));

    expect(spyAlert).toHaveBeenCalledTimes(1);
    expect(spyAlert).toHaveBeenCalledWith(
      "Invalid input",
      "Please check your entered credentials.",
    );

    expect(result.current.credentialsInvalid).toEqual({
      email: false,
      confirmEmail: true,
      password: false,
      confirmPassword: false,
    });

    expect(mockOnAuthenticate).not.toHaveBeenCalled();
  });

  it("does not send an alert when all fields are valid and call onAuthenticate", () => {
    const { result } = renderHook(() => useAuthContent(mockHookParams));

    act(() => result.current.submitHandler(dummyCredentialsWithNotEqualEmail));

    expect(spyAlert).not.toHaveBeenCalled();

    expect(result.current.credentialsInvalid).toEqual({
      email: false,
      confirmEmail: false,
      password: false,
      confirmPassword: false,
    });

    expect(mockOnAuthenticate).toHaveBeenCalledTimes(1);
  });
});
