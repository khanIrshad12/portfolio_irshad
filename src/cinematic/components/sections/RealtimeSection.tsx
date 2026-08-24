"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Radio,
  ShieldAlert,
  ArrowUpRight,
  Activity,
  Cpu,
  Zap,
  Wifi,
} from "lucide-react";

import { RunwaySimulator } from "../ui/RunwaySimulator";
import { SpotlightCard } from "../reactbits/SpotlightCard";
import { MagneticButton } from "../reactbits/MagneticButton";
import { SectionEdgeBlur } from "../reactbits/SectionEdgeBlur";

interface RealtimeSectionProps {
  onTriggerPulse: () => void;
  onInspectSystem: () => void;
}

function PipelineCard() {
  return (
    <SpotlightCard
      className="rounded-xl border border-white/10 p-5 sm:rounded-2xl sm:p-7"
      spotlightColor="rgba(34, 211, 238, 0.15)"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400 sm:mb-4 sm:text-xs">
        <span className="flex items-center gap-2">
          <Radio className="h-3.5 w-3.5 shrink-0 text-cyan-400 sm:h-4 sm:w-4" />
          SUB-50MS PIPELINE
        </span>
        <span className="rounded border border-cyan-800 bg-cyan-950 px-2 py-0.5 text-[10px] text-cyan-300">
          PORT 502 / MODBUS
        </span>
      </div>

      <h3 className="mb-2 text-lg font-black uppercase leading-snug tracking-tight text-white sm:mb-3 sm:text-2xl">
        Bi-Directional Modbus TCP &amp; Socket.IO Broker
      </h3>

      <p className="mb-5 font-mono text-[11px] leading-relaxed text-white/70 sm:mb-6 sm:text-xs">
        Polls hundreds of PLC field registers simultaneously across runway
        circuits, converts raw industrial byte streams, and broadcasts
        synchronized 60Hz telemetry to air traffic control &amp; maintenance
        dashboards.
      </p>

      <div className="space-y-2.5 rounded-xl border border-white/10 bg-[#040404] p-3.5 font-mono text-[10px] text-white/80 shadow-inner sm:p-4 sm:text-xs">
        <div className="flex items-center justify-between gap-2 font-bold text-white">
          <span className="flex min-w-0 items-center gap-2">
            <Activity className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
            <span className="truncate">Operator Web Interface</span>
          </span>
          <span className="shrink-0 font-mono text-[9px] text-cyan-400 sm:text-[10px]">
            React / Canvas
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 border-y border-white/5 py-1 text-center text-[9px] uppercase tracking-wider text-white/40 sm:text-[10px]">
          <Wifi className="h-3 w-3 shrink-0 animate-pulse text-cyan-400" />
          <span>WebSocket Binary Stream (40ms)</span>
        </div>
        <div className="flex items-center justify-between gap-2 font-bold text-white">
          <span className="flex min-w-0 items-center gap-2">
            <Cpu className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
            <span className="truncate">Node.js Control Server</span>
          </span>
          <span className="shrink-0 font-mono text-[9px] text-indigo-400 sm:text-[10px]">
            State Machine
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 border-y border-white/5 py-1 text-center text-[9px] uppercase tracking-wider text-white/40 sm:text-[10px]">
          <Zap className="h-3 w-3 shrink-0 text-amber-400" />
          <span>Modbus TCP (Port 502)</span>
        </div>
        <div className="flex items-center justify-between gap-2 font-bold text-white">
          <span className="flex min-w-0 items-center gap-2">
            <Radio className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span className="truncate">Airfield CCRs &amp; PLCs</span>
          </span>
          <span className="shrink-0 font-mono text-[9px] text-emerald-400 sm:text-[10px]">
            RWY 09L/27R
          </span>
        </div>
      </div>
    </SpotlightCard>
  );
}

