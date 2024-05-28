import { useState } from "react";
import { toast } from "react-toastify";

import type { BackdropProps, ToastProps } from "@client/contexts/Global";
import { useThemeContext } from "@client/contexts/Theme";

export const useGlobalProvider = () => {
  const { theme } = useThemeContext();

  const [backdrop, setBackdrop] = useState({
    visible: false,
    showLoadingIndicator: false,
  });
  const activeToastMessages: string[] = [];

  const showToast = ({ message, type, preventDuplicate }: ToastProps) => {
    if (
      !preventDuplicate ||
      (preventDuplicate &&
        !activeToastMessages.some(activeToastMessage => activeToastMessage === message))
    ) {
      let onClose;
      if (preventDuplicate) {
        activeToastMessages.push(message);
        onClose = () => activeToastMessages.splice(activeToastMessages.indexOf(message), 1);
      }

      activeToastMessages.push(message);
      toast(message, {
        position: `top-right`,
        theme: [`light`, `dark`].indexOf(theme) > -1 ? theme : `light`,
        type,
        onClose,
      });
    }
  };

  const showBackdrop = ({ showLoadingIndicator }: BackdropProps) => {
    setBackdrop({
      visible: true,
      showLoadingIndicator: showLoadingIndicator || false,
    });
  };

  const hideBackdrop = () => {
    setBackdrop({
      visible: false,
      showLoadingIndicator: false,
    });
  };

  return {
    backdrop,
    showToast,
    showBackdrop,
    hideBackdrop,
  };
};
