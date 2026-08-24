"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT_EXPO, fadeUp } from "../../lib/motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  once?: boolean;
  amount?: number;
};

/** Scroll reveal — fade + slide-up as content enters the viewport */
export function ScrollReveal({
  children,
  className = "",
  distance = 40,
  once = true,
  amount = 0.16,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
      variants={fadeUp(reduced, distance)}
    >
      {children}
    </motion.div>
  );
}

type ChapterRevealProps = {
  children: ReactNode;
  className?: string;
  veil?: boolean;
  once?: boolean;
};

/**
 * Section page-reveal: clip-path unmask + optional continuity veil + cyan edge flash.
 */
export function ChapterReveal({
  children,
  className = "",
  veil = true,
  once = true,
}: ChapterRevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once,
    amount: 0.12,
    margin: "0px 0px -8% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.32"],
  });

  const veilOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    reduced || !veil ? [0, 0, 0] : [0.32, 0.08, 0],
  );
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [22, 0]);
  const smoothY = useSpring(y, { stiffness: 110, damping: 28, mass: 0.35 });

  if (reduced) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {veil && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-24 bg-gradient-to-b from-[#050505] via-[#050505]/55 to-transparent"
          style={{ opacity: veilOpacity }}
        />
      )}
      <motion.div
        className="relative z-[5] will-change-[clip-path,transform]"
        style={{ y: smoothY }}
        initial={{
          clipPath: "inset(14% 0 0 0)",
          opacity: 0.72,
        }}
        animate={
          inView
            ? { clipPath: "inset(0% 0 0 0)", opacity: 1 }
            : { clipPath: "inset(14% 0 0 0)", opacity: 0.72 }
        }
        transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-px"
          initial={{ opacity: 0 }}
          animate={
            inView
              ? { opacity: [0, 0.85, 0], y: [0, 0, 8] }
              : { opacity: 0 }
          }
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(56,189,248,0.7) 30%, rgba(224,242,254,0.9) 50%, rgba(56,189,248,0.7) 70%, transparent)",
            boxShadow: "0 0 18px 2px rgba(56,189,248,0.35)",
          }}
        />
        {children}
      </motion.div>
    </div>
  );
}

type ContinuitySectionProps = {
  children: ReactNode;
  className?: string;
};

/** Narrative chapter wrapper — clip reveal + continuity veil */
export function ContinuitySection({
  children,
  className = "",
}: ContinuitySectionProps) {
  return (
    <ChapterReveal className={className} veil>
      {children}
    </ChapterReveal>
  );
}
