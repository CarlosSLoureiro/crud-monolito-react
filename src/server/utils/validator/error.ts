import type { ZodFormattedError } from "./types";

export class ValidationError extends Error {
  constructor(
    public field: string,
    public message: string,
  ) {
    super(message);
  }

  public format(): ZodFormattedError {
    return { [this.field]: { _errors: [this.message] } };
  }
}
