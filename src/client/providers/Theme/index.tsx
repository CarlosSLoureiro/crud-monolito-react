import { type FC } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";

import { ThemeContext } from "@client/contexts/Theme";

import { useThemeProvider } from "./hooks";
import type { ThemeProviderProps } from "./types";

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { theme, darkTheme, toggleTheme } = useThemeProvider();
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MUIThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
