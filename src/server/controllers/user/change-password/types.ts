export type ChangeUserPasswordRequest = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type ChangeUserPasswordResponse = {
  accessToken: string;
  refreshToken: string;
};
