import { createContext } from "react";

interface GlobalContextType {
  showLoadingBackdrop: () => void;
  hideLoadingBackdrop: () => void;
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
