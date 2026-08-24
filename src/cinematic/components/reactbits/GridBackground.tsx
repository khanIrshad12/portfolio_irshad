"use client";

import React, { useEffect, useRef } from 'react';

interface GridBackgroundProps {
  gridSize?: number;
  className?: string;
  dotColor?: string;
  glowColor?: string;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  gridSize = 36,
  className = '',
  dotColor = 'rgba(255, 255, 255, 0.07)',
  glowColor = 'rgba(56, 189, 248, 0.25)'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouse = { x: -1000, y: -1000, radius: 140 };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      const cols = Math.ceil(width / gridSize) + 1;
      const rows = Math.ceil(height / gridSize) + 1;

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw intersection dots with interactive mouse reaction
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const intensity = 1 - dist / mouse.radius;
            ctx.fillStyle = glowColor;
            ctx.beginPath();
            ctx.arc(x, y, 2 + intensity * 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Connect nearby active dots with faint glowing lines
            if (dist < mouse.radius * 0.6) {
              ctx.strokeStyle = `rgba(56, 189, 248, ${intensity * 0.35})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          } else {
            // Subtle ambient breathing dot
            const wave = Math.sin(time + (i + j) * 0.3) * 0.5 + 0.5;
            ctx.fillStyle = dotColor;
            ctx.beginPath();
            ctx.arc(x, y, 1 + wave * 0.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gridSize, dotColor, glowColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};
