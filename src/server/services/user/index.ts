import CryptoJS from "crypto-js";

import { UserRepository } from "@server/database/repositories/user";

import { GenericError } from "@server/errors/generic";
import { ValidationError } from "@server/utils/validator/error";

import { type UserServiceChangePasswordParams } from "./types";

export abstract class UserService {
  static async changePassword({
    id,
    currentPassword,
    newPassword,
    confirmNewPassword,
  }: UserServiceChangePasswordParams) {
    if (newPassword.length < 8) {
      throw new ValidationError(`newPassword`, `A senha deve conter no mínimo 8 caracteres`);
    }

    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      throw new ValidationError(`newPassword`, `A senha deve conter letras e números`);
    }

    if (newPassword !== confirmNewPassword) {
      throw new ValidationError(`confirmNewPassword`, `As senhas não coincidem`);
    }

    const user = await UserRepository.findById(id);

    if (!user) {
      throw new GenericError(`Usuário não encontrado`);
    }

    if (user.password !== CryptoJS.SHA256(currentPassword).toString()) {
      throw new ValidationError(`currentPassword`, `A senha atual está incorreta`);
    }

    return await UserRepository.updatePassword(user, CryptoJS.SHA256(newPassword).toString());
  }
}
