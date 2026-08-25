import type { ParticleStateId } from "@/cinematic/types";

/** Page sections in scroll order (matches Navbar) */
export const SECTION_ORDER = [
  "hero",
  "about",
  "skills",
  "realtime",
  "projects",
  "contact",
] as const;

export type SectionId = (typeof SECTION_ORDER)[number];

/**
 * Morph dimension → section.
 * Aligned to content meaning (not raw list order for mid items):
 * 00 Cosmic Field     → Identity / hero
 * 01 Digital Wave     → Vision / about
 * 02 Real-Time Network→ Systems / realtime
 * 03 Project Const.   → Projects
 * 04 Neural Attractor → Matrix / skills  (AI · shaders · creative stack)
 * 05 Calm Horizon     → Contact
 */
export const STATE_TO_SECTION: Record<ParticleStateId, SectionId> = {
  0: "hero",
  1: "about",
  2: "realtime",
  3: "projects",
  4: "skills",
  5: "contact",
};

/** Reverse lookup for scroll → morph sync */
export const SECTION_TO_STATE: Record<SectionId, ParticleStateId> = {
  hero: 0,
  about: 1,
  realtime: 2,
  projects: 3,
  skills: 4,
  contact: 5,
};

export function scrollProgressForState(stateId: ParticleStateId): number {
  const n = 6;
  const last = n - 1;
  const id = Math.max(0, Math.min(last, stateId));
  // Equal segments so state 05 occupies its own range (not only progress === 1)
  return id >= last ? 1 : (id + 0.5) / n;
}
