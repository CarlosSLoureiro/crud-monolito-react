"use server";

import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { LoginResponse } from "./types";

export const LoginController = async (request: NextRequest) => {
  const response = {
    token: `jwt token`,
    user: {
      name: `Carlos Loureiro`,
    },
  } satisfies LoginResponse;

  return NextResponse.json(response, { status: StatusCodes.OK });
};
