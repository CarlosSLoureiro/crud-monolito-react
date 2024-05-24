import type { PublicUserData } from "@client/utils/auth/types";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: PublicUserData;
};
