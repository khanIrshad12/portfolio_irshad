"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Cpu,
  FastForward,
  GraduationCap,
  Radio,
  Sparkles,
  Terminal,
  Volume2,
  VolumeX,
} from "lucide-react";
import { soundFx } from "@/utils/audioSynth";
import { DecryptedText } from "@/cinematic/components/reactbits/DecryptedText";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT_EXPO } from "@/cinematic/lib/motion";

interface PreloaderProps {
  onComplete: () => void;
}

const BOOT_DURATION_MS = 5000;
const FAST_BOOT_MS = 900;

const BOOT_STEPS = [
  {
    threshold: 0,
    tag: "01 // ORIGIN & FOUNDATION",
    title: "B.E. Computer Engineering @ Mumbai University",
    detail:
      "Bootstrapping algorithmic memory, concurrency models & low-level architectures...",
    icon: GraduationCap,
    color: "text-sky-400",
    border: "border-sky-500/40",
    bg: "bg-sky-950/30",
  },
  {
    threshold: 28,
    tag: "02 // MISSION-CRITICAL SCADA",
    title: "Airport Lighting Control System (ALCMS)",
    detail:
      "Connecting Modbus TCP registers, 60 FPS WebSocket streams & airfield telemetry...",
    icon: Radio,
    color: "text-cyan-300",
    border: "border-cyan-500/50",
    bg: "bg-cyan-950/40",
  },
  {
    threshold: 60,
    tag: "03 // 3D GPU COMPUTE MESH",
    title: "20,000 Three.js WebGL GPU Particles",
    detail:
      "Calibrating procedural curl noise, reactive forcefields & spatial shaders...",
    icon: Sparkles,
    color: "text-indigo-300",
    border: "border-indigo-500/50",
    bg: "bg-indigo-950/30",
  },
  {
    threshold: 85,
    tag: "04 // PRODUCTION STACK READY",
    title: "React 19, Next.js 15 & TypeScript",
    detail:
      "Synchronizing interactive portfolio ecosystem and story dimensions...",
    icon: Cpu,
    color: "text-emerald-300",
    border: "border-emerald-500/50",
    bg: "bg-emerald-950/30",
  },
] as const;

const LOG_MESSAGES = [
  "KERNEL: Initializing hardware abstraction layer...",
  "MEM: Allocating 20,000 spatial GPU vertices...",
  "NET: Handshaking Modbus TCP / Socket.IO telemetry stream...",
  "AIRFIELD: Runway 09/27 CCR health checks PASS [OK]",
  "GPU: Compiling custom GLSL curl-noise fragment shaders...",
  "REACT: Mounting React 19 concurrent hydration tree...",
  "UI: Calibrating magnetic buttons & spatial parallax layers...",
  "STORY: Assembling Irshad Khan systems engineering timeline...",
  "STATUS: System calibrated at 60.0 FPS. Ready for warp.",
];

