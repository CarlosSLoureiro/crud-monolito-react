import { Server } from "@server";
import { UserSignUpController } from "@server/controllers/user/sign-up";
import { SignUpValidator } from "@server/controllers/user/sign-up/validator";

export const dynamic = `force-dynamic`;

export const POST = Server.handle(SignUpValidator, UserSignUpController);
