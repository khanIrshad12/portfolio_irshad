"use client";

import React from 'react';
import { motion } from 'motion/react';
import { RunwaySimulator } from '../ui/RunwaySimulator';
import { Radio, ShieldAlert, ArrowUpRight, Activity, Terminal, Cpu, Zap, Wifi } from 'lucide-react';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { DecryptedText } from '../reactbits/DecryptedText';
import { ShinyText } from '../reactbits/ShinyText';
import { MagneticButton } from '../reactbits/MagneticButton';
import { SectionEdgeBlur } from '../reactbits/SectionEdgeBlur';

interface RealtimeSectionProps {
  onTriggerPulse: () => void;
  onInspectSystem: () => void;
}

export const RealtimeSection: React.FC<RealtimeSectionProps> = ({
  onTriggerPulse,
  onInspectSystem
}) => {
  return (
    <section id="realtime" className="min-h-screen py-28 px-4 sm:px-8 lg:px-16 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="font-mono text-cyan-400 text-xs font-semibold tracking-[0.25em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              [ 04 · INDUSTRIAL TELEMETRY &amp; HARDWARE INTERFACES ]
            </span>
            <div className="h-[1px] w-16 bg-white/20"></div>
          </motion.div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[0.95] max-w-4xl uppercase">
            Runway &amp; Taxiway <br />
            <span className="text-white/50">Lighting Control Architecture.</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-base sm:text-lg max-w-2xl mt-6 font-normal leading-relaxed"
          >
            Mission-critical SCADA &amp; telemetry engineering where sub-50ms latency, deterministic data streams, and automated failover safeguard commercial aviation operations.
          </motion.p>
        </div>

        {/* Narrative & Architecture Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Architecture Flow & Protocol Specs */}
          <div className="lg:col-span-5 space-y-6">
            <SpotlightCard className="p-7 rounded-2xl border border-white/10" spotlightColor="rgba(34, 211, 238, 0.15)">
              <div className="flex items-center justify-between gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest mb-4">
                <span className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400" />
                  <DecryptedText text="SUB-50MS PIPELINE" speed={30} />
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                  PORT 502 / MODBUS
                </span>
              </div>

              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">
                Bi-Directional Modbus TCP &amp; Socket.IO Broker
              </h3>

              <p className="text-xs text-white/70 leading-relaxed font-mono mb-6">
                Polls hundreds of PLC field registers simultaneously across runway circuits, converts raw industrial byte streams, and broadcasts synchronized 60Hz telemetry to air traffic control &amp; maintenance dashboards.
              </p>

              {/* Data Flow Diagram Representation */}
              <div className="bg-[#040404] p-4 rounded-xl border border-white/10 font-mono text-xs space-y-2.5 text-white/80 shadow-inner">
                <div className="flex items-center justify-between text-white font-bold">
                  <span className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Operator Web Interface</span>
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">React / Canvas</span>
                </div>
                <div className="text-center text-white/40 text-[10px] uppercase tracking-wider py-1 border-y border-white/5 flex items-center justify-center gap-2">
                  <Wifi className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>WebSocket Binary Stream (40ms Batching)</span>
                </div>
                <div className="flex items-center justify-between text-white font-bold">
                  <span className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Node.js Control Server</span>
                  </span>
                  <span className="text-[10px] text-indigo-400 font-mono">State Machine</span>
                </div>
                <div className="text-center text-white/40 text-[10px] uppercase tracking-wider py-1 border-y border-white/5 flex items-center justify-center gap-2">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Modbus TCP Protocol (Port 502)</span>
                </div>
                <div className="flex items-center justify-between text-white font-bold">
                  <span className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Airfield CCRs &amp; PLCs</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Runway 09L/27R</span>
                </div>
              </div>
            </SpotlightCard>

            {/* Safety Interlocks Callout */}
            <SpotlightCard className="p-6 rounded-2xl border border-white/10 flex items-start gap-4" spotlightColor="rgba(239, 68, 68, 0.12)">
              <div className="p-3 bg-red-950/60 border border-red-800/60 text-red-400 rounded-xl shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-black text-white uppercase tracking-tight">
                  Hardware Safety Interlocks
                </h4>
                <p className="text-xs text-white/70 mt-1 leading-relaxed font-mono">
                  Prevents conflicting circuit activations, validates electrical insulation resistance, and ensures graceful fallback to local backup CCR control.
                </p>
              </div>
            </SpotlightCard>
          </div>

          {/* Right: Live Interactive Airfield Simulator */}
          <div className="lg:col-span-7">
            <RunwaySimulator onPulseAction={onTriggerPulse} />
          </div>
        </div>

        {/* Bottom CTA to Inspect Project */}
        <SpotlightCard className="p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-6" spotlightColor="rgba(56, 189, 248, 0.15)">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                Technical Airfield Schematics &amp; State Machines
              </div>
              <div className="text-xs font-mono text-white/60 mt-0.5">
                View architecture diagrams, electrical CCR parameters, and live telemetry specifications.
              </div>
            </div>
          </div>

          <MagneticButton
            onClick={onInspectSystem}
            strength={0.25}
            className="group relative px-6 py-3.5 bg-white text-black font-bold uppercase text-xs tracking-[0.2em] rounded-xl overflow-hidden shadow-xl flex items-center gap-2"
          >
            <span className="relative z-10 group-hover:text-white transition-colors">Inspect Airfield Specs</span>
            <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:text-white transition-colors" />
            <div className="absolute inset-0 bg-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </MagneticButton>
        </SpotlightCard>
      </div>
      <SectionEdgeBlur />
    </section>
  );
};
