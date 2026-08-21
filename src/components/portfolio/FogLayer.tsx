"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FogLayerProps {
  /** soft = misty wash; playful = chunkier cloud blobs with light tint */
  variant?: "soft" | "playful";
  className?: string;
  /** Extra intensity 0–1 */
  intensity?: number;
}

/**
 * Drifting fog / cloud wash — sits behind content, never blocks clicks.
 * Soft enough for neo-brutal pages; playful adds tinted cloud puffs.
 */
export function FogLayer({
  variant = "playful",
  className = "",
  intensity = 0.85,
}: FogLayerProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden
      style={{ opacity: intensity }}
    >
      {/* Base mist gradient */}
      <div className="fog-mist absolute inset-0" />

      {/* Soft cloud puffs */}
      <div
        className={`fog-cloud fog-cloud-a ${reduced ? "" : "fog-drift-a"}`}
        style={{
          background:
            variant === "playful"
              ? "radial-gradient(ellipse at center, color-mix(in oklab, var(--color-accent) 45%, white) 0%, transparent 70%)"
              : undefined,
        }}
      />
      <div
        className={`fog-cloud fog-cloud-b ${reduced ? "" : "fog-drift-b"}`}
        style={{
          background:
            variant === "playful"
              ? "radial-gradient(ellipse at center, color-mix(in oklab, var(--color-bg) 80%, var(--color-pop-pink)) 0%, transparent 68%)"
              : undefined,
        }}
      />
      <div
        className={`fog-cloud fog-cloud-c ${reduced ? "" : "fog-drift-c"}`}
        style={{
          background:
            variant === "playful"
              ? "radial-gradient(ellipse at center, color-mix(in oklab, white 70%, var(--color-pop-sky)) 0%, transparent 72%)"
              : undefined,
        }}
      />
      <div
        className={`fog-cloud fog-cloud-d ${reduced ? "" : "fog-drift-d"}`}
      />

      {/* Bottom ground fog */}
      <div className="fog-ground absolute inset-x-0 bottom-0 h-[45%]" />
    </div>
  );
}
