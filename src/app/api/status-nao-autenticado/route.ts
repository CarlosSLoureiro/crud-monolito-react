import { Server } from "@server";
import { StatusController } from "@server/controllers/status";

export const dynamic = `force-dynamic`;

export const GET = Server.handle(StatusController);
