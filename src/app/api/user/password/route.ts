import { Server } from "@server";
import { ChangeUserPasswordController } from "@server/controllers/user/change-password";
import { AuthenticatedMiddleware } from "@server/middlewares/authenticated";

export const dynamic = `force-dynamic`;

export const POST = Server.handle(AuthenticatedMiddleware, ChangeUserPasswordController);
