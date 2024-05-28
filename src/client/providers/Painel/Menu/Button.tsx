import { Fragment, type ReactNode } from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

interface ComponentProps {
  isDrawerOpen: boolean;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

export const Button = ({ isDrawerOpen, label, icon, onClick }: ComponentProps) => {
  const Button = (
    <ListItemButton onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
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
