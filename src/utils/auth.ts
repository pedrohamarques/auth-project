import axios from "axios";
import { FIREBASE_API_TOKEN } from "@env";

export function useAuthRequests() {
  async function createUser(email: string, password: string) {
    await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_TOKEN}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
    );
  }

  async function signInUser(email: string, password: string) {
    await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_TOKEN}`,
      {
        email,
        password,
        returnSecureToken: true,
      },
    );
  }

  return {
    createUser,
    signInUser,
  };
}
