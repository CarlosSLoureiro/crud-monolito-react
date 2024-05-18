import { useContext } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

import { ThemeContext } from "@client/contexts/Theme";

import MaterialUISwitch from "./switch";

export default function ColorSchemeSwitch() {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
