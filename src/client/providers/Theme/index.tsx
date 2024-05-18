import { FC, ReactNode, useEffect, useState } from "react";

import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";

import { ThemeContext } from "@client/contexts/Theme";

interface ProviderProps {
  children: ReactNode;
}

const ThemeProvider: FC<ProviderProps> = ({ children }) => {
  const userSystemDark = window.matchMedia(`(prefers-color-scheme: dark)`);
  const userPrefTheme = window.localStorage.getItem(`theme`);

  const isUserSystemDark = userSystemDark.matches;
  const isUserPrefDark = userPrefTheme === `dark`;

  const isDark =
    userPrefTheme !== null && userPrefTheme !== `auto` ? isUserPrefDark : isUserSystemDark;

  const [theme, setTheme] = useState<PaletteMode>(isDark ? `dark` : `light`);

  userSystemDark.addEventListener(`change`, e => {
    if (e.matches) {
      setTheme(`dark`);
    } else {
      setTheme(`light`);
    }
  });

  useEffect(() => {
    if (theme === `dark`) {
      document.documentElement.setAttribute(`data-theme`, `dark`);
    } else {
      document.documentElement.setAttribute(`data-theme`, `light`);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === `light` ? `dark` : `light`;
    window.localStorage.setItem(`theme`, newTheme);
    setTheme(newTheme);
  };

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

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
