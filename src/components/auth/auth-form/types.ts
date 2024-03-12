import { CredentialProps } from "@typings/credentials";

type IsInvalidProps<T> = {
  [Property in keyof T]: boolean;
};

export type useAuthFormProps = Pick<AuthFormProps, "onSubmit">;

export type AuthFormProps = {
  isLogin?: boolean;
  onSubmit: ({
    confirmEmail,
    confirmPassword,
    email,
    password,
  }: CredentialProps) => void;
  credentialsInvalid: IsInvalidProps<CredentialProps>;
  testID?: string;
};
