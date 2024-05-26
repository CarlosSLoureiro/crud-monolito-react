import { createContext, useContext } from "react";

export interface ToastProps {
  message: string;
  type?: `success` | `error` | `info` | `warning` | `default`;
}

interface GlobalContextType {
  showToast: (props: ToastProps) => void;
  showLoadingBackdrop: () => void;
  hideLoadingBackdrop: () => void;
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const useGlobalContext = () => useContext(GlobalContext);
