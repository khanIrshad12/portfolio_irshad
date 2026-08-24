"use client";

import { Calendar, MapPin } from "lucide-react";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import type { ExperienceItem } from "../../types";

/** Compact mobile experience card — no ContainerScroll / 3D scroll theater */
export function ExperienceMobileCard({ exp }: { exp: ExperienceItem }) {
  return (
    <article className="w-full">
      <div className="mb-4">
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-400">
          Career Trajectory
        </p>
        <h4 className="text-2xl font-black uppercase tracking-tight text-white">
          {exp.role}
        </h4>
        <p className="mt-2 font-mono text-xs font-semibold uppercase tracking-wider text-white/55">
          <span className="text-cyan-400">{exp.company}</span>
          <span className="mx-2 text-white/25">·</span>
          <span className="normal-case tracking-normal text-white/50">
            {exp.period}
          </span>
        </p>
      </div>

      <SpotlightCard
        className="rounded-2xl border border-cyan-500/25 p-4"
        spotlightColor="rgba(56, 189, 248, 0.12)"
      >
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-black uppercase tracking-tight text-white">
                {exp.company}
              </span>
              {exp.badge && (
                <span className="rounded-full border border-cyan-700/60 bg-cyan-950/80 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  {exp.badge}
                </span>
              )}
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/50">
              {exp.type}
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 font-mono text-[11px] text-white/55">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
              {exp.period}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
              {exp.location}
            </span>
          </div>
        </div>

        <p className="mb-4 font-mono text-xs leading-relaxed text-white/75">
          {exp.summary}
        </p>

        <ul className="mb-4 space-y-2">
          {exp.highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-[#030303]/90 p-3 font-mono text-[11px] leading-relaxed text-white/75"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {exp.techStack.map((s) => (
            <span
              key={s}
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/75"
            >
              {s}
            </span>
          ))}
        </div>
      </SpotlightCard>
    </article>
  );
}
