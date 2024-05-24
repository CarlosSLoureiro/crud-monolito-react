declare namespace NodeJS {
  interface ProcessEnv {
    SECRET: string;
    MYSQL_BASE: string;
    MYSQL_USER: string;
    MYSQL_PASS: string;
    MYSQL_HOST: string;
    NEXT_PUBLIC_SENTRY_DSN: string;
  }
}
