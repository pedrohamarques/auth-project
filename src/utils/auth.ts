import axios from "axios";
import { FIREBASE_API_TOKEN } from "@env";
import { AuthResponse } from "./types";

export function useAuthRequests() {
  async function createUser(email: string, password: string) {
    const response = await axios.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_TOKEN}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
    );

    const token = response.data.idToken;

    return token;
  }

  async function signInUser(email: string, password: string) {
    const response = await axios.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_TOKEN}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
    );

    const token = response.data.idToken;

    return token;
  }

  return {
    createUser,
    signInUser,
  };
}
