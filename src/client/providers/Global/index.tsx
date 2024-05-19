import { FC, ReactNode } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { GlobalContext } from "@client/contexts/Global";

import { useGlobalProvider } from "./hooks";
import ThemeProvider from "../Theme";

interface ProviderProps {
  children: ReactNode;
}

const GlobalProvider: FC<ProviderProps> = ({ children }) => {
  const { isWindowDefined, isLoadingBackdrop, showLoadingBackdrop, hideLoadingBackdrop } =
    useGlobalProvider();

  if (!isWindowDefined) {
    return (
      <Backdrop open={true} sx={{ color: `#fff`, zIndex: theme => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        showLoadingBackdrop,
        hideLoadingBackdrop,
      }}
    >
      <ThemeProvider>
        <Backdrop
          open={isLoadingBackdrop}
          sx={{ color: `#fff`, zIndex: theme => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <>{children}</>
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
