"use client";

import GradualBlur from "./GradualBlur";

type SectionEdgeBlurProps = {
  intensity?: "hero" | "section";
};

/**
 * Local section-edge fades (top only).
 * Hero has no bottom blur — that frosted band was clipping the laser beam.
 */
export function SectionEdgeBlur({ intensity = "section" }: SectionEdgeBlurProps) {
  if (intensity === "hero") return null;

  return (
    <GradualBlur
      target="parent"
      position="top"
      height="4.5rem"
      strength={1.35}
      divCount={5}
      curve="bezier"
      exponential
      opacity={0.75}
      animated={false}
      zIndex={12}
    />
  );
}
