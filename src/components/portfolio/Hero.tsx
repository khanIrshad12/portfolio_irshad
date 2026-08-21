"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Profile, SocialLinks } from "@/lib/types";
import {
  useReducedMotion,
  bounceTransition,
  staggerChildren,
} from "@/hooks/useReducedMotion";
import { FloatingShapes } from "./FloatingShapes";
import { Squiggle } from "./Squiggle";
import { TypeWriter } from "./TypeWriter";
import { FloatBlock } from "./ScrollReveal";
import { FogLayer } from "./FogLayer";
import { ResumeDownload } from "./ResumeDownload";

interface HeroProps {
  profile: Profile;
  social: SocialLinks;
}

export function Hero({ profile, social }: HeroProps) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const blobY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [0, 80],
  );

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren(reduced, 0.1),
      },
    },
  };

  const item = {
    hidden: {
      opacity: reduced ? 1 : 0,
      scale: reduced ? 1 : 0.88,
      y: reduced ? 0 : 28,
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: bounceTransition(reduced, 0.6),
    },
  };

  const statusBadge = profile.currentCompany
    ? `${profile.currentRole ?? profile.title} @ ${profile.currentCompany}`
    : "Open to opportunities";

  return (
    <section
      ref={sectionRef}
      className="section-padding border-b-[3px] border-[var(--color-ink)] bg-[var(--color-bg)]"
    >
      <FogLayer variant="playful" intensity={0.9} />
      <FloatingShapes
        shapes={[
          {
            kind: "circle",
            color: "var(--color-accent)",
            size: 180,
            top: "5%",
            left: "-2%",
            pattern: "dots",
            parallax: 50,
          },
          {
            kind: "square",
            color: "var(--color-pop-pink)",
            size: 48,
            top: "15%",
            right: "28%",
            rotate: 12,
            delay: 0.3,
            parallax: -35,
          },
          {
            kind: "triangle",
            color: "var(--color-primary)",
            size: 70,
            bottom: "20%",
            left: "42%",
            delay: 0.7,
            parallax: 45,
          },
          {
            kind: "ring",
            color: "var(--color-pop-violet)",
            size: 100,
            top: "40%",
            right: "4%",
            delay: 0.5,
            parallax: 30,
          },
          {
            kind: "pill",
            color: "var(--color-pop-mint)",
            size: 60,
            bottom: "8%",
            right: "22%",
            rotate: -15,
            delay: 1,
            parallax: -20,
          },
        ]}
      />

      {/* Massive accent blob behind text */}
      <motion.div
        className="pointer-events-none absolute -left-16 top-24 size-[min(55vw,320px)] rounded-full border-[3px] border-[var(--color-ink)] bg-[var(--color-accent)] opacity-80 hide-mobile-shapes hidden md:block"
        style={{ y: blobY, boxShadow: "8px 8px 0 var(--color-ink)" }}
        aria-hidden
      />

      <div className="container-narrow">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
        >
          <div>
            <motion.div variants={item} className="mb-6 flex flex-wrap gap-2">
              <motion.span
                whileHover={reduced ? undefined : { rotate: -2, scale: 1.04 }}
                className="brutal-border animate-wiggle rounded-full bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em]"
                style={{ boxShadow: "3px 3px 0 var(--color-ink)" }}
              >
                {statusBadge}
              </motion.span>
              {profile.totalExperience && (
                <motion.span
                  whileHover={reduced ? undefined : { rotate: 2, scale: 1.04 }}
                  className="brutal-border animate-wiggle rounded-full bg-[var(--color-primary)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-bg)]"
                  style={{ boxShadow: "3px 3px 0 var(--color-ink)" }}
                >
                  {profile.totalExperience} exp
                </motion.span>
              )}
            </motion.div>

            <motion.h1
              variants={item}
              className="text-balance font-[family-name:var(--font-display)] text-[clamp(2rem,7vw,4.5rem)] leading-[1.05] tracking-[-0.03em]"
            >
              <TypeWriter
                text={profile.name}
                speed={55}
                delay={400}
                loopDelay={3200}
                fit="fill"
                as="span"
              />
            </motion.h1>
            <motion.div variants={item}>
              <Squiggle color="var(--color-primary)" />
            </motion.div>

            <motion.p
              variants={item}
              className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,2rem)] leading-tight text-[var(--color-primary)]"
            >
              <TypeWriter
                text={profile.title}
                speed={40}
                delay={400 + profile.name.length * 55 + 200}
                loopDelay={3600}
                fit="fill"
                as="span"
              />
            </motion.p>

            <motion.p
              variants={item}
              className="text-pretty mt-6 max-w-xl text-base text-[var(--color-muted)] md:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a href="#contact" className="brutal-btn brutal-btn-primary">
                Contact Me
                <span
                  className="flex size-7 items-center justify-center rounded-full bg-[var(--color-bg)] text-[var(--color-ink)]"
                  aria-hidden
                >
                  →
                </span>
              </a>
              {profile.resumeUrl && (
                <ResumeDownload className="brutal-btn brutal-btn-accent" />
              )}
            </motion.div>
          </div>

          <motion.div variants={item}>
            <FloatBlock amplitude={6} scrollOffset={28} duration={5}>
              <div className="sticker-card relative overflow-hidden p-6 md:p-8">
              {/* Dot pattern corner */}
              <div
                className="dot-grid absolute -right-4 -top-4 size-28 rounded-full"
                aria-hidden
              />
              <motion.span
                className="absolute -right-3 -top-3 flex size-12 items-center justify-center rounded-full border-[3px] border-[var(--color-ink)] bg-[var(--color-pop-pink)] font-[family-name:var(--font-display)] text-lg"
                style={{ boxShadow: "3px 3px 0 var(--color-ink)" }}
                animate={
                  reduced ? undefined : { rotate: [0, 8, -8, 0] }
                }
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                aria-hidden
              >
                ★
              </motion.span>

              {profile.currentCompany && (
                <div className="mb-6 border-b-2 border-[var(--color-ink)] pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">
                    Currently working at
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-lg">
                    {profile.currentCompany}
                  </p>
                  <p className="text-sm text-[var(--color-primary)]">
                    {profile.currentRole} · {profile.totalExperience}
                  </p>
                </div>
              )}

              <p className="text-xs font-semibold uppercase tracking-[0.1em]">
                Quick links
              </p>
              <ul className="mt-4 space-y-3">
                {social.github && (
                  <li>
                    <Link
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border-b-2 border-[var(--color-ink)] pb-2 font-semibold transition-colors hover:text-[var(--color-primary)]"
                    >
                      GitHub
                      <span className="flex size-7 items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-accent)] transition-transform group-hover:translate-x-1 group-hover:rotate-12">
                        →
                      </span>
                    </Link>
                  </li>
                )}
                {social.linkedin && (
                  <li>
                    <Link
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border-b-2 border-[var(--color-ink)] pb-2 font-semibold transition-colors hover:text-[var(--color-primary)]"
                    >
                      LinkedIn
                      <span className="flex size-7 items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-pop-mint)] transition-transform group-hover:translate-x-1 group-hover:rotate-12">
                        →
                      </span>
                    </Link>
                  </li>
                )}
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center justify-between border-b-2 border-[var(--color-ink)] pb-2 font-semibold transition-colors hover:text-[var(--color-primary)]"
                  >
                    {profile.email}
                    <span className="flex size-7 items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-pop-pink)] transition-transform group-hover:translate-x-1 group-hover:rotate-12">
                      →
                    </span>
                  </a>
                </li>
                {profile.phone && (
                  <li>
                    <a
                      href={`tel:${profile.phone.replace(/\s/g, "")}`}
                      className="group flex items-center justify-between border-b-2 border-[var(--color-ink)] pb-2 font-semibold transition-colors hover:text-[var(--color-primary)]"
                    >
                      {profile.phone}
                      <span className="flex size-7 items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-pop-sky)] transition-transform group-hover:translate-x-1 group-hover:rotate-12">
                        →
                      </span>
                    </a>
                  </li>
                )}
              </ul>
              {profile.location && (
                <p className="mt-6 flex items-center gap-2 text-sm text-[var(--color-muted)]">
                  <span
                    className="inline-flex size-7 items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-accent)] text-xs"
                    aria-hidden
                  >
                    📍
                  </span>
                  {profile.location}
                </p>
              )}
              </div>
            </FloatBlock>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
