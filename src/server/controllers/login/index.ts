"use server";

import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { AuthService } from "@server/services/auth";

import { LoginRequest, LoginResponse } from "./types";

export const LoginController = async (request: Request) => {
  const params: LoginRequest = await request.json();
  const user = await AuthService.login();

  console.log(`user`, user);

  const response = {
    token: AuthService.getToken(),
    user: user,
  } satisfies LoginResponse;

  return NextResponse.json(response, { status: StatusCodes.OK });
};
