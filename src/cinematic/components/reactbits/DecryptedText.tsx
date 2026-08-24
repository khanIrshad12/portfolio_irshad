"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover';
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 12,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-cyan-400 opacity-80',
  animateOn = 'view'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-50px' });

  const getNextChar = (originalChar: string) => {
    if (originalChar === ' ') return ' ';
    if (useOriginalCharsOnly) {
      const charPool = text.replace(/\s/g, '');
      return charPool[Math.floor(Math.random() * charPool.length)];
    }
    return characters[Math.floor(Math.random() * characters.length)];
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentIteration = 0;

    const shouldAnimate = animateOn === 'view' ? inView : isHovering;

    if (shouldAnimate) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              
              if (sequential) {
                if (revealDirection === 'start') {
                  if (currentIteration / maxIterations > index / text.length) {
                    setRevealedIndices(prev => new Set(prev).add(index));
                    return char;
                  }
                } else if (revealDirection === 'end') {
                  if (currentIteration / maxIterations > (text.length - index) / text.length) {
                    setRevealedIndices(prev => new Set(prev).add(index));
                    return char;
                  }
                }
              } else {
                if (currentIteration >= maxIterations) {
                  return char;
                }
              }

              return getNextChar(char);
            })
            .join('');
        });

        currentIteration++;

        if (currentIteration > maxIterations + (sequential ? text.length : 0)) {
          clearInterval(interval);
          setIsScrambling(false);
          setDisplayText(text);
        }
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
    }

    return () => clearInterval(interval);
  }, [inView, isHovering, animateOn, text, speed, maxIterations, sequential, revealDirection]);

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => animateOn === 'hover' && setIsHovering(true)}
      onMouseLeave={() => animateOn === 'hover' && setIsHovering(false)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={className}>
        {displayText.split('').map((char, index) => {
          const isRevealed = !isScrambling || revealedIndices.has(index) || char === ' ' || char === text[index];
          return (
            <span
              key={index}
              className={isRevealed ? '' : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
};
