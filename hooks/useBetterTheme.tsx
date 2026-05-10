import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// AsyncStorage is React Native’s simple, promise-based API for persisting small bits of data on a user’s device. Think of it as the mobile-app equivalent of the browser’s localStorage, but asynchronous and cross-platform.

export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
  bg: "#fbf8fc",
  surface: "#ffffff",
  text: "#321e3b",
  textMuted: "#7d648b",
  border: "#ece2f0",
  primary: "#a23bf6",
  success: "#10b948",
  warning: "#f5ca0b",
  danger: "#ef4444",
  shadow: "#000000",
  gradients: {
    background: ["#faf8fc", "#eae2f0"],
    surface: ["#ffffff", "#faf8fc"],
    primary: ["#9c3bf6", "#9d1dd8"],
    success: ["#10b981", "#059669"],
    warning: ["#f5be0b", "#d99a06"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#a99caf", "#776b80"],
    empty: ["#f5f3f6", "#e8e5eb"],
  },
  backgrounds: {
    input: "#ffffff",
    editInput: "#ffffff",
  },
  statusBarStyle: "dark-content" as const,
};

const darkColors: ColorScheme = {
  bg: "#1b0f2a",
  surface: "#2e1e3b",
  text: "#f4f1f9",
  textMuted: "#a594b8",
  border: "#443355",
  primary: "#a860fa",
  success: "#34d341",
  warning: "#fbdb24",
  danger: "#f87171",
  shadow: "#000000",
  gradients: {
    background: ["#220f2a", "#321e3b"],
    surface: ["#2d1e3b", "#433355"],
    primary: ["#893bf6", "#6b1dd8"],
    success: ["#10b937", "#359605"],
    warning: ["#f5ca0b", "#d99a06"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#433751", "#574b63"],
    empty: ["#433751", "#594b63"],
  },
  backgrounds: {
    input: "#2c1e3b",
    editInput: "#1b0f2a",
  },
  statusBarStyle: "light-content" as const,
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  betterColors: ColorScheme;
}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // get the user's choice
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const betterColors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, betterColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useBetterTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default useBetterTheme;