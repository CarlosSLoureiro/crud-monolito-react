"use server";

import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { StatusService } from "@server/services/status";

import { StatusResponse } from "./types";

export const StatusController = async (request: Request) => {
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());

  const status = await StatusService.getDatabaseTime();

  const response = {
    message: `OK`,
    ...status,
    params,
  } satisfies StatusResponse;

  return NextResponse.json(response, { status: StatusCodes.OK });
};
