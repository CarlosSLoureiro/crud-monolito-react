import { useEffect, useState } from "react";

export const useGlobalProvider = () => {
  const [isWindowDefined, setIsWindowDefined] = useState(false);
  const [isLoadingBackdrop, setIsLoadingBackdrop] = useState(true);

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
    showLoadingBackdrop,
    hideLoadingBackdrop,
  };
};
