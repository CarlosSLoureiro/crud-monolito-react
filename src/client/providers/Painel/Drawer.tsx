import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

import { drawerWidth } from "./constants";

export const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== `open` })(
  ({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      overflowX: `hidden`,
      position: `relative`,
      whiteSpace: `nowrap`,
      width: drawerWidth,
      transition: theme.transitions.create(`width`, {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: `border-box`,
      ...(!open && {
        overflowX: `hidden`,
        transition: theme.transitions.create(`width`, {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up(`sm`)]: {
          width: theme.spacing(9),
        },
      }),
      "@media (max-width: 600px)": {
        width: open ? `100%` : 0,
        position: `fixed`,
        height: `100hv`,
      },
    },
  }),
);
