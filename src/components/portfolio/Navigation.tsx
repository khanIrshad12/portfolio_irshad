"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import type { Profile, SocialLinks } from "@/lib/types";
import {
  useReducedMotion,
  bounceTransition,
} from "@/hooks/useReducedMotion";
import { TypeWriter } from "./TypeWriter";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

interface NavigationProps {
  profile: Profile;
  social: SocialLinks;
}

export function Navigation({ profile }: NavigationProps) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const firstName = profile.name.split(" ")[0];

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  return (
    <motion.header
      initial={{ y: reduced ? 0 : -28, opacity: reduced ? 1 : 0 }}
      animate={{
        y: 0,
        opacity: 1,
        boxShadow: scrolled ? "0 4px 0 var(--color-ink)" : "0 0 0 transparent",
      }}
      transition={bounceTransition(reduced, 0.55)}
      className="sticky top-0 z-50 border-b-[3px] border-[var(--color-ink)] bg-[var(--color-accent)]"
    >
      <div className="container-narrow flex items-center justify-between px-5 py-3 md:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 font-[family-name:var(--font-display)] text-lg uppercase tracking-tight md:text-xl"
        >
          <motion.span
            className="inline-block size-3 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-primary)]"
            animate={
              reduced
                ? undefined
                : { scale: [1, 1.25, 1], rotate: [0, 10, 0] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <TypeWriter
            text={firstName}
            speed={90}
            delay={200}
            loopDelay={3000}
            fit="inline"
          />
          <span className="text-[var(--color-primary)]">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_ITEMS.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...bounceTransition(reduced, 0.4),
                delay: reduced ? 0 : 0.05 * i,
              }}
              whileHover={reduced ? undefined : { y: -2, scale: 1.04 }}
              className="cursor-grow rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-[var(--color-bg)]"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="brutal-btn brutal-btn-primary hidden text-xs sm:inline-flex"
          >
            Hire Me
            <span
              className="flex size-6 items-center justify-center rounded-full bg-[var(--color-bg)] text-[var(--color-ink)]"
              aria-hidden
            >
              →
            </span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
