"use client";

import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shimmerWidth?: number;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 4,
  className = '',
  shimmerWidth = 100
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block ${
        disabled
          ? 'text-white/80'
          : 'bg-clip-text text-transparent bg-gradient-to-r from-white/40 via-white to-white/40 animate-shiny'
      } ${className}`}
      style={{
        backgroundSize: `${shimmerWidth * 2}% 100%`,
        animationDuration: animationDuration
      }}
    >
      {text}
    </span>
  );
};
