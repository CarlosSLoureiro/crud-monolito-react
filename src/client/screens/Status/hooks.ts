import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { type StatusResponse } from "@server/controllers/status/types";

import { useRequest } from "@client/hooks/useRequest";

import { type StatusPageProps } from "./types";

export const useStatusScreen = (props: StatusPageProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { response, request } = useRequest<any, StatusResponse>({
    url: props?.isWithAuthMiddleware ? `/api/status-autenticado` : `/api/status-nao-autenticado`,
    hookOptions: {
      shouldShowLoadingBackdrop: true,
    },
  });

  const handleOpen = async () => {
    if (props?.isWithAuthMiddleware) {
      const get = async () => {
        request();
      };

      // Force simultaneous requests to test the refresh token flow
      const [resJson, resJson2] = await Promise.all([get(), get()]);

      // eslint-disable-next-line no-console
      console.log(resJson, resJson2);
    } else {
      request();
    }
  };

  const handleBack = () => {
    router.push(`/`);
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
    handleBack,
    handleCloseModal,
  };
};
