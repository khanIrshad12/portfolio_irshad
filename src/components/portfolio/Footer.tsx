"use client";

import type { Profile, SocialLinks } from "@/lib/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion, bounceTransition } from "@/hooks/useReducedMotion";

interface FooterProps {
  profile: Profile;
  social?: SocialLinks;
}

export function Footer({ profile, social }: FooterProps) {
  const year = new Date().getFullYear();
  const reduced = useReducedMotion();

  return (
    <footer className="relative overflow-hidden border-t-[3px] border-[var(--color-ink)] bg-[var(--color-surface)] px-5 py-8 md:px-8">
      <div
        className="dot-grid pointer-events-none absolute inset-0 opacity-[0.08]"
        aria-hidden
      />
      <motion.div
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={bounceTransition(reduced, 0.4)}
        className="container-narrow relative z-10 flex flex-col items-center justify-between gap-4 sm:flex-row"
      >
        <p className="flex items-center gap-2 text-sm font-medium">
          <span
            className="inline-block size-3 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-primary)]"
            aria-hidden
          />
          © {year} {profile.name}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
          {social?.linkedin && (
            <Link
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-transparent px-3 py-1 transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]"
            >
              LinkedIn
            </Link>
          )}
          {social?.github && (
            <Link
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-transparent px-3 py-1 transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-pop-mint)] hover:text-[var(--color-ink)]"
            >
              GitHub
            </Link>
          )}
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border-2 border-transparent px-3 py-1 transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-pop-pink)] hover:text-[var(--color-ink)]"
          >
            Email
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
