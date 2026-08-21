"use client";

import { motion } from "framer-motion";
import type { About as AboutType } from "@/lib/types";
import {
  useReducedMotion,
  bounceTransition,
  staggerChildren,
} from "@/hooks/useReducedMotion";
import { FloatingShapes } from "./FloatingShapes";
import { Squiggle } from "./Squiggle";
import { FogLayer } from "./FogLayer";

interface AboutProps {
  about: AboutType;
}

const HIGHLIGHT_COLORS = [
  "var(--color-primary)",
  "var(--color-accent)",
  "var(--color-pop-pink)",
  "var(--color-pop-mint)",
];

export function About({ about }: AboutProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="section-padding border-b-[3px] border-[var(--color-ink)] bg-[var(--color-surface)]"
    >
      <FogLayer variant="soft" intensity={0.7} />
      <FloatingShapes
        shapes={[
          {
            kind: "circle",
            color: "var(--color-pop-mint)",
            size: 90,
            top: "10%",
            right: "5%",
            parallax: 35,
          },
          {
            kind: "square",
            color: "var(--color-accent)",
            size: 40,
            bottom: "15%",
            left: "3%",
            rotate: 20,
            delay: 0.5,
            parallax: -25,
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
          viewport={{ once: false, margin: "-80px" }}
          transition={bounceTransition(reduced)}
        >
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-[-0.03em]">
            {about.headline}
          </h2>
          <Squiggle color="var(--color-pop-pink)" />
          <p className="text-pretty mt-6 max-w-3xl text-base leading-relaxed md:text-lg">
            {about.bio}
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-60px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: staggerChildren(reduced, 0.08) },
            },
          }}
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          {about.highlights.map((highlight, i) => (
            <motion.li
              key={highlight}
              variants={{
                hidden: {
                  opacity: reduced ? 1 : 0,
                  x: reduced ? 0 : -16,
                  scale: reduced ? 1 : 0.92,
                },
                show: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: bounceTransition(reduced, 0.45),
                },
              }}
              whileHover={
                reduced ? undefined : { rotate: -1, y: -3, scale: 1.02 }
              }
              className="brutal-border flex items-start gap-3 bg-[var(--color-bg)] px-5 py-4 text-sm font-medium md:text-base"
              style={{
                borderRadius: i % 2 === 0 ? "1.25rem 1.25rem 1.25rem 0" : "0 1.25rem 1.25rem 1.25rem",
                boxShadow: `4px 4px 0 ${HIGHLIGHT_COLORS[i % HIGHLIGHT_COLORS.length]}`,
              }}
            >
              <span
                className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-ink)] text-xs font-bold"
                style={{
                  background: HIGHLIGHT_COLORS[i % HIGHLIGHT_COLORS.length],
                }}
                aria-hidden
              >
                ✓
              </span>
              {highlight}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
