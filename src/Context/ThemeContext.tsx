// ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

interface ThemeContextType {
  palette: any; // You may want to define a more specific type here based on your palette structure
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: theme === "dark" ? "#90caf9" : "#1976d2",
        dark: theme === "dark" ? "#64b5f6" : "#0d47a1",
      },
      background: {
        default: theme === "dark" ? "#303030" : "#ffffff",
      },
      text: {
        primary: theme === "dark" ? "#ffffff" : "#303030",
        secondary: theme === "dark" ? "#b0bec5" : "#555555",
      },
      // Add other palette properties as needed
    },
  });

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ palette: muiTheme.palette, theme, setTheme: handleThemeChange }}
    >
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
