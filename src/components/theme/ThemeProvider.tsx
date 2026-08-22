"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type ColorMode = "light" | "dark";

const STORAGE_KEY = "portfolio-color-mode";

type ThemeContextValue = {
  mode: ColorMode;
  isDark: boolean;
  toggle: () => void;
  setMode: (mode: ColorMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyMode(mode: ColorMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
  root.dataset.theme = mode;
  root.style.colorScheme = mode;
}

/** Prefer DOM class set by themeInitScript; default light. */
function readInitialMode(): ColorMode {
  if (typeof document === "undefined") return "light";
  if (document.documentElement.classList.contains("dark")) return "dark";
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ColorMode>(readInitialMode);

  const setMode = useCallback((next: ColorMode) => {
    setModeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyMode(next);
  }, []);

  const toggle = useCallback(() => {
    setModeState((prev) => {
      const next: ColorMode = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyMode(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{ mode, isDark: mode === "dark", toggle, setMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
