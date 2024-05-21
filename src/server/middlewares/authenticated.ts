import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export type AuthenticatedUser = {
  session: string;
  id: number;
  password?: string;
};

export async function AuthenticatedMiddleware(request: Request) {
  const authorization = request.headers.get(`Authorization`);

  if (!authorization) {
    return NextResponse.json(
      { message: `Token de acesso não informado` },
      { status: StatusCodes.UNAUTHORIZED },
    );
  }

  try {
    const authenticatedUser = jwt.verify(authorization, `SECRET`) as AuthenticatedUser;
    return NextResponse.json({ authenticatedUser }, { status: StatusCodes.UNAUTHORIZED });
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
