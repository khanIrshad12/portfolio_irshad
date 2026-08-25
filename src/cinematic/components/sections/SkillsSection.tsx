"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import {
  Layout,
  Server,
  Activity,
  Database,
  Check,
  Cpu,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

import type { SkillCategory as MatrixCategory } from "@/lib/types";
import type { SkillCategory, SkillItem } from "../../types";
import { GridBackground } from "../reactbits/GridBackground";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { SectionEdgeBlur } from "../reactbits/SectionEdgeBlur";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function toSkillItem(skill: MatrixCategory["skills"][number]): SkillItem {
  return {
    name: skill.name,
    category: skill.category,
    proficiency: skill.proficiency,
    highlight: skill.highlight,
  };
}

function toSkillCategory(cat: MatrixCategory): SkillCategory {
  return {
    id: cat.id,
    title: cat.title,
    shortTitle: cat.shortTitle,
    subtitle: cat.subtitle,
    iconName: cat.iconName,
    skills: cat.skills.map(toSkillItem),
  };
}

interface SkillsSectionProps {
  categories: MatrixCategory[];
  headline?: string;
  headlineAccent?: string;
  description?: string;
}

function SkillCard({ skill }: { skill: SkillItem }) {
  return (
    <SpotlightCard
      className="group flex h-full flex-col justify-between rounded-xl border border-white/10 p-4 transition-all hover:border-cyan-500/50 sm:rounded-2xl sm:p-6 md:p-7"
      spotlightColor="rgba(56, 189, 248, 0.15)"
    >
      <div>
        <div className="mb-2.5 flex items-start justify-between gap-3 sm:mb-3">
          <span className="min-w-0 text-[13px] font-black uppercase leading-snug tracking-tight text-white transition-colors group-hover:text-cyan-300 sm:text-lg">
            {skill.name}
          </span>
          <span className="shrink-0 rounded border border-cyan-800/40 bg-cyan-950/60 px-1.5 py-0.5 font-mono text-[10px] font-bold text-cyan-400 sm:px-2 sm:text-xs">
            {skill.proficiency}%
          </span>
        </div>

        <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10 p-px sm:mb-4">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {skill.highlight && (
          <p className="font-mono text-[11px] leading-relaxed text-white/65 sm:text-xs sm:text-white/70">
            {skill.highlight}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-2.5 font-mono text-[9px] uppercase tracking-widest text-white/40 sm:mt-5 sm:pt-3 sm:text-[10px]">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Check className="h-3 w-3" />
          Battle-Tested
        </span>
        <span className="text-white/30">MODULE ACTIVE</span>
      </div>
    </SpotlightCard>
  );
}

