"use server";

import { Server } from "@server";
import { StatusController } from "@server/controllers/status";
import { AuthenticatedMiddleware } from "@server/middlewares/authenticated";

export const GET = Server.handle(AuthenticatedMiddleware, StatusController);
