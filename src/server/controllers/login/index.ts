"use server";

import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { AuthService } from "@server/services/auth";

import { type LoginRequest, type LoginResponse } from "./types";

export const LoginController = async (request: Request) => {
  const params: LoginRequest = await request.json();

  const { token, user } = await AuthService.login(params.email, params.password);

  const response = {
    token,
    user,
  } satisfies LoginResponse;

  return NextResponse.json(response, { status: StatusCodes.OK });
};
