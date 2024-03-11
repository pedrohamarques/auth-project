import type { onAuthenticateProps } from "@typings/credentials";

export type AuthContentProps = {
  isLogin?: boolean;
  onAuthenticate?: ({ email, password }: onAuthenticateProps) => void;
};
