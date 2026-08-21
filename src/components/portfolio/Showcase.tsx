"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ShowcaseStat } from "@/lib/types";
import {
  useReducedMotion,
  bounceTransition,
  staggerChildren,
} from "@/hooks/useReducedMotion";
import { Marquee } from "./Marquee";

interface ShowcaseProps {
  stats: ShowcaseStat[];
}

const POP_COLORS = [
  "var(--color-primary)",
  "var(--color-accent)",
  "var(--color-pop-pink)",
  "var(--color-pop-mint)",
  "var(--color-pop-violet)",
];

export function Showcase({ stats }: ShowcaseProps) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rowY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [28, -28],
  );

  return (
    <>
      <Marquee
        items={[
          "Frontend",
          "React",
          "Next.js",
          "TypeScript",
          "UI Systems",
          "Motion",
          "Product Craft",
        ]}
        className="bg-[var(--color-bg)]"
        speedSeconds={32}
      />
      <section
        ref={sectionRef}
        className="border-b-[3px] border-[var(--color-ink)] bg-[var(--color-accent)] py-10 md:py-12"
      >
        <div className="container-narrow px-5 md:px-8">
          <motion.div
            style={{ y: rowY }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: staggerChildren(reduced, 0.08) },
              },
            }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.id}
                variants={{
                  hidden: {
                    opacity: reduced ? 1 : 0,
                    scale: reduced ? 1 : 0.7,
                    rotate: reduced ? 0 : -4,
                  },
                  show: {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: bounceTransition(reduced, 0.5),
                  },
                }}
                animate={
                  reduced
                    ? undefined
                    : { y: [0, i % 2 === 0 ? -8 : 8, 0] }
                }
                transition={
                  reduced
                    ? undefined
                    : {
                        y: {
                          duration: 3.2 + i * 0.35,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.15,
                        },
                      }
                }
                whileHover={
                  reduced
                    ? undefined
                    : { rotate: i % 2 === 0 ? -2 : 2, scale: 1.06 }
                }
                className="sticker-card relative cursor-grow px-4 py-5 text-center md:px-5 md:py-6"
                style={{
                  boxShadow: `5px 5px 0 ${POP_COLORS[i % POP_COLORS.length]}`,
                }}
              >
                <span
                  className="absolute -top-2 left-1/2 flex size-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[var(--color-ink)]"
                  style={{ background: POP_COLORS[i % POP_COLORS.length] }}
                  aria-hidden
                />
                <p className="font-[family-name:var(--font-display)] text-2xl leading-none md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
