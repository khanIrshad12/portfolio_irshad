"use client";

import { useRef, useEffect, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import LaserFlow, { type LaserFlowHandle } from "./LaserFlow";

/**
 * Sticky cyan laser behind Identity + Vision.
 * Scroll-driven parallax with spring smoothing; beam uniforms updated
 * imperatively (no React re-renders per scroll frame).
 */
export function HeroAboutBridge({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<LaserFlowHandle>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.45,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", reduced ? "0%" : "16%"]);
  const opacity = useTransform(
    smoothProgress,
    [0, 0.4, 0.78, 1],
    reduced ? [0.4, 0.4, 0.18, 0] : [1, 0.85, 0.28, 0],
  );
  const scale = useTransform(smoothProgress, [0, 1], [1, reduced ? 1 : 1.035]);

  // Push beam offsets straight into the WebGL uniforms
  useMotionValueEvent(smoothProgress, "change", (v) => {
    if (reduced) return;
    laserRef.current?.setBeamOffset(0.08 - v * 0.1, v * 0.26);
  });

  // Ensure canvas sizes correctly once sticky layout is ready
  useEffect(() => {
    if (reduced) return;
    const t1 = window.setTimeout(() => laserRef.current?.forceResize(), 60);
    const t2 = window.setTimeout(() => laserRef.current?.forceResize(), 280);
    laserRef.current?.setBeamOffset(0.08, 0);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className="relative">
      <div className="pointer-events-none sticky top-0 z-[1] h-dvh w-full overflow-hidden opacity-35 sm:opacity-70 md:opacity-100">
        <motion.div
          style={{ y, opacity, scale }}
          className="h-full w-full will-change-transform"
        >
          {reduced ? (
            <div
              aria-hidden
              className="h-full w-full bg-[radial-gradient(ellipse_at_50%_15%,rgba(56,189,248,0.22),transparent_58%)]"
            />
          ) : (
            <LaserFlow
              ref={laserRef}
              color="#38bdf8"
              horizontalBeamOffset={0.08}
              verticalBeamOffset={0}
              horizontalSizing={0.44}
              verticalSizing={2.05}
              fogIntensity={0.24}
              fogScale={0.24}
              fogFallSpeed={0.45}
              wispDensity={0.85}
              wispSpeed={14}
              wispIntensity={3.8}
              flowSpeed={0.35}
              flowStrength={0.24}
              mouseTiltStrength={0.012}
              mouseSmoothTime={0.14}
              style={{ width: "100%", height: "100%", minHeight: "100%" }}
            />
          )}
        </motion.div>
      </div>
      <div className="relative z-10 -mt-[100dvh]">{children}</div>
    </div>
  );
}
