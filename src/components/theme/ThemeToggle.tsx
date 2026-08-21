"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useReducedMotion, bounceTransition } from "@/hooks/useReducedMotion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { isDark, toggle } = useTheme();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className={`brutal-btn brutal-btn-ghost relative size-11 min-h-0 overflow-hidden p-0 ${className}`}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark cyber mode"
          : "Toggle color mode"
      }
      title={mounted && isDark ? "Light mode" : "Dark · Radium cyber"}
      whileTap={reduced ? undefined : { scale: 0.92 }}
      transition={bounceTransition(reduced, 0.3)}
      suppressHydrationWarning
    >
      <span
        className="flex size-full items-center justify-center text-base"
        aria-hidden
        suppressHydrationWarning
      >
        {!mounted ? (
          "◐"
        ) : isDark ? (
          <span className="radium-glow-text">☢</span>
        ) : (
          "☀"
        )}
      </span>
    </motion.button>
  );
}
