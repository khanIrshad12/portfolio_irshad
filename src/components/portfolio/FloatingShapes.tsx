"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ShapeKind = "circle" | "square" | "triangle" | "pill" | "ring";

interface ShapeSpec {
  kind: ShapeKind;
  color: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: number;
  delay?: number;
  pattern?: "dots" | "stripes" | "none";
  parallax?: number;
}

const DEFAULT_SHAPES: ShapeSpec[] = [
  {
    kind: "circle",
    color: "var(--color-accent)",
    size: 140,
    top: "8%",
    right: "6%",
    pattern: "dots",
    parallax: 40,
  },
  {
    kind: "square",
    color: "var(--color-pop-pink)",
    size: 56,
    top: "22%",
    left: "4%",
    rotate: 18,
    delay: 0.4,
    parallax: -30,
  },
  {
    kind: "triangle",
    color: "var(--color-primary)",
    size: 64,
    bottom: "18%",
    right: "12%",
    delay: 0.8,
    parallax: 50,
  },
  {
    kind: "pill",
    color: "var(--color-pop-mint)",
    size: 72,
    bottom: "12%",
    left: "10%",
    rotate: -20,
    delay: 1.1,
    parallax: -25,
  },
  {
    kind: "ring",
    color: "var(--color-pop-violet)",
    size: 90,
    top: "55%",
    right: "3%",
    delay: 0.6,
    parallax: 35,
  },
];

interface FloatingShapesProps {
  shapes?: ShapeSpec[];
  className?: string;
  /** Hide on small screens to protect readability */
  hideOnMobile?: boolean;
}

function ParallaxShape({
  shape,
  progress,
  reduced,
}: {
  shape: ShapeSpec;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const y = useTransform(
    progress,
    [0, 1],
    reduced ? [0, 0] : [0, shape.parallax ?? 30],
  );

  const border = "3px solid var(--color-ink)";
  const shadow = "4px 4px 0 var(--color-ink)";

  let body: ReactNode = null;

  if (shape.kind === "circle" || shape.kind === "ring") {
    body = (
      <div
        className="relative"
        style={{
          width: shape.size,
          height: shape.size,
          borderRadius: "50%",
          background: shape.kind === "ring" ? "transparent" : shape.color,
          border:
            shape.kind === "ring" ? `6px solid ${shape.color}` : border,
          boxShadow: shape.kind === "ring" ? "none" : shadow,
        }}
      >
        {shape.kind === "circle" && shape.pattern === "dots" && (
          <div
            className="dot-grid absolute inset-0 rounded-full"
            style={{ opacity: 0.45 }}
          />
        )}
      </div>
    );
  } else if (shape.kind === "square") {
    body = (
      <div
        style={{
          width: shape.size,
          height: shape.size,
          background: shape.color,
          border,
          boxShadow: shadow,
          borderRadius: 4,
        }}
      />
    );
  } else if (shape.kind === "pill") {
    body = (
      <div
        style={{
          width: shape.size * 1.6,
          height: shape.size * 0.55,
          background: shape.color,
          border,
          boxShadow: shadow,
          borderRadius: 9999,
        }}
      />
    );
  } else if (shape.kind === "triangle") {
    body = (
      <svg
        width={shape.size}
        height={shape.size}
        viewBox="0 0 64 64"
        aria-hidden
      >
        <polygon
          points="32,4 60,58 4,58"
          fill={shape.color}
          stroke="var(--color-ink)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <motion.div
      className="pointer-events-none absolute animate-float-slow"
      style={{
        top: shape.top,
        left: shape.left,
        right: shape.right,
        bottom: shape.bottom,
        y,
        rotate: shape.rotate ?? 0,
        animationDelay: `${shape.delay ?? 0}s`,
      }}
      aria-hidden
    >
      {body}
    </motion.div>
  );
}

export function FloatingShapes({
  shapes = DEFAULT_SHAPES,
  className = "",
  hideOnMobile = true,
}: FloatingShapesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${
        hideOnMobile ? "hidden md:block" : ""
      } ${className}`}
      aria-hidden
    >
      {shapes.map((shape, i) => (
        <ParallaxShape
          key={i}
          shape={shape}
          progress={scrollYProgress}
          reduced={reduced}
        />
      ))}
    </div>
  );
}
