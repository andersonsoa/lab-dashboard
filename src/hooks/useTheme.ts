import { ThemeContext } from "@/context/theme";
import { useContext } from "react";

export const useTheme = () => useContext(ThemeContext);
