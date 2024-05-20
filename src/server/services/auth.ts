import jwt from "jsonwebtoken";

import { UserRepository } from "@server/database/repositories/user";

export abstract class AuthService {
  static getToken(): string {
    const authenticatedUser = {
      id: 666,
      password: `senha`,
    };

    return jwt.sign(authenticatedUser, `SECRET`, { expiresIn: `7d` });
  }

  static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new Error(`Usuário não encontrado`);
    }

    if (user.password !== password) {
      throw new Error(`Senha inválida`);
    }

    return user;
  }
}
