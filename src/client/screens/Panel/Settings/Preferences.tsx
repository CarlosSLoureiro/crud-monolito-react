import { styled, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup, { type FormGroupProps } from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

import { useThemeContext } from "@client/contexts/Theme";

import { TabContent } from "./styles";

const PrefFormGroup = styled(FormGroup)<FormGroupProps>(({ theme }) => ({
  borderLeft: `2px solid ${theme.palette.divider}`,
  paddingLeft: `16px`,
}));

export default function PreferencesTab() {
  const { userPrefTheme, toggleTheme } = useThemeContext();

  const handlePrefThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      toggleTheme({
        auto: true,
      });
    } else {
      toggleTheme();
    }
  };

  return (
    <TabContent>
      <Grid alignItems="left" container direction={{ xs: `column`, md: `row` }} spacing={2}>
        <Grid item md={12} xs={6}>
          <PrefFormGroup>
            <Typography component="h5" fontWeight="bold" variant="subtitle1">
              Tema Automático
            </Typography>
            <Typography component="p" variant="body2">
              Desative para escolher um tema específico ou ative para seguir o tema do sistema.
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={userPrefTheme === `auto`}
                  name="gilad"
                  onChange={handlePrefThemeChange}
                />
              }
              label={userPrefTheme === `auto` ? `Ativado` : `Desativado`}
            />
          </PrefFormGroup>
        </Grid>
      </Grid>
    </TabContent>
  );
}
