"use client";

import { useEffect } from "react";

import * as Sentry from "@sentry/nextjs";
import ErrorPage from "next/error";
import { StatusCodes } from "http-status-codes";

import { AuthError } from "@client/hooks/useRequest";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error }: GlobalErrorProps) {
  useEffect(() => {
    if (!(error instanceof AuthError)) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <ErrorPage statusCode={StatusCodes.INTERNAL_SERVER_ERROR} />
      </body>
    </html>
  );
}
