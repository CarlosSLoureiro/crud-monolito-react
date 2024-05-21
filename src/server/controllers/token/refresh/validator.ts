import { validate, z } from "@server/utils/validator";

import { type RefreshTokenRequest } from "./types";

export const RefreshTokenValidator = async (request: Request) =>
  validate<RefreshTokenRequest>(
    {
      token: z.string(),
    },
    await request.json(),
  );
