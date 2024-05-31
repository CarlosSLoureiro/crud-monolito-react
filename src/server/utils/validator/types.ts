export type ZodFormattedError<RequestType = any> = {
  [K in keyof RequestType]?: {
    _errors: string[];
  };
};
