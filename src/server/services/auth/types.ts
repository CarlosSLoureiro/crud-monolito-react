import { type User } from "@server/database/entities";

export type AuthServiceCreateTokensParams = {
  user: User;
  userAgent: string;
  ip: string;
};

export type AuthServiceRefreshTokensParams = {
  refreshToken: string;
};

export type AuthServiceLoginParams = {
  email: string;
  password: string;
  userAgent: string;
  ip: string;
};

export interface RefreshTokenInterface {
  id: number;
  hash: string;
}
