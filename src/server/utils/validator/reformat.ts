import type { ZodError } from "zod";

import type { ZodFormattedError } from "./types";

export const reformat = (error: ZodError): ZodFormattedError => {
  const errors: any = error.format();
  if (errors.hasOwnProperty(`_errors`)) {
    delete errors._errors;
  }

  return errors;
};
