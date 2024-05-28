import * as React from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";

function Copyright(props: any) {
  return (
    <Typography align="center" color="text.secondary" variant="body2" {...props}>
      {`Copyright © `}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {` `}
      {new Date().getFullYear()}
      {`.`}
    </Typography>
  );
}

// TODO remove, this demo shouldn't aneed to reset the theme.

export default function PainelScreen() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item lg={9} md={8} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: `flex`,
              flexDirection: `column`,
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item lg={3} md={4} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: `flex`,
              flexDirection: `column`,
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: `flex`, flexDirection: `column` }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}
