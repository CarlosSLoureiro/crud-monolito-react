import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { UserRepository } from "@server/database/repositories/user";
import { UserSessionRepository } from "@server/database/repositories/userSession";

import type { AuthenticatedUser } from "@server/middlewares/authenticated";
import { ValidationError } from "@server/utils/validator/error";

import type { AuthServiceGetTokensParams, AuthServiceLoginParams } from "./types";

export abstract class AuthService {
  static async getTokens({ user, userAgent, ip }: AuthServiceGetTokensParams) {
    const { id, password } = user;
    const session = uuidv4();

    const authenticatedUser = { session, id, password } satisfies AuthenticatedUser;

    const accessToken = jwt.sign(authenticatedUser, `SECRET`, {
      expiresIn: `15m`,
    });

    const userSession = await UserSessionRepository.create(user, {
      session,
      userAgent,
      ip,
    });

    const hash = CryptoJS.AES.encrypt(session, `SECRET`).toString();

    const refreshToken = jwt.sign({ id: userSession.id, hash }, `SECRET`, {
      expiresIn: `7d`,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  static async login({ email, password, userAgent, ip }: AuthServiceLoginParams) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new ValidationError(`email`, `Usuário não encontrado`);
    }

    if (user.password !== password) {
      throw new ValidationError(`password`, `Senha inválida`);
    }

    const { accessToken, refreshToken } = await this.getTokens({
      user,
      userAgent,
      ip,
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
