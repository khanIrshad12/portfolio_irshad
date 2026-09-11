import fs from "fs/promises";
import path from "path";
import { put, list } from "@vercel/blob";
import type { PortfolioData } from "./types";
import { normalizeTheme } from "./cinematic-theme";
import { normalizeExperiences } from "./experience";
import { normalizeProjects } from "./projects";
import { normalizePortfolioData } from "./skills";
import { mergeCinematicContent } from "./cinematic-content";

const DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");

export async function getPortfolioData(): Promise<PortfolioData> {
  let raw: string | null = null;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blobs = await list({ prefix: "portfolio-data.json" });
      if (blobs.blobs.length > 0) {
        const res = await fetch(blobs.blobs[0].url, { cache: "no-store" });
        if (res.ok) {
          raw = await res.text();
        }
      }
    } catch (err) {
      console.error("Error reading portfolio data from Blob:", err);
    }
  }

  if (!raw) {
    raw = await fs.readFile(DATA_PATH, "utf-8");
  }

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
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put("portfolio-data.json", JSON.stringify(data, null, 2), {
        access: "public",
        addRandomSuffix: false,
      });
    } catch (err) {
      console.error("Vercel Blob save failed:", err);
    }
  }

  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.warn("Could not write portfolio data to disk (read-only filesystem):", err);
    }
  }
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

