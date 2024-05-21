"use server";

import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { AuthService } from "@server/services/auth";

import { type RefreshTokenRequest, type RefreshTokenResponse } from "./types";

export const RefreshTokenController = async (request: Request) => {
  const params: RefreshTokenRequest = await request.json();

  const { accessToken, refreshToken } = await AuthService.refreshTokens({
    refreshToken: params.token,
  });

  const response = {
    accessToken,
    refreshToken,
  } satisfies RefreshTokenResponse;

  return NextResponse.json(response, { status: StatusCodes.OK });
};
