import { useEffect, useState } from "react";

export const useWindowProvider = () => {
  const [isWindowDefined, setIsWindowDefined] = useState(false);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setIsWindowDefined(true);
    } else {
      throw new Error(`Window is not defined.`);
    }
  }, []);

  return {
    isWindowDefined,
  };
};
