"use client";

import { type ReactNode, useLayoutEffect, useState } from "react";

import { useRouter } from "next/navigation";

import BarChartIcon from "@mui/icons-material/BarChart";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import LayersIcon from "@mui/icons-material/Layers";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";

import { useGlobalContext } from "@client/contexts/Global";
import { useThemeContext } from "@client/contexts/Theme";

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
  const { theme, toggleTheme } = useThemeContext();
  const { showToast } = useGlobalContext();

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    const value = !open;
    window.localStorage.setItem(`drawerOpen`, value.toString());
    setOpen(value);
  };

  const handlePageUnavailableClick = (label: string) => {
    showToast({ message: `A página de ${label} está em construção`, type: `warning` });
  };

  useLayoutEffect(() => {
    if (window.innerWidth > 768) {
      const value = window.localStorage.getItem(`drawerOpen`) === `true`;
      setOpen(value);
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
          <Tooltip
            arrow
            disableInteractive
            placement="bottom"
            title={`Abrir Menu`}
            TransitionComponent={Zoom}
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
          </Tooltip>
          <Typography color="inherit" component="h1" noWrap sx={{ flexGrow: 1 }} variant="h6">
            Painel
          </Typography>
          <Tooltip
            arrow
            disableInteractive
            placement="bottom"
            title={theme === `light` ? `Ativar tema escuro` : `Ativar tema claro`}
            TransitionComponent={Zoom}
          >
            <IconButton color="inherit" onClick={() => toggleTheme({ force: true })}>
              <Badge color="secondary">
                {theme === `light` ? <Brightness2Icon /> : <WbSunnyIcon />}
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip
            arrow
            disableInteractive
            placement="bottom"
            title={`Notificações`}
            TransitionComponent={Zoom}
          >
            <IconButton
              color="inherit"
              onClick={() => {
                showToast({ message: `Não há notificações`, type: `info` });
              }}
            >
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
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
          <Tooltip
            arrow
            disableInteractive
            placement="bottom"
            title={`Fechar Menu`}
            TransitionComponent={Zoom}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Divider />
        <List component="nav">
          <Button
            icon={<HomeIcon />}
            isDrawerOpen={open}
            label="Página Inicial"
            onClick={() => router.push(`/`)}
          />
          <Divider sx={{ my: 1 }} />
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
            onClick={() => handlePageUnavailableClick(`pedidos`)}
          />
          <Button
            icon={<PeopleIcon />}
            isDrawerOpen={open}
            label="Clientes"
            onClick={() => handlePageUnavailableClick(`clientes`)}
          />
          <Button
            icon={<BarChartIcon />}
            isDrawerOpen={open}
            label="Relatórios"
            onClick={() => handlePageUnavailableClick(`relatórios`)}
          />
          <Button
            icon={<LayersIcon />}
            isDrawerOpen={open}
            label="Integrações"
            onClick={() => handlePageUnavailableClick(`integrações`)}
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
