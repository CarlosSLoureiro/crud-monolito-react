import { useEffect, useState } from "react";

import { createTheme, type PaletteMode } from "@mui/material";

import type { ToggleThemeParams } from "./types";

export function useThemeProvider() {
  const userSystemDark = window.matchMedia(`(prefers-color-scheme: dark)`);
  const [userPrefTheme, setUserPrefTheme] = useState(
    window.localStorage.getItem(`theme`) || `auto`,
  );

  const isUserSystemDark = userSystemDark.matches;
  const isUserPrefDark = userPrefTheme === `dark`;

  const isDark = userPrefTheme !== `auto` ? isUserPrefDark : isUserSystemDark;

  const [theme, setTheme] = useState<PaletteMode>(isDark ? `dark` : `light`);

  const onChandeSystemTheme = (e: MediaQueryListEvent) => {
    const prefTheme = window.localStorage.getItem(`theme`) || `auto`;
    if (prefTheme === `auto`) {
      setTheme(e.matches ? `dark` : `light`);
    }
  };

  useEffect(() => {
    userSystemDark.addEventListener(`change`, onChandeSystemTheme);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(`theme`, userPrefTheme);
  }, [userPrefTheme]);

  useEffect(() => {
    if (theme === `dark`) {
      document.documentElement.setAttribute(`data-theme`, `dark`);
    } else {
      document.documentElement.setAttribute(`data-theme`, `light`);
    }
  }, [theme]);

  const toggleTheme = (params?: ToggleThemeParams) => {
    const { auto, force } = params || {};

    if (force) {
      const newTheme = theme === `light` ? `dark` : `light`;
      setUserPrefTheme(newTheme);
      setTheme(newTheme);
      return;
    } else if (auto) {
      setUserPrefTheme(`auto`);
      const userSystemDark = window.matchMedia(`(prefers-color-scheme: dark)`);
      const isUserSystemDark = userSystemDark.matches;
      setTheme(isUserSystemDark ? `dark` : `light`);
      return;
    } else if (userPrefTheme === `auto`) {
      setUserPrefTheme(theme);
      return;
    }

    const newTheme = theme === `light` ? `dark` : `light`;
    setUserPrefTheme(newTheme);
    setTheme(newTheme);
  };

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return { userPrefTheme, theme, darkTheme, toggleTheme };
}
