import { createContext, useContext } from "react";

interface ThemeContextType {
  userPrefTheme: string;
  theme: `light` | `dark`;
  toggleTheme: (params?: { auto?: boolean }) => void;
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const useThemeContext = () => useContext(ThemeContext);
