import type { ZodFormattedError } from "./types";

export class ValidationError extends Error {
  constructor(
    public message: string,
    public field: string,
  ) {
    super(message);
  }

  public format(): ZodFormattedError {
    return { [this.field]: { _errors: [this.message] } };
  }
}
