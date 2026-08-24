/**
 * Procedural mathematical coordinates generator for WebGL Particle Morph States.
 * All positions are calculated once during initialization and uploaded as GPU BufferAttributes.
 */

export interface ParticleStateBuffers {
  pos0: Float32Array; // Cosmic Nebula
  pos1: Float32Array; // Wave Grid
  pos2: Float32Array; // Realtime Network / Airfield
  pos3: Float32Array; // Project Constellation
  pos4: Float32Array; // Neural Attractor
  pos5: Float32Array; // Calm Horizon
  randoms: Float32Array; // aRandom (vec3 per particle)
  sizes: Float32Array;   // aSize (float per particle)
}

// Deterministic pseudorandom number generator (LCG) so particle coordinates are 100% reproducible
function createRng(seed = 1337) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateAllParticleStates(count: number): ParticleStateBuffers {
  const rng = createRng(42);

  const pos0 = new Float32Array(count * 3);
  const pos1 = new Float32Array(count * 3);
  const pos2 = new Float32Array(count * 3);
  const pos3 = new Float32Array(count * 3);
  const pos4 = new Float32Array(count * 3);
  const pos5 = new Float32Array(count * 3);

  const randoms = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Deterministic random properties for this particle
    const r1 = rng();
    const r2 = rng();
    const r3 = rng();

    randoms[i3] = r1;
    randoms[i3 + 1] = r2;
    randoms[i3 + 2] = r3;

    // Varied point size distribution (mostly standard, some luminous focal stars)
    sizes[i] = r3 > 0.92 ? 1.8 + rng() * 0.8 : 0.6 + rng() * 0.7;

    // -------------------------------------------------------------
    // STATE 0: COSMIC NEBULA / ORGANIC GALAXY
    // Fibonacci sphere with logarithmic spiral arms
    // -------------------------------------------------------------
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const radiusBase = Math.pow(r1, 0.45) * 3.6 + 0.3;
    const armOffset = Math.sin(theta * 3.0 + r2 * 2.0) * 0.4;
    const rad0 = radiusBase + armOffset;

    pos0[i3] = rad0 * Math.sin(phi) * Math.cos(theta);
    pos0[i3 + 1] = (rad0 * Math.cos(phi) * 0.65) + (Math.sin(theta * 2.0) * 0.3);
    pos0[i3 + 2] = rad0 * Math.sin(phi) * Math.sin(theta);

    // -------------------------------------------------------------
    // STATE 1: DIGITAL WAVE GRID / UI MATRIX
    // Planar undulating lattice with dual layers
    // -------------------------------------------------------------
    const gridCols = Math.floor(Math.sqrt(count * 1.5));
    const gridRows = Math.floor(count / gridCols);
    const col = i % gridCols;
    const row = Math.floor(i / gridCols);

    const gx = ((col / gridCols) - 0.5) * 8.5;
    const gz = ((row / (gridRows || 1)) - 0.5) * 7.5;
    const waveDist = Math.sqrt(gx * gx + gz * gz);
    const gy = Math.sin(gx * 1.4 + gz * 1.1) * 0.45 + Math.cos(waveDist * 1.5) * 0.35;

    // Distribute remaining overflow particles into floating UI accent frames
    if (i > gridCols * gridRows) {
      pos1[i3] = (rng() - 0.5) * 7.0;
      pos1[i3 + 1] = (rng() - 0.5) * 4.0;
      pos1[i3 + 2] = (rng() - 0.5) * 2.0;
    } else {
      pos1[i3] = gx;
      pos1[i3 + 1] = gy - 0.2;
      pos1[i3 + 2] = gz;
    }

    // -------------------------------------------------------------
    // STATE 2: REAL-TIME NETWORK / RUNWAY & TAXIWAY TELEMETRY MATRIX
    // Airport runway centerline, approach lighting arrays, taxiway curves & data bus nodes
    // -------------------------------------------------------------
    const segment = i % 5;
    if (segment === 0 || segment === 1) {
      // Main Runway Centerline & Parallel Edge Light Rails
      const t = (i / (count * 0.4));
      const rz = (t - 0.5) * 11.0;
      const railOffset = segment === 0 ? 0 : (r2 > 0.5 ? 1.3 : -1.3);
      pos2[i3] = railOffset + (rng() - 0.5) * 0.08;
      pos2[i3 + 1] = -0.4 + (rng() - 0.5) * 0.05;
      pos2[i3 + 2] = rz;
    } else if (segment === 2) {
      // Curved Taxiway Turnoffs & High-Speed Exits
      const t = (i / (count * 0.2)) * Math.PI * 0.7;
      const txRadius = 3.2;
      pos2[i3] = (Math.cos(t) * txRadius) - 1.3;
      pos2[i3 + 1] = -0.35 + (rng() - 0.5) * 0.08;
      pos2[i3 + 2] = (Math.sin(t) * txRadius) - 1.5;
    } else if (segment === 3) {
      // Approach Lighting System (ALS) crossbars & CAT III Flashers
      const barIndex = Math.floor(r1 * 12);
      const barZ = 4.0 + (barIndex * 0.6);
      const barWidth = 2.4 - (barIndex * 0.1);
      pos2[i3] = (r2 - 0.5) * barWidth * 2.0;
      pos2[i3 + 1] = -0.3 + (barIndex * 0.04);
      pos2[i3 + 2] = barZ;
    } else {
      // Data Signal Streamers & Modbus Bus Conduits looping through the sky
      const streamT = (i / count) * Math.PI * 4;
      const streamRad = 2.2 + Math.sin(streamT * 2) * 0.8;
      pos2[i3] = Math.sin(streamT) * streamRad;
      pos2[i3 + 1] = Math.cos(streamT * 0.7) * 1.6 + 0.8;
      pos2[i3 + 2] = ((r1 - 0.5) * 10.0);
    }

    // -------------------------------------------------------------
    // STATE 3: PROJECT CONSTELLATION
    // 4 major orbiting gravitational cluster hubs + orbital connection bridges
    // -------------------------------------------------------------
    const clusterId = i % 4;
    const clusterCenters = [
      [-2.4, 0.8, 0.5],   // 01: Airport Lighting (Cyan)
      [2.2, 0.7, -0.2],   // 02: Booking Engine (Violet)
      [-1.8, -1.2, -0.6], // 03: Corporate Platform (Blue)
      [2.0, -1.1, 0.6]    // 04: Neural Shaders (Rose/Gold)
    ];

    if (r1 < 0.78) {
      // Dense orbiting cluster cloud around center
      const center = clusterCenters[clusterId];
      const clRadius = Math.pow(r2, 0.6) * 1.3;
      const clPhi = Math.acos(1 - 2 * rng());
      const clTheta = rng() * Math.PI * 2;

      pos3[i3] = center[0] + clRadius * Math.sin(clPhi) * Math.cos(clTheta);
      pos3[i3 + 1] = center[1] + clRadius * Math.cos(clPhi) * 0.8;
      pos3[i3 + 2] = center[2] + clRadius * Math.sin(clPhi) * Math.sin(clTheta);
    } else {
      // Constellation orbital transfer bridges between projects
      const source = clusterCenters[clusterId];
      const target = clusterCenters[(clusterId + 1) % 4];
      const tBridge = rng();
      const bridgeCurvature = Math.sin(tBridge * Math.PI) * 0.8;

      pos3[i3] = source[0] + (target[0] - source[0]) * tBridge + (rng() - 0.5) * 0.2;
      pos3[i3 + 1] = source[1] + (target[1] - source[1]) * tBridge + bridgeCurvature + (rng() - 0.5) * 0.2;
      pos3[i3 + 2] = source[2] + (target[2] - source[2]) * tBridge + (rng() - 0.5) * 0.2;
    }

    // -------------------------------------------------------------
    // STATE 4: NEURAL ATTRACTOR / CLIFFORD-LORENZ FIELD
    // Parametric Torus Knot with strange attractor harmonics
    // -------------------------------------------------------------
    const tAttractor = (i / count) * Math.PI * 2 * 3.0; // 3 full twists
    const p = 3;
    const q = 7;
    const rKnot = 1.8 + Math.sin(tAttractor * 2.0) * 0.5 + (r1 * 0.7);
    const knotX = rKnot * Math.cos(p * tAttractor);
    const knotY = rKnot * Math.sin(p * tAttractor);
    const knotZ = (1.5 + r2 * 0.6) * Math.sin(q * tAttractor);

    pos4[i3] = knotX;
    pos4[i3 + 1] = knotY * 0.75 + Math.cos(tAttractor) * 0.4;
    pos4[i3 + 2] = knotZ * 1.1;

    // -------------------------------------------------------------
    // STATE 5: CALM HORIZON / EXPANDED HARMONIC RING
    // Gently dispersed equatorial celestial disk and tranquil starlight
    // -------------------------------------------------------------
    const angle5 = r1 * Math.PI * 2;
    const radius5 = 2.4 + Math.pow(r2, 0.4) * 4.6;
    const height5 = (rng() - 0.5) * (1.2 / (radius5 * 0.4)); // Flatter at edges

    pos5[i3] = Math.cos(angle5) * radius5;
    pos5[i3 + 1] = height5;
    pos5[i3 + 2] = Math.sin(angle5) * radius5 * 0.85;
  }

  return {
    pos0,
    pos1,
    pos2,
    pos3,
    pos4,
    pos5,
    randoms,
    sizes
  };
}
