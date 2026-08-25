"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../../types";
import {
  X,
  Layers,
  Cpu,
  Check,
  Sparkles,
} from "lucide-react";
import { ShinyText } from "../reactbits/ShinyText";
import { useLenisModalLock } from "../providers/SmoothScroll";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const isOpen = !!project;

  // Stop Lenis page scroll so the modal panel receives the wheel
  useLenisModalLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            // data-lenis-prevent: Lenis skips this nested scroller
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            className="project-modal-scroll relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-3xl border border-white/20 bg-[#070707] p-6 text-white shadow-2xl shadow-cyan-950/30 sm:p-10 md:p-12"
          >
            <div className="mb-8 flex items-start justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex items-center gap-1.5 rounded-full border border-cyan-700/60 bg-cyan-950/80 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                    <span>SYSTEM // {project.number}</span>
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                    {project.category}
                  </span>
                </div>
                <h2
                  id="project-modal-title"
                  className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl"
                >
                  {project.title}
                </h2>
                <p className="mt-2 font-mono text-xs text-white/60 sm:text-sm">
                  {project.tagline}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="cursor-pointer rounded-full border border-white/10 bg-white/5 p-2.5 text-white/60 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {(project.metrics ?? []).map((metric, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-[#030303] p-4 shadow-inner"
                >
                  <div className="font-mono text-xl font-bold text-white">
                    <ShinyText text={metric.value} speed={3} />
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8 rounded-2xl border border-white/5 bg-[#040404] p-6">
              <h3 className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>System Overview &amp; Engineering Scope</span>
              </h3>
              <p className="font-mono text-xs leading-relaxed text-white/80 sm:text-sm">
                {project.overview}
              </p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#030303] p-6">
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white">
                  <Layers className="h-4 w-4 text-cyan-400" />
                  <span>Architectural Highlights</span>
                </h3>
                <ul className="space-y-3 font-mono text-xs text-white/70">
                  {((project.architecture ?? [])).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#030303] p-6">
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-white">
                  <Cpu className="h-4 w-4 text-cyan-400" />
                  <span>Key Engineering Impact</span>
                </h3>
                <ul className="space-y-3 font-mono text-xs text-white/70">
                  {((project.keyContributions ?? [])).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
                Technologies &amp; Protocols Used
              </div>
              <div className="flex flex-wrap gap-2">
                {((project.techStack ?? [])).map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
