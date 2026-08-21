"use client";

import { motion } from "framer-motion";
import type { Profile, SocialLinks } from "@/lib/types";
import {
  useReducedMotion,
  bounceTransition,
} from "@/hooks/useReducedMotion";
import { FloatingShapes } from "./FloatingShapes";
import { Marquee } from "./Marquee";
import { ResumeDownload } from "./ResumeDownload";

interface ContactProps {
  profile: Profile;
  social: SocialLinks;
}

export function Contact({ profile, social }: ContactProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      className="section-padding bg-[var(--color-primary)] text-[var(--color-bg)]"
    >
      <FloatingShapes
        shapes={[
          {
            kind: "circle",
            color: "var(--color-accent)",
            size: 100,
            top: "8%",
            right: "8%",
            parallax: 30,
          },
          {
            kind: "triangle",
            color: "var(--color-pop-mint)",
            size: 50,
            bottom: "15%",
            left: "6%",
            delay: 0.5,
            parallax: -25,
          },
          {
            kind: "pill",
            color: "var(--color-pop-pink)",
            size: 48,
            top: "40%",
            left: "15%",
            rotate: 30,
            delay: 0.8,
            parallax: 20,
          },
        ]}
      />

      <div className="container-narrow">
        <motion.div
          initial={{
            opacity: reduced ? 1 : 0,
            y: reduced ? 0 : 32,
            scale: reduced ? 1 : 0.9,
            rotate: reduced ? 0 : -1.5,
          }}
          whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          viewport={{ once: false }}
          transition={bounceTransition(reduced, 0.65)}
          className="brutal-border relative overflow-hidden border-[var(--color-bg)] bg-[var(--color-ink)] p-8 md:p-12"
          style={{
            boxShadow: "10px 10px 0 var(--color-accent)",
            borderRadius: "1.5rem 1.5rem 1.5rem 0",
          }}
        >
          <motion.span
            className="absolute -right-4 -top-4 flex size-16 items-center justify-center rounded-full border-[3px] border-[var(--color-bg)] bg-[var(--color-accent)] font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)] md:size-20 md:text-3xl"
            style={{ boxShadow: "4px 4px 0 var(--color-bg)" }}
            animate={
              reduced ? undefined : { rotate: [0, 12, -8, 0], y: [0, -6, 0] }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            ✦
          </motion.span>

          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-[-0.03em]">
            Let&apos;s work together
          </h2>
          <p className="text-pretty mt-4 max-w-xl text-base opacity-90">
            Ready for your next hire? Drop a line — I respond within 24 hours.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="brutal-btn brutal-btn-accent"
            >
              Email Me
              <span
                className="flex size-7 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-bg)]"
                aria-hidden
              >
                →
              </span>
            </a>
            {profile.resumeUrl && (
              <ResumeDownload className="brutal-btn border-[var(--color-bg)] bg-transparent text-[var(--color-bg)] hover:bg-[var(--color-bg)] hover:text-[var(--color-ink)]" />
            )}
          </div>

          <div className="mt-10 grid gap-4 border-t-2 border-[var(--color-bg)]/30 pt-8 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.1em] opacity-70">
                Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-1 block font-semibold hover:underline"
              >
                {profile.email}
              </a>
            </div>
            {profile.phone && (
              <div>
                <p className="text-xs uppercase tracking-[0.1em] opacity-70">
                  Phone
                </p>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="mt-1 block font-semibold hover:underline"
                >
                  {profile.phone}
                </a>
              </div>
            )}
            <div>
              <p className="text-xs uppercase tracking-[0.1em] opacity-70">
                Social
              </p>
              <div className="mt-1 flex gap-3">
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:underline"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-12">
        <Marquee
          items={[
            "Let's build",
            "Open to work",
            "Say hello",
            profile.name.split(" ")[0] ?? "Hire me",
            "Ship faster",
          ]}
          className="border-[var(--color-bg)] bg-[var(--color-ink)] text-[var(--color-bg)]"
          speedSeconds={24}
        />
      </div>
    </section>
  );
}
