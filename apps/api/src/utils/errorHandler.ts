export const __ERRORCODES__ = {
  EmailAlreadyExists: {
    code: 409,
    path: "Email",
    message: "Email already exists",
  },
  UsernameAlreadyExists: {
    code: 409,
    path: "Username",
    message: "Username already exists",
  },
  EmailRequired: {
    code: 400,
    path: "Email",
    message: "Email is required to login",
  },
  AccountLocked: {
    code: 403,
    path: "User",
    message: "Account is locked.",
  },
  ConfirmEmail: {
    code: 403,
    path: "Email",
    message: "Please confirm your email.",
  },
  BadPassword: {
    code: 401,
    path: "Password",
    message: "Bad password.",
  },
  NoUserWithEmail: {
    code: 404,
    path: "Email",
    message: "No user with given mail.",
  },
  InvalidPasskey: {
    code: 401,
    path: "Passkey",
    message: "Passkey Invalid.",
  },
  LoginRequired: {
    code: 401,
    path: "User",
    message: "Please login to continue",
  },
  InternalServerError: {
    code: 500,
    path: "Server",
    message: "Internal Server Error",
  },
};
