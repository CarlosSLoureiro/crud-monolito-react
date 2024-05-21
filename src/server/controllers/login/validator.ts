import { validate, z } from "@server/utils/validator";

import { type LoginRequest } from "./types";

export const LoginValidator = async (request: Request) =>
  validate<LoginRequest>(
    {
      email: z.string().email(),
      password: z.string(),
    },
    await request.json(),
  );
