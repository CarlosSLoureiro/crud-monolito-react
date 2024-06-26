"use server";

import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { AuthService } from "@server/services/auth";
import { getAuthenticatedUser } from "@server/utils/auth/getAuthenticatedUser";

import { type LogoutResponse } from "./types";

export const LogoutController = async (request: Request) => {
  const { session } = getAuthenticatedUser(request);

  await AuthService.logout({ session });

  const response = {
    message: `Você saiu com sucesso!`,
  } satisfies LogoutResponse;

  return NextResponse.json(response, { status: StatusCodes.OK });
};
