import { StatusCodes } from "http-status-codes";

import type { RefreshTokenResponse } from "@server/controllers/token/refresh/types";

let isRefreshing = false;

async function doRefreshTokenRequest() {
  const request = await fetch(`/api/token/refresh`, {
    method: `POST`,
    body: JSON.stringify({
      token: window.localStorage.getItem(`refreshToken`),
    }),
  });

  const response = await request.json();

  return { request, response };
}

export async function customFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const accessToken = window.localStorage.getItem(`accessToken`);

  const modifiedInit = {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  let response = await fetch(input, modifiedInit);

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

            window.localStorage.setItem(`accessToken`, tokens.accessToken);
            window.localStorage.setItem(`refreshToken`, tokens.refreshToken);

            modifiedInit.headers = {
              ...modifiedInit.headers,
              Authorization: `Bearer ${tokens.accessToken}`,
            };

            response = await fetch(input, modifiedInit);
          } else {
            throw new Error(`Failed to refresh token: ${refreshTokenRequestResponse.message}`);
          }
        } catch (error) {
          console.error(`Failed to refresh token:`, error);
          throw error;
        } finally {
          isRefreshing = false;
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 100));
        response = await customFetch(input, modifiedInit);
      }
    }
  }

  return response;
}
