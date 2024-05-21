import { Server } from "@server";
import { LoginController } from "@server/controllers/login";
import { LoginValidator } from "@server/controllers/login/validator";

export const dynamic = `force-dynamic`;

export const POST = Server.handle(LoginValidator, LoginController);
