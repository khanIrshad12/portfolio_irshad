"use client";

import React from 'react';
import { ArrowUp, GitBranch as Github, Globe, Mail, Phone, Heart, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { MagneticButton } from '../reactbits/MagneticButton';
import { ShinyText } from '../reactbits/ShinyText';

interface FooterProps {
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#030303] text-white/60 py-16 px-4 sm:px-8 lg:px-16 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand & Narrative */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-5 h-5 rounded border border-white/30 bg-black/60 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
            </div>
            <span className="font-black text-white text-xl tracking-tighter uppercase">
              {PERSONAL_INFO.fullName}
            </span>
          </div>
          <p className="text-xs text-white/50 font-mono flex items-center gap-2 flex-wrap">
            <span>{PERSONAL_INFO.headline}</span>
            <span className="text-white/20">•</span>
            <span>{PERSONAL_INFO.location}</span>
            <span className="text-white/20">•</span>
            <span className="text-cyan-400 font-bold">{PERSONAL_INFO.totalExperience}</span>
          </p>
        </div>

        {/* Action Links & Back To Top */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 rounded-lg transition-colors uppercase tracking-wider text-[11px]"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Email</span>
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 rounded-lg transition-colors uppercase tracking-wider text-[11px]"
          >
            <Github className="w-3.5 h-3.5 text-white" />
            <span>GitHub</span>
          </a>
          <a
            href={PERSONAL_INFO.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-cyan-300 border border-white/10 rounded-lg transition-colors uppercase tracking-wider text-[11px]"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Vercel</span>
          </a>

          <MagneticButton
            onClick={onBackToTop}
            strength={0.2}
            className="flex items-center gap-1.5 px-5 py-2 bg-white text-black hover:bg-cyan-400 font-bold uppercase tracking-widest text-[11px] rounded-lg transition-colors cursor-pointer shadow-lg"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
};
