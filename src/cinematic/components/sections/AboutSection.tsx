"use client";

import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES, EDUCATION_DATA, CERTIFICATES_DATA, PERSONAL_INFO } from '../../data/portfolioData';
import { Briefcase, MapPin, Calendar, GraduationCap, Award, ExternalLink, CheckCircle2 } from 'lucide-react';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { TrueFocus } from '../reactbits/TrueFocus';
import { ShinyText } from '../reactbits/ShinyText';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { PillarsCarousel } from '../ui/PillarsCarousel';
import { MobileExperienceCard } from '../ui/MobileExperienceCard';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative z-10 min-h-screen overflow-x-clip px-4 py-20 sm:px-8 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header with TrueFocus interactive headline */}
        <div className="mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex flex-wrap items-center gap-3"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400 sm:text-xs sm:tracking-[0.25em]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
              [ 02 · ARCHITECTURAL PROFILE &amp; TRAJECTORY ]
            </span>
            <div className="hidden h-px w-16 bg-white/20 sm:block" />
          </motion.div>

          <div className="mb-6 w-full max-w-4xl">
            {/* Mobile: crisp static headline — no TrueFocus / blur */}
            <h2 className="w-full text-[clamp(1.5rem,7.5vw,2.75rem)] font-black uppercase leading-[1.05] tracking-tighter text-white sm:hidden">
              Engineering Precision &amp; Creative Code
            </h2>

            {/* sm+: TrueFocus reticle + word focus */}
            <h2 className="hidden w-full font-black uppercase leading-[0.95] tracking-tighter text-white sm:block sm:text-[clamp(2.25rem,6.5vw,5.5rem)] md:text-7xl">
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
            className="mt-4 max-w-3xl text-sm font-normal leading-relaxed text-white/70 sm:text-lg"
          >
            {PERSONAL_INFO.summary}
          </motion.p>
        </div>

        {/* Bio Highlights — stack on phones, 2-up from sm, 4-up on desktop */}
        <div className="mb-16 grid grid-cols-1 gap-3 sm:mb-20 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <SpotlightCard className="min-w-0 rounded-xl border border-white/10 p-4 sm:p-5 md:p-6" spotlightColor="rgba(56, 189, 248, 0.15)">
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Total Experience
            </div>
            <div className="mt-1.5 font-mono text-xl font-black leading-tight text-white sm:text-2xl md:text-3xl">
              {/* Solid on mobile — shimmer can look like blur on small screens */}
              <span className="sm:hidden">{PERSONAL_INFO.totalExperience}</span>
              <span className="hidden sm:inline">
                <ShinyText text={PERSONAL_INFO.totalExperience} speed={3} />
              </span>
            </div>
            <div className="mt-1.5 font-mono text-[11px] text-cyan-400">
              Front-End Developer
            </div>
          </SpotlightCard>

          <SpotlightCard className="min-w-0 rounded-xl border border-white/10 p-4 sm:p-5 md:p-6" spotlightColor="rgba(129, 140, 248, 0.15)">
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Primary Location
            </div>
            <div className="mt-1.5 font-mono text-xl font-black leading-tight text-white sm:text-2xl md:text-3xl">
              Mumbai
            </div>
            <div className="mt-1.5 font-mono text-[11px] text-white/50">
              Maharashtra, India
            </div>
          </SpotlightCard>

          <SpotlightCard className="min-w-0 rounded-xl border border-white/10 p-4 sm:p-5 md:p-6" spotlightColor="rgba(56, 189, 248, 0.15)">
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Degree
            </div>
            <div className="mt-1.5 font-mono text-xl font-black leading-tight text-white sm:text-2xl md:text-3xl">
              B.E. Computer
            </div>
            <div className="mt-1.5 font-mono text-[11px] text-indigo-300">
              University of Mumbai
            </div>
          </SpotlightCard>

          <SpotlightCard className="min-w-0 rounded-xl border border-white/10 p-4 sm:p-5 md:p-6" spotlightColor="rgba(52, 211, 153, 0.15)">
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Domain Focus
            </div>
            <div className="mt-1.5 font-mono text-xl font-black leading-tight text-white sm:text-2xl md:text-3xl">
              Real-Time UI
            </div>
            <div className="mt-1.5 font-mono text-[11px] text-emerald-400">
              Modbus TCP &amp; WebSockets
            </div>
          </SpotlightCard>
        </div>

        {/* Philosophy pillars — carousel on mobile, grid on desktop */}
        <PillarsCarousel />

        {/* Work Experience — flat cards on mobile, ContainerScroll on md+ */}
        <div className="mb-16 overflow-x-clip md:mb-20">
          <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-cyan-700/50 bg-cyan-950/60 p-2 text-cyan-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                Work Experience
              </h3>
            </div>
            <span className="hidden font-mono text-xs font-bold uppercase tracking-widest text-cyan-400 sm:block">
              {PERSONAL_INFO.totalExperience} TENURE
            </span>
          </div>

          {/* Mobile: natural-height cards (no 68rem scroll theater) */}
          <div className="mt-6 space-y-10 md:hidden">
            {EXPERIENCES.map((exp) => (
              <MobileExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>

          {/* Desktop: scroll-driven 3D card */}
          <div className="hidden md:block">
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
