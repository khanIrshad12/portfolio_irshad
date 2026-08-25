"use client";

import React from "react";
import { motion } from "motion/react";
import {
  PERSONAL_INFO,
  PHILOSOPHY_PILLARS,
} from "../../data/portfolioData";
import { GraduationCap, Award, ExternalLink, CheckCircle2 } from "lucide-react";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { TrueFocus } from "../reactbits/TrueFocus";
import { ShinyText } from "../reactbits/ShinyText";
import { PillarsCarousel } from "../ui/PillarsCarousel";
import { ExperienceCarousel } from "../ui/ExperienceCarousel";
import type { ExperienceItem } from "../../types";
import type {
  AboutSectionMeta,
  AboutStatCard,
  PhilosophyPillar,
  Education,
  Certification,
} from "@/lib/types";
import {
  CINEMATIC_ABOUT_SECTION,
  CINEMATIC_ABOUT_STATS,
  CINEMATIC_EDUCATION,
  CINEMATIC_CERTIFICATIONS,
} from "@/lib/cinematic-content";

const STAT_SPOTLIGHTS = [
  "rgba(56, 189, 248, 0.15)",
  "rgba(129, 140, 248, 0.15)",
  "rgba(56, 189, 248, 0.15)",
  "rgba(52, 211, 153, 0.15)",
];

interface AboutSectionProps {
  experiences: ExperienceItem[];
  totalTenureLabel?: string;
  aboutSection?: AboutSectionMeta;
  aboutStats?: AboutStatCard[];
  philosophyPillars?: PhilosophyPillar[];
  education?: Education[];
  certifications?: Certification[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  experiences,
  totalTenureLabel = `${PERSONAL_INFO.totalExperience} TENURE`,
  aboutSection = CINEMATIC_ABOUT_SECTION,
  aboutStats = CINEMATIC_ABOUT_STATS,
  philosophyPillars = PHILOSOPHY_PILLARS.map((p) => ({
    id: `pillar-${p.number}`,
    number: p.number,
    title: p.title,
    description: p.description,
  })),
  education = CINEMATIC_EDUCATION,
  certifications = CINEMATIC_CERTIFICATIONS,
}) => {
  return (
    <section
      id="about"
      className="relative z-10 min-h-screen overflow-x-clip px-4 py-20 sm:px-8 sm:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
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
            <h2 className="w-full text-[clamp(1.5rem,7.5vw,2.75rem)] font-black uppercase leading-[1.05] tracking-tighter text-white sm:hidden">
              {aboutSection.displayHeadline}
            </h2>

            <h2 className="hidden w-full font-black uppercase leading-[0.95] tracking-tighter text-white sm:block sm:text-[clamp(2.25rem,6.5vw,5.5rem)] md:text-7xl">
              <TrueFocus
                sentence={aboutSection.trueFocusSentence}
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
            {aboutSection.summary}
          </motion.p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-3 sm:mb-20 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {aboutStats.map((stat, i) => (
            <SpotlightCard
              key={stat.id}
              className="min-w-0 rounded-xl border border-white/10 p-4 sm:p-5 md:p-6"
              spotlightColor={STAT_SPOTLIGHTS[i % STAT_SPOTLIGHTS.length]}
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                {stat.label}
              </div>
              <div className="mt-1.5 font-mono text-xl font-black leading-tight text-white sm:text-2xl md:text-3xl">
                {i === 0 ? (
                  <>
                    <span className="sm:hidden">{stat.value}</span>
                    <span className="hidden sm:inline">
                      <ShinyText text={stat.value} speed={3} />
                    </span>
                  </>
                ) : (
                  stat.value
                )}
              </div>
              <div
                className={`mt-1.5 font-mono text-[11px] ${
                  i === 0
                    ? "text-cyan-400"
                    : i === 2
                      ? "text-indigo-300"
                      : i === 3
                        ? "text-emerald-400"
                        : "text-white/50"
                }`}
              >
                {stat.sublabel}
              </div>
            </SpotlightCard>
          ))}
        </div>

        <PillarsCarousel pillars={philosophyPillars} />

        <div className="mb-16 md:mb-20">
          <ExperienceCarousel
            experiences={experiences}
            totalTenureLabel={totalTenureLabel}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="rounded-lg border border-indigo-700/50 bg-indigo-950/60 p-2 text-indigo-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white sm:text-2xl">
                Education
              </h3>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <SpotlightCard
                  key={edu.id}
                  className="rounded-xl border border-white/10 p-6"
                  spotlightColor="rgba(99, 102, 241, 0.15)"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h4 className="text-lg font-black uppercase tracking-tight text-white">
                      {edu.degree}
                    </h4>
                    <span className="shrink-0 rounded border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-white/70">
                      {edu.period}
                    </span>
                  </div>
                  <div className="mb-2 font-mono text-xs font-semibold text-indigo-300">
                    {edu.institution} · {edu.location}
                  </div>
                  {edu.details ? (
                    <p className="font-mono text-xs leading-relaxed text-white/60">
                      {edu.details}
                    </p>
                  ) : null}
                </SpotlightCard>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="rounded-lg border border-emerald-700/50 bg-emerald-950/60 p-2 text-emerald-400">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white sm:text-2xl">
                Certifications
              </h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <SpotlightCard
                  key={cert.id}
                  className="flex flex-col justify-between rounded-xl border border-white/10 p-6"
                  spotlightColor="rgba(52, 211, 153, 0.15)"
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                        {cert.issuer.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" /> {cert.year}
                      </span>
                    </div>
                    <h4 className="mb-1 text-base font-black uppercase tracking-tight text-white">
                      {cert.name}
                    </h4>
                    <div className="font-mono text-xs text-white/60">
                      Issuer:{" "}
                      <strong className="text-white">{cert.issuer}</strong>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 font-mono text-[11px] text-cyan-400">
                    <span>Verified Curriculum</span>
                    <ExternalLink className="h-3.5 w-3.5" />
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
