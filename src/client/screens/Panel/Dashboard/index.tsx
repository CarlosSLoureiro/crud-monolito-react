import * as React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Copyright from "@client/components/Copyright";

import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";

export default function PanelDashboardScreen() {
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
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: `flex`, flexDirection: `column` }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
      <Copyright />
    </Container>
  );
}
