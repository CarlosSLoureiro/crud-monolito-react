export type UserServiceCreateParams = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserServiceChangePasswordParams = {
  id: number;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
