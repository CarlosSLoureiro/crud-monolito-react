import * as Sentry from "@sentry/nextjs";
import { type NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

import type { ServerHandle } from "./types";

import { GenericError } from "./errors/generic";
import { ValidationError } from "./utils/validator/error";

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
          if (error instanceof ValidationError) {
            return NextResponse.json(error.format(), { status: error.code });
          }

          if (error instanceof GenericError) {
            return NextResponse.json({ message: error.message }, { status: error.code });
          }

          if (process.env.NODE_ENV === `production`) {
            Sentry.captureException(error);
            return NextResponse.json(
              { message: `Houve um erro erro inesperado` },
              { status: StatusCodes.INTERNAL_SERVER_ERROR },
            );
          }

          console.log(error);

          return NextResponse.json(
            { message: error.message },
            { status: StatusCodes.INTERNAL_SERVER_ERROR },
          );
        }
      }
    };
  }
}
