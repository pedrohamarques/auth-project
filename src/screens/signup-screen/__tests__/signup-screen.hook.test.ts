import { act, renderHook } from "@testing-library/react-native";
import { useSignUpScreen } from "../signup-screen.hook";
import { Alert } from "react-native";

const credentials = {
  email: "teste@teste.com",
  password: "1234567",
};

const mockCreateUser = jest.fn();

jest.mock("@utils/auth", () => ({
  useAuthRequests: () => ({
    createUser: mockCreateUser,
  }),
}));

const mockUseContext = jest.fn();
const mockAuthenticate = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => mockUseContext(),
}));

const spyAlert = jest.spyOn(Alert, "alert");

describe("screens/signup-screen/useSignUpScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseContext.mockReturnValue({
      authenticate: mockAuthenticate,
    });
  });

  it("returns isAuthenticating as false when hook is called", () => {
    const { result } = renderHook(() => useSignUpScreen());

    expect(result.current.isAuthenticating).toBe(false);
  });

  it("authenticates the user when signUpHandler is called with valid token", async () => {
    const { result } = renderHook(() => useSignUpScreen());

    expect(result.current.isAuthenticating).toBe(false);

    await act(async () => result.current.signUpHandler(credentials));

    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(mockCreateUser).toHaveBeenCalledWith(
      credentials.email,
      credentials.password,
    );

    expect(mockAuthenticate).toHaveBeenCalledTimes(1);

    expect(spyAlert).not.toHaveBeenCalled();
  });

  it("does not authenticate the user when there is an error with the request", async () => {
    mockCreateUser.mockRejectedValue("Error");

    const { result } = renderHook(() => useSignUpScreen());

    await act(async () => result.current.signUpHandler(credentials));

    expect(mockAuthenticate).not.toHaveBeenCalled();

    expect(spyAlert).toHaveBeenCalledTimes(1);
    expect(spyAlert).toHaveBeenLastCalledWith(
      "Authentication failed",
      " Could not create user, please check your input and try again later.",
    );

    expect(result.current.isAuthenticating).toBe(false);
  });
});
