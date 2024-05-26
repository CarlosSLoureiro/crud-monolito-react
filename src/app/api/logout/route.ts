import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import { Server } from "@server";

export const dynamic = `force-dynamic`;

export const POST = Server.handle(
  () => NextResponse.json({ message: `FAKE ERROR!` }, { status: StatusCodes.BAD_REQUEST }) as any,
);
