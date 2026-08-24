"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Layout, Server, Activity, Database, Check, Cpu, Sparkles, Layers } from 'lucide-react';
import { GridBackground } from '../reactbits/GridBackground';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { DecryptedText } from '../reactbits/DecryptedText';
import { ShinyText } from '../reactbits/ShinyText';
import { SectionEdgeBlur } from '../reactbits/SectionEdgeBlur';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(SKILL_CATEGORIES[0].id);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-4 h-4 text-cyan-400" />;
      case 'Server': return <Server className="w-4 h-4 text-indigo-400" />;
      case 'Activity': return <Activity className="w-4 h-4 text-emerald-400" />;
      case 'Database': return <Database className="w-4 h-4 text-amber-400" />;
      default: return <Cpu className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="min-h-screen py-28 px-4 sm:px-8 lg:px-16 relative z-10 overflow-hidden">
      {/* Interactive Grid Background from ReactBits */}
      <GridBackground gridSize={40} glowColor="rgba(56, 189, 248, 0.3)" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="font-mono text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              [ 03 · TECHNICAL MATRIX &amp; CAPABILITIES ]
            </span>
            <div className="h-[1px] w-16 bg-white/20"></div>
          </motion.div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[0.95] max-w-4xl uppercase">
            A Robust Stack <br />
            <span className="text-white/50">Built for Velocity &amp; Resilience.</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-base sm:text-lg max-w-2xl mt-6 font-normal leading-relaxed"
          >
            From GPU shader math to PLC register polling, low-latency WebSockets, and modern Next.js 15 architectures.
          </motion.p>
        </div>

        {/* Category Tabs with Motion layoutId pill indicator */}
        <div className="flex flex-wrap gap-2.5 mb-12 p-1.5 bg-black/60 border border-white/10 rounded-xl backdrop-blur-xl w-fit">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2.5 ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white/90'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillCategoryTab"
                    className="absolute inset-0 bg-white/10 border border-cyan-500/40 rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-cyan-400' : 'text-white/40'}`}>
                  0{idx + 1}
                </span>
                <span className="relative z-10">{getCategoryIcon(cat.iconName)}</span>
                <span className="relative z-10">{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display with AnimatePresence */}
        <AnimatePresence mode="wait">
          {SKILL_CATEGORIES.filter(c => c.id === selectedCategory).map((cat) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center justify-between pb-4 mb-8 border-b border-white/10">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                    <span>{cat.title}</span>
                    <span className="text-xs font-mono text-cyan-400 font-normal px-2.5 py-0.5 bg-cyan-950/60 border border-cyan-800/60 rounded">
                      {cat.skills.length} EXPERT SKILLS
                    </span>
                  </h3>
                  <p className="text-xs font-mono text-white/50 mt-1 uppercase tracking-wider">
                    {cat.subtitle}
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest hidden sm:flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PRODUCTION TESTED</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                  >
                    <SpotlightCard
                      className="p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all flex flex-col justify-between h-full group"
                      spotlightColor="rgba(56, 189, 248, 0.15)"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-black text-lg text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                            {skill.name}
                          </span>
                          <span className="font-mono text-xs font-bold text-cyan-400 px-2 py-0.5 bg-cyan-950/60 rounded border border-cyan-800/40">
                            {skill.proficiency}%
                          </span>
                        </div>

                        {/* Proficiency Gauge with Smooth Gradient Animation */}
                        <div className="w-full h-1.5 bg-white/10 rounded-full mb-4 overflow-hidden p-[1px]">
                          <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>

                        {skill.highlight && (
                          <p className="text-xs text-white/70 font-mono leading-relaxed">
                            {skill.highlight}
                          </p>
                        )}
                      </div>

                      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 text-cyan-400">
                          <Check className="w-3 h-3" />
                          <span>Battle-Tested</span>
                        </span>
                        <span className="text-white/30">MODULE ACTIVE</span>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <SectionEdgeBlur />
    </section>
  );
};
