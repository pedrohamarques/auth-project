import { act, renderHook, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

import { useNavigationRoutes } from "@routes/navigation.hook";

const mockAuthenticate = jest.fn();

const mockUseContext = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => mockUseContext(),
}));

const mockHideAsync = jest.fn();

jest.mock("expo-splash-screen", () => ({
  hideAsync: () => mockHideAsync(),
  preventAutoHideAsync: jest.fn(),
}));

describe("routes/useNavigationRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseContext.mockReturnValue({
      isAuthenticated: false,
      authenticate: mockAuthenticate,
    });
  });

  it("fetches token and authenticate when the hook is called", async () => {
    renderHook(() => useNavigationRoutes());

    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("token");
  });

  it("authenticate when is there a token saved in the device when the hook is called", async () => {
    jest.spyOn(AsyncStorage, "getItem").mockResolvedValueOnce("testToken");

    const { result, rerender } = renderHook(() => useNavigationRoutes());

    expect(result.current.appIsReady).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);

    waitFor(() => expect(mockAuthenticate).toHaveBeenCalledTimes(1));
    waitFor(() => expect(mockAuthenticate).toHaveBeenCalledWith("testToken"));

    waitFor(() => expect(result.current.appIsReady).toBe(true));

    act(() => rerender(1));
  });

  it("does not authenticate when there is not a token saved", () => {
    jest.spyOn(AsyncStorage, "getItem").mockResolvedValueOnce(null);

    const { result } = renderHook(() => useNavigationRoutes());

    expect(result.current.appIsReady).toBe(false);

    expect(mockAuthenticate).not.toHaveBeenCalled();

    waitFor(() => expect(result.current.appIsReady).toBe(true));

    expect(result.current.isAuthenticated).toBe(false);
  });

  it("calls the hideAsync function when the app is ready", () => {
    jest.spyOn(AsyncStorage, "getItem").mockResolvedValueOnce("testToken");

    const { result } = renderHook(() => useNavigationRoutes());

    waitFor(() => expect(result.current.appIsReady).toBe(true));

    waitFor(() => expect(mockHideAsync).toHaveBeenCalledTimes(1));
  });
});
