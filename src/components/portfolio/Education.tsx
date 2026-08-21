"use client";

import { motion } from "framer-motion";
import type { Education as EducationType, Certification } from "@/lib/types";
import {
  useReducedMotion,
  bounceTransition,
  staggerChildren,
} from "@/hooks/useReducedMotion";
import { Squiggle } from "./Squiggle";
import { FogLayer } from "./FogLayer";

interface EducationProps {
  education: EducationType[];
  certifications: Certification[];
}

export function Education({ education, certifications }: EducationProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="education"
      className="section-padding border-b-[3px] border-[var(--color-ink)] bg-[var(--color-surface)]"
    >
      <FogLayer variant="playful" intensity={0.55} />
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
            Education & Certifications
          </h2>
          <Squiggle color="var(--color-pop-violet)" />
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em]">
              <span
                className="flex size-7 items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-accent)] text-xs"
                aria-hidden
              >
                ✎
              </span>
              Education
            </h3>
            <motion.ol
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: staggerChildren(reduced, 0.1),
                  },
                },
              }}
              className="space-y-4"
            >
              {education.map((item, i) => (
                <motion.li
                  key={item.id}
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
                  className="sticker-card p-5"
                  style={{
                    boxShadow:
                      i % 2 === 0
                        ? "5px 5px 0 var(--color-accent)"
                        : "5px 5px 0 var(--color-pop-mint)",
                  }}
                >
                  <p className="font-semibold">{item.degree}</p>
                  <p className="mt-1 text-sm text-[var(--color-primary)]">
                    {item.institution}
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-muted)]">
                    {item.location} · {item.period}
                  </p>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          <div>
            <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em]">
              <span
                className="flex size-7 items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-pop-pink)] text-xs"
                aria-hidden
              >
                ★
              </span>
              Certifications
            </h3>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: staggerChildren(reduced, 0.1),
                  },
                },
              }}
              className="space-y-4"
            >
              {certifications.map((cert, i) => (
                <motion.li
                  key={cert.id}
                  variants={{
                    hidden: {
                      opacity: reduced ? 1 : 0,
                      x: reduced ? 0 : 16,
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
                    reduced ? undefined : { rotate: 1, y: -3, scale: 1.02 }
                  }
                  className="brutal-border bg-[var(--color-bg)] px-5 py-4"
                  style={{
                    borderRadius: "1.25rem 1.25rem 0 1.25rem",
                    boxShadow: `4px 4px 0 ${
                      i % 2 === 0
                        ? "var(--color-pop-pink)"
                        : "var(--color-pop-violet)"
                    }`,
                  }}
                >
                  <p className="font-semibold">{cert.name}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {cert.issuer} · {cert.year}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
