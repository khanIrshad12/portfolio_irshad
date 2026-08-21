"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import {
  useReducedMotion,
  bounceTransition,
  staggerChildren,
} from "@/hooks/useReducedMotion";
import { FloatingShapes } from "./FloatingShapes";
import { Squiggle } from "./Squiggle";
import { FogLayer } from "./FogLayer";
import { MoreProjectsCarousel } from "./MoreProjectsCarousel";

interface ProjectsProps {
  projects: Project[];
}

const TAG_COLORS = [
  "var(--color-accent)",
  "var(--color-pop-pink)",
  "var(--color-pop-mint)",
  "var(--color-pop-sky)",
  "var(--color-pop-violet)",
];

export function Projects({ projects }: ProjectsProps) {
  const reduced = useReducedMotion();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="section-padding border-b-[3px] border-[var(--color-ink)] bg-[var(--color-bg)]"
    >
      <FogLayer variant="playful" intensity={0.65} />
      <FloatingShapes
        shapes={[
          {
            kind: "triangle",
            color: "var(--color-accent)",
            size: 56,
            top: "8%",
            right: "8%",
            parallax: 40,
          },
          {
            kind: "pill",
            color: "var(--color-pop-violet)",
            size: 50,
            bottom: "25%",
            left: "2%",
            rotate: -25,
            delay: 0.6,
            parallax: -30,
          },
        ]}
      />

      <div className="container-narrow">
        <motion.div
          initial={{
            opacity: reduced ? 1 : 0,
            y: reduced ? 0 : 24,
            scale: reduced ? 1 : 0.96,
          }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false }}
          transition={bounceTransition(reduced)}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-[-0.03em]">
              Selected Work
            </h2>
            <Squiggle />
          </div>
          <p className="max-w-lg text-sm text-[var(--color-muted)] md:text-base">
            10+ production projects across entertainment, maritime, ecommerce,
            and industrial IoT.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-40px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: staggerChildren(reduced, 0.12) },
            },
          }}
          className="grid gap-6"
        >
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              variants={{
                hidden: {
                  opacity: reduced ? 1 : 0,
                  y: reduced ? 0 : 32,
                  scale: reduced ? 1 : 0.94,
                },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: bounceTransition(reduced, 0.55),
                },
              }}
              whileHover={
                reduced ? undefined : { rotate: -0.5, y: -4, scale: 1.01 }
              }
              className="sticker-card group relative flex flex-col overflow-visible p-6 md:p-8"
              style={{
                boxShadow:
                  i % 2 === 0
                    ? "8px 8px 0 var(--color-accent)"
                    : "8px 8px 0 var(--color-pop-pink)",
              }}
              animate={
                reduced
                  ? undefined
                  : { y: [0, i % 2 === 0 ? -6 : 6, 0] }
              }
              transition={
                reduced
                  ? undefined
                  : {
                      y: {
                        duration: 4.5 + i * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.25,
                      },
                    }
              }
            >
              <span
                className="absolute -top-4 left-8 flex size-10 items-center justify-center rounded-full border-[3px] border-[var(--color-ink)] font-[family-name:var(--font-display)] text-sm"
                style={{
                  background:
                    i % 2 === 0
                      ? "var(--color-primary)"
                      : "var(--color-pop-violet)",
                  color: "var(--color-bg)",
                  boxShadow: "3px 3px 0 var(--color-ink)",
                }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:justify-between">
                <div className="flex-1">
                  {project.company && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-primary)]">
                      {project.company}
                    </p>
                  )}
                  <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl lg:text-3xl">
                    {project.title}
                  </h3>
                  <p className="text-pretty mt-4 text-sm leading-relaxed text-[var(--color-muted)] md:text-base">
                    {project.description}
                  </p>

                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {project.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-snug md:text-[0.9375rem]"
                        >
                          <span
                            className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-primary)] text-[0.6rem] text-[var(--color-bg)]"
                            aria-hidden
                          >
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag, ti) => (
                      <span
                        key={tag}
                        className="rounded-full border-2 border-[var(--color-ink)] px-3 py-0.5 text-xs font-semibold uppercase"
                        style={{
                          background: TAG_COLORS[ti % TAG_COLORS.length],
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {project.url && (
                  <div className="shrink-0 lg:self-end">
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brutal-btn brutal-btn-primary text-xs"
                    >
                      {project.linkLabel ?? "View Project"}
                      <span
                        className="flex size-6 items-center justify-center rounded-full bg-[var(--color-bg)] text-[var(--color-ink)]"
                        aria-hidden
                      >
                        →
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {others.length > 0 && (
          <div className="mt-10">
            <h3 className="mb-6 font-[family-name:var(--font-display)] text-xl">
              More Projects
            </h3>

            {/* Mobile: card stack carousel */}
            <div className="sm:hidden">
              <MoreProjectsCarousel projects={others} />
            </div>

            {/* Tablet / desktop: grid cards */}
            <div className="hidden gap-4 sm:grid sm:grid-cols-2">
              {others.map((project, i) => (
                <motion.article
                  key={project.id}
                  initial={{
                    opacity: reduced ? 1 : 0,
                    scale: reduced ? 1 : 0.92,
                  }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={bounceTransition(reduced, 0.45)}
                  whileHover={
                    reduced ? undefined : { rotate: i % 2 ? 1 : -1, y: -3 }
                  }
                  className="sticker-card p-5"
                  style={{
                    boxShadow: `5px 5px 0 ${TAG_COLORS[i % TAG_COLORS.length]}`,
                  }}
                >
                  {project.company && (
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-primary)]">
                      {project.company}
                    </p>
                  )}
                  <h4 className="mt-1 font-semibold">{project.title}</h4>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    {project.description}
                  </p>
                  {project.highlights && (
                    <ul className="mt-3 space-y-1">
                      {project.highlights.slice(0, 2).map((h) => (
                        <li key={h} className="text-xs text-[var(--color-muted)]">
                          • {h}
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.url && (
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm font-semibold underline"
                    >
                      {project.linkLabel ?? "View"} →
                    </Link>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
