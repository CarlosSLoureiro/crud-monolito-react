import { Server } from "@server";
import { LogoutController } from "@server/controllers/logout";
import { AuthenticatedMiddleware } from "@server/middlewares/authenticated";

export const dynamic = `force-dynamic`;

export const POST = Server.handle(AuthenticatedMiddleware, LogoutController);
