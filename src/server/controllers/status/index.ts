"use server";

import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { getDatabaseTimeUseCase } from "@server/usecases/getDatabaseTimeUseCase";

import { StatusResponse } from "./types";

export const StatusController = async (req: NextRequest) => {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());

  const status = await getDatabaseTimeUseCase({ params });

  const response = {
    message: `OK`,
    ...status,
  } satisfies StatusResponse;

  return NextResponse.json(response, { status: StatusCodes.OK });
};
