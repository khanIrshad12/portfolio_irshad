"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Copy,
  Check,
  Send,
  GitBranch as Github,
  Phone,
  Download,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import { PERSONAL_INFO } from "../../data/portfolioData";
import type { Profile, SocialLinks, SystemStatus } from "@/lib/types";
import { CINEMATIC_SYSTEM_STATUS } from "@/lib/cinematic-content";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { MagneticButton } from "../reactbits/MagneticButton";
import { DecryptedText } from "../reactbits/DecryptedText";
import { ShinyText } from "../reactbits/ShinyText";
import { SectionEdgeBlur } from "../reactbits/SectionEdgeBlur";

interface ContactSectionProps {
  onShockwave: () => void;
  profile?: Pick<Profile, "email" | "phone" | "location" | "name" | "resumeUrl">;
  social?: SocialLinks;
  systemStatus?: SystemStatus;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onShockwave,
  profile,
  social,
  systemStatus = CINEMATIC_SYSTEM_STATUS,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sentSuccess, setSentSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const primaryEmail = profile?.email ?? PERSONAL_INFO.email;
  const phoneNumber = profile?.phone ?? PERSONAL_INFO.phone;
  const location = profile?.location ?? PERSONAL_INFO.location;
  const githubUrl = social?.github ?? PERSONAL_INFO.github;
  const resumeUrl = profile?.resumeUrl?.trim() ?? "";
  const hasResume = Boolean(resumeUrl);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(primaryEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message || !formState.name) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(json.error ?? "Failed to send");
      }
      setSentSuccess(true);
      onShockwave();
    } catch (err) {
      // Fallback: open mail client if API unavailable
      const subject = encodeURIComponent(
        `Hire Inquiry — ${formState.name || "Portfolio Contact"}`,
      );
      const body = encodeURIComponent(
        `Hi Irshad,\n\n${formState.message}\n\n— ${formState.name}\n${formState.email}`,
      );
      window.location.href = `mailto:${primaryEmail}?subject=${subject}&body=${body}`;
      setSentSuccess(true);
      onShockwave();
      void err;
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 flex min-h-screen flex-col justify-center overflow-x-clip px-4 py-20 sm:px-8 sm:py-28 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex flex-wrap items-center gap-3"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400 sm:text-xs sm:tracking-[0.25em]">
              <span className="h-1.5 w-1.5 shrink-0 animate-ping rounded-full bg-cyan-400" />
              [ 06 · CONTACT &amp; HIRE ]
            </span>
            <div className="hidden h-px w-16 bg-white/20 sm:block" />
          </motion.div>

          <h2 className="max-w-5xl break-words text-[clamp(2rem,11vw,8rem)] font-black uppercase leading-[0.95] tracking-tighter text-white sm:text-7xl sm:leading-[0.85] md:text-8xl lg:text-9xl">
            Let&apos;s work{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              {/* Mobile: static — DecryptedText can overflow narrow widths */}
              <span className="sm:hidden">TOGETHER.</span>
              <span className="hidden sm:inline">
                <DecryptedText text="TOGETHER." speed={40} />
              </span>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-5 max-w-2xl text-sm font-normal leading-relaxed text-white/70 sm:mt-8 sm:text-lg"
          >
            Looking for a front-end or full-stack engineer who ships polished
            React / Next.js products, real-time dashboards, and creative WebGL
            experiences? I&apos;m available for full-time roles, contract work,
            and high-impact freelance projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href={`mailto:${primaryEmail}?subject=${encodeURIComponent("Hire Irshad Khan — Opportunity")}`}
              className="group relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-white via-gray-100 to-gray-200 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-2xl sm:w-auto sm:px-7"
            >
              <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-white">
                <Briefcase className="h-4 w-4" />
                Hire Me
              </span>
              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-cyan-600 to-blue-600 transition-transform duration-300 ease-out group-hover:translate-y-0" />
            </a>
            <a
              href={`mailto:${primaryEmail}`}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.03] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-cyan-400/60 hover:bg-white/[0.08] sm:w-auto"
            >
              <span>Email Irshad</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-cyan-400" />
            </a>
          </motion.div>
        </div>

        <div className="mb-10 grid grid-cols-1 items-start gap-5 sm:mb-16 sm:gap-8 lg:grid-cols-12">
          <div className="space-y-4 sm:space-y-6 lg:col-span-5">
            <SpotlightCard
              className="rounded-xl border border-white/10 p-5 shadow-2xl sm:rounded-2xl sm:p-8"
              spotlightColor="rgba(56, 189, 248, 0.18)"
            >
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-white/40 sm:mb-3">
                Primary email
              </div>
              <div className="mb-5 break-all font-mono text-sm font-black text-white sm:mb-6 sm:text-lg">
                <span className="sm:hidden">{primaryEmail}</span>
                <span className="hidden sm:inline">
                  <ShinyText text={primaryEmail} speed={3} />
                </span>
              </div>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <MagneticButton
                  onClick={handleCopyEmail}
                  strength={0.2}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 sm:flex-1"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-cyan-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </MagneticButton>

                <a
                  href={`mailto:${primaryEmail}?subject=${encodeURIComponent("Hire Irshad Khan")}`}
                  className="group relative flex w-full items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-xl sm:w-auto"
                >
                  <span className="relative z-10 transition-colors group-hover:text-white">
                    Hire via Email
                  </span>
                  <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-colors group-hover:text-white" />
                  <div className="absolute inset-0 translate-y-full bg-cyan-600 transition-transform duration-300 group-hover:translate-y-0" />
                </a>
              </div>
            </SpotlightCard>

            <SpotlightCard
              className="flex flex-col items-start justify-between gap-4 rounded-xl border border-white/10 p-5 sm:flex-row sm:items-center sm:rounded-2xl sm:p-6"
              spotlightColor="rgba(56, 189, 248, 0.15)"
            >
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Phone &amp; WhatsApp
                </div>
                <div className="mt-1 font-mono text-sm font-bold text-white">
                  {phoneNumber}
                </div>
                <div className="mt-0.5 font-mono text-xs text-white/50">
                  {location}
                </div>
              </div>

              <MagneticButton
                onClick={handleCopyPhone}
                strength={0.2}
                className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-xs text-white/80 hover:bg-white/10 hover:text-white sm:w-auto"
              >
                {copiedPhone ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <Phone className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Copy Phone</span>
                  </>
                )}
              </MagneticButton>
            </SpotlightCard>

            <SpotlightCard
              className="flex items-start gap-3 rounded-xl border border-white/10 p-5 sm:gap-4 sm:rounded-2xl sm:p-6"
              spotlightColor="rgba(52, 211, 153, 0.15)"
            >
              <div className="shrink-0 rounded-xl border border-emerald-800/60 bg-emerald-950/60 p-2.5 text-emerald-400 sm:p-3">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                  <span>{systemStatus.isAvailable ? "Open to hire" : "Currently unavailable"}</span>
                </div>
                <div className="mt-0.5 text-base font-black uppercase tracking-tight text-white">
                  {systemStatus.statusText}
                </div>
                <p className="mt-1 font-mono text-xs text-white/60">
                  {systemStatus.location} · {systemStatus.activeClientSlots}
                </p>
              </div>
            </SpotlightCard>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs sm:gap-4">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-[#080808]/90 p-3.5 text-[10px] uppercase tracking-wider text-white/70 transition-all hover:border-cyan-400/50 hover:text-white sm:p-4 sm:text-[11px]"
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Github className="h-4 w-4 text-white transition-colors group-hover:text-cyan-400" />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-white/40 transition-colors group-hover:text-cyan-400" />
              </a>

              <a
                href={
                  hasResume
                    ? "/api/resume/download"
                    : `mailto:${primaryEmail}?subject=${encodeURIComponent("Resume request")}`
                }
                {...(hasResume ? { download: true } : {})}
                className="group flex items-center justify-between rounded-xl border border-cyan-500/25 bg-[#080808]/90 p-3.5 text-[10px] uppercase tracking-wider text-white/70 transition-all hover:border-cyan-400/50 hover:text-cyan-300 sm:p-4 sm:text-[11px]"
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Download className="h-4 w-4 text-cyan-400" />
                  <span>Download</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-white/40 transition-colors group-hover:text-cyan-400" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SpotlightCard
              className="relative rounded-xl border border-white/10 p-5 shadow-2xl sm:rounded-2xl sm:p-8 md:p-10"
              spotlightColor="rgba(56, 189, 248, 0.18)"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 sm:mb-6">
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400 sm:text-xs">
                  <Briefcase className="h-4 w-4 shrink-0 text-cyan-400" />
                  <span className="sm:hidden">HIRE / PROJECT INQUIRY</span>
                  <span className="hidden sm:inline">
                    <DecryptedText text="HIRE / PROJECT INQUIRY" speed={30} />
                  </span>
                </div>
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white/60">
                  Reply within 24–48h
                </span>
              </div>

              {sentSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4 p-4 text-center sm:p-8"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-800 bg-cyan-950 text-cyan-400 shadow-lg">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white sm:text-2xl">
                    Message received
                  </h3>
                  <p className="mx-auto max-w-md font-mono text-xs text-white/70 sm:text-sm">
                    Thanks{formState.name ? `, ${formState.name}` : ""}. Your
                    hire inquiry is in my inbox — I typically reply within
                    24–48h. Prefer email? Write to{" "}
                    <span className="text-cyan-400">{primaryEmail}</span>.
                  </p>
                  <MagneticButton
                    onClick={() => {
                      setSentSuccess(false);
                      setFormState({ name: "", email: "", message: "" });
                    }}
                    strength={0.2}
                    className="mt-4 cursor-pointer rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-white/20"
                  >
                    Send another message
                  </MagneticButton>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSendMessage}
                  className="space-y-4 font-mono text-xs sm:space-y-5"
                >
                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-white/60">
                      Your name / company
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="e.g. Hiring Manager at Acme"
                      className="w-full rounded-xl border border-white/10 bg-[#030303] px-4 py-3 text-xs text-white shadow-inner placeholder:text-white/25 transition-colors focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-white/60">
                      Work email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-white/10 bg-[#030303] px-4 py-3 text-xs text-white shadow-inner placeholder:text-white/25 transition-colors focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-white/60">
                      Role, project, or what you need built
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Tell me about the role, timeline, stack, or product vision..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-[#030303] px-4 py-3 text-xs text-white shadow-inner placeholder:text-white/25 transition-colors focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    disabled={sending}
                    strength={0.2}
                    className="group relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-white via-gray-100 to-gray-200 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-2xl disabled:opacity-50 sm:tracking-[0.25em]"
                  >
                    <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-white">
                      {sending ? (
                        <span>Opening mail…</span>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>Send hire inquiry</span>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-cyan-600 to-indigo-600 transition-transform duration-300 group-hover:translate-y-0" />
                  </MagneticButton>
                </form>
              )}
            </SpotlightCard>
          </div>
        </div>
      </div>
      <SectionEdgeBlur />
    </section>
  );
};
