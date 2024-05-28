"use client";

import { type FC } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useWindowProvider } from "./hooks";
import type { WindowProviderProps } from "./types";

const WindowProvider: FC<WindowProviderProps> = ({ children }: WindowProviderProps) => {
  const { isWindowDefined } = useWindowProvider();

  return !isWindowDefined ? (
    <Backdrop open={true} sx={{ color: `#fff`, zIndex: theme => theme.zIndex.drawer + 1 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <>{children}</>
  );
};

export default WindowProvider;
