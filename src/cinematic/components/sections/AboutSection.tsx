"use client";

import React from 'react';
import { motion } from 'motion/react';
import { PHILOSOPHY_PILLARS, EXPERIENCES, EDUCATION_DATA, CERTIFICATES_DATA, PERSONAL_INFO } from '../../data/portfolioData';
import { Briefcase, MapPin, Calendar, GraduationCap, Award, ExternalLink, CheckCircle2, Terminal, Sparkles, Code2, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { TrueFocus } from '../reactbits/TrueFocus';
import { DecryptedText } from '../reactbits/DecryptedText';
import { ShinyText } from '../reactbits/ShinyText';
import { ParallaxLayer } from '../reactbits/ParallaxLayer';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="min-h-screen py-28 px-4 sm:px-8 lg:px-16 relative z-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with TrueFocus interactive headline */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="font-mono text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              [ 02 · ARCHITECTURAL PROFILE &amp; TRAJECTORY ]
            </span>
            <div className="h-[1px] w-16 bg-white/20"></div>
          </motion.div>

          <div className="mb-6 w-full max-w-4xl">
            <h2 className="w-full text-[clamp(1.75rem,8vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tighter text-white sm:text-[clamp(2.25rem,6.5vw,5.5rem)] md:text-7xl">
              <TrueFocus
                sentence="ENGINEERING PRECISION & CREATIVE CODE"
                separator=" "
                manualMode={false}
                blurAmount={5}
                animationDuration={0.45}
                pauseBetweenAnimations={1.1}
                borderColor="#38bdf8"
                glowColor="rgba(56, 189, 248, 0.55)"
              />
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-base sm:text-lg max-w-3xl mt-4 font-normal leading-relaxed"
          >
            {PERSONAL_INFO.summary}
          </motion.p>
        </div>

        {/* Bio Highlights / Quick Stats Bar with SpotlightCards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <SpotlightCard className="p-6 rounded-xl border border-white/10" spotlightColor="rgba(56, 189, 248, 0.15)">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Total Experience</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
              <ShinyText text={PERSONAL_INFO.totalExperience} speed={3} />
            </div>
            <div className="text-[11px] font-mono text-cyan-400 mt-1">Front-End Developer</div>
          </SpotlightCard>

          <SpotlightCard className="p-6 rounded-xl border border-white/10" spotlightColor="rgba(129, 140, 248, 0.15)">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Primary Location</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">Mumbai</div>
            <div className="text-[11px] font-mono text-white/50 mt-1">Maharashtra, India</div>
          </SpotlightCard>

          <SpotlightCard className="p-6 rounded-xl border border-white/10" spotlightColor="rgba(56, 189, 248, 0.15)">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Degree</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">B.E. Computer</div>
            <div className="text-[11px] font-mono text-indigo-300 mt-1">University of Mumbai</div>
          </SpotlightCard>

          <SpotlightCard className="p-6 rounded-xl border border-white/10" spotlightColor="rgba(52, 211, 153, 0.15)">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Domain Focus</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">Real-Time UI</div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1">Modbus TCP &amp; WebSockets</div>
          </SpotlightCard>
        </div>

        {/* 3 Pillars Grid with SpotlightCard and Parallax accents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {PHILOSOPHY_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <SpotlightCard
                className="p-8 rounded-xl h-full flex flex-col justify-between group border border-white/10 hover:border-cyan-500/40"
                spotlightColor="rgba(56, 189, 248, 0.18)"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-cyan-400 tracking-widest px-2.5 py-1 bg-cyan-950/50 rounded border border-cyan-800/40">
                      PILLAR // 0{pillar.number}
                    </span>
                    <Sparkles className="w-4 h-4 text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-mono">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  <span>CORE ARCHITECTURE</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                  </span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Work Experience — ContainerScroll 3D card */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center justify-between pb-6 mb-2 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-700/50 text-cyan-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                Work Experience
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest hidden sm:block">
              {PERSONAL_INFO.totalExperience} TENURE
            </span>
          </div>

          {EXPERIENCES.map((exp) => (
            <ContainerScroll
              key={exp.id}
              titleComponent={
                <>
                  <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-400 sm:text-xs">
                    Career Trajectory
                  </p>
                  <h4 className="text-3xl font-black uppercase tracking-tighter text-white sm:text-5xl md:text-[4.5rem] md:leading-none">
                    {exp.role}
                  </h4>
                  <p className="mt-3 font-mono text-sm font-semibold uppercase tracking-wider text-white/55 sm:text-base">
                    <span className="text-cyan-400">{exp.company}</span>
                    <span className="mx-2 text-white/25">·</span>
                    {exp.period}
                  </p>
                </>
              }
            >
              <div className="flex flex-col p-5 sm:p-7 md:p-8">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-black uppercase tracking-tight text-white sm:text-xl">
                        {exp.company}
                      </span>
                      {exp.badge && (
                        <span className="rounded-full border border-cyan-700/60 bg-cyan-950/80 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider text-white/50">
                      {exp.type}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 font-mono text-[11px] text-white/55">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="mb-5 font-mono text-xs leading-relaxed text-white/75 sm:text-sm">
                  {exp.summary}
                </p>

                <div className="mb-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {exp.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-[#030303]/90 p-3 font-mono text-[11px] leading-relaxed text-white/75 sm:text-xs"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 border-t border-white/10 pt-4">
                  {exp.techStack.map((s, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/75"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </ContainerScroll>
          ))}
        </div>

        {/* Education & Certifications Dual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Education Column */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-white/10">
              <div className="p-2 rounded-lg bg-indigo-950/60 border border-indigo-700/50 text-indigo-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                Education
              </h3>
            </div>

            <div className="space-y-4">
              {EDUCATION_DATA.map((edu, idx) => (
                <SpotlightCard key={idx} className="p-6 rounded-xl border border-white/10" spotlightColor="rgba(99, 102, 241, 0.15)">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-lg font-black text-white uppercase tracking-tight">
                      {edu.degree}
                    </h4>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 bg-white/5 border border-white/10 rounded text-white/70 shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-semibold text-indigo-300 mb-2">
                    {edu.institution} · {edu.location}
                  </div>
                  <p className="text-xs text-white/60 font-mono leading-relaxed">
                    {edu.details}
                  </p>
                </SpotlightCard>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-white/10">
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                Certifications
              </h3>
            </div>

            <div className="space-y-4">
              {CERTIFICATES_DATA.map((cert, idx) => (
                <SpotlightCard key={idx} className="p-6 rounded-xl border border-white/10 flex flex-col justify-between" spotlightColor="rgba(52, 211, 153, 0.15)">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                        FREECODECAMP
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {cert.year}
                      </span>
                    </div>
                    <h4 className="text-base font-black text-white uppercase tracking-tight mb-1">
                      {cert.title}
                    </h4>
                    <div className="text-xs font-mono text-white/60">
                      Issuer: <strong className="text-white">{cert.issuer}</strong>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                    <span>Verified Curriculum</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
