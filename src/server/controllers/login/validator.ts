import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { z } from "@server/utils/validator";
import { INVALID_BODY } from "@server/utils/validator/messages";

import { LoginRequest } from "./types";

export const LoginValidator = async (request: Request) => {
  try {
    const params: LoginRequest = await request.json();

    const scheme = z.object({
      email: z.string().email(),
      password: z.string(),
    } satisfies Record<keyof LoginRequest, any>);

    const result = scheme.safeParse(params);

    if (!result.success) {
      return NextResponse.json(result.error.format(), { status: StatusCodes.BAD_REQUEST });
    }
  } catch (error: any) {
    return NextResponse.json({ message: INVALID_BODY }, { status: StatusCodes.BAD_REQUEST });
  }
};
