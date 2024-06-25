import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { type StatusResponse } from "@server/controllers/status/types";

import { useRequest } from "@client/hooks/useRequest";

export const useStatusScreen = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { response, request } = useRequest<any, StatusResponse>({
    url: `/api/status`,
    hookOptions: {
      shouldShowLoadingBackdrop: true,
    },
  });

  const handleOpen = async () => {
    const get = async () => {
      request();
    };

    // Force simultaneous requests to test the refresh token flow
    const [resJson, resJson2] = await Promise.all([get(), get()]);

    console.log(resJson, resJson2);
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
