import { NextRequest, NextResponse } from "next/server";

export type ServerHandleResponse<T = any> = Promise<NextResponse<T> | void>;

export type ServerHandle = (req: NextRequest) => ServerHandleResponse;
