"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Smooth ease-out — no spring / overshoot */
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/** Smooth Lenis without spring bounce */
const LENIS_OPTIONS: LenisOptions = {
  autoRaf: true,
  lerp: 0.1,
  duration: 1.1,
  easing: easeOutExpo,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.1,
  syncTouch: false,
  anchors: false,
};

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Lenis root smooth scroll for the cinematic portfolio.
 * Skipped when prefers-reduced-motion is on.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  );
}

/** Scroll to a section id via Lenis when available, else native smooth. */
export function useSmoothScrollTo() {
  const lenis = useLenis();
  const reduced = useReducedMotion();

  return (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (lenis && !reduced) {
      // HUD may have paused Lenis for inner scrolling — always resume first
      lenis.start();
      document.documentElement.classList.remove("lenis-stopped");
      lenis.scrollTo(el, {
        offset: -72,
        duration: 1.15,
        easing: easeOutExpo,
        immediate: false,
      });
      return;
    }

    el.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };
}

/** Keep html class in sync so CSS can disable native scroll-behavior under Lenis */
export function useLenisHtmlClass() {
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (lenis && !reduced) {
      document.documentElement.classList.add("lenis-active");
    } else {
      document.documentElement.classList.remove("lenis-active");
    }
    return () => document.documentElement.classList.remove("lenis-active");
  }, [lenis, reduced]);
}

/**
 * Freeze page Lenis while a modal/dialog is open so wheel events
 * scroll the dialog's inner container instead of the document.
 */
export function useLenisModalLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (locked) {
      lenis.stop();
      document.documentElement.classList.add("lenis-stopped");
    } else {
      lenis.start();
      document.documentElement.classList.remove("lenis-stopped");
    }

    return () => {
      lenis.start();
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [lenis, locked]);
}
