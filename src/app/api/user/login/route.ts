import { Server } from "@server";
import { UserLoginController } from "@server/controllers/user/login";
import { LoginValidator } from "@server/controllers/user/login/validator";

export const dynamic = `force-dynamic`;

export const POST = Server.handle(LoginValidator, UserLoginController);
