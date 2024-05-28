import { useEffect } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import { type LoginRequest, type LoginResponse } from "@server/controllers/login/types";

import { useThemeContext } from "@client/contexts/Theme";
import { useRequest } from "@client/hooks/useRequest";
import { Auth } from "@client/utils/auth";

export const useLoginScreen = () => {
  const { theme } = useThemeContext();
  const route = useRouter();
  const { response, errors, request } = useRequest<LoginRequest, LoginResponse>({
    url: `/api/login`,
    options: {
      method: `POST`,
    },
    hookOptions: {
      shouldShowBackdrop: true,
      willHandleValidationErrors: true,
    },
  });

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get(`email`);
    const password = data.get(`password`);

    if (email && password) {
      toast.promise(
        request({
          email: email.toString(),
          password: password.toString(),
        }),
        {
          pending: `Entrando...`,
          success: `Login efetuado com sucesso!`,
        },
        {
          theme,
        },
      );
    }
  };

  useEffect(() => {
    if (response) {
      Auth.accessToken = response.accessToken;
      Auth.refreshToken = response.refreshToken;
      Auth.user = response.user;
      route.push(`/painel`);
    }
  }, [response]);

  return {
    errors,
    handleLogin,
  };
};
