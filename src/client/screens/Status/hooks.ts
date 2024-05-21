import { useEffect, useState } from "react";

import { type StatusResponse } from "@server/controllers/status/types";

import { customFetch } from "@client/hooks/useRequest";

export const useStatusScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState<StatusResponse>();

  const handleOpen = async () => {
    setIsLoading(true);
    try {
      const get = async () => {
        const res = await customFetch(`/api/status`);
        return await res.json();
      };

      const [resJson, resJson2] = await Promise.all([get(), get()]);

      console.log(resJson, resJson2);

      setApiResponse(resJson);
    } catch (error: any) {
      alert(`Error in console`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (apiResponse) {
      setIsModalOpen(true);
    }
  }, [apiResponse]);

  return {
    isLoading,
    isModalOpen,
    apiResponse,
    handleOpen,
    handleCloseModal,
  };
};
