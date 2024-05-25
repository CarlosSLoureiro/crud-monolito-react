import { createContext, useContext } from "react";

interface GlobalContextType {
  showToast: (message: string, type: `success` | `error` | `info` | `warning` | `default`) => void;
  showLoadingBackdrop: () => void;
  hideLoadingBackdrop: () => void;
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const useGlobalContext = () => useContext(GlobalContext);
