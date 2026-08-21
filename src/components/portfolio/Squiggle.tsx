interface SquiggleProps {
  className?: string;
  color?: string;
}

/** Hand-drawn squiggle underline for headings */
export function Squiggle({
  className = "",
  color = "var(--color-primary)",
}: SquiggleProps) {
  return (
    <svg
      className={`mt-2 w-full max-w-[12rem] ${className}`}
      viewBox="0 0 200 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 10 C 20 2, 40 14, 60 8 S 100 2, 120 10 S 160 14, 198 6"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
