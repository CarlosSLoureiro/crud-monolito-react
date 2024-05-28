"use client";

import "react-toastify/dist/ReactToastify.css";
import { type FC } from "react";
import { ToastContainer } from "react-toastify";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { GlobalContext } from "@client/contexts/Global";

import { useGlobalProvider } from "./hooks";
import type { GlobalProviderProps } from "./types";

const GlobalProvider: FC<GlobalProviderProps> = ({ children }: GlobalProviderProps) => {
  const { backdrop, showToast, showBackdrop, hideBackdrop } = useGlobalProvider();

  return (
    <>
      <ToastContainer />
      <GlobalContext.Provider
        value={{
          showToast,
          showBackdrop,
          hideBackdrop,
        }}
      >
        <Backdrop
          open={backdrop.visible}
          sx={{ color: `#fff`, zIndex: theme => theme.zIndex.drawer + 2 }}
        >
          {backdrop.showLoadingIndicator && <CircularProgress color="inherit" />}
        </Backdrop>
        {children}
      </GlobalContext.Provider>
    </>
  );
};

export default GlobalProvider;