function SafetyCard() {
  return (
    <SpotlightCard
      className="flex items-start gap-3 rounded-xl border border-white/10 p-5 sm:gap-4 sm:rounded-2xl sm:p-6"
      spotlightColor="rgba(239, 68, 68, 0.12)"
    >
      <div className="shrink-0 rounded-xl border border-red-800/60 bg-red-950/60 p-2.5 text-red-400 sm:p-3">
        <ShieldAlert className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <h4 className="text-base font-black uppercase tracking-tight text-white">
          Hardware Safety Interlocks
        </h4>
        <p className="mt-1 font-mono text-[11px] leading-relaxed text-white/70 sm:text-xs">
          Prevents conflicting circuit activations, validates electrical
          insulation resistance, and ensures graceful fallback to local backup
          CCR control.
        </p>
      </div>
    </SpotlightCard>
  );
}

export const RealtimeSection: React.FC<RealtimeSectionProps> = ({
  onTriggerPulse,
  onInspectSystem,
}) => {
  return (
    <section
      id="realtime"
      className="relative z-10 min-h-screen overflow-x-clip px-4 py-20 sm:px-8 sm:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex flex-wrap items-center gap-3"
          >
            <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400 sm:text-xs sm:tracking-[0.25em]">
              <span className="h-1.5 w-1.5 shrink-0 animate-ping rounded-full bg-cyan-400" />
              [ 04 · INDUSTRIAL TELEMETRY &amp; HARDWARE ]
            </span>
            <div className="hidden h-px w-16 bg-white/20 sm:block" />
          </motion.div>

          <h2 className="max-w-4xl break-words text-[clamp(1.55rem,7.2vw,3.75rem)] font-black uppercase leading-[1.05] tracking-tighter text-white sm:text-6xl sm:leading-[0.95] md:text-7xl">
            Runway &amp; Taxiway{" "}
            <span className="text-white/50">
              Lighting Control Architecture.
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 max-w-2xl text-sm font-normal leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
          >
            Mission-critical SCADA &amp; telemetry engineering where sub-50ms
            latency, deterministic data streams, and automated failover
            safeguard commercial aviation operations.
          </motion.p>
        </div>

        {/* Pipeline + Safety stacked, simulator beside on lg */}
        <div className="mb-10 grid grid-cols-1 gap-5 lg:mb-12 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-5 lg:col-span-5 lg:space-y-6">
            <PipelineCard />
            <SafetyCard />
          </div>

          <div className="min-w-0 lg:col-span-7">
            <RunwaySimulator onPulseAction={onTriggerPulse} />
          </div>
        </div>

        <SpotlightCard
          className="flex flex-col items-stretch justify-between gap-5 rounded-xl border border-white/10 p-5 sm:flex-row sm:items-center sm:gap-6 sm:rounded-2xl sm:p-8"
          spotlightColor="rgba(56, 189, 248, 0.15)"
        >
          <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
            <div className="shrink-0 rounded-xl border border-cyan-800/60 bg-cyan-950/80 p-2.5 text-cyan-400 sm:p-3">
              <Activity className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-black uppercase leading-snug tracking-tight text-white sm:text-lg">
                Technical Airfield Schematics &amp; State Machines
              </div>
              <div className="mt-0.5 font-mono text-[11px] leading-relaxed text-white/60 sm:text-xs">
                View architecture diagrams, electrical CCR parameters, and live
                telemetry specifications.
              </div>
            </div>
          </div>

          <MagneticButton
            onClick={onInspectSystem}
            strength={0.25}
            className="group relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-xl sm:w-auto"
          >
            <span className="relative z-10 transition-colors group-hover:text-white">
              Inspect Airfield Specs
            </span>
            <ArrowUpRight className="relative z-10 h-4 w-4 transition-colors group-hover:text-white" />
            <div className="absolute inset-0 translate-y-full bg-cyan-600 transition-transform duration-300 group-hover:translate-y-0" />
          </MagneticButton>
        </SpotlightCard>
      </div>

      <SectionEdgeBlur />
    </section>
  );
};
