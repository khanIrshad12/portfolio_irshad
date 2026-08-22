"use client";

import { useSyncExternalStore } from "react";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

/** Smooth expo ease (default) */
export function motionTransition(reduced: boolean, duration = 0.5) {
  return reduced
    ? { duration: 0.01 }
    : { duration, ease: [0.16, 1, 0.3, 1] as const };
}

/** Bouncy overshoot — for pop / sticker feel */
export function bounceTransition(reduced: boolean, duration = 0.55) {
  return reduced
    ? { duration: 0.01 }
    : { duration, ease: [0.34, 1.56, 0.64, 1] as const };
}

/** Spring for playful micro-interactions */
export function springTransition(reduced: boolean) {
  return reduced
    ? { duration: 0.01 }
    : { type: "spring" as const, stiffness: 380, damping: 18, mass: 0.8 };
}

export function staggerChildren(reduced: boolean, delay = 0.08) {
  return reduced ? 0 : delay;
}

/** Pop-in scale variants for sticker-style entrances */
export function popVariants(reduced: boolean) {
  return {
    hidden: {
      opacity: reduced ? 1 : 0,
      scale: reduced ? 1 : 0.72,
      y: reduced ? 0 : 20,
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: bounceTransition(reduced, 0.55),
    },
  };
}

export function slideUpVariants(reduced: boolean) {
  return {
    hidden: {
      opacity: reduced ? 1 : 0,
      y: reduced ? 0 : 28,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: bounceTransition(reduced, 0.5),
    },
  };
}
