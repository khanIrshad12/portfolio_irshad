"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Point = { x: number; y: number; vx: number; vy: number };

type TailCursorProps = {
  /** Number of spring-linked trail points */
  pointsCount?: number;
  /** Trail stroke color */
  color?: string;
  /** Base trail opacity 0–1 */
  trailOpacity?: number;
  /** Line thickness factor */
  lineWidth?: number;
  /** Spring pull toward the next point */
  springStrength?: number;
  /** Velocity friction */
  dampening?: number;
  /** Soft glow blur in px */
  blur?: number;
};

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
 * Professional canvas cursor tail — spring-linked cyan trail.
 * Desktop fine-pointer only; skipped when reduced motion is preferred.
 */
export default function TailCursor({
  pointsCount = 28,
  color = "#38bdf8",
  trailOpacity = 0.55,
  lineWidth = 0.35,
  springStrength = 0.38,
  dampening = 0.52,
  blur = 1.2,
}: TailCursorProps) {
  const reduced = useReducedMotion();
  const canUse = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    () => false,
  );
  const enabled = canUse && !reduced;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef(false);
  const visibleRef = useRef(false);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    document.documentElement.classList.add("has-tail-cursor");

    const points: Point[] = Array.from({ length: pointsCount }, () => ({
      x: -100,
      y: -100,
      vx: 0,
      vy: 0,
    }));

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label, [data-cursor-interactive]';

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      visibleRef.current = true;
    };

    const onLeave = () => {
      visibleRef.current = false;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      hoverRef.current = Boolean(t?.closest(interactiveSelector));
    };

    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest(interactiveSelector)) hoverRef.current = false;
    };

    const draw = () => {
      const { x: mx, y: my } = mouseRef.current;
      const hovering = hoverRef.current;
      const visible = visibleRef.current;

      // Lead point tracks the pointer tightly
      points[0].x += (mx - points[0].x) * 0.55;
      points[0].y += (my - points[0].y) * 0.55;

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const cur = points[i];
        const ax = (prev.x - cur.x) * springStrength;
        const ay = (prev.y - cur.y) * springStrength;
        cur.vx = (cur.vx + ax) * dampening;
        cur.vy = (cur.vy + ay) * dampening;
        cur.x += cur.vx;
        cur.y += cur.vy;
      }

      ctx.clearRect(0, 0, width, height);

      if (visible) {
        ctx.save();
        if (blur > 0) ctx.filter = `blur(${blur}px)`;
        ctx.globalAlpha = trailOpacity;
        ctx.strokeStyle = color;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
          const midX = (points[i].x + points[i + 1].x) * 0.5;
          const midY = (points[i].y + points[i + 1].y) * 0.5;
          ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }

        const last = points[points.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.lineWidth = hovering ? lineWidth * 14 : lineWidth * 9;
        ctx.stroke();
        ctx.restore();

        // Core tip
        ctx.save();
        ctx.globalAlpha = visible ? 0.95 : 0;
        ctx.fillStyle = color;
        const tip = hovering ? 5.5 : 3.5;
        ctx.beginPath();
        ctx.arc(points[0].x, points[0].y, tip, 0, Math.PI * 2);
        ctx.fill();

        // Soft outer ring on interactive targets
        if (hovering) {
          ctx.globalAlpha = 0.35;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.arc(points[0].x, points[0].y, 16, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-tail-cursor");
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [
    enabled,
    pointsCount,
    color,
    trailOpacity,
    lineWidth,
    springStrength,
    dampening,
    blur,
  ]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-9998 hidden md:block"
    />
  );
}
