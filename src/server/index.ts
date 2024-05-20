import { type NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import type { ServerHandle } from "./types";

export abstract class Server {
  static handle(...handlers: ServerHandle[]) {
    return async (req: NextRequest) => {
      for (const handle of handlers) {
        try {
          const res = await handle(req.clone());
          if (res) {
            return res;
          }
        } catch (error: any) {
          console.error(error);
          return NextResponse.json(
            { message: error.message },
            { status: error.code || StatusCodes.INTERNAL_SERVER_ERROR },
          );
        }
      }
    };
  }
}
