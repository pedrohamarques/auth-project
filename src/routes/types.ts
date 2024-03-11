export enum AuthRoutes {
  LOGIN = "Login",
  SIGNUP = "SignUp",
}

export enum PrivateRoutes {
  WELCOME = "Welcome",
}

export type AuthRoutesNavigation = {
  [AuthRoutes.LOGIN]: undefined;
  [AuthRoutes.SIGNUP]: undefined;
};

export type PrivateRoutesNavigation = {
  [PrivateRoutes.WELCOME]: undefined;
};
