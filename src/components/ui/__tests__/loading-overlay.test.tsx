import React from "react";
import { render, screen } from "@testing-library/react-native";

import { LoadingOverlay } from "../loading-overlay";

describe("components/ui/loading-overlay/<LoadingOverlay />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component properly", () => {
    render(<LoadingOverlay message="Error" />);

    expect(screen.getByText("Error")).toBeTruthy();
    expect(
      screen.getByTestId("components.ui.loading-overlay.activity-indicator"),
    ).toBeTruthy();
  });
});
