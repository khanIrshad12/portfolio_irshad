import type { Experience } from "@/lib/types";
import type { ExperienceItem } from "@/cinematic/types";

export function experienceToCinematicItem(exp: Experience): ExperienceItem {
  return {
    id: exp.id,
    company: exp.company,
    role: exp.role,
    period: exp.period,
    location: exp.location,
    type: exp.type,
    summary: exp.summary,
    highlights: exp.highlights,
    techStack: exp.techStack,
    badge: exp.badge,
  };
}

export function experiencesToCinematicItems(
  experiences: Experience[],
): ExperienceItem[] {
  return experiences.map(experienceToCinematicItem);
}
