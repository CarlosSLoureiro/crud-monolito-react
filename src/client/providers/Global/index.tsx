import "react-toastify/dist/ReactToastify.css";
import { type FC, type ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { GlobalContext } from "@client/contexts/Global";

import { useGlobalProvider } from "./hooks";
import ThemeProvider from "../Theme";

interface ProviderProps {
  children: ReactNode;
}

const GlobalProvider: FC<ProviderProps> = ({ children }) => {
  const {
    isWindowDefined,
    isLoadingBackdrop,
    showToast,
    showLoadingBackdrop,
    hideLoadingBackdrop,
  } = useGlobalProvider();

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
        showToast,
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
        <ToastContainer />
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