function SkillsCardsCarousel({
  skills,
  categoryId,
}: {
  skills: SkillItem[];
  categoryId: string;
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const canLoop = skills.length > 1;

  return (
    <div className="skills-cards-carousel md:hidden">
      <div className="mb-3 flex items-center justify-between px-0.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          Auto · loop · {(active % skills.length) + 1}/{skills.length}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous skill"
            onClick={() => swiper?.slidePrev()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next skill"
            onClick={() => swiper?.slideNext()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Swiper
        key={categoryId}
        modules={[Autoplay, Pagination]}
        spaceBetween={14}
        slidesPerView={1}
        loop={canLoop}
        loopAdditionalSlides={canLoop ? 2 : 0}
        autoHeight
        watchOverflow
        observer
        observeParents
        pagination={{ clickable: true }}
        autoplay={
          reduced || !canLoop
            ? false
            : {
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        speed={650}
        onSwiper={(s) => {
          setSwiper(s);
          setActive(s.realIndex);
        }}
        onSlideChange={(s) => setActive(s.realIndex)}
        className="w-full !overflow-hidden"
      >
        {skills.map((skill) => (
          <SwiperSlide
            key={`${categoryId}-${skill.name}`}
            className="!h-auto !overflow-hidden"
          >
            <SkillCard skill={skill} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  categories,
  headline = "A Robust Stack",
  headlineAccent = "Built for Velocity & Resilience.",
  description = "From GPU shader math to PLC register polling, low-latency WebSockets, and modern Next.js 15 architectures.",
}) => {
  const skillCategories = categories.map(toSkillCategory);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    skillCategories[0]?.id ?? "",
  );

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Layout":
        return <Layout className="h-3.5 w-3.5 text-cyan-400 sm:h-4 sm:w-4" />;
      case "Server":
        return <Server className="h-3.5 w-3.5 text-indigo-400 sm:h-4 sm:w-4" />;
      case "Activity":
        return (
          <Activity className="h-3.5 w-3.5 text-emerald-400 sm:h-4 sm:w-4" />
        );
      case "Database":
        return <Database className="h-3.5 w-3.5 text-amber-400 sm:h-4 sm:w-4" />;
      case "Sparkles":
        return (
          <Sparkles className="h-3.5 w-3.5 text-fuchsia-400 sm:h-4 sm:w-4" />
        );
      default:
        return <Cpu className="h-3.5 w-3.5 text-cyan-400 sm:h-4 sm:w-4" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative z-10 min-h-screen overflow-x-clip px-4 py-20 sm:px-8 sm:py-28 lg:px-16"
    >
      <GridBackground gridSize={40} glowColor="rgba(56, 189, 248, 0.3)" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex flex-wrap items-center gap-3"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400 sm:text-xs sm:tracking-[0.25em]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
              [ 03 · TECHNICAL MATRIX &amp; CAPABILITIES ]
            </span>
            <div className="hidden h-px w-16 bg-white/20 sm:block" />
          </motion.div>

          <h2 className="max-w-4xl text-[clamp(1.75rem,8vw,3.75rem)] font-black uppercase leading-[1.02] tracking-tighter text-white sm:text-6xl sm:leading-[0.95] md:text-7xl">
            {headline} <br />
            <span className="text-white/50">{headlineAccent}</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 max-w-2xl text-sm font-normal leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
          >
            {description}
          </motion.p>
        </div>

        {/* Mobile category chips */}
        <div className="skills-cat-scroll mb-8 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 md:hidden">
          <div className="flex w-max gap-2 rounded-xl border border-white/10 bg-black/60 p-1.5 backdrop-blur-xl">
            {skillCategories.map((cat, idx) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative flex shrink-0 snap-start items-center gap-2 rounded-lg px-3 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                    isActive ? "text-white" : "text-white/55"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillCategoryTabMobile"
                      className="absolute inset-0 rounded-lg border border-cyan-500/40 bg-white/10 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${isActive ? "text-cyan-400" : "text-white/35"}`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="relative z-10">
                    {getCategoryIcon(cat.iconName)}
                  </span>
                  <span className="relative z-10">
                    {cat.shortTitle ?? cat.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop category tabs */}
        <div className="mb-12 hidden w-fit flex-wrap gap-2.5 rounded-xl border border-white/10 bg-black/60 p-1.5 backdrop-blur-xl md:flex">
          {skillCategories.map((cat, idx) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative flex cursor-pointer items-center gap-2.5 rounded-lg px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all sm:px-5 ${
                  isActive ? "text-white" : "text-white/60 hover:text-white/90"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillCategoryTab"
                    className="absolute inset-0 rounded-lg border border-cyan-500/40 bg-white/10 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${isActive ? "text-cyan-400" : "text-white/40"}`}
                >
                  0{idx + 1}
                </span>
                <span className="relative z-10">
                  {getCategoryIcon(cat.iconName)}
                </span>
                <span className="relative z-10">{cat.title}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {skillCategories.filter((c) => c.id === selectedCategory).map(
            (cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6 border-b border-white/10 pb-4 sm:mb-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <h3 className="text-xl font-black uppercase tracking-tight text-white sm:text-3xl">
                          {cat.title}
                        </h3>
                        <span className="shrink-0 rounded border border-cyan-800/60 bg-cyan-950/60 px-2 py-0.5 font-mono text-[10px] font-normal text-cyan-400 sm:px-2.5 sm:text-xs">
                          {cat.skills.length} EXPERT SKILLS
                        </span>
                      </div>
                      <p className="mt-1.5 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-white/50 sm:mt-1 sm:text-xs">
                        {cat.subtitle}
                      </p>
                    </div>
                    <span className="hidden shrink-0 items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-emerald-400 sm:flex">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      PRODUCTION TESTED
                    </span>
                  </div>
                </div>

                {/* Mobile: skill card carousel */}
                <SkillsCardsCarousel
                  skills={cat.skills}
                  categoryId={cat.id}
                />

                {/* Desktop: grid */}
                <div className="hidden grid-cols-1 gap-5 md:grid md:grid-cols-2 md:gap-6">
                  {cat.skills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.35 }}
                    >
                      <SkillCard skill={skill} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ),
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .skills-cat-scroll {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .skills-cat-scroll::-webkit-scrollbar {
          display: none;
          height: 0;
        }
        .skills-cards-carousel {
          overflow: hidden;
        }
        .skills-cards-carousel .swiper {
          overflow: hidden !important;
          height: auto !important;
          max-height: none !important;
          padding-bottom: 2.25rem;
        }
        .skills-cards-carousel .swiper-wrapper {
          height: auto !important;
          align-items: stretch;
        }
        .skills-cards-carousel .swiper-slide {
          height: auto !important;
          max-height: none !important;
          overflow: hidden !important;
        }
        .skills-cards-carousel .swiper-slide > * {
          height: auto !important;
          max-height: none !important;
        }
        .skills-cards-carousel .swiper-pagination {
          bottom: 0 !important;
        }
        .skills-cards-carousel .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.25);
          opacity: 1;
          width: 6px;
          height: 6px;
        }
        .skills-cards-carousel .swiper-pagination-bullet-active {
          background: #22d3ee;
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.7);
          width: 18px;
          border-radius: 999px;
        }
      `}</style>

      <SectionEdgeBlur />
    </section>
  );
};
