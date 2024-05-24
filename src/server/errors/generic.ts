import { StatusCodes } from "http-status-codes";

export class GenericError extends Error {
  constructor(
    public message: string,
    public code: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
  }
}
