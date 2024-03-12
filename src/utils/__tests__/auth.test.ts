import axios from "axios";
import { renderHook } from "@testing-library/react-native";
import MockAdapter from "axios-mock-adapter";

import { FIREBASE_API_TOKEN } from "@env";

import { useAuthRequests } from "@utils/auth";

const credentials = {
  email: "teste@email.com",
  password: "1234567",
};

const mockAxios = new MockAdapter(axios);

const createUserApi = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_TOKEN}`;
const signInUserApi = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_TOKEN}`;

describe("utils/auth/useAuthRequests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns token when createUser is called and the request is successful", async () => {
    const { result } = renderHook(() => useAuthRequests());

    mockAxios
      .onPost(createUserApi, { ...credentials, returnSecureToken: true })
      .reply(200, { idToken: "teste" });

    expect(
      await result.current.createUser(credentials.email, credentials.password),
    ).toBe("teste");
  });

  it("does not return a token when createUser is called and the request is not successful", async () => {
    const { result } = renderHook(() => useAuthRequests());

    mockAxios
      .onPost(createUserApi, { ...credentials, returnSecureToken: true })
      .reply(500);

    await expect(
      result.current.createUser(credentials.email, credentials.password),
    ).rejects.toThrow("Request failed with status code 500");
  });

  it("returns token when signInUSer is called and the request is successful", async () => {
    const { result } = renderHook(() => useAuthRequests());

    mockAxios
      .onPost(signInUserApi, { ...credentials, returnSecureToken: true })
      .reply(200, { idToken: "teste" });

    expect(
      await result.current.signInUser(credentials.email, credentials.password),
    ).toBe("teste");
  });

  it("does not return a token when signInUSer is called and the request is not successful", async () => {
    const { result } = renderHook(() => useAuthRequests());

    mockAxios
      .onPost(signInUserApi, { ...credentials, returnSecureToken: true })
      .reply(500);

    await expect(
      result.current.signInUser(credentials.email, credentials.password),
    ).rejects.toThrow("Request failed with status code 500");
  });
});
