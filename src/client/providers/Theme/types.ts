import type { ReactNode } from "react";

export type ThemeProviderProps = {
  children: ReactNode;
};

export type ToggleThemeParams = {
  auto?: boolean;
  force?: boolean;
};
