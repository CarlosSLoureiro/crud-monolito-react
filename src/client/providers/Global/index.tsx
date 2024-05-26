"use client";

import "react-toastify/dist/ReactToastify.css";
import { type FC } from "react";
import { ToastContainer } from "react-toastify";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { GlobalContext } from "@client/contexts/Global";

import { useGlobalProvider } from "./hooks";
import type { GlobalProviderProps } from "./types";
import ThemeProvider from "../Theme";

const GlobalProvider: FC<GlobalProviderProps> = ({ children }: GlobalProviderProps) => {
  const {
    isWindowDefined,
    isLoadingBackdrop,
    showToast,
    showLoadingBackdrop,
    hideLoadingBackdrop,
  } = useGlobalProvider();

  return (
    <>
      <ToastContainer />
      {!isWindowDefined ? (
        <Backdrop open={true} sx={{ color: `#fff`, zIndex: theme => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
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
            {children}
          </ThemeProvider>
        </GlobalContext.Provider>
      )}
    </>
  );
};

export default GlobalProvider;
