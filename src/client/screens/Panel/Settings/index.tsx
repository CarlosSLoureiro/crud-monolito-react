import * as React from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";

import Copyright from "@client/components/Copyright";

import PreferencesTab from "./Preferences";
import ProfileScreenTab from "./Profile";

export function LabTabs() {
  const [value, setValue] = React.useState(`0`);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabs = [
    { label: `Preferências`, children: <PreferencesTab /> },
    { label: `Conta`, children: <ProfileScreenTab /> },
    { label: `Senha`, children: <ProfileScreenTab /> },
    { label: `Assinatura`, children: <ProfileScreenTab /> },
  ];

  return (
    <Box sx={{ width: `100%`, typography: `body1` }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: `divider` }}>
          <TabList aria-label="lab API tabs example" onChange={handleChange} variant="scrollable">
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} value={index.toString()} />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={index.toString()}>
            {tab.children}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

export default function PanelSettingsScreen() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ display: `flex`, flexDirection: `column` }}>
            <LabTabs />
          </Paper>
        </Grid>
      </Grid>
      <Copyright />
    </Container>
  );
}
