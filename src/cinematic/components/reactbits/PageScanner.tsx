"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT_EXPO } from "@/cinematic/lib/motion";

type PageScannerProps = {
  /** Fire the one-shot scan when true */
  active: boolean;
  durationMs?: number;
  onComplete?: () => void;
};

/**
 * Cyan HUD page scanner — sweeps top → bottom once on landing entry,
 * matching the preloader warp reveal language.
 */
export function PageScanner({
  active,
  durationMs = 1100,
  onComplete,
}: PageScannerProps) {
  const reduced = useReducedMotion();
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!active || reduced) {
      if (active && reduced) onComplete?.();
      return;
    }

    setRunning(true);
    const done = window.setTimeout(() => {
      setRunning(false);
      onComplete?.();
    }, durationMs + 80);

    return () => window.clearTimeout(done);
  }, [active, reduced, durationMs, onComplete]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {running && (
        <motion.div
          key="page-scanner"
          className="pointer-events-none fixed inset-0 z-[85] overflow-hidden"
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          {/* Soft cover that lifts with the scan */}
          <motion.div
            className="absolute inset-0 bg-[#030303]/55"
            initial={{ clipPath: "inset(0% 0 0 0)" }}
            animate={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: durationMs / 1000, ease: EASE_OUT_EXPO }}
          />

          {/* Primary scan beam */}
          <motion.div
            className="absolute inset-x-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #22d3ee 18%, #e0f2fe 50%, #22d3ee 82%, transparent 100%)",
              boxShadow:
                "0 0 28px 6px rgba(34,211,238,0.55), 0 0 90px 14px rgba(56,189,248,0.22)",
            }}
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: durationMs / 1000, ease: EASE_OUT_EXPO }}
          />

          {/* Glow trailing the beam */}
          <motion.div
            className="absolute inset-x-[10%] h-36 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl"
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 0.7, 0.4, 0] }}
            transition={{ duration: durationMs / 1000, ease: EASE_OUT_EXPO }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
