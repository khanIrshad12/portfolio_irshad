"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TypeWriterProps {
  text: string;
  className?: string;
  /** ms per character */
  speed?: number;
  /** delay before first typing starts */
  delay?: number;
  /** pause after finishing before looping again */
  loopDelay?: number;
  /** keep replaying after a delay (default true) */
  loop?: boolean;
  /** show blinking caret */
  caret?: boolean;
  /**
   * fill = full width of parent (hero headings — prevents wrap jump)
   * inline = shrink-wrap (nav brand)
   */
  fit?: "fill" | "inline";
  as?: "span" | "h1" | "h2" | "p";
  /** called each time a full cycle finishes */
  onDone?: () => void;
}

/**
 * Ghost-text typewriter: invisible full string reserves layout size,
 * so looping / mid-type never collapses height or shifts siblings.
 */
export function TypeWriter({
  text,
  className = "",
  speed = 70,
  delay = 300,
  loopDelay = 2800,
  loop = true,
  caret = true,
  fit = "fill",
  as: Tag = "span",
  onDone,
}: TypeWriterProps) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? text : "");
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setShown(text);
      setDone(true);
      return;
    }

    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const clearTimers = () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      intervalId = undefined;
      timeoutId = undefined;
    };

    const typeOnce = (startDelay: number) => {
      clearTimers();
      setShown("");
      setDone(false);
      let i = 0;

      timeoutId = setTimeout(() => {
        if (cancelled) return;
        intervalId = setInterval(() => {
          if (cancelled) return;
          i += 1;
          setShown(text.slice(0, i));
          if (i >= text.length) {
            clearInterval(intervalId);
            intervalId = undefined;
            setDone(true);
            onDone?.();

            if (loop) {
              timeoutId = setTimeout(() => {
                if (!cancelled) typeOnce(0);
              }, loopDelay);
            }
          }
        }, speed);
      }, startDelay);
    };

    typeOnce(delay);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [text, speed, delay, loopDelay, loop, reduced, onDone]);

  const layoutClass =
    fit === "inline"
      ? "relative inline-grid max-w-full align-top"
      : "relative grid w-full max-w-full";

  return (
    <Tag className={`${layoutClass} ${className}`} aria-label={text}>
      {/* Invisible full text — locks width/height & line wraps */}
      <span
        className="invisible col-start-1 row-start-1 whitespace-pre-wrap"
        aria-hidden
      >
        {text}
        {caret ? (
          <span className="ml-0.5 inline-block w-[0.08em]" style={{ height: "0.85em" }}>
            &nbsp;
          </span>
        ) : null}
      </span>

      {/* Visible typed layer — same cell, no layout impact */}
      <span
        className="col-start-1 row-start-1 self-start justify-self-start whitespace-pre-wrap"
        aria-hidden
      >
        {shown}
        {caret ? (
          <span
            className={`ml-0.5 inline-block w-[0.08em] align-baseline bg-[var(--color-primary)] ${
              done ? "opacity-40 animate-pulse" : "animate-pulse"
            }`}
            style={{ height: "0.85em" }}
          />
        ) : null}
      </span>
    </Tag>
  );
}
