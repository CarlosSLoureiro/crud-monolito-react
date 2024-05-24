import { createContext } from "react";

interface GlobalContextType {
  showToast: (message: string, type: `success` | `error` | `info` | `warning` | `default`) => void;
  showLoadingBackdrop: () => void;
  hideLoadingBackdrop: () => void;
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
