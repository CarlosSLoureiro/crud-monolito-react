"use server";

import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { AuthService } from "@server/services/auth";
import { UserService } from "@server/services/user";
import { getAuthenticatedUser } from "@server/utils/auth/getAuthenticatedUser";

import { type ChangeUserPasswordRequest, type ChangeUserPasswordResponse } from "./types";

export const ChangeUserPasswordController = async (request: Request) => {
  const authenticatedUser = getAuthenticatedUser(request);
  const params: ChangeUserPasswordRequest = await request.json();

  const user = await UserService.changePassword({
    id: authenticatedUser.id,
    currentPassword: params.currentPassword,
    newPassword: params.newPassword,
    confirmNewPassword: params.confirmNewPassword,
  });

  AuthService.logout({ session: authenticatedUser.session });

  const { accessToken, refreshToken } = await AuthService.createTokens({
    user,
    userAgent: request.headers.get(`user-agent`) || ``,
    ip: request.headers.get(`cf-connecting-ip`) || ``,
  });

  const response = {
    accessToken,
    refreshToken,
  } satisfies ChangeUserPasswordResponse;

  return NextResponse.json(response, { status: StatusCodes.OK });
};
