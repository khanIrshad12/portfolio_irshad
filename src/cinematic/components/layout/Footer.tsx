"use client";

import React from "react";
import {
  ArrowUp,
  Download,
  GitBranch as Github,
  Mail,
} from "lucide-react";
import { PERSONAL_INFO } from "../../data/portfolioData";
import { MagneticButton } from "../reactbits/MagneticButton";

interface FooterProps {
  onBackToTop: () => void;
  resumeUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onBackToTop,
  resumeUrl,
}) => {
  const hasResume = Boolean(resumeUrl?.trim());

  return (
    <footer className="relative z-20 w-full border-t border-white/10 bg-[#030303] px-4 py-16 text-white/60 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-5 w-5 items-center justify-center rounded border border-white/30 bg-black/60 shadow-inner">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </div>
            <span className="text-xl font-black uppercase tracking-tighter text-white">
              {PERSONAL_INFO.fullName}
            </span>
          </div>
          <p className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/50">
            <span>{PERSONAL_INFO.headline}</span>
            <span className="text-white/20">•</span>
            <span>{PERSONAL_INFO.location}</span>
            <span className="text-white/20">•</span>
            <span className="font-bold text-cyan-400">
              {PERSONAL_INFO.totalExperience}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-wider text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Mail className="h-3.5 w-3.5 text-cyan-400" />
            <span>Email</span>
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-wider text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Github className="h-3.5 w-3.5 text-white" />
            <span>GitHub</span>
          </a>
          {hasResume && (
            <a
              href="/api/resume/download"
              download
              className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-4 py-2 text-[11px] uppercase tracking-wider text-cyan-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-950/70 hover:text-cyan-200"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span>Resume</span>
            </a>
          )}

          <MagneticButton
            onClick={onBackToTop}
            strength={0.2}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-white px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-black shadow-lg transition-colors hover:bg-cyan-400"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Top</span>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
};
