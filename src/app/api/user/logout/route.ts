import { Server } from "@server";
import { UserLogoutController } from "@server/controllers/user/logout";
import { AuthenticatedMiddleware } from "@server/middlewares/authenticated";

export const dynamic = `force-dynamic`;

export const POST = Server.handle(AuthenticatedMiddleware, UserLogoutController);
