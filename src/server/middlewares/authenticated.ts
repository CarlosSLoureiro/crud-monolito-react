import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import jwt, { TokenExpiredError } from "jsonwebtoken";

import { UserRepository } from "@server/database/repositories/user";
import { UserSessionRepository } from "@server/database/repositories/userSession";

export type AuthenticatedUser = {
  session: string;
  id: number;
  pw?: string;
};

export async function AuthenticatedMiddleware(request: Request) {
  const authorization = request.headers.get(`Authorization`);

  if (!authorization) {
    return NextResponse.json(
      { message: `Token de acesso não informado` },
      { status: StatusCodes.UNAUTHORIZED },
    );
  }

  const accessToken = authorization.split(`Bearer `)[1];

  try {
    const authenticatedUser = jwt.verify(accessToken, process.env.SECRET) as AuthenticatedUser;

    const session = await UserSessionRepository.findBySession(authenticatedUser.session);

    if (session && session.userId === authenticatedUser.id && !session.revoked) {
      const user = await UserRepository.findById(authenticatedUser.id);

      if (user && authenticatedUser.pw === user.password) {
        const userAgent = request.headers.get(`User-Agent`) || ``;
        const ip = (request.headers.get(`x-forwarded-for`) ?? `127.0.0.1`).split(`,`)[0];

        if (session.userAgent !== userAgent || session.ip !== ip) {
          UserSessionRepository.update(authenticatedUser.session, {
            userAgent,
            ip,
          });
        }
      } else {
        return NextResponse.json(
          { message: `Usuário inválido` },
          { status: StatusCodes.UNAUTHORIZED },
        );
      }
    } else {
      return NextResponse.json(
        { message: `Sessão inválida` },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return NextResponse.json(
        { message: `Token de acesso expirado` },
        { status: StatusCodes.UNAUTHORIZED },
      );
    }
    return NextResponse.json(
      { message: `Token de acesso inváido` },
      { status: StatusCodes.UNAUTHORIZED },
    );
  }
}
