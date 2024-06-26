import { useEffect } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import {
  type ChangeUserPasswordRequest,
  type ChangeUserPasswordResponse,
} from "@server/controllers/user/change-password/types";

import { useThemeContext } from "@client/contexts/Theme";
import { useRequest } from "@client/hooks/useRequest";
import { Auth } from "@client/utils/auth";

export const usePasswordScreenTab = () => {
  const { theme } = useThemeContext();
  const route = useRouter();
  const { response, errors, request } = useRequest<
    ChangeUserPasswordRequest,
    ChangeUserPasswordResponse
  >({
    url: `/api/user/password`,
    options: {
      method: `POST`,
    },
    hookOptions: {
      shouldShowBackdrop: true,
      willHandleValidationErrors: true,
    },
  });

  const handleChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const currentPassword = data.get(`currentPassword`);
    const newPassword = data.get(`newPassword`);
    const confirmNewPassword = data.get(`confirmNewPassword`);

    if (currentPassword && newPassword && confirmNewPassword) {
      toast.promise(
        request({
          currentPassword: currentPassword.toString(),
          newPassword: newPassword.toString(),
          confirmNewPassword: confirmNewPassword.toString(),
        }),
        {
          pending: `Alterando sua senha...`,
          success: `Sua senha foi efetuada com sucesso!`,
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
    }
  }, [response]);

  return {
    errors,
    handleChangePassword,
  };
};
