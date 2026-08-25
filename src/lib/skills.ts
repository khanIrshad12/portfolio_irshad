import type { PortfolioData, SkillCategory, SkillMatrixItem } from "./types";
import { SKILL_CATEGORIES as DEFAULT_CATEGORIES } from "@/cinematic/data/portfolioData";

export const DEFAULT_SKILLS_SECTION = {
  headline: "A Robust Stack",
  headlineAccent: "Built for Velocity & Resilience.",
  description:
    "From GPU shader math to PLC register polling, low-latency WebSockets, and modern Next.js 15 architectures.",
};

export const EMPTY_SKILL: SkillMatrixItem = {
  name: "",
  category: "General",
  proficiency: 80,
  highlight: "",
};

export const EMPTY_SKILL_CATEGORY: Omit<SkillCategory, "id"> = {
  title: "New Category",
  shortTitle: "New",
  subtitle: "Category description",
  iconName: "Cpu",
  skills: [],
};

export function normalizeSkillItem(skill: Partial<SkillMatrixItem>): SkillMatrixItem {
  return {
    name: skill.name ?? "",
    category: skill.category ?? "General",
    proficiency:
      typeof skill.proficiency === "number"
        ? skill.proficiency
        : typeof (skill as { level?: number }).level === "number"
          ? (skill as { level: number }).level
          : 80,
    highlight: skill.highlight ?? "",
  };
}

export function normalizeSkillCategory(cat: Partial<SkillCategory>): SkillCategory {
  return {
    id: cat.id ?? String(Date.now()),
    title: cat.title ?? "Category",
    shortTitle: cat.shortTitle ?? cat.title ?? "Category",
    subtitle: cat.subtitle ?? "",
    iconName: cat.iconName ?? "Cpu",
    skills: Array.isArray(cat.skills)
      ? cat.skills.map((s) => normalizeSkillItem(s))
      : [],
  };
}

/** Migrate legacy flat `skills` or missing data to cinematic categories. */
export function normalizeSkillCategories(data: PortfolioData): SkillCategory[] {
  if (Array.isArray(data.skillCategories) && data.skillCategories.length > 0) {
    return data.skillCategories.map((c) => normalizeSkillCategory(c));
  }

  if (Array.isArray(data.skills) && data.skills.length > 0) {
    return [
      normalizeSkillCategory({
        id: "legacy-flat",
        title: "Technical Skills",
        shortTitle: "Skills",
        subtitle: "Proficiency across core technologies",
        iconName: "Cpu",
        skills: data.skills.map((s) =>
          normalizeSkillItem({
            name: s.name,
            proficiency: s.level,
            category: "General",
          }),
        ),
      }),
    ];
  }

  return DEFAULT_CATEGORIES.map((c) => normalizeSkillCategory(c));
}

export function normalizeSkillsSection(data: PortfolioData) {
  return {
    headline: data.skillsSection?.headline ?? DEFAULT_SKILLS_SECTION.headline,
    headlineAccent:
      data.skillsSection?.headlineAccent ?? DEFAULT_SKILLS_SECTION.headlineAccent,
    description:
      data.skillsSection?.description ?? DEFAULT_SKILLS_SECTION.description,
  };
}

export function normalizePortfolioData(data: PortfolioData): PortfolioData {
  return {
    ...data,
    skillCategories: normalizeSkillCategories(data),
    skillsSection: normalizeSkillsSection(data),
  };
}