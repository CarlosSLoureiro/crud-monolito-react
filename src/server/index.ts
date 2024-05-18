import { NextRequest, NextResponse } from "next/server";

import { ServerHandle } from "./types";

export abstract class Server {
  static handle(...handlers: ServerHandle[]) {
    return async (req: NextRequest) => {
      for (const handle of handlers) {
        try {
          const res = await handle(req);
          if (res) {
            return res;
          }
        } catch (error: any) {
          console.error(error);
          return NextResponse.json({ message: error.message });
        }
      }
    };
  }
}
