import { validate, z } from "@server/utils/validator";

import { type UserLoginRequest } from "./types";

export const LoginValidator = async (request: Request) =>
  validate<UserLoginRequest>(
    {
      email: z.string().email(),
      password: z.string(),
    },
    await request.json(),
  );
