"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import GradualBlur from "./GradualBlur";

/**
 * Viewport-sticky bottom GradualBlur for the whole page.
 * Stays fixed while scrolling; fades out as you reach the document end.
 */
export function StickyPageBlur() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.82, 0.94, 1],
    reduced ? [0.55, 0.55, 0.2, 0] : [1, 1, 0.35, 0],
  );
  const opacity = useSpring(rawOpacity, {
    stiffness: 120,
    damping: 32,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[25] hidden h-28 overflow-hidden sm:block sm:h-36"
      style={{ opacity }}
    >
      <div className="relative h-full w-full">
        <GradualBlur
          target="parent"
          position="bottom"
          height="100%"
          strength={2.2}
          divCount={7}
          curve="bezier"
          exponential
          opacity={1}
          animated={false}
          zIndex={2}
        />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#050505]/75 via-[#050505]/20 to-transparent" />
      </div>
    </motion.div>
  );
}
