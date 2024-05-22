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

    const accessToken = jwt.sign(authenticatedUser, process.env.SECRET, {
      expiresIn: `1m`,
    });

    const userSession = await UserSessionRepository.create(user, {
      session,
      userAgent,
      ip,
    });

    const hash = CryptoJS.AES.encrypt(session, process.env.SECRET).toString();

    const refreshToken = jwt.sign(
      { id: userSession.id, hash } satisfies RefreshTokenInterface,
      process.env.SECRET,
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
    const { id, hash: encryptedSessionHash } = jwt.verify(
      refreshToken,
      process.env.SECRET,
    ) as RefreshTokenInterface;

    const session = await UserSessionRepository.findById(id);

    if (session) {
      const sessionHash = session.session;
      const decryptedHash = CryptoJS.AES.decrypt(encryptedSessionHash, process.env.SECRET).toString(
        CryptoJS.enc.Utf8,
      );

      if (decryptedHash === sessionHash) {
        const user = await UserRepository.findById(session.userId);

        if (user) {
          const newSession = uuidv4();

          const authenticatedUser = {
            session: newSession,
            id: user.id,
            pw: user.password,
          } satisfies AuthenticatedUser;

          const accessToken = jwt.sign(authenticatedUser, process.env.SECRET, {
            expiresIn: `1m`,
          });

          await UserSessionRepository.update(sessionHash, {
            session: newSession,
          });

          const newHash = CryptoJS.AES.encrypt(newSession, process.env.SECRET).toString();

          const newRefreshToken = jwt.sign(
            { id, hash: newHash } satisfies RefreshTokenInterface,
            process.env.SECRET,
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
