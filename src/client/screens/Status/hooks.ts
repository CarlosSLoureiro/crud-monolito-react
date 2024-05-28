import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import { type StatusResponse } from "@server/controllers/status/types";

import { useThemeContext } from "@client/contexts/Theme";
import { useRequest } from "@client/hooks/useRequest";
import { Auth } from "@client/utils/auth";

export const useStatusScreen = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useThemeContext();
  const { response, request } = useRequest<any, StatusResponse>({
    url: `/api/status`,
    hookOptions: {
      shouldShowLoadingBackdrop: true,
    },
  });
  const { request: requestLogout } = useRequest<any, any>({
    url: `/api/logout`,
    options: {
      method: `POST`,
    },
    hookOptions: {
      shouldShowErrorToast: false,
      willHandleValidationErrors: true,
    },
  });

  const handleOpen = async () => {
    const get = async () => {
      request();
    };

    const [resJson, resJson2] = await Promise.all([get(), get()]);

    console.log(resJson, resJson2);
  };

  const handleLogout = () => {
    toast.promise(
      requestLogout(),
      {
        pending: `Saindo...`,
        success: {
          render() {
            Auth.accessToken = ``;
            Auth.refreshToken = ``;
            Auth.user = undefined;
            router.push(`/login`);
            return `Você saiu com sucesso!`;
          },
        },
        error: {
          render({ data }: any) {
            return data.message || `Houve uma falha na solicitação`;
          },
        },
      },
      {
        theme,
      },
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (response) {
      setIsModalOpen(true);
    }
  }, [response]);

  return {
    isModalOpen,
    response,
    handleOpen,
    handleLogout,
    handleCloseModal,
  };
};
