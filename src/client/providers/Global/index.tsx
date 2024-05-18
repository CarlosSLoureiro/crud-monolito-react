import { FC, ReactNode, useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import ThemeProvider from "../Theme";

interface ProviderProps {
  children: ReactNode;
}

const GlobalProvider: FC<ProviderProps> = ({ children }) => {
  const [isWindowDefined, setIsWindowDefined] = useState(false);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      setIsWindowDefined(true);
    } else {
      throw new Error(`Window is not defined.`);
    }
  }, []);

  if (!isWindowDefined) {
    return (
      <Backdrop open={true} sx={{ color: `#fff`, zIndex: theme => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
};

export default GlobalProvider;
