import { createContext, useContext } from "react";

export interface ToastProps {
  message: string;
  type?: `success` | `error` | `info` | `warning` | `default`;
  preventDuplicate?: boolean;
}

export interface BackdropProps {
  showLoadingIndicator?: boolean;
}

interface GlobalContextType {
  showToast: (props: ToastProps) => void;
  showBackdrop: (props: BackdropProps) => void;
  hideBackdrop: () => void;
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export const useGlobalContext = () => useContext(GlobalContext);
