"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Zap, Radio, RefreshCw, Terminal, Check, Sparkles } from 'lucide-react';
import { ShinyText } from '../reactbits/ShinyText';
import { MagneticButton } from '../reactbits/MagneticButton';

interface RunwaySimulatorProps {
  onPulseAction?: () => void;
}

export const RunwaySimulator: React.FC<RunwaySimulatorProps> = ({ onPulseAction }) => {
  const [intensityStep, setIntensityStep] = useState<number>(5); // 1 to 5
  const [cat3Active, setCat3Active] = useState<boolean>(true);
  const [taxiwayActive, setTaxiwayActive] = useState<boolean>(true);
  const [edgeActive, setEdgeActive] = useState<boolean>(true);
  const [papiActive, setPapiActive] = useState<boolean>(true);

  const [currentAmps, setCurrentAmps] = useState<number>(6.60);
  const [latency, setLatency] = useState<number>(34);
  const [packetsCount, setPacketsCount] = useState<number>(1420);
  const [logs, setLogs] = useState<string[]>([
    'MODBUS_TCP: Client established on 192.168.10.45:502',
    'WS_BROKER: Telemetry stream 60Hz active [clients: 4]',
    'CCR_01: Constant Current Regulator nominal @ 6.60A (Step 5)',
    'SAFETY_INTERLOCK: RWY 09L/27R circuits validated. No faults.'
  ]);

  // Simulate real-time fluctuating electrical & telemetry metrics
  useEffect(() => {
    const interval = setInterval(() => {
      const stepAmpMap: Record<number, number> = { 1: 2.8, 2: 3.4, 3: 4.1, 4: 5.2, 5: 6.6 };
      const baseAmp = stepAmpMap[intensityStep] || 6.6;
      const jitter = (Math.random() - 0.5) * 0.04;
      setCurrentAmps(Number((baseAmp + jitter).toFixed(2)));
      setLatency(Math.floor(28 + Math.random() * 16));
      setPacketsCount(prev => prev + 6);
    }, 800);

    return () => clearInterval(interval);
  }, [intensityStep]);

  const addLog = useCallback((msg: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 5)]);
  }, []);

  const handleStepChange = (step: number) => {
    setIntensityStep(step);
    addLog(`CMD_DISPATCH: Set intensity Step ${step} via Modbus register 40012 -> SUCCESS (ACK: 32ms)`);
    if (onPulseAction) onPulseAction();
  };

  const handleToggleCat3 = () => {
    const next = !cat3Active;
    setCat3Active(next);
    addLog(`INTERLOCK_MUTATION: CAT III ALS crossbars ${next ? 'ACTIVATED' : 'STANDBY'}`);
    if (onPulseAction) onPulseAction();
  };

  const handleEmergencyPulse = () => {
    addLog(`HIGH_PRIORITY_PING: Broadcast telemetry synchronizer flush on all 4 subnets`);
    if (onPulseAction) onPulseAction();
  };

  return (
    <div className="w-full bg-[#070707] p-6 sm:p-7 text-white border border-white/10 rounded-2xl shadow-2xl relative shadow-cyan-950/20">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
                AIRFIELD LIGHTING &amp; TELEMETRY CONTROLLER
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-white/5 text-white border border-white/15 font-mono uppercase tracking-wider rounded">
                RWY 09L / 27R
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5 font-mono">
              Live Airfield Surface &amp; CCR Constant Current Regulator Matrix
            </p>
          </div>
        </div>

        {/* Live Metrics Pill */}
        <div className="flex items-center gap-4 text-xs font-mono bg-[#030303] px-3 py-1.5 rounded-lg border border-white/5">
          <div className="flex items-center gap-1.5 text-white/70">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Lat: <strong className="text-white font-bold">{latency}ms</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>CCR: <strong className="text-white font-bold">{currentAmps}A</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="uppercase font-bold">Modbus OK</span>
          </div>
        </div>
      </div>

      {/* Visual Airfield Runway Graphic & Circuit Visualizer */}
      <div className="relative w-full bg-[#030303] border border-white/10 rounded-xl p-5 mb-6 overflow-hidden">
        {/* Airfield Runway Graphic */}
        <div className="relative h-24 md:h-28 w-full flex items-center justify-center">
          {/* Main Runway Tarmac Stripe */}
          <div className="w-full h-12 bg-[#0c0c0c] border-y border-white/10 rounded-md relative flex items-center justify-between px-3">
            {/* Approach Crossbars (Left) */}
            <div className="flex items-center gap-1">
              <div className={`w-1 h-8 rounded-sm transition-all duration-300 ${cat3Active ? 'bg-amber-100 shadow-[0_0_8px_#ffffff]' : 'bg-black'}`} style={{ opacity: cat3Active ? intensityStep * 0.2 : 0.2 }} />
              <div className={`w-1 h-10 rounded-sm transition-all duration-300 ${cat3Active ? 'bg-white shadow-[0_0_10px_#38bdf8]' : 'bg-black'}`} style={{ opacity: cat3Active ? intensityStep * 0.2 : 0.2 }} />
              <div className={`w-1 h-8 rounded-sm transition-all duration-300 ${cat3Active ? 'bg-amber-100 shadow-[0_0_8px_#ffffff]' : 'bg-black'}`} style={{ opacity: cat3Active ? intensityStep * 0.2 : 0.2 }} />
            </div>

            {/* Threshold Bar & Runway Designation */}
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-white/50 tracking-tighter">
              <span className="text-cyan-400">09L</span>
              <div className="flex flex-col gap-0.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-4 h-0.5 bg-white/70 rounded-full" />
                ))}
              </div>
            </div>

            {/* Centerline Lights Array */}
            <div className="flex-1 flex justify-around px-4">
              {[...Array(12)].map((_, i) => {
                const isRedEnd = i > 8;
                const lightColor = isRedEnd ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-white shadow-[0_0_8px_#ffffff]';
                return (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${lightColor}`}
                    style={{
                      opacity: intensityStep * 0.19,
                      transform: `scale(${0.7 + intensityStep * 0.1})`
                    }}
                  />
                );
              })}
            </div>

            {/* Runway Designation (Right) & PAPI indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {/* 4 PAPI Lights */}
                {papiActive && (
                  <div className="flex gap-0.5 p-1 bg-[#050505] border border-white/10 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
                  </div>
                )}
              </div>
              <span className="font-mono text-[11px] font-bold text-white/50">27R</span>
            </div>
          </div>

          {/* Runway Edge Lights */}
          {edgeActive && (
            <>
              <div className="absolute top-4 left-6 right-6 flex justify-between">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full bg-cyan-300 shadow-[0_0_6px_#38bdf8] transition-all"
                    style={{ opacity: intensityStep * 0.2 }}
                  />
                ))}
              </div>
              <div className="absolute bottom-4 left-6 right-6 flex justify-between">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full bg-cyan-300 shadow-[0_0_6px_#38bdf8] transition-all"
                    style={{ opacity: intensityStep * 0.2 }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Curved Taxiway Exit Victor-2 */}
          {taxiwayActive && (
            <div className="absolute bottom-0 right-1/4 flex gap-1.5 items-end">
              <span className="text-[9px] font-mono text-emerald-400 font-bold mr-1">TWY V2</span>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] transition-all"
                  style={{
                    opacity: 0.9,
                    transform: `translateY(${i * 2}px)`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Live Status Overlay Footnote */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-white/50 mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase tracking-wider">FAA / ICAO Annex 14 Photometric Compliant</span>
          </div>
          <div>
            <span className="uppercase tracking-wider">Packets: <strong className="text-white">{packetsCount.toLocaleString()}</strong></span>
          </div>
        </div>
      </div>

      {/* Interactive Control Console Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Intensity Steps Selector */}
        <div className="md:col-span-6 bg-[#030303] p-4 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white/60">CCR Intensity Step</span>
            <span className="text-xs font-mono font-bold text-cyan-400">Step {intensityStep} ({intensityStep === 5 ? '100%' : intensityStep === 4 ? '30%' : intensityStep === 3 ? '10%' : intensityStep === 2 ? '3%' : '1%'})</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((step) => {
              const isActive = intensityStep === step;
              return (
                <button
                  key={step}
                  onClick={() => handleStepChange(step)}
                  className={`py-2 px-1 text-xs font-mono font-bold uppercase transition-all cursor-pointer rounded-lg border ${
                    isActive
                      ? 'bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/30'
                      : 'bg-black text-white/60 hover:text-white border-white/10 hover:border-white/30'
                  }`}
                >
                  B{step}
                </button>
              );
            })}
          </div>
        </div>

        {/* Circuit Interlock Toggles */}
        <div className="md:col-span-6 bg-[#030303] p-4 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white/60">Circuit Relays</span>
            <button
              onClick={handleEmergencyPulse}
              className="text-[10px] font-mono text-cyan-400 hover:text-white uppercase tracking-widest flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Sync All
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleToggleCat3}
              className={`py-2 px-2 text-[10px] font-mono uppercase tracking-wider font-bold rounded-lg border transition-all cursor-pointer ${
                cat3Active
                  ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                  : 'bg-black border-white/10 text-white/40'
              }`}
            >
              CAT III: {cat3Active ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => { setEdgeActive(!edgeActive); addLog(`CIRCUIT_MUTATION: HIRL Edge Rails ${!edgeActive ? 'ON' : 'OFF'}`); }}
              className={`py-2 px-2 text-[10px] font-mono uppercase tracking-wider font-bold rounded-lg border transition-all cursor-pointer ${
                edgeActive
                  ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                  : 'bg-black border-white/10 text-white/40'
              }`}
            >
              Edge: {edgeActive ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => { setTaxiwayActive(!taxiwayActive); addLog(`CIRCUIT_MUTATION: Taxiway V2 Green line ${!taxiwayActive ? 'ON' : 'OFF'}`); }}
              className={`py-2 px-2 text-[10px] font-mono uppercase tracking-wider font-bold rounded-lg border transition-all cursor-pointer ${
                taxiwayActive
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : 'bg-black border-white/10 text-white/40'
              }`}
            >
              TWY V2: {taxiwayActive ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Live Telemetry Stream */}
      <div className="mt-4 bg-[#030303] p-3.5 rounded-xl border border-white/10 font-mono text-[11px]">
        <div className="flex items-center justify-between text-white/40 pb-1.5 mb-2.5 border-b border-white/10">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest text-[10px] font-bold">MODBUS TCP &amp; WEBSOCKET PACKET LOG</span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-white/40">60 FPS BUFFER</span>
        </div>
        <div className="space-y-1 overflow-hidden">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={`truncate ${
                idx === 0
                  ? 'text-cyan-400 font-semibold'
                  : idx === 1
                  ? 'text-white'
                  : 'text-white/40'
              }`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
