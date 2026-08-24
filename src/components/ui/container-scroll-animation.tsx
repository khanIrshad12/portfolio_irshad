"use client";

import React, { useRef, useState, useEffect, type ReactNode } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
  className = "",
}: {
  titleComponent: string | ReactNode;
  children: ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.78, 0.95] : [1.08, 1]);

  // Stronger rotateX lean (tilted back on the horizontal axis)
  const rotate = useTransform(scrollYProgress, [0, 0.6], [isMobile ? 32 : 42, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.6], [0, -100]);

  return (
    <div
      className={`relative flex min-h-[68rem] items-start justify-center p-2 pt-8 sm:min-h-[74rem] md:min-h-[88rem] md:p-12 md:pt-16 ${className}`}
      ref={containerRef}
    >
      <div
        className="relative w-full py-6 md:py-16"
        style={{ perspective: "900px", perspectiveOrigin: "50% 20%" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | ReactNode;
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformOrigin: "center top",
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="mx-auto -mt-8 w-full max-w-5xl rounded-[28px] border border-cyan-500/25 bg-[#0a0a0c] p-2 shadow-2xl md:-mt-10 md:rounded-[30px] md:p-5"
    >
      <div className="w-full overflow-hidden rounded-2xl border border-white/5 bg-[#080808] md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
};
