import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

import { useThemeContext } from "@client/contexts/Theme";

import MaterialUISwitch from "./switch";

export default function ColorSchemeSwitch() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <FormGroup>
      <FormControlLabel
        control={<MaterialUISwitch checked={theme === `dark`} sx={{ m: 1 }} />}
        label="Modo Escuro"
        onChange={toggleTheme}
      />
    </FormGroup>
  );
}
