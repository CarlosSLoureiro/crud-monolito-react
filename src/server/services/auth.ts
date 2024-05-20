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

  static async login() {
    return await UserRepository.findById(666);
  }
}
