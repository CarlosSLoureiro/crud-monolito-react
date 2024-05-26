import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { type LoginRequest, type LoginResponse } from "@server/controllers/login/types";

import { useGlobalContext } from "@client/contexts/Global";
import { useRequest } from "@client/hooks/useRequest";
import { Auth } from "@client/utils/auth";

export const useLoginScreen = () => {
  const { showToast } = useGlobalContext();
  const route = useRouter();
  const { response, errors, request } = useRequest<LoginRequest, LoginResponse>({
    url: `/api/login`,
    options: {
      method: `POST`,
    },
    hookOptions: {
      shouldShowLoadingBackdrop: true,
    },
  });

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get(`email`);
    const password = data.get(`password`);

    if (email && password) {
      request({
        email: email.toString(),
        password: password.toString(),
      });
    }
  };

  useEffect(() => {
    if (response) {
      Auth.accessToken = response.accessToken;
      Auth.refreshToken = response.refreshToken;
      Auth.user = response.user;
      showToast({
        message: `Login efetuado com sucesso!`,
        type: `success`,
      });
      route.push(`/status`);
    }
  }, [response]);

  return {
    errors,
    handleLogin,
  };
};
