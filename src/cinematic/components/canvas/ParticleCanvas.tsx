"use client";

import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { ParticleEngine } from '../../three/ParticleEngine';
import { ParticleStateId } from '../../types';

export interface ParticleCanvasHandle {
  setScrollProgress: (progress: number) => void;
  triggerShockwave: (x?: number, y?: number, z?: number) => void;
  triggerNetworkPulse: () => void;
  forceState: (stateId: ParticleStateId) => void;
}

interface ParticleCanvasProps {
  onFpsUpdate?: (fps: number) => void;
  onStateChange?: (stateId: ParticleStateId) => void;
  onQualityDetermined?: (count: number, tier: string) => void;
}

export const ParticleCanvas = forwardRef<ParticleCanvasHandle, ParticleCanvasProps>(
  ({ onFpsUpdate, onStateChange, onQualityDetermined }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const engineRef = useRef<ParticleEngine | null>(null);
    const [webglSupported, setWebglSupported] = useState<boolean>(true);

    useEffect(() => {
      // Check WebGL availability
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
        if (!gl) {
          setWebglSupported(false);
          return;
        }
      } catch (e) {
        setWebglSupported(false);
        return;
      }

      if (canvasRef.current) {
        const engine = new ParticleEngine({
          canvas: canvasRef.current,
          onFpsUpdate,
          onStateChange,
          onQualityDetermined
        });
        engineRef.current = engine;
      }

      return () => {
        if (engineRef.current) {
          engineRef.current.destroy();
          engineRef.current = null;
        }
      };
    }, []);

    useImperativeHandle(ref, () => ({
      setScrollProgress: (progress: number) => {
        if (engineRef.current) {
          engineRef.current.setScrollProgress(progress);
        }
      },
      triggerShockwave: (x = 0, y = 0, z = 0) => {
        if (engineRef.current) {
          engineRef.current.triggerShockwave(x, y, z);
        }
      },
      triggerNetworkPulse: () => {
        if (engineRef.current) {
          engineRef.current.triggerNetworkPulse();
        }
      },
      forceState: (stateId: ParticleStateId) => {
        if (engineRef.current) {
          engineRef.current.forceState(stateId);
        }
      }
    }));

    if (!webglSupported) {
      return (
        <div className="fixed inset-0 pointer-events-none -z-10 flex items-center justify-center bg-[#050608]">
          <div className="text-xs text-slate-500 font-mono">
            [Fallback Canvas Mode Active]
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full block touch-none pointer-events-auto"
          style={{ width: '100vw', height: '100vh' }}
        />
        {/* Subtle radial vignette overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(5, 6, 8, 0.45) 80%, rgba(5, 6, 8, 0.85) 100%)'
          }}
        />
      </div>
    );
  }
);

ParticleCanvas.displayName = 'ParticleCanvas';
