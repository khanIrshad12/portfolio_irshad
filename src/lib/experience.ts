import type { Experience } from "./types";

export function normalizeExperience(exp: Experience): Experience {
  return {
    id: exp.id,
    company: exp.company ?? "",
    role: exp.role ?? "",
    period: exp.period ?? "",
    location: exp.location ?? "Mumbai, India",
    type: exp.type ?? "Full-Time",
    summary: exp.summary ?? exp.description ?? "",
    highlights: Array.isArray(exp.highlights) ? exp.highlights : [],
    techStack: Array.isArray(exp.techStack) ? exp.techStack : [],
    badge: exp.badge,
  };
}

export function normalizeExperiences(experiences: Experience[]): Experience[] {
  return experiences.map(normalizeExperience);
}

export const EMPTY_EXPERIENCE: Omit<Experience, "id"> = {
  company: "",
  role: "",
  period: "",
  location: "Mumbai, India",
  type: "Full-Time",
  summary: "",
  highlights: [],
  techStack: [],
  badge: "",
};
