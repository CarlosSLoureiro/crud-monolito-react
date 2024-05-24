import { StatusCodes } from "http-status-codes";

import type { ZodFormattedError } from "./types";

export class ValidationError extends Error {
  constructor(
    public field: string,
    public message: string,
    public code: StatusCodes = StatusCodes.BAD_REQUEST,
  ) {
    super(message);
  }

  public format(): ZodFormattedError {
    return { [this.field]: { _errors: [this.message] } };
  }
}
