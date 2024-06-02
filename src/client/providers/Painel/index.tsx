"use client";

import { type ReactNode, useLayoutEffect, useState } from "react";

import { useRouter } from "next/navigation";

import BarChartIcon from "@mui/icons-material/BarChart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { AppBar } from "./AppBar";
import { Drawer } from "./Drawer";

import { Button } from "./Menu/Button";
import { LogoutButton } from "./Menu/Logout";

export default function PainelProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useLayoutEffect(() => {
    if (window.innerWidth > 768) {
      setOpen(true);
    }
  }, []);

  return (
    <Box sx={{ display: `flex` }}>
      <CssBaseline />
      <AppBar open={open} position="fixed">
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
            Painel
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
          <Button
            icon={<DashboardIcon />}
            isDrawerOpen={open}
            label="Dashboard"
            onClick={() => router.push(`/painel`)}
          />
          <Button
            icon={<ShoppingCartIcon />}
            isDrawerOpen={open}
            label="Pedidos"
            onClick={() => router.push(`/pedidos`)}
          />
          <Button
            icon={<PeopleIcon />}
            isDrawerOpen={open}
            label="Clientes"
            onClick={() => router.push(`/clientes`)}
          />
          <Button
            icon={<BarChartIcon />}
            isDrawerOpen={open}
            label="Relatórios"
            onClick={() => router.push(`/relatorios`)}
          />
          <Button
            icon={<LayersIcon />}
            isDrawerOpen={open}
            label="Integrações"
            onClick={() => router.push(`/integracoes`)}
          />
          <Button
            icon={<SettingsIcon />}
            isDrawerOpen={open}
            label="Configurações"
            onClick={() => router.push(`/painel/configuracoes`)}
          />
          <Divider sx={{ my: 1 }} />
          <LogoutButton isDrawerOpen={open} />
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
