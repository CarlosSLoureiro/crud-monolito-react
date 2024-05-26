/* eslint-disable no-console */
import { useState } from "react";

import { useRouter } from "next/navigation";
import { StatusCodes } from "http-status-codes";

import type { RefreshTokenResponse } from "@server/controllers/token/refresh/types";
import type { ZodFormattedError } from "@server/utils/validator/types";

import { useGlobalContext } from "@client/contexts/Global";
import { Auth } from "@client/utils/auth";

type HookParams = {
  url: string;
  options?: RequestInit;
  hookOptions?: {
    shouldShowLoadingBackdrop?: boolean;
    shouldShowErrorToast?: boolean;
    willHandleValidationErrors?: boolean;
  };
};

class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

let isRefreshing = false;

async function doRefreshTokenRequest() {
  const request = await fetch(`/api/token/refresh`, {
    method: `POST`,
    body: JSON.stringify({
      token: Auth.refreshToken,
    }),
  });

  const response = await request.json();

  return { request, response };
}

async function customFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const modifiedInit = {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${Auth.accessToken}`,
    },
  };

  let response = await fetch(input, modifiedInit);

  if (!response.ok) {
    if (response.status === StatusCodes.UNAUTHORIZED) {
      const responseBody = await response.json();

      if (responseBody.message === `Token de acesso expirado`) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const { request: refreshTokenRequest, response: refreshTokenRequestResponse } =
              await doRefreshTokenRequest();

            if (refreshTokenRequest.ok) {
              const tokens: RefreshTokenResponse = refreshTokenRequestResponse;

              Auth.accessToken = tokens.accessToken;
              Auth.refreshToken = tokens.refreshToken;

              modifiedInit.headers = {
                ...modifiedInit.headers,
                Authorization: `Bearer ${tokens.accessToken}`,
              };

              response = await fetch(input, modifiedInit);
            } else if (refreshTokenRequest.status === StatusCodes.UNAUTHORIZED) {
              throw new AuthError(`Erro de autenticação. Por favor, faça login novamente.`);
            } else {
              throw new Error(
                `Falha ao atualizar seus dados de acesso. Por favor, tente novamente.`,
              );
            }
          } catch (error) {
            console.error(`Falha ao atualizar tokens`, error);
            throw error;
          } finally {
            isRefreshing = false;
          }
        } else {
          await new Promise(resolve => setTimeout(resolve, 100));
          response = await customFetch(input, modifiedInit);
        }
      } else {
        throw new AuthError(`Erro de autenticação. Por favor, faça login novamente.`);
      }
    } else if (response.status !== StatusCodes.BAD_REQUEST) {
      const responseBody = await response.json();

      throw new Error(responseBody.message);
    }
  }

  return response;
}

export function useRequest<RequestType = any, ResponseType = any>({
  url,
  options,
  hookOptions,
}: HookParams) {
  const {
    shouldShowLoadingBackdrop = false,
    shouldShowErrorToast = true,
    willHandleValidationErrors = false,
  } = hookOptions || {};

  const { showToast, showLoadingBackdrop, hideLoadingBackdrop } = useGlobalContext();
  const [response, setResponse] = useState<ResponseType>();
  const [errors, setErrors] = useState<ZodFormattedError>();
  const route = useRouter();

  const request = async (data?: RequestType): Promise<ResponseType> => {
    setErrors(undefined);

    try {
      if (shouldShowLoadingBackdrop) {
        showLoadingBackdrop();
      }

      const res = await customFetch(url, {
        ...options,
        body: data ? JSON.stringify(data) : undefined,
      });
      const resJson = await res.json();
      if (!res.ok) {
        setErrors(resJson);
        if (willHandleValidationErrors) {
          throw new Error(resJson.message);
        } else {
          return resJson;
        }
      }

      setResponse(resJson);
      return resJson;
    } catch (error: any) {
      if (error.message) {
        if (shouldShowErrorToast) {
          showToast({
            message: error.message,
            type: `error`,
          });
        }

        console.error(error.message);
      }

      if (error instanceof AuthError) {
        Auth.accessToken = ``;
        Auth.refreshToken = ``;
        Auth.user = undefined;
        route.push(`/login`);
      }

      throw error;
    } finally {
      if (shouldShowLoadingBackdrop) {
        hideLoadingBackdrop();
      }
    }
  };

  return { response, errors, request };
}
