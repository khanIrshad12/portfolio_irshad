"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PARTICLE_STATES } from "../../data/portfolioData";
import { ParticleStateId } from "../../types";
import { Layers, ChevronUp, ChevronDown, Zap, Activity } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { STATE_TO_SECTION } from "@/lib/particle-nav";
import { useLenis } from "lenis/react";

const SECTION_LABEL: Record<string, string> = {
  hero: "Identity",
  about: "Vision",
  skills: "Matrix",
  realtime: "Systems",
  projects: "Projects",
  contact: "Contact",
};

const SHOCKWAVE_COOLDOWN_MS = 10000;

interface ParticleControllerUIProps {
  fps: number;
  activeState: ParticleStateId;
  particleCount: number;
  qualityTier: string;
  onStateSelect: (stateId: ParticleStateId) => void;
  /** Fires a multi-origin GPU particle burst */
  onShockwave: () => void;
}

export const ParticleControllerUI: React.FC<ParticleControllerUIProps> = ({
  fps,
  activeState,
  particleCount,
  qualityTier,
  onStateSelect,
  onShockwave,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [cooldownPct, setCooldownPct] = useState(0);
  const [flashKey, setFlashKey] = useState(0);
  const wheelResumeTimer = useRef<number | null>(null);
  const cooldownRaf = useRef<number | null>(null);
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const currentState = PARTICLE_STATES[activeState] || PARTICLE_STATES[0];
  const isCooling = cooldownUntil > Date.now();

  useEffect(() => {
    return () => {
      if (wheelResumeTimer.current) window.clearTimeout(wheelResumeTimer.current);
      lenis?.start();
    };
  }, [lenis]);

  /** Pause page scroll only while wheeling inside the list, then resume */
  const pauseLenisForInnerScroll = useCallback(() => {
    if (!lenis) return;
    lenis.stop();
    if (wheelResumeTimer.current) window.clearTimeout(wheelResumeTimer.current);
    wheelResumeTimer.current = window.setTimeout(() => {
      lenis.start();
      wheelResumeTimer.current = null;
    }, 180);
  }, [lenis]);

  const navigateToState = useCallback(
    (stateId: ParticleStateId) => {
      // Ensure page can scroll before parent runs scrollTo
      if (wheelResumeTimer.current) {
        window.clearTimeout(wheelResumeTimer.current);
        wheelResumeTimer.current = null;
      }
      lenis?.start();
      onStateSelect(stateId);
    },
    [lenis, onStateSelect],
  );

  useEffect(() => {
    if (!isCooling) {
      setCooldownPct(0);
      return;
    }

    const tick = () => {
      const remaining = Math.max(0, cooldownUntil - Date.now());
      setCooldownPct(1 - remaining / SHOCKWAVE_COOLDOWN_MS);
      if (remaining > 0) {
        cooldownRaf.current = requestAnimationFrame(tick);
      } else {
        setCooldownPct(0);
      }
    };
    cooldownRaf.current = requestAnimationFrame(tick);
    return () => {
      if (cooldownRaf.current) cancelAnimationFrame(cooldownRaf.current);
    };
  }, [cooldownUntil, isCooling]);

  const handleShockwave = useCallback(() => {
    if (Date.now() < cooldownUntil) return;
    setFlashKey((k) => k + 1);
    setCooldownUntil(Date.now() + SHOCKWAVE_COOLDOWN_MS);
    onShockwave();
  }, [cooldownUntil, onShockwave]);

  const particleLabel =
    particleCount >= 1000
      ? `${(particleCount / 1000).toFixed(particleCount >= 10000 ? 0 : 1)}k`
      : String(particleCount || "—");

  return (
    <>
      {/* Viewport flash — cinematic feedback for shockwave */}
      <AnimatePresence>
        {flashKey > 0 && (
          <motion.div
            key={flashKey}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[45]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.75, 0.45, 0.25, 0.1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.5)_0%,rgba(99,102,241,0.2)_42%,transparent_72%)]" />
            <div className="absolute inset-0 bg-cyan-400/15 mix-blend-screen" />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[min(70vw,28rem)] w-[min(70vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-300/60"
              initial={{ scale: 0.12, opacity: 1 }}
              animate={{ scale: 3.6, opacity: 0 }}
              transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[min(50vw,18rem)] w-[min(50vw,18rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300/50"
              initial={{ scale: 0.08, opacity: 0.9 }}
              animate={{ scale: 3.0, opacity: 0 }}
              transition={{ duration: 3.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed shell — no float/filter here so expanded content stays crisp */}
      <div className="pointer-events-none fixed bottom-5 right-4 z-[50] flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2 select-none sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="engine-panel"
              initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduced
                  ? undefined
                  : { opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.18 } }
              }
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto flex max-h-[min(70vh,32rem)] w-[min(20rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#070707]/95 font-mono text-xs text-white shadow-[0_0_0_1px_rgba(56,189,248,0.1),0_24px_48px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              onWheel={(e) => {
                e.stopPropagation();
                pauseLenisForInnerScroll();
              }}
            >
              {/* Sticky header context */}
              <div className="shrink-0 border-b border-white/10 px-4 pb-3 pt-4">
                <div className="mb-2.5 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                    <Layers className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                    3D WebGL Engine
                  </span>
                  <span className="shrink-0 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-widest text-white/70">
                    {qualityTier}
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#030303]/80 p-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-white/40">
                      <Activity className="h-3 w-3 text-cyan-400/80" />
                      Active field
                    </span>
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: currentState.themeColor }}
                    />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white">
                    0{currentState.id} · {currentState.name}
                  </div>
                  <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-white/50">
                    {currentState.subtitle}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <span className="rounded-md border border-cyan-500/20 bg-cyan-950/40 px-2 py-0.5 text-[9px] uppercase tracking-wider text-cyan-300">
                      {particleLabel} particles
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white/55">
                      {fps || 60} fps
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrollable morph list — traps wheel so page Lenis doesn't steal it */}
              <div
                className="particle-hud-scroll min-h-0 flex-1 space-y-1.5 overflow-y-auto overscroll-contain px-4 py-3"
                data-lenis-prevent
                data-lenis-prevent-wheel
                data-lenis-prevent-touch
                onWheel={(e) => {
                  e.stopPropagation();
                  pauseLenisForInnerScroll();
                }}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <div className="mb-1 text-[9px] uppercase tracking-widest text-white/40">
                  Select Morph Dimension
                </div>
                {PARTICLE_STATES.map((st) => {
                  const isCurrent = st.id === activeState;
                  const dest = SECTION_LABEL[STATE_TO_SECTION[st.id]] ?? "";
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => navigateToState(st.id)}
                      className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left transition-all ${
                        isCurrent
                          ? "border-cyan-500 bg-cyan-950/60 font-bold text-white shadow-[0_0_20px_-8px_rgba(34,211,238,0.6)]"
                          : "border-transparent bg-black/40 text-white/60 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{
                              backgroundColor: isCurrent
                                ? "#38bdf8"
                                : st.themeColor,
                            }}
                          />
                          <span className="truncate text-[11px] uppercase tracking-wider">
                            0{st.id} · {st.name}
                          </span>
                        </div>
                        <span className="pl-[18px] text-[8px] uppercase tracking-[0.18em] text-white/35">
                          → {dest}
                        </span>
                      </div>
                      {isCurrent ? (
                        <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest text-cyan-400">
                          ACTIVE
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {/* Sticky shockwave action */}
              <div className="shrink-0 border-t border-white/10 px-4 pb-4 pt-3">
                <p className="mb-2 text-[9px] leading-relaxed text-white/35">
                  Four slow GPU waves over ~7s — each ring expands for several
                  seconds before the next origin fires.
                </p>
                <button
                  type="button"
                  disabled={isCooling}
                  onClick={handleShockwave}
                  className="relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isCooling && (
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 bg-white/15"
                      style={{ width: `${Math.round(cooldownPct * 100)}%` }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap
                      className={`h-3.5 w-3.5 ${isCooling ? "" : "animate-pulse"}`}
                    />
                    {isCooling ? "Recharging core…" : "Trigger GPU Shockwave"}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating pill only — keeps expanded panel content stable */}
        <motion.div
          className="pointer-events-auto"
          initial={false}
          animate={reduced ? { y: 0 } : { y: [0, -7, 0] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: 4.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }
          }
        >
          <div className="flex items-center gap-3 rounded-full border border-white/15 bg-[#070707]/92 px-4 py-2 font-mono text-xs shadow-[0_0_0_1px_rgba(56,189,248,0.08),0_16px_40px_-16px_rgba(0,0,0,0.9),0_0_24px_-8px_rgba(34,211,238,0.25)] backdrop-blur-xl">
            <div className="flex items-center gap-2.5 border-r border-white/10 pr-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
              <span className="hidden max-w-[9.5rem] truncate text-[11px] font-bold uppercase tracking-wider text-white sm:inline">
                0{currentState.id} · {currentState.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-white/50">
              <span className="font-mono font-bold text-cyan-300">
                {fps || 60}
              </span>
              <span className="text-[9px] uppercase tracking-wider">FPS</span>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="ml-0.5 cursor-pointer rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              aria-expanded={isExpanded}
              aria-label="Toggle telemetry controls"
            >
              {isExpanded ? (
                <ChevronDown className="h-3.5 w-3.5" />
              ) : (
                <ChevronUp className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};
