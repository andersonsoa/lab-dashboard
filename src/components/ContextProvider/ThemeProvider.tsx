import { ThemeContext, Theme } from "@/context/theme";
import { ReactNode, useCallback, useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>((): Theme => {
    const thm = localStorage.getItem("@app:theme") as Theme;

    return thm ?? "dark";
  });

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const newTheme = t === "dark" ? "light" : "dark";
      localStorage.setItem("@app:theme", newTheme);
      return newTheme;
    });
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      return;
    }

    document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
