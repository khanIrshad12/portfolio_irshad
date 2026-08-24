"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // e.g., -50 (moves up), 50 (moves down slower), 0 (normal)
  className?: string;
  rotateSpeed?: number;
  scaleSpeed?: number;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 40,
  className = '',
  rotateSpeed = 0,
  scaleSpeed = 0
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-rotateSpeed, rotateSpeed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1 - scaleSpeed, 1, 1 + scaleSpeed]);

  return (
    <div ref={targetRef} className={`relative ${className}`}>
      <motion.div
        style={{
          y,
          ...(rotateSpeed ? { rotate } : {}),
          ...(scaleSpeed ? { scale } : {})
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
