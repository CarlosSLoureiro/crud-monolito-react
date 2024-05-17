'use server'

import { AuthenticatedMiddleware } from '@server/middlewares/authenticated';
import { Server } from '@server';
import { StatusController } from '@server/controllers/status';

export const GET = Server.handle(AuthenticatedMiddleware, StatusController);
