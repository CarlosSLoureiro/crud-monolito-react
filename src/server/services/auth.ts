import jwt from "jsonwebtoken";

import type { User } from "@server/database/entities/user";
import { UserRepository } from "@server/database/repositories/user";

import { ValidationError } from "@server/utils/validator/error";

export abstract class AuthService {
  static getToken(user: User): string {
    const { id, password } = user;
    return jwt.sign({ id, password }, `SECRET`, { expiresIn: `7d` });
  }

  static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new ValidationError(`Usuário não encontrado`, `email`);
    }

    if (user.password !== password) {
      throw new ValidationError(`Senha inválida`, `password`);
    }

    return {
      token: this.getToken(user),
      user,
    };
  }
}
