"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function subscribeFinePointer(onStoreChange: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const hover = window.matchMedia("(hover: hover)");
  fine.addEventListener("change", onStoreChange);
  hover.addEventListener("change", onStoreChange);
  return () => {
    fine.removeEventListener("change", onStoreChange);
    hover.removeEventListener("change", onStoreChange);
  };
}

function getFinePointerSnapshot() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(hover: hover)").matches
  );
}

/**
 * Brutal / playful custom cursor — hard-shadow disc + trailing ring.
 * Disabled on touch / coarse pointers and when reduced motion is preferred.
 */
export function ThemeCursor() {
  const reduced = useReducedMotion();
  const canUseCustomCursor = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    () => false,
  );
  const enabled = canUseCustomCursor && !reduced;
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 500, damping: 35, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 500, damping: 35, mass: 0.4 });
  const ringX = useSpring(rawX, { stiffness: 180, damping: 22, mass: 0.6 });
  const ringY = useSpring(rawY, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-theme-cursor");

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label, .brutal-btn, .sticker-card, .cursor-grow';

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest(interactiveSelector)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest(interactiveSelector)) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("has-theme-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      aria-hidden
    >
      {/* Trailing ring */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border-[3px] border-[var(--color-ink)]"
        style={{
          x: ringX,
          y: ringY,
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
          marginLeft: hovering ? -26 : -18,
          marginTop: hovering ? -26 : -18,
          background: hovering
            ? "color-mix(in oklab, var(--color-accent) 55%, transparent)"
            : "transparent",
          boxShadow: "3px 3px 0 var(--color-ink)",
          opacity: visible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, margin 0.2s, background 0.2s",
        }}
      />
      {/* Core dot */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-primary)]"
        style={{
          x,
          y,
          width: hovering ? 14 : 10,
          height: hovering ? 14 : 10,
          marginLeft: hovering ? -7 : -5,
          marginTop: hovering ? -7 : -5,
          boxShadow: "2px 2px 0 var(--color-ink)",
          opacity: visible ? 1 : 0,
          mixBlendMode: "normal",
        }}
      />
    </div>
  );
}
