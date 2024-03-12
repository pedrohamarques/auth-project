import { act, renderHook } from "@testing-library/react-native";
import { useLoginScreen } from "../login-screen.hook";
import { Alert } from "react-native";

const credentials = {
  email: "teste@teste.com",
  password: "1234567",
};

const mockSignInUSer = jest.fn();

jest.mock("@utils/auth", () => ({
  useAuthRequests: () => ({
    signInUser: mockSignInUSer,
  }),
}));

const mockUseContext = jest.fn();
const mockAuthenticate = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => mockUseContext(),
}));

const spyAlert = jest.spyOn(Alert, "alert");

describe("screens/login-screen/useLoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseContext.mockReturnValue({
      authenticate: mockAuthenticate,
    });
  });

  it("returns isAuthenticating as false when hook is called", () => {
    const { result } = renderHook(() => useLoginScreen());

    expect(result.current.isAuthenticating).toBe(false);
  });

  it("authenticates the user when signInHandler is called with valid token", async () => {
    const { result } = renderHook(() => useLoginScreen());

    expect(result.current.isAuthenticating).toBe(false);

    await act(async () => result.current.signInHandler(credentials));

    expect(mockSignInUSer).toHaveBeenCalledTimes(1);
    expect(mockSignInUSer).toHaveBeenCalledWith(
      credentials.email,
      credentials.password,
    );

    expect(mockAuthenticate).toHaveBeenCalledTimes(1);

    expect(spyAlert).not.toHaveBeenCalled();
  });

  it("does not authenticate the user when there is an error with the request", async () => {
    mockSignInUSer.mockRejectedValue("Error");

    const { result } = renderHook(() => useLoginScreen());

    await act(async () => result.current.signInHandler(credentials));

    expect(mockAuthenticate).not.toHaveBeenCalled();

    expect(spyAlert).toHaveBeenCalledTimes(1);
    expect(spyAlert).toHaveBeenLastCalledWith(
      "Authentication failed!",
      " Could not log you in. Please check your credentials or try again later!",
    );

    expect(result.current.isAuthenticating).toBe(false);
  });
});
