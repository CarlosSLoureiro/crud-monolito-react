import { type FC, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useGlobalContext } from "@client/contexts/Global";
import { Auth } from "@client/utils/auth";

import type { PageProviderProps } from "./types";

const PageProvider: FC<PageProviderProps> = (props: PageProviderProps) => {
  const { children, mustBeAuthenticated, mustBeUnauthenticated } = props;
  const router = useRouter();
  const { showToast } = useGlobalContext();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (mustBeAuthenticated && !Auth.isAuthenticated) {
      showToast({
        message: `Faça o login para continuar`,
        type: `warning`,
      });
      router.push(`/login`);
    } else if (mustBeUnauthenticated && Auth.isAuthenticated) {
      router.push(`/`);
    } else {
      setShouldRender(true);
    }
  }, []);

  return !shouldRender ? (
    <Backdrop open={true} sx={{ color: `#fff`, zIndex: theme => theme.zIndex.drawer + 1 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <>{children}</>
  );
};

export default PageProvider;
