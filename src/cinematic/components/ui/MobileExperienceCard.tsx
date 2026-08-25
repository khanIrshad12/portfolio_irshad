"use client";

import type { ExperienceItem } from "../../types";
import { ExperienceCardContent } from "./ExperienceCardContent";

/** Single experience card wrapper — used when carousel is not needed. */
export function MobileExperienceCard({ exp }: { exp: ExperienceItem }) {
  return (
    <article className="w-full">
      <div className="mb-4">
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
          Career Trajectory
        </p>
        <h4 className="text-2xl font-black uppercase tracking-tight text-white">
          {exp.role}
        </h4>
        <p className="mt-2 font-mono text-xs font-semibold uppercase tracking-wider text-white/55">
          <span className="text-cyan-400">{exp.company}</span>
          <span className="mx-2 text-white/25">·</span>
          <span className="normal-case tracking-normal text-white/45">
            {exp.period}
          </span>
        </p>
      </div>
      <ExperienceCardContent exp={exp} />
    </article>
  );
}
