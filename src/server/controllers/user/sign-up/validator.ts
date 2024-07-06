import { validate, z } from "@server/utils/validator";

import { type UserSignUpRequest } from "./types";

export const SignUpValidator = async (request: Request) =>
  validate<UserSignUpRequest>(
    {
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      confirmPassword: z.string(),
    },
    await request.json(),
  );
