import type { CredentialProps } from "@typings/credentials";

type onAuthenticateProps = Pick<CredentialProps, "email" | "password">;

export type AuthContentProps = {
  isLogin: boolean;
  onAuthenticate: ({ email, password }: onAuthenticateProps) => void;
};
