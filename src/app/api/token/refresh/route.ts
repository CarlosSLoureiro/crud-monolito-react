import { Server } from "@server";
import { RefreshTokenController } from "@server/controllers/token/refresh";
import { RefreshTokenValidator } from "@server/controllers/token/refresh/validator";

export const dynamic = `force-dynamic`;

export const POST = Server.handle(RefreshTokenValidator, RefreshTokenController);
