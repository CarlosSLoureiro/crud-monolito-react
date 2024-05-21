import { type User } from "@server/database/entities/user";

export type AuthServiceGetTokensParams = {
  user: User;
  userAgent: string;
  ip: string;
};

export type AuthServiceLoginParams = {
  email: string;
  password: string;
  userAgent: string;
  ip: string;
};
