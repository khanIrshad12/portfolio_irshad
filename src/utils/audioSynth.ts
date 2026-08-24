/**
 * Lightweight Web Audio API synthesizer for futuristic interactive feedback
 */

export interface AudioState {
  isMuted: boolean;
  isSuspended: boolean;
}

type AudioStateListener = (state: AudioState) => void;

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted = false;
  private listeners: Set<AudioStateListener> = new Set();
  private unlockAttached = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.attachAutoUnlock();
    }
  }

  private notify(): void {
    const state: AudioState = {
      isMuted: this.isMuted,
      isSuspended: this.isSuspended(),
    };
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch {
        // Ignore listener error
      }
    });
  }

  /** Subscribe to audio state changes (suspended, muted) */
  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener({
      isMuted: this.isMuted,
      isSuspended: this.isSuspended(),
    });
    return () => {
      this.listeners.delete(listener);
    };
  }

  public isSuspended(): boolean {
    if (typeof window === "undefined") return true;
    if (!this.ctx) return true;
    return this.ctx.state === "suspended";
  }

  private attachAutoUnlock(): void {
    if (typeof window === "undefined" || this.unlockAttached) return;
    this.unlockAttached = true;

    const handleUnlock = () => {
      this.unlock();
      if (this.ctx && this.ctx.state === "running") {
        window.removeEventListener("pointerdown", handleUnlock);
        window.removeEventListener("touchstart", handleUnlock);
        window.removeEventListener("keydown", handleUnlock);
        window.removeEventListener("click", handleUnlock);
      }
    };

    window.addEventListener("pointerdown", handleUnlock, { passive: true });
    window.addEventListener("touchstart", handleUnlock, { passive: true });
    window.addEventListener("keydown", handleUnlock, { passive: true });
    window.addEventListener("click", handleUnlock, { passive: true });
  }

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (typeof window === "undefined") return null;

    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.ctx.onstatechange = () => {
            this.notify();
          };
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        void this.ctx
          .resume()
          .then(() => this.notify())
          .catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  /** Unlock / resume audio after a user gesture */
  public unlock(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (ctx && ctx.state === "suspended") {
      ctx
        .resume()
        .then(() => this.notify())
        .catch(() => {});
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted && this.ctx && this.ctx.state === "running") {
      this.ctx.suspend().catch(() => {});
    } else if (!muted && this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    this.notify();
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /** Soft high-tech blip for telemetry updates or hover */
  public playBlip(freq = 880, duration = 0.04): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        freq * 1.5,
        ctx.currentTime + duration,
      );

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + duration,
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio failure
    }
  }

  /** Crisp micro-tick for incremental loading percentage changes */
  public playPercentTick(percent: number): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pitch rises dynamically with percentage (1000Hz up to 2800Hz)
      const baseFreq = 1000 + percent * 18;
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        baseFreq * 1.25,
        ctx.currentTime + 0.025,
      );

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 0.025,
      );

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.028);
    } catch {
      // Ignore audio failure
    }
  }

  /** Stepped narrative progress tone */
  public playStepProgress(step: number): void {
    if (this.isMuted) return;
    const frequencies = [440, 554.37, 659.25, 880, 1108.73];
    const freq = frequencies[step % frequencies.length] ?? 600;
    this.playBlip(freq, 0.08);
  }

  /** Cinematic whoosh / warp for completion */
  public playWarpEnter(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.85);
    } catch {
      // Ignore audio failure
    }
  }
}

export const soundFx = new AudioSynthesizer();
