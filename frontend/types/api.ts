export type SignupRequest = {
  user: {
    email: string;
    password: string;
    passwordConfirmation: string;
  };
};
export type SignupResponse = {
  user: {
    id: number;
    email: string;
  };
};
export type LoginRequest = {
  user: {
    email: string;
    password: string;
  };
};
export type LoginResponse = {
  user: {
    id: number;
    email: string;
  };
};
