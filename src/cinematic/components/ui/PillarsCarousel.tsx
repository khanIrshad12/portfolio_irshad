"use client";

import { useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

import { SpotlightCard } from "../reactbits/SpotlightCard";
import { PHILOSOPHY_PILLARS } from "../../data/portfolioData";
import type { PhilosophyPillar } from "@/lib/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function PillarCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <SpotlightCard
      className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 p-5 sm:p-8 hover:border-cyan-500/40"
      spotlightColor="rgba(56, 189, 248, 0.18)"
    >
      <div>
        <div className="mb-5 flex items-center justify-between gap-2">
          <span className="rounded border border-cyan-800/40 bg-cyan-950/50 px-2.5 py-1 font-mono text-xs font-bold tracking-widest text-cyan-400">
            PILLAR // {number}
          </span>
          <Sparkles className="h-4 w-4 shrink-0 text-cyan-400/50 transition-colors group-hover:text-cyan-400" />
        </div>

        <h3 className="mb-3 text-lg font-black uppercase leading-snug tracking-tight text-white transition-colors group-hover:text-cyan-300 sm:mb-4 sm:text-2xl">
          {title}
        </h3>

        <p className="font-mono text-xs leading-relaxed text-white/70 sm:text-sm">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-widest text-white/40 sm:mt-8">
        <span>CORE ARCHITECTURE</span>
        <span className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="h-3 w-3" /> VERIFIED
        </span>
      </div>
    </SpotlightCard>
  );
}

/**
 * Mobile: swipeable pillar carousel (autoplay + infinite loop).
 * Desktop (md+): 3-column grid.
 */
export function PillarsCarousel({
  pillars = PHILOSOPHY_PILLARS.map((p) => ({
    id: `pillar-${p.number}`,
    number: p.number,
    title: p.title,
    description: p.description,
  })),
}: {
  pillars?: PhilosophyPillar[];
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="pillars-block mb-20 md:mb-24">
      {/* Desktop grid */}
      <div className="hidden gap-6 md:grid md:grid-cols-3">
        {pillars.map((pillar) => (
          <PillarCard
            key={pillar.number}
            number={pillar.number}
            title={pillar.title}
            description={pillar.description}
          />
        ))}
      </div>

      {/* Mobile carousel */}
      <div className="pillars-carousel relative md:hidden">
        <style>{`
          .pillars-carousel {
            overflow: hidden;
          }
          .pillars-carousel .swiper {
            overflow: hidden !important;
            height: auto !important;
            max-height: none !important;
            padding-bottom: 2.25rem;
          }
          .pillars-carousel .swiper-wrapper {
            align-items: stretch;
            height: auto !important;
          }
          .pillars-carousel .swiper-slide {
            height: auto !important;
            max-height: none !important;
            overflow: hidden !important;
          }
          .pillars-carousel .swiper-slide > * {
            height: auto !important;
            max-height: none !important;
          }
          .pillars-carousel .swiper-pagination {
            bottom: 0 !important;
          }
          .pillars-carousel .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.25);
            opacity: 1;
            width: 6px;
            height: 6px;
          }
          .pillars-carousel .swiper-pagination-bullet-active {
            background: #22d3ee;
            box-shadow: 0 0 10px rgba(34, 211, 238, 0.7);
            width: 18px;
            border-radius: 999px;
          }
        `}</style>

        <div className="mb-3 flex items-center justify-between px-0.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
            Auto · loop · {(active % pillars.length) + 1}/{pillars.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous pillar"
              onClick={() => swiper?.slidePrev()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next pillar"
              onClick={() => swiper?.slideNext()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={14}
          slidesPerView={1}
          centeredSlides={false}
          loop
          loopAdditionalSlides={2}
          autoHeight
          watchOverflow
          observer
          observeParents
          pagination={{ clickable: true }}
          autoplay={
            reduced
              ? false
              : {
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
          }
          speed={650}
          onSwiper={setSwiper}
          onSlideChange={(s) => setActive(s.realIndex)}
          className="w-full !overflow-hidden"
        >
          {pillars.map((pillar) => (
            <SwiperSlide key={pillar.number} className="!h-auto !overflow-hidden">
              <PillarCard
                number={pillar.number}
                title={pillar.title}
                description={pillar.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
