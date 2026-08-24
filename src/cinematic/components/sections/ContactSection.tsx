"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Copy,
  Check,
  Send,
  GitBranch as Github,
  Phone,
  Globe,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import { SYSTEM_STATUS, PERSONAL_INFO } from "../../data/portfolioData";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { MagneticButton } from "../reactbits/MagneticButton";
import { DecryptedText } from "../reactbits/DecryptedText";
import { ShinyText } from "../reactbits/ShinyText";
import { SectionEdgeBlur } from "../reactbits/SectionEdgeBlur";

interface ContactSectionProps {
  onShockwave: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onShockwave,
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

  const primaryEmail = PERSONAL_INFO.email;
  const phoneNumber = PERSONAL_INFO.phone;

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    setSending(true);
    // Open native mail client with portfolio hire inquiry
    const subject = encodeURIComponent(
      `Hire Inquiry — ${formState.name || "Portfolio Contact"}`,
    );
    const body = encodeURIComponent(
      `Hi Irshad,\n\n${formState.message}\n\n— ${formState.name}\n${formState.email}`,
    );
    window.location.href = `mailto:${primaryEmail}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSending(false);
      setSentSuccess(true);
      onShockwave();
    }, 600);
  };

  return (
    <section
      id="contact"
      className="relative z-10 flex min-h-screen flex-col justify-center overflow-hidden px-4 py-28 sm:px-8 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center gap-3"
          >
            <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400" />
              [ 06 · CONTACT &amp; HIRE ]
            </span>
            <div className="h-px w-16 bg-white/20" />
          </motion.div>

          <h2 className="max-w-5xl text-5xl font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl">
            Let&apos;s work{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              <DecryptedText text="TOGETHER." speed={40} />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-8 max-w-2xl text-base font-normal leading-relaxed text-white/70 sm:text-lg"
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
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={`mailto:${primaryEmail}?subject=${encodeURIComponent("Hire Irshad Khan — Opportunity")}`}
              className="group relative inline-flex min-h-12 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-white via-gray-100 to-gray-200 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-white">
                <Briefcase className="h-4 w-4" />
                Hire Me
              </span>
              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-cyan-600 to-blue-600 transition-transform duration-300 ease-out group-hover:translate-y-0" />
            </a>
            <a
              href={`mailto:${primaryEmail}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/[0.03] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-cyan-400/60 hover:bg-white/[0.08]"
            >
              <span>Email Irshad</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-cyan-400" />
            </a>
          </motion.div>
        </div>

        <div className="mb-16 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <SpotlightCard
              className="rounded-2xl border border-white/10 p-8 shadow-2xl"
              spotlightColor="rgba(56, 189, 248, 0.18)"
            >
              <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
                Primary email
              </div>
              <div className="mb-6 break-all font-mono text-base font-black text-white sm:text-lg">
                <ShinyText text={primaryEmail} speed={3} />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton
                  onClick={handleCopyEmail}
                  strength={0.2}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10"
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
                  className="group relative flex items-center gap-1.5 overflow-hidden rounded-xl bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-xl"
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
              className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 p-6 sm:flex-row sm:items-center"
              spotlightColor="rgba(56, 189, 248, 0.15)"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Phone &amp; WhatsApp
                </div>
                <div className="mt-1 font-mono text-sm font-bold text-white">
                  {phoneNumber}
                </div>
                <div className="mt-0.5 font-mono text-xs text-white/50">
                  {PERSONAL_INFO.location}
                </div>
              </div>

              <MagneticButton
                onClick={handleCopyPhone}
                strength={0.2}
                className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-xs text-white/80 hover:bg-white/10 hover:text-white"
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
              className="flex items-start gap-4 rounded-2xl border border-white/10 p-6"
              spotlightColor="rgba(52, 211, 153, 0.15)"
            >
              <div className="shrink-0 rounded-xl border border-emerald-800/60 bg-emerald-950/60 p-3 text-emerald-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                  <span>Open to hire</span>
                </div>
                <div className="mt-0.5 text-base font-black uppercase tracking-tight text-white">
                  {SYSTEM_STATUS.statusText}
                </div>
                <p className="mt-1 font-mono text-xs text-white/60">
                  {SYSTEM_STATUS.location} · {SYSTEM_STATUS.activeClientSlots}
                </p>
              </div>
            </SpotlightCard>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-[#080808]/90 p-4 text-[11px] uppercase tracking-wider text-white/70 transition-all hover:border-cyan-400/50 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="h-4 w-4 text-white transition-colors group-hover:text-cyan-400" />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-white/40 transition-colors group-hover:text-cyan-400" />
              </a>

              <a
                href={PERSONAL_INFO.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-[#080808]/90 p-4 text-[11px] uppercase tracking-wider text-white/70 transition-all hover:border-cyan-500/50 hover:text-cyan-400"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="h-4 w-4 text-cyan-400" />
                  <span>Portfolio</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-white/40 transition-colors group-hover:text-cyan-400" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SpotlightCard
              className="relative rounded-2xl border border-white/10 p-8 shadow-2xl sm:p-10"
              spotlightColor="rgba(56, 189, 248, 0.18)"
            >
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                  <Briefcase className="h-4 w-4 text-cyan-400" />
                  <DecryptedText text="HIRE / PROJECT INQUIRY" speed={30} />
                </div>
                <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white/60">
                  Reply within 24–48h
                </span>
              </div>

              {sentSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4 p-8 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-800 bg-cyan-950 text-cyan-400 shadow-lg">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                    Message ready
                  </h3>
                  <p className="mx-auto max-w-md font-mono text-xs text-white/70 sm:text-sm">
                    Thanks{formState.name ? `, ${formState.name}` : ""}. Your
                    hire inquiry should open in your mail app — if it
                    didn&apos;t, write directly to{" "}
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
                  className="space-y-5 font-mono text-xs"
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
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-white via-gray-100 to-gray-200 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black shadow-2xl disabled:opacity-50"
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
