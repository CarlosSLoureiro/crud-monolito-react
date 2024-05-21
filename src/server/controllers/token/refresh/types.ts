export type RefreshTokenRequest = {
  token: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
