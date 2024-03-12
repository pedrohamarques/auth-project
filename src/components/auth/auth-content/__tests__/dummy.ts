export const dummyCredentialsWithEmailError = {
  email: "teste",
  password: "1234567",
  confirmPassword: "1234567",
  confirmEmail: "teste",
};

export const dummyCredentialsWithPasswordError = {
  email: "teste@email.com",
  password: "12345",
  confirmPassword: "12345",
  confirmEmail: "teste@email.com",
};

export const dummyCredentialsWithNotEqualEmail = {
  email: "teste1@email.com",
  password: "1234567",
  confirmPassword: "1234567",
  confirmEmail: "teste@email.com",
};
