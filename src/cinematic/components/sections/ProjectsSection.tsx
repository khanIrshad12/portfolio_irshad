"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Project } from "../../types";
import { ArrowUpRight, ChevronDown, Layers, Plus } from "lucide-react";
import TiltedCard from "../reactbits/TiltedCard";
import { DecryptedText } from "../reactbits/DecryptedText";
import { ShinyText } from "../reactbits/ShinyText";
import { SectionEdgeBlur } from "../reactbits/SectionEdgeBlur";
import { ProjectsCoverflow } from "../ui/ProjectsCoverflow";
import { OriginButton } from "@/components/ui/origin-button";

const VISIBLE_PROJECT_LIMIT = 4;

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

function ProjectCard({
  project,
  onSelectProject,
}: {
  project: Project;
  onSelectProject: (project: Project) => void;
}) {
  return (
    <TiltedCard
      captionText={project.title}
      containerHeight="auto"
      containerWidth="100%"
      imageHeight="100%"
      imageWidth="100%"
      rotateAmplitude={16}
      scaleOnHover={1.08}
      showMobileWarning={false}
      showTooltip
      onClick={() => onSelectProject(project)}
      className="min-h-[30rem] sm:min-h-[32rem]"
    >
      <div className="tilted-project-surface min-h-[30rem] sm:min-h-[32rem]">
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          <div className="tilted-pop tilted-pop--meta mb-5 flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-widest text-cyan-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <DecryptedText text={`SYSTEM // ${project.number}`} speed={25} />
            </span>
            <span className="max-w-[50%] truncate rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70">
              {project.category}
            </span>
          </div>

          <h3 className="tilted-pop tilted-pop--title mb-3 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
            {project.title}
          </h3>

          <p className="tilted-pop tilted-pop--body mb-8 font-mono text-xs leading-relaxed text-white/70 sm:text-sm">
            {project.tagline}
          </p>

          <div
            className="mb-8 grid grid-cols-2 gap-3"
            style={{ transformStyle: "preserve-3d" }}
          >
            {(project.metrics ?? []).slice(0, 2).map((m, i) => (
              <div
                key={i}
                className="tilted-pop tilted-pop--chip rounded-xl border border-white/10 bg-[#030303]/90 p-4"
              >
                <div className="font-mono text-lg font-black text-white sm:text-xl">
                  <ShinyText text={m.value} speed={3} />
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-white/40">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          <div className="tilted-pop tilted-pop--stack mb-6 flex flex-wrap gap-2">
            {(project.techStack ?? []).slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80"
              >
                {tech}
              </span>
            ))}
            {(project.techStack?.length ?? 0) > 4 && (
              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-400">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>

          <div className="tilted-pop tilted-pop--cta flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs font-bold uppercase tracking-widest text-white/70">
            <span className="flex items-center gap-2 text-cyan-400">
              <Layers className="h-4 w-4" />
              <span>Inspect Deep Specs</span>
            </span>
            <div className="tilted-pop-btn flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </TiltedCard>
  );
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasMore = projects.length > VISIBLE_PROJECT_LIMIT;
  const remaining = projects.length - VISIBLE_PROJECT_LIMIT;
  const visibleProjects =
    expanded || !hasMore
      ? projects
      : projects.slice(0, VISIBLE_PROJECT_LIMIT);

  return (
    <section
      id="projects"
      className="relative z-10 min-h-screen overflow-x-clip px-4 py-20 sm:px-8 sm:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex flex-wrap items-center gap-3"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400 sm:text-xs sm:tracking-[0.25em]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
              [ 05 · SELECTED ARCHITECTURE &amp; PLATFORMS ]
            </span>
            <div className="hidden h-px w-16 bg-white/20 sm:block" />
          </motion.div>

          <h2 className="max-w-4xl break-words text-[clamp(1.55rem,7.2vw,3.75rem)] font-black uppercase leading-[1.05] tracking-tighter text-white sm:text-6xl sm:leading-[0.95] md:text-7xl">
            Engineering Milestones{" "}
            <span className="text-white/50">&amp; Production Platforms.</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 max-w-2xl text-sm font-normal leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
          >
            Each system was engineered to solve complex operational challenges
            with precision, speed, and clean modular code architecture.
          </motion.p>
        </div>

        {/* Mobile: coverflow shows all projects */}
        <div className="md:hidden">
          <ProjectsCoverflow
            projects={projects}
            onSelectProject={onSelectProject}
            autoplay
            showNavigation
          />
        </div>

        {/* Desktop: 4 cards + OriginButton show more */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-12">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={
                    index >= VISIBLE_PROJECT_LIMIT
                      ? { opacity: 0, y: 36, scale: 0.96 }
                      : false
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.97 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                    delay:
                      index >= VISIBLE_PROJECT_LIMIT
                        ? (index - VISIBLE_PROJECT_LIMIT) * 0.06
                        : 0,
                  }}
                >
                  <ProjectCard
                    project={project}
                    onSelectProject={onSelectProject}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-14 flex flex-col items-center gap-4"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-3xl"
              />

              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
                <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/50 sm:block" />
                <span className="flex items-center gap-2 text-cyan-400/80">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  </span>
                  {expanded ? "Collapse archive" : "Expand archive"}
                </span>
                <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/50 sm:block" />
              </div>

              <OriginButton
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                aria-label={
                  expanded
                    ? "Show fewer projects"
                    : `Show ${remaining} more projects`
                }
                className={[
                  "group relative min-h-12 min-w-[13.5rem] overflow-hidden rounded-2xl px-9 py-3.5",
                  "border border-cyan-400/35 bg-[#05080c]/90",
                  "font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-300",
                  "shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_0_32px_-6px_rgba(34,211,238,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]",
                  "backdrop-blur-md",
                  "dark:bg-[#05080c]/90",
                  // Cyan origin fill + dark label on hover (high contrast)
                  "[--ob-fill:#22d3ee] [--ob-label-on-fill:#020617]",
                  "[--ic-foreground:#22d3ee] [--color-foreground:#22d3ee]",
                  "[--ic-background:#020617] [--color-background:#020617]",
                  "[--ic-card:#05080c] [--color-card:#05080c]",
                  "[--ic-card-foreground:#67e8f9] [--color-card-foreground:#67e8f9]",
                  "[--ic-border:rgba(34,211,238,0.35)] [--color-border:rgba(34,211,238,0.35)]",
                  "[--ic-muted:#05080c] [--color-muted:#05080c]",
                  "dark:[--ob-fill:#22d3ee] dark:[--ob-label-on-fill:#020617]",
                  "dark:[--ic-foreground:#22d3ee] dark:[--color-foreground:#22d3ee]",
                  "dark:[--ic-muted:#05080c] dark:[--ic-card:#05080c]",
                  "hover:border-cyan-300/60 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.2),0_0_48px_-4px_rgba(34,211,238,0.7)]",
                ].join(" ")}
              >
                <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-70" />
                {expanded ? (
                  <>
                    <ChevronDown className="h-3.5 w-3.5 rotate-180 text-current transition-transform duration-300" />
                    <span className="text-current">Show less</span>
                  </>
                ) : (
                  <>
                    <span className="relative flex h-5 w-5 items-center justify-center rounded-md border border-current/40 bg-current/10 text-current">
                      <Plus className="h-3 w-3" />
                    </span>
                    <span className="text-current">More +{remaining}</span>
                  </>
                )}
              </OriginButton>

              {!expanded && (
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/30">
                  {remaining} additional system
                  {remaining === 1 ? "" : "s"} offline · tap to load
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
      <SectionEdgeBlur />
    </section>
  );
};
