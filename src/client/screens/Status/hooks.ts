import { useEffect, useState } from "react";

import { type StatusResponse } from "@server/controllers/status/types";

export const useStatusScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState<StatusResponse>();

  const handleOpen = async () => {
    setIsLoading(true);
    const accessToken = window.localStorage.getItem(`accessToken`);

    try {
      const res = await fetch(`/api/status`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const resJson = await res.json();
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
