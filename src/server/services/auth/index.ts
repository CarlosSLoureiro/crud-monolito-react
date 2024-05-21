import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { UserRepository } from "@server/database/repositories/user";
import { UserSessionRepository } from "@server/database/repositories/userSession";

import type { AuthenticatedUser } from "@server/middlewares/authenticated";
import { ValidationError } from "@server/utils/validator/error";

import type {
  AuthServiceCreateTokensParams,
  AuthServiceLoginParams,
  AuthServiceRefreshTokensParams,
  RefreshTokenInterface,
} from "./types";

export abstract class AuthService {
  static async createTokens({ user, userAgent, ip }: AuthServiceCreateTokensParams) {
    const { id, password } = user;
    const session = uuidv4();

    const authenticatedUser = { session, id, pw: password } satisfies AuthenticatedUser;

    const accessToken = jwt.sign(authenticatedUser, `SECRET`, {
      expiresIn: `15m`,
    });

    const userSession = await UserSessionRepository.create(user, {
      session,
      userAgent,
      ip,
    });

    const hash = CryptoJS.AES.encrypt(session, `SECRET`).toString();

    const refreshToken = jwt.sign(
      { id: userSession.id, hash } satisfies RefreshTokenInterface,
      `SECRET`,
      {
        expiresIn: `7d`,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  static async refreshTokens({ refreshToken }: AuthServiceRefreshTokensParams) {
    const { id, hash: oldSessionHash } = jwt.verify(
      refreshToken,
      `SECRET`,
    ) as RefreshTokenInterface;

    const session = await UserSessionRepository.findById(id);

    if (session) {
      const hash = CryptoJS.AES.encrypt(session.session, `SECRET`).toString();
      if (oldSessionHash === hash) {
        const user = await UserRepository.findById(session.userId);

        if (user) {
          const newSession = uuidv4();

          const authenticatedUser = {
            session: newSession,
            id: user.id,
            pw: user.password,
          } satisfies AuthenticatedUser;

          const accessToken = jwt.sign(authenticatedUser, `SECRET`, {
            expiresIn: `15m`,
          });

          await UserSessionRepository.update(session.session, {
            session: newSession,
          });

          const newHash = CryptoJS.AES.encrypt(newSession, `SECRET`).toString();

          const newRefreshToken = jwt.sign(
            { id: userSession.id, hash: newHash } satisfies RefreshTokenInterface,
            `SECRET`,
            {
              expiresIn: `7d`,
            },
          );

          return {
            accessToken,
            refreshToken: newRefreshToken,
          };
        }
      }
    }

    throw new Error(`Token de atualização inválido`);
  }

  static async login({ email, password, userAgent, ip }: AuthServiceLoginParams) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new ValidationError(`email`, `Usuário não encontrado`);
    }

    if (user.password !== password) {
      throw new ValidationError(`password`, `Senha inválida`);
    }

    const { accessToken, refreshToken } = await this.createTokens({
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
