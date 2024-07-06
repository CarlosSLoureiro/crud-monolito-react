import type { PublicUserData } from "@client/utils/auth/types";

export type UserSignUpRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserSignUpResponse = {
  accessToken: string;
  refreshToken: string;
  user: PublicUserData;
};
