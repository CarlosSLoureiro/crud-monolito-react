import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { type LoginRequest, type LoginResponse } from "@server/controllers/login/types";

import { useGlobalContext } from "@client/contexts/Global";
import { useRequest } from "@client/hooks/useRequest";
import { Auth } from "@client/utils/auth";

export const useLoginScreen = () => {
  const { showToast } = useGlobalContext();
  const route = useRouter();
  const { response, errors, request } = useRequest<LoginResponse>({
    shouldShowLoadingBackdrop: true,
    shouldShowToast: true,
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get(`email`);
    const password = data.get(`password`);

    if (email && password) {
      request(`/api/login`, {
        method: `POST`,
        body: JSON.stringify({
          email: email.toString(),
          password: password.toString(),
        } satisfies LoginRequest),
      });
    }
  };

  useEffect(() => {
    if (response) {
      Auth.accessToken = response.accessToken;
      Auth.refreshToken = response.refreshToken;
      Auth.user = response.user;
      showToast(`Login efetuado com sucesso!`, `success`);
      setTimeout(() => {
        route.push(`/status`);
      }, 6000);
    }
  }, [response]);

  return {
    errors,
    handleLogin,
  };
};
