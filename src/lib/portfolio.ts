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

// In-memory cache for fast local reads within the same serverless instance
let memoryCache: { data: PortfolioData; timestamp: number } | null = null;

export async function getPortfolioData(): Promise<PortfolioData> {
  let raw: string | null = null;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blobs = await list({ prefix: "portfolio-data.json" });
      if (blobs.blobs.length > 0) {
        // Find newest blob by upload date
        const sortedBlobs = [...blobs.blobs].sort(
          (a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
        );
        const targetBlob = sortedBlobs[0];
        // Bust edge CDN and Next.js caching with timestamp and no-cache headers
        const res = await fetch(`${targetBlob.url}?t=${Date.now()}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
        });
        if (res.ok) {
          raw = await res.text();
        }
      }
    } catch (err) {
      console.error("Error reading portfolio data from Blob:", err);
    }
  }

  if (!raw && memoryCache) {
    return memoryCache.data;
  }

  if (!raw) {
    try {
      raw = await fs.readFile(DATA_PATH, "utf-8");
    } catch (fsErr) {
      console.error("Error reading portfolio data from disk:", fsErr);
    }
  }

  if (!raw) {
    if (memoryCache) return memoryCache.data;
    throw new Error("Unable to load portfolio data from storage or disk");
  }

  const data = JSON.parse(raw) as PortfolioData;
  const processed = mergeCinematicContent(
    normalizePortfolioData({
      ...data,
      theme: normalizeTheme(data.theme),
      experience: normalizeExperiences(data.experience ?? []),
      projects: normalizeProjects(data.projects ?? []),
    }),
  );

  memoryCache = { data: processed, timestamp: Date.now() };
  return processed;
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  const serialized = JSON.stringify(data, null, 2);
  let savedToBlob = false;
  let savedToDisk = false;
  let blobError: Error | null = null;
  let diskError: Error | null = null;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put("portfolio-data.json", serialized, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      savedToBlob = true;
    } catch (err) {
      console.error("Vercel Blob save failed:", err);
      blobError = err instanceof Error ? err : new Error(String(err));
    }
  }

  try {
    await fs.writeFile(DATA_PATH, serialized, "utf-8");
    savedToDisk = true;
  } catch (err) {
    diskError = err instanceof Error ? err : new Error(String(err));
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.warn("Could not write portfolio data to disk (read-only filesystem):", err);
    }
  }

  // Update memory cache immediately
  memoryCache = { data, timestamp: Date.now() };

  // If neither Blob nor Disk was able to save, throw an error
  if (!savedToBlob && !savedToDisk) {
    const reason = blobError?.message || diskError?.message || "Storage unavailable";
    throw new Error(
      process.env.BLOB_READ_WRITE_TOKEN
        ? `Failed to save to Vercel Blob: ${reason}`
        : `Server storage is read-only. Please connect Vercel Blob Storage in your Vercel Dashboard (BLOB_READ_WRITE_TOKEN) to persist changes.`
    );
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


