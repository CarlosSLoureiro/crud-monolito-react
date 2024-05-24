/* eslint-disable no-console */
import { useContext, useState } from "react";

import { StatusCodes } from "http-status-codes";

import type { RefreshTokenResponse } from "@server/controllers/token/refresh/types";
import type { ZodFormattedError } from "@server/utils/validator/types";

import { GlobalContext } from "@client/contexts/Global";
import { Auth } from "@client/utils/auth";

type HookParams = {
  shouldShowLoadingBackdrop?: boolean;
  shouldShowToast?: boolean;
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

export function useRequest<T = any>({
  shouldShowLoadingBackdrop = true,
  shouldShowToast = true,
}: HookParams = {}) {
  const { showToast, showLoadingBackdrop, hideLoadingBackdrop } = useContext(GlobalContext);
  const [response, setResponse] = useState<T>();
  const [errors, setErrors] = useState<ZodFormattedError>();

  const request = async (input: RequestInfo, init?: RequestInit) => {
    setErrors(undefined);

    try {
      if (shouldShowLoadingBackdrop) {
        showLoadingBackdrop();
      }
      const res = await customFetch(input, init);
      const resJson = await res.json();
      if (res.ok) {
        setResponse(resJson);
      } else {
        setErrors(resJson);
      }
    } catch (error: any) {
      if (shouldShowToast) {
        showToast(error.message, `error`);
      }

      if (error instanceof AuthError) {
        Auth.accessToken = ``;
        Auth.refreshToken = ``;
        Auth.user = undefined;
        setTimeout(() => {
          window.location.href = `/login`;
        }, 5000);
      }
    } finally {
      if (shouldShowLoadingBackdrop) {
        hideLoadingBackdrop();
      }
    }
  };

  return { response, errors, request };
}
