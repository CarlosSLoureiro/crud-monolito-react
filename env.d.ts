declare namespace NodeJS {
  interface ProcessEnv {
    SECRET: string;
    NEXT_PUBLIC_SENTRY_DSN: string;
  }
}
