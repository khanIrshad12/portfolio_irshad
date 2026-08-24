"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Menu, X, ArrowUpRight, GitBranch as Github } from 'lucide-react';
import { ShinyText } from '../reactbits/ShinyText';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'hero', num: '01', label: 'Identity' },
  { id: 'about', num: '02', label: 'Vision' },
  { id: 'skills', num: '03', label: 'Matrix' },
  { id: 'realtime', num: '04', label: 'Systems' },
  { id: 'projects', num: '05', label: 'Projects' },
  { id: 'contact', num: '06', label: 'Contact' }
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Precision Scroll Laser Progress Line */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 origin-left z-50 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
      />

      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-3 sm:px-6 lg:px-10 py-3">
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 px-5 py-2.5 border rounded-xl ${
            isScrolled
              ? 'bg-[#060606]/90 border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/80'
              : 'bg-[#080808]/50 border-white/5 backdrop-blur-md'
          }`}
        >
          {/* Brand & System Status Indicator */}
          <button
            onClick={() => handleItemClick('hero')}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg border border-white/20 bg-black/60 flex items-center justify-center group-hover:border-cyan-400 transition-colors shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                <span>IRSHAD KHAN</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-[9px] text-white/40 tracking-wider font-mono uppercase hidden sm:block">
                <ShinyText text="FRONT-END & SYSTEMS" speed={4} />
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/5 p-1 rounded-lg">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold transition-all cursor-pointer rounded-md ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/90'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-white/10 border border-white/15 rounded-md shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className={isActive ? 'text-cyan-400 font-mono text-[9px]' : 'text-white/30 font-mono text-[9px]'}>
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Action button & Quick Social */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/30 transition-all hidden sm:flex items-center justify-center"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={() => handleItemClick('contact')}
              className="group relative px-4 py-2 bg-gradient-to-r from-white to-gray-200 text-black font-bold uppercase text-[10px] tracking-[0.2em] rounded-lg overflow-hidden transition-all flex items-center gap-1.5 cursor-pointer shadow-lg hover:shadow-cyan-500/20"
            >
              <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-1">
                <span>Hire Me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
              <div className="absolute inset-0 bg-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-lg border border-white/15 text-white hover:border-cyan-400 transition-colors cursor-pointer bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-2 max-w-7xl mx-auto bg-[#070707]/95 border border-white/15 p-5 rounded-xl shadow-2xl backdrop-blur-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`text-left px-3 py-2.5 text-xs font-mono uppercase tracking-[0.15em] transition-all cursor-pointer rounded-lg flex items-center justify-between border ${
                      isActive
                        ? 'bg-cyan-950/60 text-cyan-300 border-cyan-700/60 font-bold'
                        : 'bg-white/[0.02] text-white/60 border-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-white/30">{item.num}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <span className="text-cyan-400">TELEMETRY: ACTIVE</span>
              <span>24.8K PARTICLES</span>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
};
