import fs from "fs/promises";
import path from "path";
import type { PortfolioData } from "./types";
import { normalizeTheme } from "./cinematic-theme";
import { normalizeExperiences } from "./experience";
import { normalizeProjects } from "./projects";
import { normalizePortfolioData } from "./skills";
import { mergeCinematicContent } from "./cinematic-content";

const DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");

export async function getPortfolioData(): Promise<PortfolioData> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  const data = JSON.parse(raw) as PortfolioData;
  return mergeCinematicContent(
    normalizePortfolioData({
      ...data,
      theme: normalizeTheme(data.theme),
      experience: normalizeExperiences(data.experience ?? []),
      projects: normalizeProjects(data.projects ?? []),
    }),
  );
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function themeToCssVars(
  theme: PortfolioData["theme"],
): Record<string, string> {
  // Only light brand slots — dark mode remaps --color-* in CSS (beats inline)
  return {
    "--light-primary": theme.primary,
    "--light-accent": theme.accent,
    "--light-bg": theme.background,
    "--light-surface": theme.surface,
    "--light-ink": theme.ink,
  };
}
