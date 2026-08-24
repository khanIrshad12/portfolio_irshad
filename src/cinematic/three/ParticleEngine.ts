import * as THREE from 'three';
import { generateAllParticleStates } from './ParticleMath';
import { particleVertexShader, particleFragmentShader } from './shaders';
import { PARTICLE_STATES } from '../data/portfolioData';
import { ParticleStateId } from '../types';

export interface ParticleEngineOptions {
  canvas: HTMLCanvasElement;
  onFpsUpdate?: (fps: number) => void;
  onStateChange?: (stateId: ParticleStateId) => void;
  onQualityDetermined?: (particleCount: number, tier: string) => void;
}

export class ParticleEngine {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private geometry: THREE.BufferGeometry | null = null;
  private material: THREE.ShaderMaterial | null = null;
  private points: THREE.Points | null = null;

  private animationFrameId: number | null = null;
  private clock = new THREE.Clock();

  // Particle Counts & Quality Tier
  public particleCount = 20000;
  public qualityTier = 'desktop-high';

  // State & Uniform Tracking
  private currentActiveState: ParticleStateId = 0;
  private currentNextState: ParticleStateId = 0;
  private currentMorphProgress = 0;
  private targetScrollProgress = 0;
  private currentScrollProgress = 0;

  // Mouse & Parallax tracking
  private targetMouse = new THREE.Vector2(0, 0);
  private currentMouse = new THREE.Vector2(0, 0);
  private clickPulse = 0;
  private clickOrigin = new THREE.Vector3(0, 0, 0);

  // Real-time pulse intensity
  private networkPulse = 0;
  private isDestroyed = false;

  // FPS metric
  private frameCount = 0;
  private lastFpsTime = 0;
  private onFpsUpdate?: (fps: number) => void;
  private onStateChange?: (stateId: ParticleStateId) => void;
  private onQualityDetermined?: (particleCount: number, tier: string) => void;

  // Color map cache
  private stateColors: THREE.Color[] = [];

  constructor(options: ParticleEngineOptions) {
    this.canvas = options.canvas;
    this.onFpsUpdate = options.onFpsUpdate;
    this.onStateChange = options.onStateChange;
    this.onQualityDetermined = options.onQualityDetermined;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / Math.max(1, window.innerHeight),
      0.1,
      100
    );
    this.camera.position.set(0, 0.2, 6.5);

    this.stateColors = PARTICLE_STATES.map(st => new THREE.Color(st.themeColor));

