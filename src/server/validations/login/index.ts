import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { INVALID_BODY } from "../messages";
import { z } from "..";

export const LoginValidator = async (request: NextRequest) => {
  try {
    const params = await request.json();

    const scheme = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const result = scheme.safeParse(params);

    if (!result.success) {
      return NextResponse.json(result.error.format(), { status: StatusCodes.BAD_REQUEST });
    }
  } catch (error: any) {
    return NextResponse.json({ message: INVALID_BODY }, { status: StatusCodes.BAD_REQUEST });
  }
};
