import { createContext } from "react";

export type Theme = "dark" | "light";

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps,
);
