import { act, renderHook } from "@testing-library/react-native";

import { useWelcomeScreen } from "../welcome-screen.hook";

const mockOnLogout = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => ({
    logout: mockOnLogout,
  }),
}));

describe("screens/welcome-screen/useWelcomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("logs out of the user when onLogoutHandler is called", () => {
    const { result } = renderHook(() => useWelcomeScreen());

    act(() => result.current.onLogoutHandler());

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });
});
