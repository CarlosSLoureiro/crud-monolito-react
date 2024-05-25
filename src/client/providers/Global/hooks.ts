import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGlobalProvider = () => {
  const [isWindowDefined, setIsWindowDefined] = useState(false);
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(true);
  const activeToastMessages: string[] = [];

  const showToast = (
    message: string,
    type: `success` | `error` | `info` | `warning` | `default`,
  ) => {
    const theme = document.documentElement.getAttribute(`data-theme`) || `light`;

    if (!activeToastMessages.some(activeToastMessage => activeToastMessage === message)) {
      const messageIndex = activeToastMessages.push(message);
      toast(message, {
        position: `top-right`,
        theme: [`light`, `dark`].indexOf(theme) > -1 ? theme : `light`,
        type,
        onClose: () => activeToastMessages.splice(messageIndex, 1),
      });
    }
  };

  const showLoadingBackdrop = () => {
    setIsLoadingBackdrop(true);
  };

  const hideLoadingBackdrop = () => {
    setIsLoadingBackdrop(false);
  };

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setIsWindowDefined(true);
      hideLoadingBackdrop();
    } else {
      throw new Error(`Window is not defined.`);
    }
  }, []);

  return {
    isWindowDefined,
    isLoadingBackdrop,
    showToast,
    showLoadingBackdrop,
    hideLoadingBackdrop,
  };
};
