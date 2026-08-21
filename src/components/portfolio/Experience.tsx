"use client";

import { motion } from "framer-motion";
import type { Experience as ExperienceType } from "@/lib/types";
import {
  useReducedMotion,
  bounceTransition,
  staggerChildren,
} from "@/hooks/useReducedMotion";
import { FloatingShapes } from "./FloatingShapes";
import { Squiggle } from "./Squiggle";
import { FogLayer } from "./FogLayer";

interface ExperienceProps {
  experience: ExperienceType[];
}

const NODE_COLORS = [
  "var(--color-primary)",
  "var(--color-accent)",
  "var(--color-pop-pink)",
  "var(--color-pop-mint)",
  "var(--color-pop-violet)",
];

export function Experience({ experience }: ExperienceProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="experience"
      className="section-padding border-b-[3px] border-[var(--color-ink)] bg-[var(--color-bg)]"
    >
      <FogLayer variant="soft" intensity={0.6} />
      <FloatingShapes
        shapes={[
          {
            kind: "ring",
            color: "var(--color-pop-sky)",
            size: 80,
            top: "12%",
            right: "6%",
            parallax: 40,
          },
          {
            kind: "square",
            color: "var(--color-pop-pink)",
            size: 36,
            bottom: "20%",
            left: "5%",
            rotate: 15,
            delay: 0.4,
            parallax: -20,
          },
        ]}
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
            Experience
          </h2>
          <Squiggle color="var(--color-pop-mint)" />
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: staggerChildren(reduced, 0.14) },
            },
          }}
          className="relative space-y-8 border-l-[3px] border-dashed border-[var(--color-ink)] pl-8 md:pl-12"
        >
          {experience.map((item, i) => (
            <motion.li
              key={item.id}
              variants={{
                hidden: {
                  opacity: reduced ? 1 : 0,
                  x: reduced ? 0 : -20,
                  scale: reduced ? 1 : 0.94,
                },
                show: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: bounceTransition(reduced, 0.5),
                },
              }}
              className="relative"
            >
              <motion.span
                className="absolute -left-[calc(2rem+3px)] top-2 size-5 border-[3px] border-[var(--color-ink)] md:-left-[calc(3rem+3px)]"
                style={{
                  background: NODE_COLORS[i % NODE_COLORS.length],
                  borderRadius: i % 2 === 0 ? "50%" : "4px",
                  boxShadow: "2px 2px 0 var(--color-ink)",
                }}
                animate={
                  reduced
                    ? undefined
                    : { scale: [1, 1.2, 1] }
                }
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
                aria-hidden
              />
              <motion.div
                whileHover={
                  reduced ? undefined : { rotate: -0.8, y: -3, scale: 1.01 }
                }
                className="sticker-card p-6"
                style={{
                  boxShadow: `6px 6px 0 ${NODE_COLORS[i % NODE_COLORS.length]}`,
                }}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl">
                    {item.role}
                  </h3>
                  <span className="rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-surface)] px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 font-semibold text-[var(--color-primary)]">
                  {item.company}
                </p>
                <p className="text-pretty mt-3 text-sm leading-relaxed text-[var(--color-muted)] md:text-base">
                  {item.description}
                </p>
              </motion.div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
