"use client";

import React, { useState } from 'react';
import { PARTICLE_STATES } from '../../data/portfolioData';
import { ParticleStateId } from '../../types';
import { Layers, ChevronUp, ChevronDown, Zap, Sparkles } from 'lucide-react';
import { ShinyText } from '../reactbits/ShinyText';
import { MagneticButton } from '../reactbits/MagneticButton';

interface ParticleControllerUIProps {
  fps: number;
  activeState: ParticleStateId;
  particleCount: number;
  qualityTier: string;
  onStateSelect: (stateId: ParticleStateId) => void;
  onShockwave: () => void;
}

export const ParticleControllerUI: React.FC<ParticleControllerUIProps> = ({
  fps,
  activeState,
  particleCount,
  qualityTier,
  onStateSelect,
  onShockwave
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const currentState = PARTICLE_STATES[activeState] || PARTICLE_STATES[0];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-auto select-none">
      {/* Expanded Control Palette */}
      {isExpanded && (
        <div className="w-80 bg-[#070707]/95 backdrop-blur-2xl p-5 rounded-2xl text-xs text-white border border-white/15 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-2 mb-2 font-mono">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" /> 3D WebGL Engine
            </span>
            <span className="text-[9px] px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/70 uppercase tracking-widest">
              {qualityTier}
            </span>
          </div>

          <div className="space-y-1.5 mb-4">
            <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1.5">
              Select Morph Dimension
            </div>
            {PARTICLE_STATES.map((st) => {
              const isCurrent = st.id === activeState;
              return (
                <button
                  key={st.id}
                  onClick={() => onStateSelect(st.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-cyan-950/60 text-white font-bold border-cyan-500 shadow-sm'
                      : 'bg-black/40 border-transparent hover:border-white/20 text-white/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: isCurrent ? '#38bdf8' : st.themeColor }}
                    />
                    <span className="text-[11px] tracking-wider uppercase">0{st.id} · {st.name}</span>
                  </div>
                  {isCurrent && (
                    <span className="text-[9px] text-cyan-400 uppercase tracking-widest font-bold">
                      ACTIVE
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={onShockwave}
            className="w-full py-2.5 px-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            <Zap className="w-3.5 h-3.5" /> Trigger GPU Shockwave
          </button>
        </div>
      )}

      {/* Main HUD Bar */}
      <div className="flex items-center gap-3 bg-[#070707]/90 backdrop-blur-xl py-2 px-4 rounded-full border border-white/15 shadow-2xl shadow-black/80 text-xs font-mono">
        {/* Active Morph State Label */}
        <div className="flex items-center gap-2.5 pr-3 border-r border-white/10">
          <span
            className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
          />
          <span className="text-white text-[11px] tracking-wider uppercase hidden sm:inline font-bold">
            0{currentState.id} · {currentState.name}
          </span>
        </div>

        {/* Live FPS */}
        <div className="flex items-center gap-1.5 text-white/50 text-[11px]">
          <span className="font-bold text-cyan-300 font-mono">{fps || 60}</span>
          <span className="text-[9px] uppercase tracking-wider">FPS</span>
        </div>

        {/* Expand / Collapse toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer ml-0.5"
          aria-label="Toggle telemetry controls"
        >
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
