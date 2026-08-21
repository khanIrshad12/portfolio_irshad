"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useReducedMotion, bounceTransition } from "@/hooks/useReducedMotion";

const TAG_COLORS = [
  "var(--color-accent)",
  "var(--color-pop-pink)",
  "var(--color-pop-mint)",
  "var(--color-pop-sky)",
  "var(--color-pop-violet)",
];

interface MoreProjectsCarouselProps {
  projects: Project[];
  className?: string;
}

/** Ensure enough slides so Swiper loop works both directions */
function slidesForLoop(projects: Project[]): Project[] {
  if (projects.length === 0) return [];
  if (projects.length >= 3) return projects;
  const out: Project[] = [];
  while (out.length < 4) {
    out.push(...projects);
  }
  return out;
}

export function MoreProjectsCarousel({
  projects,
  className = "",
}: MoreProjectsCarouselProps) {
  const reduced = useReducedMotion();
  const slides = slidesForLoop(projects);

  if (projects.length === 0) return null;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: false }}
      transition={bounceTransition(reduced, 0.45)}
      className={cn(
        "more-projects-carousel relative mx-auto w-full max-w-md overflow-hidden",
        className,
      )}
    >
      <style>{`
        .more-projects-carousel {
          overflow: hidden;
        }
        .more-projects-carousel .swiper {
          overflow: hidden !important;
          padding: 1.25rem 1.25rem 3rem !important;
          margin: 0 auto;
        }
        .more-projects-carousel .swiper-wrapper {
          overflow: visible;
        }
        .more-projects-carousel .swiper-slide {
          border-radius: 1.25rem;
          background: var(--color-bg);
          overflow: hidden;
        }
        .more-projects-carousel .swiper-pagination {
          bottom: 0.35rem !important;
        }
        .more-projects-carousel .swiper-pagination-bullet {
          background: var(--color-ink);
          opacity: 0.35;
        }
        .more-projects-carousel .swiper-pagination-bullet-active {
          background: var(--color-primary);
          opacity: 1;
        }
        .more-projects-carousel .swiper-button-next,
        .more-projects-carousel .swiper-button-prev {
          color: var(--color-ink);
          width: 2.25rem;
          height: 2.25rem;
          top: auto;
          bottom: 0.15rem;
          margin-top: 0;
        }
        .more-projects-carousel .swiper-button-prev {
          left: calc(50% - 5.5rem);
        }
        .more-projects-carousel .swiper-button-next {
          right: calc(50% - 5.5rem);
        }
      `}</style>

      <div className="flex justify-center overflow-hidden px-2">
        <Swiper
          effect="cards"
          grabCursor
          loop
          rewind={false}
          loopAdditionalSlides={2}
          cardsEffect={{
            perSlideOffset: 8,
            perSlideRotate: 2,
            rotate: true,
            slideShadows: false,
          }}
          spaceBetween={0}
          autoplay={
            reduced
              ? false
              : {
                  delay: 3200,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  reverseDirection: false,
                }
          }
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".more-projects-next",
            prevEl: ".more-projects-prev",
          }}
          modules={[EffectCards, Autoplay, Pagination, Navigation]}
          className="h-[440px] w-[min(100%,280px)]"
        >
          {slides.map((project, i) => (
            <SwiperSlide key={`${project.id}-${i}`}>
              <article
                className="sticker-card flex h-full flex-col overflow-hidden p-5"
                style={{
                  boxShadow: `5px 5px 0 ${TAG_COLORS[i % TAG_COLORS.length]}`,
                }}
              >
                {project.company && (
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-primary)]">
                    {project.company}
                  </p>
                )}
                <h4 className="mt-1 font-[family-name:var(--font-display)] text-lg leading-tight">
                  {project.title}
                </h4>
                <p className="mt-3 line-clamp-4 flex-1 text-sm text-[var(--color-muted)]">
                  {project.description}
                </p>
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {project.highlights.slice(0, 2).map((h) => (
                      <li key={h} className="text-xs text-[var(--color-muted)]">
                        • {h}
                      </li>
                    ))}
                  </ul>
                )}
                {project.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-accent)] px-2 py-0.5 text-[0.65rem] font-semibold uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn brutal-btn-primary mt-4 w-full text-xs"
                  >
                    {project.linkLabel ?? "View"}
                    <span
                      className="flex size-5 items-center justify-center rounded-full bg-[var(--color-bg)] text-[var(--color-ink)]"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                )}
              </article>
            </SwiperSlide>
          ))}

          <button
            type="button"
            className="more-projects-prev swiper-button-prev after:hidden"
            aria-label="Previous project"
          >
            <ChevronLeftIcon className="size-6" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className="more-projects-next swiper-button-next after:hidden"
            aria-label="Next project"
          >
            <ChevronRightIcon className="size-6" strokeWidth={2.5} />
          </button>
        </Swiper>
      </div>
    </motion.div>
  );
}
