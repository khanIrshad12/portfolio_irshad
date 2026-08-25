"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ExperienceItem } from "../../types";
import { ExperienceCardContent } from "./ExperienceCardContent";

type ExperienceCarouselProps = {
  experiences: ExperienceItem[];
  totalTenureLabel?: string;
  className?: string;
};

export function ExperienceCarousel({
  experiences,
  totalTenureLabel,
  className,
}: ExperienceCarouselProps) {
  const reducedMotion = useReducedMotion();
  const navId = useId().replace(/:/g, "");
  const prevClass = `exp-prev-${navId}`;
  const nextClass = `exp-next-${navId}`;
  const canLoop = experiences.length > 1;

  if (experiences.length === 0) return null;

  return (
    <div className={cn("overflow-x-clip", className)}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-cyan-700/50 bg-cyan-950/60 p-2 text-cyan-400">
            <Briefcase className="h-5 w-5" />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
            Work Experience
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {totalTenureLabel && (
            <span className="hidden font-mono text-xs font-bold uppercase tracking-widest text-cyan-400 sm:block">
              {totalTenureLabel}
            </span>
          )}
          {canLoop && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`${prevClass} flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-cyan-400/50 hover:text-cyan-300`}
                aria-label="Previous company"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                className={`${nextClass} flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-cyan-400/50 hover:text-cyan-300`}
                aria-label="Next company"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        loop={canLoop}
        speed={650}
        autoplay={
          canLoop && !reducedMotion
            ? { delay: 8000, disableOnInteraction: true, pauseOnMouseEnter: true }
            : false
        }
        navigation={
          canLoop
            ? { prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }
            : undefined
        }
        pagination={
          canLoop
            ? {
                clickable: true,
                bulletClass:
                  "swiper-pagination-bullet !mx-1 !h-1.5 !w-6 !rounded-full !bg-white/20 !opacity-100 transition-all",
                bulletActiveClass: "!bg-cyan-400 !w-8",
              }
            : false
        }
        className="experience-carousel !overflow-visible pb-12"
      >
        {experiences.map((exp) => (
          <SwiperSlide key={exp.id} className="!h-auto">
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <div className="mb-4 sm:mb-5">
                <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
                  Career Trajectory
                </p>
                <h4 className="text-2xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                  {exp.role}
                </h4>
                <p className="mt-2 font-mono text-xs font-semibold uppercase tracking-wider text-white/55 sm:text-sm">
                  <span className="text-cyan-400">{exp.company}</span>
                  <span className="mx-2 text-white/25">·</span>
                  <span className="normal-case tracking-normal text-white/45">
                    {exp.period}
                  </span>
                </p>
              </div>
              <ExperienceCardContent exp={exp} />
            </motion.article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
