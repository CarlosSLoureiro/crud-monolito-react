import { useEffect, useState } from "react";

import { type StatusResponse } from "@server/controllers/status/types";

export const useStatusScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState<StatusResponse>();

  const handleOpen = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/status`, {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjY2LCJwYXNzd29yZCI6InNlbmhhIiwiaWF0IjoxNzE2MTYxNzQ2LCJleHAiOjE3MTY3NjY1NDZ9.RqDaXyt3xFVcMbaRtlhJS8BG5Grc232lV0eo1iuBU2s`,
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
