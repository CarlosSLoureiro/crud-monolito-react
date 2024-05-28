"use server";

import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import type { AuthenticatedUser } from "@server/middlewares/authenticated";
import { AuthService } from "@server/services/auth";

import { type LogoutResponse } from "./types";

export const LogoutController = async (request: Request) => {
  const authorization = request.headers.get(`Authorization`) || ``;
  const accessToken = authorization.split(`Bearer `)[1];
  const authenticatedUser = jwt.verify(accessToken, process.env.SECRET) as AuthenticatedUser;
  const { session } = authenticatedUser;

  await AuthService.logout({ session });

  const response = {
    message: `Você saiu com sucesso!`,
  } satisfies LogoutResponse;

  return NextResponse.json(response, { status: StatusCodes.OK });
};
