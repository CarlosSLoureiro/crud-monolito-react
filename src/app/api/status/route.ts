import { Server } from "@server";
import { StatusController } from "@server/controllers/status";
import { AuthenticatedMiddleware } from "@server/middlewares/authenticated";

export const dynamic = `force-dynamic`;

export const GET = Server.handle(AuthenticatedMiddleware, StatusController);
