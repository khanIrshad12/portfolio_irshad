"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MarqueeProps {
  items: string[];
  className?: string;
  speedSeconds?: number;
}

export function Marquee({
  items,
  className = "",
  speedSeconds = 28,
}: MarqueeProps) {
  const reduced = useReducedMotion();
  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden border-y-[3px] border-[var(--color-ink)] ${className}`}
      role="presentation"
    >
      <div
        className={`flex w-max gap-0 whitespace-nowrap ${
          reduced ? "" : "animate-marquee"
        }`}
        style={
          reduced
            ? undefined
            : { animationDuration: `${speedSeconds}s` }
        }
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-4 px-6 py-3 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.12em] md:text-base"
          >
            <span
              className="inline-block size-2.5 shrink-0 rounded-full border-2 border-[var(--color-ink)]"
              style={{
                background:
                  i % 4 === 0
                    ? "var(--color-primary)"
                    : i % 4 === 1
                      ? "var(--color-accent)"
                      : i % 4 === 2
                        ? "var(--color-pop-pink)"
                        : "var(--color-pop-mint)",
              }}
              aria-hidden
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
