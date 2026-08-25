import type { Theme } from "./types";

/** Defaults aligned with the cinematic portfolio (#030303 + cyan accent). */
export const CINEMATIC_THEME_DEFAULTS: Theme = {
  primary: "#38bdf8",
  accent: "#818cf8",
  background: "#030303",
  surface: "#0a0a0a",
  ink: "#f5f5f5",
};

export function themeToCinematicCssVars(
  theme: Theme,
): Record<string, string> {
  return {
    "--cinematic-primary": theme.primary,
    "--cinematic-accent": theme.accent,
    "--cinematic-bg": theme.background,
    "--cinematic-surface": theme.surface,
    "--cinematic-ink": theme.ink,
  };
}

/** Normalize legacy oklch theme values to cinematic hex defaults when loading admin. */
export function normalizeTheme(theme: Theme): Theme {
  const bg = theme.background.trim().toLowerCase();
  if (bg.startsWith("oklch") && bg.includes("1.000")) {
    return { ...CINEMATIC_THEME_DEFAULTS };
  }
  return theme;
}

/** Best-effort hex for <input type="color"> (falls back to cyan). */
export function toColorPickerHex(value: string): string {
  const v = value.trim();
  if (/^#[0-9a-f]{6}$/i.test(v)) return v;
  if (/^#[0-9a-f]{3}$/i.test(v)) {
    const [, r, g, b] = v.match(/^#(.)(.)(.)$/) ?? [];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return "#38bdf8";
}
