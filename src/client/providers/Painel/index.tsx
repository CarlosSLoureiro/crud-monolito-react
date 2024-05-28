"use client";

import { type ReactNode, useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { mainListItems } from "@client/screens/Painel/listItems";

import { AppBar } from "./AppBar";
import { Drawer } from "./Drawer";

import { LogoutButton } from "./Menu/Logout";

export default function PainelProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: `flex` }}>
      <CssBaseline />
      <AppBar open={open} position="absolute">
        <Toolbar
          sx={{
            pr: `24px`, // keep right padding when drawer closed
          }}
        >
          <IconButton
            aria-label="open drawer"
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{
              marginRight: `36px`,
              ...(open && { display: `none` }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="inherit" component="h1" noWrap sx={{ flexGrow: 1 }} variant="h6">
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={open} variant="permanent">
        <Toolbar
          sx={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `flex-end`,
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          <LogoutButton />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === `light` ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: `100vh`,
          overflow: `auto`,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
