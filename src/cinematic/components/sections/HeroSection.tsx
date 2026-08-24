"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowDown, Sparkles, ArrowUpRight } from "lucide-react";
import { SplitText } from "../reactbits/SplitText";
import { DecryptedText } from "../reactbits/DecryptedText";
import { MagneticButton } from "../reactbits/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  enterTransition,
  fadeScale,
  fadeUp,
  slideInX,
  springPress,
  staggerContainer,
} from "../../lib/motion";

interface HeroSectionProps {
  onExploreClick: () => void;
  onProjectsClick: () => void;
  onTriggerShockwave: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onProjectsClick,
  onTriggerShockwave,
}) => {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const exitY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -72]);
  const exitOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85],
    [1, reduced ? 1 : 0.55, reduced ? 1 : 0],
  );
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.97]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 28]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);
  const ringRotateInner = useTransform(ringRotate, (r) => -r * 0.6);
  const ringScaleInner = useTransform(ringScale, (s) => 1 + (s - 1) * 0.5);
  const progressWidth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 flex min-h-dvh flex-col justify-between overflow-hidden px-4 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-32 lg:px-16"
    >
      {/* Ambient atmosphere — float / idle, GPU-safe */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] h-[min(70vw,560px)] w-[min(70vw,560px)] -translate-x-1/2 rounded-full bg-cyan-500/[0.09] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] right-[-5%] h-[min(50vw,420px)] w-[min(50vw,420px)] rounded-full bg-indigo-500/[0.08] blur-[100px]"
      />

      {/* Parallax orbital rings — scroll-driven rotate/scale */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ rotate: ringRotate, scale: ringScale }}
      >
        <div className="h-[min(78vw,720px)] w-[min(78vw,720px)] rounded-full border border-white/[0.045]" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          rotate: ringRotateInner,
          scale: ringScaleInner,
        }}
      >
        <div className="h-[min(52vw,480px)] w-[min(52vw,480px)] rounded-full border border-dashed border-cyan-400/15" />
      </motion.div>

      {/* Hero content — orchestrated entrance + scroll exit */}
      <motion.div
        className="relative z-[2] mx-auto my-auto w-full max-w-7xl py-6 sm:py-10"
        style={{ y: exitY, opacity: exitOpacity, scale: exitScale }}
      >
        <motion.div
          className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12"
          initial="hidden"
          animate="show"
          variants={staggerContainer(reduced, 0.07, 0.05)}
        >
          <div className="lg:col-span-8">
            <motion.div
              variants={fadeUp(reduced, 18)}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-2 text-[11px] font-semibold tracking-wider text-cyan-300 shadow-inner font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                <DecryptedText text="SYS_VER // 3.0" speed={30} maxIterations={8} />
              </span>

              <motion.button
                type="button"
                onClick={onTriggerShockwave}
                whileTap={reduced ? undefined : { scale: 0.96 }}
                transition={springPress(reduced)}
                className="group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[11px] font-mono uppercase tracking-wider text-white/80 shadow-sm transition-colors hover:border-cyan-400/50 hover:bg-white/10"
              >
                <Sparkles className="h-3.5 w-3.5 text-cyan-400 transition-transform duration-300 group-hover:rotate-45" />
                <span>Trigger Shockwave</span>
              </motion.button>
            </motion.div>

            <motion.h1
              variants={fadeUp(reduced, 36)}
              className="mb-6 select-none text-[clamp(3.25rem,12vw,8.5rem)] font-black uppercase leading-[0.84] tracking-tighter text-white"
            >
              <SplitText
                text="IRSHAD"
                splitType="chars"
                duration={reduced ? 0.01 : 0.55}
                stagger={reduced ? 0 : 0.028}
                className="font-black"
              />
              <br />
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                <SplitText
                  text="KHAN"
                  splitType="chars"
                  delay={reduced ? 0 : 0.16}
                  duration={reduced ? 0.01 : 0.55}
                  stagger={reduced ? 0 : 0.028}
                  className="font-black"
                />
              </span>
            </motion.h1>

            <motion.div
              variants={slideInX(reduced, "left")}
              className="mt-5 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="hidden h-0.5 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(34,211,238,0.65)] sm:block" />
              <p className="text-lg font-light tracking-wide text-white/90 sm:text-xl md:text-2xl">
                <span className="font-semibold text-white">Creative Front-End Developer</span>
                {" "}&amp;{" "}
                <span className="font-mono text-cyan-400">Systems Engineer</span>
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col justify-between space-y-6 lg:col-span-4 lg:space-y-7">
            <motion.div
              variants={fadeUp(reduced, 22)}
              className="rounded-r-lg border-l-2 border-cyan-500/40 bg-gradient-to-r from-cyan-950/25 to-transparent py-2.5 pl-5"
            >
              <p className="font-mono text-xs leading-relaxed tracking-wide text-white/70 sm:text-[13px]">
                Architecting high-concurrency industrial dashboards, 3D WebGL simulations,
                and resilient modern web applications with precision engineering.
              </p>
            </motion.div>

            <motion.div
              variants={fadeScale(reduced)}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#080808]/85 p-4 shadow-xl backdrop-blur-xl"
            >
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-white/40">
                  Active Experience
                </span>
                <span className="mt-0.5 block font-mono text-base font-black text-white sm:text-lg">
                  2 YRS 9 MOS
                </span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-white/40">
                  Primary Domain
                </span>
                <span className="mt-0.5 block font-mono text-base font-black text-cyan-400 sm:text-lg">
                  REAL-TIME / 3D
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp(reduced, 20)}
              className="flex flex-wrap items-center gap-3.5"
            >
              <MagneticButton
                onClick={onProjectsClick}
                strength={reduced ? 0 : 0.22}
                className="group relative min-h-12 flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-white via-gray-100 to-gray-200 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-2xl hover:shadow-cyan-500/25 sm:flex-none"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 transition-colors group-hover:text-white">
                  <span>Explore Work</span>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-cyan-600 to-blue-600 transition-transform duration-300 ease-out group-hover:translate-y-0" />
              </MagneticButton>

              <MagneticButton
                onClick={onExploreClick}
                strength={reduced ? 0 : 0.18}
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.03] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-cyan-400/60 hover:bg-white/[0.08] sm:flex-none"
              >
                <span>Vision</span>
                <ArrowDown className="h-3.5 w-3.5 text-cyan-400 motion-safe:animate-bounce" />
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Spec bar + scroll cue */}
      <motion.div
        style={{ opacity: exitOpacity }}
        className="relative z-[2] mx-auto w-full max-w-7xl border-t border-white/10 pt-6"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={enterTransition(reduced, 0.55, 0.65)}
        >
        <div className="flex flex-col items-start justify-between gap-6 text-xs text-white/50 md:flex-row md:items-end">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400/80">
                // Core Focus
              </span>
              <div className="flex flex-col gap-1 text-xs font-semibold tracking-wide text-white/80">
                <span>Interactive 3D / WebGL</span>
                <span>Industrial Telemetry</span>
                <span>React 19 &amp; Next.js 16</span>
              </div>
            </div>
            <div>
              <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400/80">
                // Stack Highlights
              </span>
              <div className="flex flex-col gap-1 text-xs font-semibold tracking-wide text-white/80">
                <span>TypeScript • Three.js</span>
                <span>Socket.IO • Modbus TCP</span>
                <span>Tailwind • Prisma ORM</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400/80">
                // Kenmark Systems
              </span>
              <span className="mb-0.5 block text-xs font-bold tracking-tight text-white">
                Airport Lighting Control
              </span>
              <span className="block font-mono text-[10px] text-emerald-400">
                Live Modbus TCP &amp; WebSockets
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onExploreClick}
            className="group flex cursor-pointer flex-col items-center self-center md:self-end"
            aria-label="Scroll to Vision section"
          >
            <div className="h-9 w-px rounded-full bg-gradient-to-b from-transparent via-cyan-400 to-white/60 motion-safe:animate-pulse" />
            <span className="mt-3 font-mono text-[9px] uppercase tracking-[0.35em] text-white/45 transition-colors group-hover:text-cyan-300">
              Scroll
            </span>
          </button>
        </div>

        {/* Scroll-driven progress line — continuity cue into next section */}
        <div className="mt-5 h-px w-full overflow-hidden bg-white/5">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500"
            style={{ scaleX: progressWidth }}
          />
        </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