    this.initQuality();
    this.initRenderer();
    this.initParticles();
    this.bindEvents();
    this.startLoop();
  }

  private initQuality() {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    const isLowPower = (navigator.hardwareConcurrency || 4) <= 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      this.particleCount = 4000;
      this.qualityTier = 'reduced-motion';
    } else if (isMobile) {
      this.particleCount = 7000;
      this.qualityTier = 'mobile';
    } else if (isLowPower) {
      this.particleCount = 12000;
      this.qualityTier = 'desktop-balanced';
    } else {
      this.particleCount = 22000;
      this.qualityTier = 'desktop-high';
    }

    if (this.onQualityDetermined) {
      this.onQualityDetermined(this.particleCount, this.qualityTier);
    }
  }

  private initRenderer() {
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: window.devicePixelRatio < 2, // Only antialias on low DPI to save GPU fill rate
        powerPreference: 'high-performance'
      });

      const width = this.canvas.clientWidth || window.innerWidth;
      const height = this.canvas.clientHeight || window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      this.renderer.setSize(width, height, false);
      this.renderer.setPixelRatio(pixelRatio);
      this.renderer.setClearColor(0x000000, 0.0);
    } catch (e) {
      console.warn('WebGL Initialization failed:', e);
    }
  }

  private initParticles() {
    if (!this.renderer) return;

    const count = this.particleCount;
    const buffers = generateAllParticleStates(count);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(buffers.pos0, 3));
    this.geometry.setAttribute('aPos0', new THREE.BufferAttribute(buffers.pos0, 3));
    this.geometry.setAttribute('aPos1', new THREE.BufferAttribute(buffers.pos1, 3));
    this.geometry.setAttribute('aPos2', new THREE.BufferAttribute(buffers.pos2, 3));
    this.geometry.setAttribute('aPos3', new THREE.BufferAttribute(buffers.pos3, 3));
    this.geometry.setAttribute('aPos4', new THREE.BufferAttribute(buffers.pos4, 3));
    this.geometry.setAttribute('aPos5', new THREE.BufferAttribute(buffers.pos5, 3));
    this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(buffers.randoms, 3));
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(buffers.sizes, 1));

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    this.material = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uActiveState: { value: 0 },
        uNextState: { value: 0 },
        uMorphProgress: { value: 0 },
        uScrollProgress: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPulse: { value: 0 },
        uClickPulse: { value: 0 },
        uClickOrigin: { value: new THREE.Vector3(0, 0, 0) },
        uPixelRatio: { value: pixelRatio },
        uBaseSize: { value: PARTICLE_STATES[0].particleSize },
        uColorActive: { value: this.stateColors[0].clone() },
        uColorNext: { value: this.stateColors[0].clone() }
      }
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.scene.add(this.points);
  }

  private onPointerMove = (e: MouseEvent | TouchEvent) => {
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;

    this.targetMouse.x = (clientX / w) * 2 - 1;
    this.targetMouse.y = -(clientY / h) * 2 + 1;
  };

  private onClick = (e: MouseEvent | TouchEvent) => {
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    const normX = (clientX / window.innerWidth) * 2 - 1;
    const normY = -(clientY / window.innerHeight) * 2 + 1;

    // Project click into world space approximately
    this.clickOrigin.set(normX * 3.5, normY * 2.5, 0.0);
    this.clickPulse = 1.0;
  };

  public triggerShockwave(x = 0, y = 0, z = 0) {
    this.clickOrigin.set(x, y, z);
    this.clickPulse = 1.0;
  }

  public triggerNetworkPulse() {
    this.networkPulse = 1.0;
  }

  private onResize = () => {
    if (!this.renderer || this.isDestroyed) return;

    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    this.camera.aspect = width / Math.max(1, height);
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(pixelRatio);

    if (this.material) {
      this.material.uniforms.uPixelRatio.value = pixelRatio;
    }
  };

  private bindEvents() {
    window.addEventListener('mousemove', this.onPointerMove, { passive: true });
    window.addEventListener('touchstart', this.onPointerMove, { passive: true });
    window.addEventListener('touchmove', this.onPointerMove, { passive: true });
    window.addEventListener('click', this.onClick, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
  }

  private unbindEvents() {
    window.removeEventListener('mousemove', this.onPointerMove);
    window.removeEventListener('touchstart', this.onPointerMove);
    window.removeEventListener('touchmove', this.onPointerMove);
    window.removeEventListener('click', this.onClick);
    window.removeEventListener('resize', this.onResize);
  }

  /**
   * Called by the ScrollController with normalized scroll percentage (0.0 to 1.0)
   */
  public setScrollProgress(progress: number) {
    this.targetScrollProgress = Math.max(0, Math.min(1, progress));
  }

  /**
   * Manually force a specific particle state if user clicks state badge
   */
  public forceState(stateId: ParticleStateId) {
    const totalStates = PARTICLE_STATES.length;
    this.targetScrollProgress = stateId / (totalStates - 1);
  }

  private startLoop() {
    this.lastFpsTime = performance.now();
    this.clock.start();

    const animate = () => {
      if (this.isDestroyed) return;
      this.animationFrameId = requestAnimationFrame(animate);

      const delta = this.clock.getDelta();
      const elapsedTime = this.clock.getElapsedTime();

      // Smooth scroll progress damping
      this.currentScrollProgress += (this.targetScrollProgress - this.currentScrollProgress) * 0.08;

      // Mouse damping
      this.currentMouse.x += (this.targetMouse.x - this.currentMouse.x) * 0.05;
      this.currentMouse.y += (this.targetMouse.y - this.currentMouse.y) * 0.05;

      // Decay click pulse
      if (this.clickPulse > 0.001) {
        this.clickPulse *= 0.93;
      } else {
        this.clickPulse = 0;
      }

      // Decay network pulse
      if (this.networkPulse > 0.001) {
        this.networkPulse *= 0.94;
      } else {
        this.networkPulse = 0;
      }

      // Calculate state indices and morph progress
      const numIntervals = PARTICLE_STATES.length - 1; // 5 transitions (0->1, 1->2, 2->3, 3->4, 4->5)
      const scaledProgress = this.currentScrollProgress * numIntervals;
      const activeIdx = Math.min(Math.floor(scaledProgress), numIntervals - 1) as ParticleStateId;
      const nextIdx = Math.min(activeIdx + 1, PARTICLE_STATES.length - 1) as ParticleStateId;
      const morphT = scaledProgress - activeIdx;

      if (activeIdx !== this.currentActiveState) {
        this.currentActiveState = activeIdx;
        if (this.onStateChange) {
          this.onStateChange(activeIdx);
        }
      }
      this.currentNextState = nextIdx;
      this.currentMorphProgress = morphT;

      // Interpolate camera parameters smoothly based on active/next configs
      const activeConfig = PARTICLE_STATES[activeIdx];
      const nextConfig = PARTICLE_STATES[nextIdx];

      const targetCameraZ = THREE.MathUtils.lerp(activeConfig.cameraZ, nextConfig.cameraZ, morphT);
      const targetCameraY = THREE.MathUtils.lerp(activeConfig.cameraY, nextConfig.cameraY, morphT);
      const targetBaseSize = THREE.MathUtils.lerp(activeConfig.particleSize, nextConfig.particleSize, morphT);
      const rotationSpeed = THREE.MathUtils.lerp(activeConfig.rotationSpeed, nextConfig.rotationSpeed, morphT);

      // Camera position damping with gentle mouse parallax
      this.camera.position.z += (targetCameraZ - this.camera.position.z) * 0.05;
      this.camera.position.y += (targetCameraY + this.currentMouse.y * 0.35 - this.camera.position.y) * 0.05;
      this.camera.position.x += (this.currentMouse.x * 0.5 - this.camera.position.x) * 0.05;
      this.camera.lookAt(0, 0, 0);

      // Subtle points rotation
      if (this.points) {
        this.points.rotation.y = elapsedTime * rotationSpeed * 0.3 + this.currentMouse.x * 0.15;
        this.points.rotation.x = Math.sin(elapsedTime * 0.2) * 0.05 + this.currentMouse.y * 0.1;
      }

      // Update shader uniforms directly
      if (this.material) {
        const u = this.material.uniforms;
        u.uTime.value = elapsedTime;
        u.uActiveState.value = activeIdx;
        u.uNextState.value = nextIdx;
        u.uMorphProgress.value = morphT;
        u.uScrollProgress.value = this.currentScrollProgress;
        u.uMouse.value.copy(this.currentMouse);
        u.uPulse.value = this.networkPulse;
        u.uClickPulse.value = this.clickPulse;
        u.uClickOrigin.value.copy(this.clickOrigin);
        u.uBaseSize.value = targetBaseSize;
        u.uColorActive.value.copy(this.stateColors[activeIdx]);
        u.uColorNext.value.copy(this.stateColors[nextIdx]);
      }

      // Render WebGL
      if (this.renderer) {
        this.renderer.render(this.scene, this.camera);
      }

      // FPS counter calculation
      this.frameCount++;
      const now = performance.now();
      if (now - this.lastFpsTime >= 1000) {
        const currentFps = Math.round((this.frameCount * 1000) / (now - this.lastFpsTime));
        if (this.onFpsUpdate) {
          this.onFpsUpdate(currentFps);
        }
        this.frameCount = 0;
        this.lastFpsTime = now;
      }
    };

    animate();
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.unbindEvents();

    if (this.geometry) {
      this.geometry.dispose();
      this.geometry = null;
    }
    if (this.material) {
      this.material.dispose();
      this.material = null;
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer = null;
    }
    this.scene.clear();
  }
}
