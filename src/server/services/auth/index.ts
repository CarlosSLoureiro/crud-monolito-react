import CryptoJS from "crypto-js";
import { StatusCodes } from "http-status-codes";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { UserRepository } from "@server/database/repositories/user";
import { UserSessionRepository } from "@server/database/repositories/userSession";

import { GenericError } from "@server/errors/generic";
import type { AuthenticatedUser } from "@server/middlewares/authenticated";
import { ValidationError } from "@server/utils/validator/error";

import type {
  AuthServiceCreateTokensParams,
  AuthServiceLoginParams,
  AuthServiceRefreshTokensParams,
  RefreshTokenInterface,
} from "./types";

const ACCESS_TOKEN_EXPIRES = `15m`;
const REFRESH_TOKEN_EXPIRES = `7d`;

export abstract class AuthService {
  static async createTokens({ user, userAgent, ip }: AuthServiceCreateTokensParams) {
    const { id, password } = user;
    const session = uuidv4();

    const authenticatedUser = { session, id, pw: password } satisfies AuthenticatedUser;

    const accessToken = jwt.sign(authenticatedUser, process.env.SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES,
    });

    const userSession = await UserSessionRepository.create(user, {
      session,
      userAgent,
      ip,
    });

    const hash = CryptoJS.AES.encrypt(session, process.env.SECRET).toString();

    const refreshToken = jwt.sign(
      { id: userSession.id, hash, pw: password } satisfies RefreshTokenInterface,
      process.env.SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRES,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  static async refreshTokens({ refreshToken }: AuthServiceRefreshTokensParams) {
    try {
      const {
        id,
        hash: encryptedSessionHash,
        pw: password,
      } = jwt.verify(refreshToken, process.env.SECRET) as RefreshTokenInterface;

      const session = await UserSessionRepository.findById(id);

      if (session) {
        const sessionHash = session.session;
        const decryptedHash = CryptoJS.AES.decrypt(
          encryptedSessionHash,
          process.env.SECRET,
        ).toString(CryptoJS.enc.Utf8);

        if (decryptedHash === sessionHash) {
          const user = await UserRepository.findById(session.userId);

          if (user) {
            const authenticatedUser = {
              session: sessionHash,
              id: user.id,
              pw: user.password,
            } satisfies AuthenticatedUser;

            const accessToken = jwt.sign(authenticatedUser, process.env.SECRET, {
              expiresIn: ACCESS_TOKEN_EXPIRES,
            });

            if (password !== user.password) {
              throw new GenericError(`Senha inválida`, StatusCodes.UNAUTHORIZED);
            }

            const newHash = CryptoJS.AES.encrypt(sessionHash, process.env.SECRET).toString();

            const newRefreshToken = jwt.sign(
              { id, hash: newHash, pw: user.password } satisfies RefreshTokenInterface,
              process.env.SECRET,
              {
                expiresIn: REFRESH_TOKEN_EXPIRES,
              },
            );

            UserSessionRepository.update(sessionHash, {
              updatedAt: new Date(),
            });

            return {
              accessToken,
              refreshToken: newRefreshToken,
            };
          }
        }
      }
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new GenericError(`Token de atualização expirado`, StatusCodes.UNAUTHORIZED);
      }
      throw new GenericError(`Token de atualização inváido`, StatusCodes.UNAUTHORIZED);
    }

    throw new GenericError(`Token de atualização inválido`, StatusCodes.UNAUTHORIZED);
  }

  static async login({ email, password, userAgent, ip }: AuthServiceLoginParams) {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new ValidationError(`email`, `Usuário não encontrado`);
    }

    if (user.password !== CryptoJS.SHA256(password).toString()) {
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
      user: {
        id: user.id,
        name: user.name,
      },
    };
  }

  static async logout({ session }: Pick<AuthenticatedUser, `session`>) {
    await UserSessionRepository.revoke(session);
  }
}
