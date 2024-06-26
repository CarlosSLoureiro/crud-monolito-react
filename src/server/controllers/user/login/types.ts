import type { PublicUserData } from "@client/utils/auth/types";

export type UserLoginRequest = {
  email: string;
  password: string;
};

export type UserLoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: PublicUserData;
};
