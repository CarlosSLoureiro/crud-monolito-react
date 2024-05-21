"use server";

import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { AuthService } from "@server/services/auth";

import { type LoginRequest, type LoginResponse } from "./types";

export const LoginController = async (request: Request) => {
  const params: LoginRequest = await request.json();

  const { accessToken, refreshToken, user } = await AuthService.login({
    email: params.email,
    password: params.password,
    userAgent: request.headers.get(`User-Agent`) || ``,
    ip: (request.headers.get(`x-forwarded-for`) ?? `127.0.0.1`).split(`,`)[0],
  });

  const response = {
    accessToken,
    refreshToken,
    user,
  } satisfies LoginResponse;

  return NextResponse.json(response, { status: StatusCodes.OK });
};
