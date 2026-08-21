"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import {
  useReducedMotion,
  bounceTransition,
  popVariants,
} from "@/hooks/useReducedMotion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** pop = bounce scale; slide = rise up */
  mode?: "pop" | "slide";
  delay?: number;
}

export function ScrollReveal({
  children,
  className = "",
  mode = "pop",
  delay = 0,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const variants =
    mode === "pop"
      ? popVariants(reduced)
      : {
          hidden: {
            opacity: reduced ? 1 : 0,
            y: reduced ? 0 : 32,
          },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              ...bounceTransition(reduced, 0.55),
              delay: reduced ? 0 : delay,
            },
          },
        };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-60px" }}
      variants={
        mode === "pop"
          ? {
              ...variants,
              show: {
                ...variants.show,
                transition: {
                  ...bounceTransition(reduced, 0.55),
                  delay: reduced ? 0 : delay,
                },
              },
            }
          : variants
      }
    >
      {children}
    </motion.div>
  );
}

/** Continuous float + scroll-linked drift for sticker cards / blocks */
export function FloatBlock({
  children,
  className = "",
  amplitude = 8,
  scrollOffset = 36,
  delay = 0,
  duration = 4.5,
}: {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  scrollOffset?: number;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [scrollOffset, -scrollOffset],
  );

  return (
    <motion.div ref={ref} style={{ y: parallaxY }} className={className}>
      <motion.div
        initial={{
          opacity: reduced ? 1 : 0,
          scale: reduced ? 1 : 0.92,
          y: reduced ? 0 : 24,
        }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={bounceTransition(reduced, 0.55)}
      >
        <motion.div
          animate={
            reduced
              ? undefined
              : { y: [0, -amplitude, 0, amplitude, 0] }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }
          }
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Parallax wrapper — children drift on scroll */
export function ParallaxBlock({
  children,
  className = "",
  offset = 60,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [offset, -offset],
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

