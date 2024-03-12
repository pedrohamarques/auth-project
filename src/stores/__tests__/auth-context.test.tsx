import React from "react";
import { Text } from "react-native";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

import { AuthContextProvider, AuthContext } from "@stores/auth-context";

import { Button } from "@components/ui";

const renderComponent = (
  <AuthContextProvider>
    <AuthContext.Consumer>
      {(value) => (
        <>
          <Button onPress={value.logout}>Button 1</Button>
          <Button onPress={() => value.authenticate("token")}>Button 2</Button>
          <Text>{value.token ? value.token : "null"}</Text>
          <Text>{value.isAuthenticated ? "true" : "false"}</Text>
        </>
      )}
    </AuthContext.Consumer>
  </AuthContextProvider>
);

describe("store/auth-context/<authContextProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders component properly", () => {
    render(renderComponent);

    expect(screen.getByText("null")).toBeTruthy();
    expect(screen.getByText("false")).toBeTruthy();
    expect(screen.getByText("Button 1")).toBeTruthy();
    expect(screen.getByText("Button 2")).toBeTruthy();
  });

  it("saves token in device when authenticate is called", () => {
    render(renderComponent);

    fireEvent.press(screen.getByText("Button 2"));

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("token", "token");

    waitFor(() => expect(screen.getByText("true")).toBeTruthy());
  });

  it("removes token in device when logout is called", () => {
    render(renderComponent);

    fireEvent.press(screen.getByText("Button 1"));

    expect(AsyncStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("token");

    waitFor(() => expect(screen.getByText("null")).toBeTruthy());
  });
});
