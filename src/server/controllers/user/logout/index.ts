"use server";

import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { AuthService } from "@server/services/auth";
import { getAuthenticatedUser } from "@server/utils/auth/getAuthenticatedUser";

import { type UserLogoutResponse } from "./types";

export const UserLogoutController = async (request: Request) => {
  const { session } = getAuthenticatedUser(request);

  await AuthService.logout({ session });

  const response = {
    message: `Você saiu com sucesso!`,
  } satisfies UserLogoutResponse;

  return NextResponse.json(response, { status: StatusCodes.OK });
};
