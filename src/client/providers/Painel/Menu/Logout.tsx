import { Fragment } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import LogoutIcon from "@mui/icons-material/Logout";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import type { LogoutResponse } from "@server/controllers/logout/types";

import { useThemeContext } from "@client/contexts/Theme";
import { useRequest } from "@client/hooks/useRequest";
import { Auth } from "@client/utils/auth";

export const LogoutButton = () => {
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

  return (
    <Fragment>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItemButton>
    </Fragment>
  );
};
