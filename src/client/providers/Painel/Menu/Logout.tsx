import { Fragment } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import LogoutIcon from "@mui/icons-material/Logout";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import type { LogoutResponse } from "@server/controllers/logout/types";

import { useThemeContext } from "@client/contexts/Theme";
import { useRequest } from "@client/hooks/useRequest";
import { Auth } from "@client/utils/auth";

interface ComponentProps {
  isDrawerOpen: boolean;
}

export const LogoutButton = ({ isDrawerOpen }: ComponentProps) => {
  const label = `Sair`;

  const { theme } = useThemeContext();
  const router = useRouter();

  const { request } = useRequest<any, LogoutResponse>({
    url: `/api/logout`,
    options: {
      method: `POST`,
    },
    hookOptions: {
      shouldShowBackdrop: true,
      shouldShowErrorToast: false,
      willHandleValidationErrors: true,
    },
  });

  const handleLogout = () => {
    toast.promise(
      request(),
      {
        pending: `Saindo...`,
        success: {
          render() {
            Auth.accessToken = ``;
            Auth.refreshToken = ``;
            Auth.user = undefined;
            router.push(`/login`);
            return `Você saiu com sucesso!`;
          },
        },
        error: {
          render({ data }: any) {
            return data.message || `Houve uma falha na solicitação`;
          },
        },
      },
      {
        theme,
      },
    );
  };

  const Button = (
    <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );

  return (
    <Fragment>
      {!isDrawerOpen ? (
        <Tooltip
          arrow
          disableInteractive
          placement="right"
          title={label}
          TransitionComponent={Zoom}
        >
          {Button}
        </Tooltip>
      ) : (
        Button
      )}
    </Fragment>
  );
};
