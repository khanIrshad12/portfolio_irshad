import type { Project, ProjectMetric } from "./types";
import type { Project as CinematicProject } from "@/cinematic/types";

const ACCENT_PALETTE = [
  "#06b6d4",
  "#f59e0b",
  "#3b82f6",
  "#a855f7",
  "#22d3ee",
  "#10b981",
  "#ec4899",
  "#818cf8",
];

export const EMPTY_PROJECT_METRIC: ProjectMetric = {
  label: "Metric",
  value: "—",
};

export const EMPTY_PROJECT: Omit<Project, "id"> = {
  number: "01",
  title: "New Project",
  category: "Platform & Architecture",
  tagline: "",
  overview: "",
  architecture: [],
  keyContributions: [],
  techStack: [],
  metrics: [
    { label: "Scope", value: "Production" },
    { label: "Status", value: "Shipped" },
  ],
  accentColor: "#06b6d4",
  constellationClusterIndex: 0,
  company: "",
  liveUrl: "",
  githubUrl: "",
  linkLabel: "",
  featured: false,
};

function defaultMetricsFromTags(tags: string[]): ProjectMetric[] {
  const primary = tags[0] ?? "Full Stack";
  return [
    { label: "Primary Stack", value: primary },
    { label: "Delivery", value: "Production" },
  ];
}

/** Migrate legacy flat projects → cinematic card shape */
export function normalizeProject(
  raw: Partial<Project> & { id?: string },
  index: number,
): Project {
  const techStack =
    raw.techStack && raw.techStack.length > 0
      ? raw.techStack
      : (raw.tags ?? []);
  const keyContributions =
    raw.keyContributions && raw.keyContributions.length > 0
      ? raw.keyContributions
      : (raw.highlights ?? []);
  const tagline = raw.tagline || raw.description || "";
  const overview = raw.overview || raw.description || tagline;
  const liveUrl = raw.liveUrl || raw.url || "";

  return {
    id: raw.id ?? String(Date.now() + index),
    number:
      raw.number?.trim() ||
      String(index + 1).padStart(2, "0"),
    title: raw.title ?? "Untitled Project",
    category: raw.category || raw.company || "Production Platform",
    tagline,
    overview,
    architecture: raw.architecture ?? [],
    keyContributions,
    techStack,
    metrics:
      raw.metrics && raw.metrics.length > 0
        ? raw.metrics
        : defaultMetricsFromTags(techStack),
    accentColor: raw.accentColor || ACCENT_PALETTE[index % ACCENT_PALETTE.length],
    constellationClusterIndex:
      typeof raw.constellationClusterIndex === "number"
        ? raw.constellationClusterIndex
        : index % 4,
    company: raw.company ?? "",
    liveUrl,
    githubUrl: raw.githubUrl ?? "",
    linkLabel: raw.linkLabel ?? "",
    featured: raw.featured ?? false,
  };
}

export function normalizeProjects(list: unknown): Project[] {
  if (!Array.isArray(list)) return [];
  return list.map((item, i) =>
    normalizeProject((item ?? {}) as Partial<Project>, i),
  );
}

/** Map admin/portfolio Project → cinematic UI Project */
export function projectsToCinematic(projects: Project[]): CinematicProject[] {
  return normalizeProjects(projects).map((p) => ({
    id: p.id,
    number: p.number,
    title: p.title,
    category: p.category,
    tagline: p.tagline,
    overview: p.overview,
    architecture: p.architecture ?? [],
    keyContributions: p.keyContributions ?? [],
    techStack: p.techStack ?? [],
    metrics: (p.metrics ?? []).map((m) => ({
      label: m.label,
      value: m.value,
    })),
    accentColor: p.accentColor,
    constellationClusterIndex: p.constellationClusterIndex,
    githubUrl: p.githubUrl || undefined,
    liveUrl: p.liveUrl || undefined,
    isFeatured: p.featured,
  }));
}
