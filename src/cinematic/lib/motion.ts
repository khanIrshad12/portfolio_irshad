"use client";

import type { Transition, Variants } from "motion/react";

/** Shared cinematic motion tokens — ease-out for UI, springs for press feedback */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];

export function enterTransition(
  reduced: boolean,
  delay = 0,
  duration = 0.55,
): Transition {
  if (reduced) return { duration: 0.01 };
  return { duration, delay, ease: EASE_OUT_EXPO };
}

export function springPress(reduced: boolean): Transition {
  if (reduced) return { duration: 0.01 };
  return { type: "spring", stiffness: 420, damping: 28, mass: 0.7 };
}

export function staggerContainer(
  reduced: boolean,
  stagger = 0.06,
  delayChildren = 0.08,
): Variants {
  return {
    hidden: {},
    show: {
      transition: reduced
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: stagger, delayChildren },
    },
  };
}

export function fadeUp(reduced: boolean, distance = 28): Variants {
  return {
    hidden: {
      opacity: reduced ? 1 : 0,
      y: reduced ? 0 : distance,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: enterTransition(reduced),
    },
  };
}

export function fadeScale(reduced: boolean): Variants {
  return {
    hidden: {
      opacity: reduced ? 1 : 0,
      scale: reduced ? 1 : 0.96,
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: enterTransition(reduced, 0, 0.5),
    },
  };
}

export function slideInX(reduced: boolean, from: "left" | "right" = "left"): Variants {
  const x = from === "left" ? -24 : 24;
  return {
    hidden: {
      opacity: reduced ? 1 : 0,
      x: reduced ? 0 : x,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: enterTransition(reduced),
    },
  };
}
