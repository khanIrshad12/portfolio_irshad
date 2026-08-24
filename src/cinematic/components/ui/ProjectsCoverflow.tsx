"use client";

import { motion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Project } from "../../types";

/**
 * Coverflow project carousel — adapted from Skiper 49 Carousel_003 (Swiper).
 * Attribution: Skiper UI / @gurvinder-singh02 — https://gxuri.me
 */

type ProjectsCoverflowProps = {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  className?: string;
  autoplay?: boolean;
  showNavigation?: boolean;
};

function ProjectSlideCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group flex h-full w-full flex-col rounded-2xl border border-white/10 bg-[#0a0a0a]/95 p-5 text-left shadow-[0_0_0_1px_rgba(56,189,248,0.08)] transition-colors hover:border-cyan-500/40"
      style={{
        backgroundImage: `linear-gradient(135deg, ${project.accentColor}22 0%, transparent 42%)`,
      }}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-cyan-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          SYSTEM // {project.number}
        </span>
        <span className="max-w-[55%] truncate rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/60">
          {project.category}
        </span>
      </div>

      <h3 className="mb-2 text-lg font-black uppercase leading-snug tracking-tight text-white transition-colors group-hover:text-cyan-300">
        {project.title}
      </h3>

      <p className="mb-5 line-clamp-3 flex-1 font-mono text-[11px] leading-relaxed text-white/65">
        {project.tagline}
      </p>

      <div className="mb-4 grid grid-cols-2 gap-2">
        {project.metrics.slice(0, 2).map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-white/10 bg-[#030303]/90 p-2.5"
          >
            <div className="font-mono text-sm font-black text-white">
              {m.value}
            </div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-white/40">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/70"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-cyan-400">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] font-bold uppercase tracking-widest text-white/60">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Layers className="h-3.5 w-3.5" />
          Inspect Specs
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-cyan-400/40 group-hover:text-cyan-300">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
}

export function ProjectsCoverflow({
  projects,
  onSelectProject,
  className,
  autoplay = true,
  showNavigation = true,
}: ProjectsCoverflowProps) {
  const reduced = useReducedMotion();

  const css = `
    .projects-coverflow {
      width: 100%;
      padding-bottom: 2.5rem !important;
      overflow: visible;
    }
    .projects-coverflow .swiper-slide {
      width: min(300px, 78vw);
      height: auto;
    }
    .projects-coverflow .swiper-slide > * {
      height: 100%;
      min-height: 22rem;
    }
    .projects-coverflow .swiper-pagination {
      bottom: 0 !important;
    }
    .projects-coverflow .swiper-pagination-bullet {
      background: rgba(255, 255, 255, 0.3) !important;
      opacity: 1;
      width: 6px;
      height: 6px;
    }
    .projects-coverflow .swiper-pagination-bullet-active {
      background: #22d3ee !important;
      box-shadow: 0 0 10px rgba(34, 211, 238, 0.7);
      width: 18px;
      border-radius: 999px;
    }
    .projects-coverflow .swiper-button-next,
    .projects-coverflow .swiper-button-prev {
      color: #fff;
      width: 2.25rem;
      height: 2.25rem;
      top: auto;
      bottom: 0;
      margin-top: 0;
    }
    .projects-coverflow .swiper-button-next {
      right: 0.25rem;
    }
    .projects-coverflow .swiper-button-prev {
      left: 0.25rem;
    }
    .projects-coverflow .swiper-button-next::after,
    .projects-coverflow .swiper-button-prev::after {
      display: none;
    }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={cn("projects-coverflow-wrap relative w-full", className)}
    >
      <style>{css}</style>

      <Swiper
        spaceBetween={0}
        autoplay={
          autoplay && !reduced
            ? {
                delay: 2800,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }
            : false
        }
        effect="coverflow"
        grabCursor
        slidesPerView="auto"
        centeredSlides
        loop={projects.length > 2}
        coverflowEffect={{
          rotate: 38,
          stretch: 0,
          depth: 110,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={
          showNavigation
            ? {
                nextEl: ".projects-coverflow-next",
                prevEl: ".projects-coverflow-prev",
              }
            : false
        }
        className="projects-coverflow"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <ProjectSlideCard
              project={project}
              onSelect={() => onSelectProject(project)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-10 items-end justify-between px-1">
          <button
            type="button"
            aria-label="Previous project"
            className="projects-coverflow-prev pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/70 text-white/80 backdrop-blur-sm transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next project"
            className="projects-coverflow-next pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/70 text-white/80 backdrop-blur-sm transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
