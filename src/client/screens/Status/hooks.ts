import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { type StatusResponse } from "@server/controllers/status/types";

import { useRequest } from "@client/hooks/useRequest";

export const useStatusScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { response, request } = useRequest<StatusResponse>({
    shouldShowLoadingBackdrop: true,
  });
  const { request: requestLogout } = useRequest<any>({
    shouldShowLoadingBackdrop: false,
    shouldShowToast: false,
  });

  const handleOpen = async () => {
    const get = async () => {
      request(`/api/status`);
    };

    const [resJson, resJson2] = await Promise.all([get(), get()]);

    console.log(resJson, resJson2);
  };

  const handleLogout = () => {
    toast.promise(
      requestLogout(`/api/logout`, {
        method: `POST`,
      }),
      {
        pending: `Saindo...`,
        success: `Promise resolved 👌`,
        error: {
          render({ data }: any) {
            return data.message || `Houve uma falha na solicitação`;
          },
        },
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
