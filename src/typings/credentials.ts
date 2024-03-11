export type CredentialProps = {
  email: string;
  password: string;
  confirmEmail: string;
  confirmPassword: string;
};

export type onAuthenticateProps = Pick<CredentialProps, "email" | "password">;
