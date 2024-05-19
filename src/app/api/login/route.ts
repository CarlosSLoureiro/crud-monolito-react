import { Server } from "@server";
import { LoginController } from "@server/controllers/login";
import { LoginValidator } from "@server/validations/login";

export const dynamic = `force-dynamic`;

export const POST = Server.handle(LoginValidator, LoginController);
