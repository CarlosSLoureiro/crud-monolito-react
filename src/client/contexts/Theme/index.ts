import { createContext, useContext } from "react";

import type { ToggleThemeParams } from "@client/providers/Theme/types";

interface ThemeContextType {
  userPrefTheme: string;
  theme: `light` | `dark`;
  toggleTheme: (params?: ToggleThemeParams) => void;
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const useThemeContext = () => useContext(ThemeContext);
