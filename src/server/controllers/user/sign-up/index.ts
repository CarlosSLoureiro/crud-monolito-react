"use server";

import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { AuthService } from "@server/services/auth";
import { UserService } from "@server/services/user";

import { type UserSignUpRequest, type UserSignUpResponse } from "./types";

export const UserSignUpController = async (request: Request) => {
  const params: UserSignUpRequest = await request.json();

  const user = await UserService.create({
    name: params.name,
    email: params.email,
    password: params.password,
    confirmPassword: params.confirmPassword,
  });

  const { accessToken, refreshToken } = await AuthService.login({
    email: params.email,
    password: params.password,
    userAgent: request.headers.get(`User-Agent`) || ``,
    ip: (request.headers.get(`x-forwarded-for`) ?? `127.0.0.1`).split(`,`)[0],
  });

  const response = {
    accessToken,
    refreshToken,
    user,
  } satisfies UserSignUpResponse;

  return NextResponse.json(response, { status: StatusCodes.OK });
};
