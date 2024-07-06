import CryptoJS from "crypto-js";

import { UserRepository } from "@server/database/repositories/user";

import { GenericError } from "@server/errors/generic";
import { ValidationError } from "@server/utils/validator/error";

import { type UserServiceChangePasswordParams, type UserServiceCreateParams } from "./types";

export abstract class UserService {
  private static validateEmail(email: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ValidationError(`email`, `Email inválido`);
    }
  }

  private static validatePassword(password: string) {
    if (password.length < 8) {
      throw new ValidationError(`password`, `A senha deve conter no mínimo 8 caracteres`);
    }

    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      throw new ValidationError(`password`, `A senha deve conter letras e números`);
    }
  }

  static async create({ name, email, password }: UserServiceCreateParams) {
    this.validateEmail(email);
    this.validatePassword(password);

    const user = await UserRepository.findByEmail(email);

    if (user) {
      throw new ValidationError(`email`, `Email já cadastrado`);
    }

    return await UserRepository.create({
      name,
      email,
      password: CryptoJS.SHA256(password).toString(),
    });
  }

  static async changePassword({
    id,
    currentPassword,
    newPassword,
    confirmNewPassword,
  }: UserServiceChangePasswordParams) {
    this.validatePassword(newPassword);

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
