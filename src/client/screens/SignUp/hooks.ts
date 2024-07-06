import { useEffect } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import {
  type UserSignUpRequest,
  type UserSignUpResponse,
} from "@server/controllers/user/sign-up/types";

import { useGlobalContext } from "@client/contexts/Global";
import { useThemeContext } from "@client/contexts/Theme";
import { useRequest } from "@client/hooks/useRequest";
import { Auth } from "@client/utils/auth";

export const useSignUpScreen = () => {
  const { showToast } = useGlobalContext();
  const { theme } = useThemeContext();
  const route = useRouter();
  const { response, errors, request } = useRequest<UserSignUpRequest, UserSignUpResponse>({
    url: `/api/user/sign-up`,
    options: {
      method: `POST`,
    },
    hookOptions: {
      shouldShowBackdrop: true,
      willHandleValidationErrors: true,
    },
  });

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = data.get(`name`);
    const email = data.get(`email`);
    const password = data.get(`password`);
    const confirmPassword = data.get(`confirmPassword`);

    if (name && email && password && confirmPassword) {
      const acceptedTermsAndConditions = data.get(`acceptedTermsAndConditions`);

      if (!acceptedTermsAndConditions) {
        showToast({
          type: `error`,
          message: `Você precisa aceitar os termos e condições para prosseguir.`,
        });
        return;
      }

      toast.promise(
        request({
          name: name.toString(),
          email: email.toString(),
          password: password.toString(),
          confirmPassword: confirmPassword.toString(),
        }),
        {
          pending: `Cadastrando...`,
          success: `Cadastrado com sucesso! Bem-vindo!`,
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
    handleSignUp,
  };
};
