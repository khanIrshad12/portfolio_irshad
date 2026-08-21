"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/lib/types";
import {
  useReducedMotion,
  bounceTransition,
  staggerChildren,
} from "@/hooks/useReducedMotion";
import { Squiggle } from "./Squiggle";

interface SkillsProps {
  skills: Skill[];
}

const BAR_COLORS = [
  "var(--color-primary)",
  "var(--color-pop-pink)",
  "var(--color-pop-mint)",
  "var(--color-pop-violet)",
  "var(--color-accent)",
  "var(--color-pop-sky)",
];

export function Skills({ skills }: SkillsProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="skills"
      className="section-padding border-b-[3px] border-[var(--color-ink)] bg-[var(--color-accent)]"
    >
      <div
        className="pointer-events-none absolute inset-0 stripe-fill opacity-40"
        aria-hidden
      />

      <div className="container-narrow">
        <motion.div
          initial={{
            opacity: reduced ? 1 : 0,
            y: reduced ? 0 : 20,
            scale: reduced ? 1 : 0.95,
          }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false }}
          transition={bounceTransition(reduced)}
          className="mb-12"
        >
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-[-0.03em]">
            Skills & Tools
          </h2>
          <Squiggle color="var(--color-ink)" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: staggerChildren(reduced, 0.06) },
            },
          }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={{
                hidden: {
                  opacity: reduced ? 1 : 0,
                  scale: reduced ? 1 : 0.8,
                  rotate: reduced ? 0 : -3,
                },
                show: {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  transition: bounceTransition(reduced, 0.45),
                },
              }}
              whileHover={
                reduced ? undefined : { rotate: 1.5, y: -4, scale: 1.03 }
              }
              className="sticker-card relative p-5"
              style={{
                boxShadow: `5px 5px 0 ${BAR_COLORS[i % BAR_COLORS.length]}`,
              }}
            >
              <span
                className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full border-[3px] border-[var(--color-ink)] text-[0.65rem] font-bold"
                style={{
                  background: BAR_COLORS[i % BAR_COLORS.length],
                  boxShadow: "2px 2px 0 var(--color-ink)",
                }}
                aria-hidden
              >
                {i + 1}
              </span>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">{skill.name}</span>
                <span className="rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] px-2 py-0.5 text-xs font-bold">
                  {skill.level}%
                </span>
              </div>
              <div className="h-4 overflow-hidden rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)]">
                <motion.div
                  initial={{ width: reduced ? `${skill.level}%` : 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: false }}
                  transition={bounceTransition(reduced, 0.9)}
                  className="h-full rounded-full"
                  style={{ background: BAR_COLORS[i % BAR_COLORS.length] }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
