export type UserServiceChangePasswordParams = {
  id: number;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
