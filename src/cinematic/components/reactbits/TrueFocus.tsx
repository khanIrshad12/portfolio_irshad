"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./TrueFocus.css";

type TrueFocusProps = {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
};

/**
 * React Bits TrueFocus — focus frame must be top/left 0 so x/y transforms
 * are relative to the container origin (not the flex static position).
 */
export function TrueFocus({
  sentence = "True Focus",
  separator = " ",
  manualMode = false,
  blurAmount = 5,
  borderColor = "#38bdf8",
  glowColor = "rgba(56, 189, 248, 0.55)",
  animationDuration = 0.45,
  pauseBetweenAnimations = 1.1,
  className = "",
}: TrueFocusProps) {
  const words = sentence.split(separator).filter(Boolean);
  const reduced = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const updateFocusRect = useCallback(() => {
    const container = containerRef.current;
    const activeWord = wordRefs.current[currentIndex];
    if (!container || !activeWord) return;

    // offset* is layout-relative and immune to ancestor CSS transforms
    const x = activeWord.offsetLeft;
    const y = activeWord.offsetTop;
    const width = activeWord.offsetWidth;
    const height = activeWord.offsetHeight;

    setFocusRect((prev) => {
      if (
        prev.x === x &&
        prev.y === y &&
        prev.width === width &&
        prev.height === height
      ) {
        return prev;
      }
      return { x, y, width, height };
    });
  }, [currentIndex]);

  useEffect(() => {
    if (manualMode || reduced || words.length <= 1) return;

    const interval = window.setInterval(
      () => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      },
      (animationDuration + pauseBetweenAnimations) * 1000,
    );

    return () => window.clearInterval(interval);
  }, [
    manualMode,
    reduced,
    animationDuration,
    pauseBetweenAnimations,
    words.length,
  ]);

  useEffect(() => {
    // Wait a frame so blur/layout settle before measuring
    const raf = requestAnimationFrame(() => {
      updateFocusRect();
      // Second pass after fonts / wrap
      requestAnimationFrame(updateFocusRect);
    });
    return () => cancelAnimationFrame(raf);
  }, [currentIndex, words.length, updateFocusRect]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      updateFocusRect();
    });
    ro.observe(container);
    wordRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });

    const onResize = () => updateFocusRect();
    window.addEventListener("resize", onResize);
    // Fonts can reflow word sizes after load
    document.fonts?.ready?.then(() => updateFocusRect());

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [updateFocusRect, words.length]);

  const handleMouseEnter = (index: number) => {
    if (!manualMode) return;
    setLastActiveIndex(index);
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    if (!manualMode) return;
    setCurrentIndex(lastActiveIndex ?? 0);
  };

  const pad = 6;

  return (
    <div
      className={`focus-container ${className}`}
      ref={containerRef}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={`${word}-${index}`}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={`focus-word ${manualMode ? "manual" : ""} ${
              isActive && !manualMode ? "active" : ""
            }`}
            style={{
              filter: reduced
                ? "none"
                : isActive
                  ? "blur(0px)"
                  : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : 0.42,
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
              // CSS vars for corners
              ["--border-color" as string]: borderColor,
              ["--glow-color" as string]: glowColor,
              transition: reduced
                ? "none"
                : `filter ${animationDuration}s ease, opacity ${animationDuration}s ease, color ${animationDuration}s ease`,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      {!reduced && (
        <motion.div
          className="focus-frame"
          initial={false}
          animate={{
            x: Math.max(0, focusRect.x - pad),
            y: Math.max(0, focusRect.y - pad / 2),
            width: Math.max(0, focusRect.width + pad * 2),
            height: Math.max(0, focusRect.height + pad),
            opacity: focusRect.width > 0 ? 1 : 0,
          }}
          transition={{
            duration: animationDuration,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            ["--border-color" as string]: borderColor,
            ["--glow-color" as string]: glowColor,
          }}
        >
          <span className="corner top-left" />
          <span className="corner top-right" />
          <span className="corner bottom-left" />
          <span className="corner bottom-right" />
        </motion.div>
      )}
    </div>
  );
}

export default TrueFocus;