function stepIndexForProgress(progress: number): number {
  let idx = 0;
  for (let i = 0; i < BOOT_STEPS.length; i++) {
    if (progress >= BOOT_STEPS[i].threshold) idx = i;
  }
  return idx;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getIsMuted());
  const [isAudioSuspended, setIsAudioSuspended] = useState(soundFx.isSuspended());
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [accelerated, setAccelerated] = useState(false);
  const [visible, setVisible] = useState(true);

  const stepRef = useRef(-1);
  const logBucketRef = useRef(-1);
  const lastPercentRef = useRef(-1);
  const completedRef = useRef(false);
  const startRef = useRef(0);
  const durationRef = useRef(reduced ? 400 : BOOT_DURATION_MS);
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const mutedRef = useRef(isMuted);
  mutedRef.current = isMuted;

  useEffect(() => {
    const unsubscribe = soundFx.subscribe((state) => {
      setIsMuted(state.isMuted);
      setIsAudioSuspended(state.isSuspended);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("boot-locked");
    // Attempt early unlock if allowed by browser
    soundFx.unlock();
    return () => document.documentElement.classList.remove("boot-locked");
  }, []);

  // Global keydown to unlock audio on any key press
  useEffect(() => {
    const handleKeyDown = () => {
      soundFx.unlock();
    };
    window.addEventListener("keydown", handleKeyDown, { passive: true });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    startRef.current = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startRef.current) / durationRef.current);
      const eased = reduced ? t : 1 - Math.pow(1 - t, 2.15);
      const next = eased * 100;
      progressRef.current = next;
      setProgress(next);

      // Percentage tick audio on every percentage change
      const currentRoundedPercent = Math.floor(next);
      if (
        currentRoundedPercent !== lastPercentRef.current &&
        currentRoundedPercent >= 0 &&
        currentRoundedPercent <= 100
      ) {
        lastPercentRef.current = currentRoundedPercent;
        if (!mutedRef.current) {
          soundFx.playPercentTick(currentRoundedPercent);
        }
      }

      const actualStep = stepIndexForProgress(next);
      if (actualStep !== stepRef.current) {
        stepRef.current = actualStep;
        if (!mutedRef.current && actualStep >= 0) {
          soundFx.playStepProgress(actualStep);
        }
      }

      const bucket = Math.floor(next / 12);
      if (bucket !== logBucketRef.current && bucket >= 0) {
        logBucketRef.current = bucket;
        setCurrentLogIndex((l) => (l + 1) % LOG_MESSAGES.length);
        if (!mutedRef.current) soundFx.playBlip(720 + (bucket % 5) * 40, 0.03);
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        progressRef.current = 100;
        setProgress(100);
        window.setTimeout(() => setIsFinished(true), reduced ? 0 : 180);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduced]);

  const activeStep = useMemo(() => {
    return [...BOOT_STEPS].reverse().find((s) => progress >= s.threshold) ?? BOOT_STEPS[0];
  }, [progress]);
  const StepIcon = activeStep.icon;
  const phaseNum = BOOT_STEPS.findIndex((s) => s.tag === activeStep.tag) + 1;

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAudioSuspended && !isMuted) {
      soundFx.unlock();
      soundFx.playBlip(980, 0.06);
    } else {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      soundFx.setMuted(nextMuted);
      if (!nextMuted) {
        soundFx.unlock();
        soundFx.playBlip(900, 0.05);
      }
    }
  };

  const handleContainerPointerDown = () => {
    if (isAudioSuspended && !isMuted) {
      soundFx.unlock();
      soundFx.playBlip(960, 0.04);
    }
  };

  const handleAccelerate = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.unlock();
    setAccelerated(true);
    const p = progressRef.current / 100;
    durationRef.current = FAST_BOOT_MS;
    startRef.current = performance.now() - p * FAST_BOOT_MS;
    if (!isMuted) soundFx.playBlip(1200, 0.08);
  };

  const handleEnter = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    soundFx.unlock();
    if (!mutedRef.current) soundFx.playWarpEnter();
    setVisible(false);
  };

  // Auto-enter landing page at 100% (with warp sound)
  useEffect(() => {
    if (!isFinished) return;
    const id = window.setTimeout(() => {
      handleEnter();
    }, reduced ? 40 : 320);
    return () => window.clearTimeout(id);
    // handleEnter is stable via refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished, reduced]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="preloader-shell"
          onPointerDown={handleContainerPointerDown}
          className="fixed inset-0 z-10000 flex h-[100dvh] w-full select-none flex-col justify-between overflow-y-auto overflow-x-hidden bg-[#030303] p-4 font-mono text-white sm:p-6 md:p-8 lg:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="System initialization"
          initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(10px)",
            transition: { duration: 0.6, ease: EASE_OUT_EXPO },
          }}
        >
          {/* Ambient auras */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] md:h-[600px] md:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px] sm:blur-[140px]" />
            <div className="absolute left-1/3 top-1/3 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] rounded-full bg-indigo-500/10 blur-[80px] sm:blur-[100px]" />
          </div>

          {/* Cyber grid */}
          <div
            className="pointer-events-none absolute inset-0 bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)",
            }}
          />

          {/* Top bar */}
          <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-2 border-b border-white/10 pb-3 sm:pb-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="relative flex h-2 w-2 shrink-0 sm:h-2.5 sm:w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex h-full w-full rounded-full bg-cyan-400" />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[10px] font-bold uppercase tracking-[0.15em] text-white sm:text-xs sm:tracking-[0.2em]">
                  IRSHAD KHAN // PORTFOLIO
                </span>
                <span className="hidden truncate text-[8px] uppercase tracking-widest text-cyan-400/80 xs:inline-block sm:text-[9px]">
                  SYSTEMS ARCHITECT &amp; CREATIVE DEVELOPER
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
              <button
                type="button"
                onClick={handleToggleMute}
                className={`flex cursor-pointer items-center gap-1 sm:gap-1.5 rounded-lg border px-2 py-1 text-[9px] sm:px-3 sm:py-1.5 sm:text-[10px] font-semibold transition-all ${
                  isMuted
                    ? "border-rose-500/30 bg-rose-950/20 text-rose-300 hover:border-rose-400/50 hover:bg-rose-950/40"
                    : isAudioSuspended
                    ? "border-cyan-400/50 bg-cyan-950/50 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.25)] hover:border-cyan-400 hover:bg-cyan-900/60"
                    : "border-white/10 bg-white/5 text-white/80 hover:border-cyan-400/50 hover:bg-white/10"
                }`}
                title={
                  isMuted
                    ? "Unmute Audio Feedback"
                    : isAudioSuspended
                    ? "Click to Enable Audio Feedback"
                    : "Mute Audio Feedback"
                }
              >
                {isMuted ? (
                  <VolumeX className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-rose-400" />
                ) : isAudioSuspended ? (
                  <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-pulse text-cyan-400" />
                ) : (
                  <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-400" />
                )}
                <span className="inline">
                  {isMuted
                    ? "MUTED"
                    : isAudioSuspended
                    ? "ENABLE SOUND"
                    : "AUDIO ACTIVE"}
                </span>
              </button>

              {!isFinished && progress < 95 && (
                <button
                  type="button"
                  onClick={handleAccelerate}
                  disabled={accelerated}
                  className="flex cursor-pointer items-center gap-1 sm:gap-1.5 rounded-lg border border-cyan-500/50 bg-cyan-950/60 px-2 py-1 text-[9px] sm:px-3 sm:py-1.5 sm:text-[10px] font-bold uppercase tracking-wider text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)] transition-all hover:bg-cyan-900/80 disabled:opacity-70"
                >
                  <FastForward className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span>
                    {accelerated ? "SPEEDING..." : "SKIP"}
                    <span className="hidden sm:inline"> / FAST BOOT</span>
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Center stage */}
          <div className="relative z-10 mx-auto my-auto flex w-full max-w-4xl flex-col items-center justify-center py-4 text-center sm:py-6">
            {/* Circular progress loader */}
            <div className="relative mb-4 flex h-36 w-36 items-center justify-center sm:mb-6 sm:h-48 sm:w-48 md:mb-8 md:h-56 md:w-56">
              <svg
                className={`absolute inset-0 h-full w-full ${reduced ? "" : "animate-[spin_12s_linear_infinite]"}`}
                viewBox="0 0 100 100"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1.5"
                  strokeDasharray="20 40 10 30"
                  strokeDashoffset="10"
                  className="opacity-70"
                />
              </svg>

              <svg
                className={`absolute inset-3 sm:inset-4 h-auto w-auto ${reduced ? "" : "animate-spin-reverse"}`}
                viewBox="0 0 100 100"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.15)"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                />
              </svg>

              {/* Progress ring */}
              <svg
                className="absolute inset-4 sm:inset-6 h-auto w-auto -rotate-90"
                viewBox="0 0 100 100"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#bootArcGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${(progress / 100) * 251.2} 251.2`}
                  className="drop-shadow-[0_0_8px_rgba(34,211,238,0.65)]"
                />
                <defs>
                  <linearGradient id="bootArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="z-10 flex flex-col items-center justify-center">
                <span className="text-3xl font-black tracking-tighter text-white drop-shadow-[0_0_25px_rgba(56,189,248,0.4)] sm:text-5xl md:text-6xl">
                  {Math.round(progress)}
                  <span className="font-mono text-lg text-cyan-400 sm:text-xl md:text-2xl">
                    %
                  </span>
                </span>
                <span className="mt-0.5 sm:mt-1 text-[8px] uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.25em] text-white/50">
                  SYSTEM CALIBRATION
                </span>
              </div>

              {!reduced && (
                <div
                  className="pointer-events-none absolute inset-0 animate-ping rounded-full border border-cyan-400/30"
                  style={{ animationDuration: "3s" }}
                />
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.tag}
                initial={reduced ? false : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                className={`w-full max-w-lg md:max-w-xl rounded-xl sm:rounded-2xl border p-3.5 sm:p-5 md:p-6 shadow-2xl backdrop-blur-xl transition-colors ${activeStep.border} ${activeStep.bg}`}
              >
                <div className="mb-1.5 sm:mb-2 flex items-center justify-between gap-2">
                  <span
                    className={`flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.25em] ${activeStep.color}`}
                  >
                    <StepIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                    <span className="truncate">{activeStep.tag}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[9px] sm:text-[10px] text-white/40">
                    PHASE {String(phaseNum).padStart(2, "0")}/04
                  </span>
                </div>

                <h3 className="mb-1 text-left text-sm font-bold tracking-tight text-white sm:text-base md:text-lg">
                  {activeStep.title}
                </h3>
                <p className="text-left font-sans text-[11px] sm:text-xs leading-relaxed text-white/70">
                  {activeStep.detail}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 sm:mt-6 w-full max-w-lg md:max-w-xl space-y-1.5 sm:space-y-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10 p-px">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-white/40">
                <span>DIAGNOSTIC TELEMETRY: ACTIVE</span>
                <span>
                  {progress >= 100
                    ? "WARPING TO SURFACE…"
                    : "ESTABLISHING PROTOCOLS..."}
                </span>
              </div>
            </div>

            {isAudioSuspended && !isMuted && !isFinished && progress < 95 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 sm:mt-4 flex items-center justify-center gap-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-cyan-400/80"
              >
                <Volume2 className="h-3 w-3 animate-pulse text-cyan-400" />
                <span>Tap anywhere to enable sound</span>
              </motion.div>
            )}

            <AnimatePresence>
              {(isFinished || progress >= 100) && (
                <motion.p
                  key="warping"
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 sm:mt-6 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.32em] text-cyan-300/90"
                >
                  Entering system…
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom log */}
          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 sm:gap-3 border-t border-white/10 pt-3 sm:pt-4 text-[9px] sm:text-[10px] text-white/50 sm:flex-row sm:items-center">
            <div className="flex max-w-full items-center gap-1.5 sm:gap-2 text-cyan-400/90 min-w-0">
              <Terminal className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
              <span className="shrink-0 text-white/40">// LOG:</span>
              <span className="min-w-0 truncate font-mono text-white/80 text-[9px] sm:text-[10px]">
                <DecryptedText
                  key={LOG_MESSAGES[currentLogIndex]}
                  text={LOG_MESSAGES[currentLogIndex]}
                  speed={18}
                  maxIterations={5}
                  animateOn="view"
                />
              </span>
            </div>

            <div className="hidden items-center gap-3 sm:gap-4 text-[8px] sm:text-[9px] uppercase tracking-widest text-white/40 md:flex shrink-0">
              <span>FRAMEWORK: REACT 19</span>
              <span>•</span>
              <span>SHADERS: GLSL 3D</span>
              <span>•</span>
              <span>LOCATION: MUMBAI, IN</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
