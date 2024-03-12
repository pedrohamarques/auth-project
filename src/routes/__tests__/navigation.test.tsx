import React from "react";
import { render, screen } from "@testing-library/react-native";

import { Navigation } from "@routes/navigation";

const mockUseNavigationRoutes = jest.fn();

const mockHookValues = {
  appIsReady: true,
  isAuthenticated: false,
};

jest.mock("../navigation.hook", () => ({
  useNavigationRoutes: () => mockUseNavigationRoutes(),
}));

describe("routes/<Navigation />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNavigationRoutes.mockReturnValue(mockHookValues);
  });

  it("renders login screen when it is not authenticated", () => {
    render(<Navigation />);

    expect(screen.getByText("Email Address")).toBeTruthy();

    expect(screen.queryByText("Welcome!")).toBeNull();
  });

  it("renders welcome screen when it is authenticated", () => {
    const mockAuthenticated = {
      ...mockHookValues,
      isAuthenticated: true,
    };

    mockUseNavigationRoutes.mockReturnValueOnce(mockAuthenticated);

    render(<Navigation />);

    expect(screen.queryByText("Email Address")).toBeNull();

    expect(screen.getByText("Welcome!")).toBeTruthy();
  });

  it("renders nothing when app is not ready", () => {
    const mockAuthenticated = {
      ...mockHookValues,
      appIsReady: false,
    };

    mockUseNavigationRoutes.mockReturnValueOnce(mockAuthenticated);

    render(<Navigation />);

    expect(screen.queryByText("Email Address")).toBeNull();

    expect(screen.queryByText("Welcome!")).toBeNull();
  });
});
