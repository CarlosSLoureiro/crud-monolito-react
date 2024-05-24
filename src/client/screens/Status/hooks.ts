import { useEffect, useState } from "react";

import { type StatusResponse } from "@server/controllers/status/types";

import { useRequest } from "@client/hooks/useRequest";

export const useStatusScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { response, request } = useRequest<StatusResponse>({
    shouldShowLoadingBackdrop: true,
  });

  const handleOpen = async () => {
    const get = async () => {
      request(`/api/status`);
    };

    const [resJson, resJson2] = await Promise.all([get(), get()]);

    console.log(resJson, resJson2);
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
    handleCloseModal,
  };
};
