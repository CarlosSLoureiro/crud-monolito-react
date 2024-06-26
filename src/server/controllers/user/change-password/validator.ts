import { validate, z } from "@server/utils/validator";

import { type ChangeUserPasswordRequest } from "./types";

export const ChangeUserPasswordValidator = async (request: Request) =>
  validate<ChangeUserPasswordRequest>(
    {
      currentPassword: z.string(),
      newPassword: z.string(),
      confirmNewPassword: z.string(),
    },
    await request.json(),
  );
