export const particleVertexShader = `
uniform float uTime;
uniform float uActiveState;
uniform float uNextState;
uniform float uMorphProgress;
uniform float uScrollProgress;
uniform vec2 uMouse;
uniform float uPulse;
uniform float uClickPulse;
uniform vec3 uClickOrigin;
uniform float uPixelRatio;
uniform float uBaseSize;
uniform vec3 uColorActive;
uniform vec3 uColorNext;

attribute vec3 aPos0; // Cosmic Nebula
attribute vec3 aPos1; // Digital Wave Grid
attribute vec3 aPos2; // Realtime Network / Airfield
attribute vec3 aPos3; // Project Constellation
attribute vec3 aPos4; // Neural Attractor
attribute vec3 aPos5; // Calm Horizon

attribute vec3 aRandom;
attribute float aSize;

varying vec3 vColor;
varying float vAlpha;
varying float vDepth;

// Helper to select position by state index
vec3 getPositionForState(float stateIdx) {
  if (stateIdx < 0.5) return aPos0;
  if (stateIdx < 1.5) return aPos1;
  if (stateIdx < 2.5) return aPos2;
  if (stateIdx < 3.5) return aPos3;
  if (stateIdx < 4.5) return aPos4;
  return aPos5;
}

void main() {
  vec3 pActive = getPositionForState(uActiveState);
  vec3 pNext = getPositionForState(uNextState);

  // Smooth Hermite interpolation between states
  float blend = smoothstep(0.0, 1.0, uMorphProgress);
  vec3 mixedPos = mix(pActive, pNext, blend);

  // Organic time-based harmonic breathing (unique per particle based on aRandom)
  float timeOffset = uTime * 0.8 + aRandom.x * 6.28318;
  vec3 idleDrift = vec3(
    sin(timeOffset * 0.7 + aRandom.y * 3.14) * 0.08,
    cos(timeOffset * 0.9 + aRandom.z * 3.14) * 0.08,
    sin(timeOffset * 0.5 + aRandom.x * 2.0) * 0.06
  );

  // Subtle state-specific dynamic movement
  if (uActiveState < 1.5 && uNextState < 1.5) {
    // Grid wave undulation
    idleDrift.y += sin(mixedPos.x * 2.0 + uTime * 1.5) * 0.12 * sin(mixedPos.z * 1.5 + uTime);
  } else if ((uActiveState >= 1.5 && uActiveState < 2.5) || (uNextState >= 1.5 && uNextState < 2.5)) {
    // High-frequency telemetry pulse on network nodes
    float signalPulse = sin(mixedPos.z * 4.0 - uTime * 6.0 + aRandom.x * 10.0);
    if (signalPulse > 0.8) {
      idleDrift *= 1.8;
    }
  }

  vec3 pos = mixedPos + idleDrift;

  // Interactive mouse repulsion/field reaction in 3D
  vec3 mouseWorld = vec3(uMouse.x * 4.0, uMouse.y * 3.0, 0.0);
  float distToMouse = length(pos.xy - mouseWorld.xy);
  if (distToMouse < 2.2) {
    float push = (1.0 - distToMouse / 2.2) * 0.45;
    vec2 pushDir = normalize(pos.xy - mouseWorld.xy + vec2(0.001));
    pos.xy += pushDir * push;
    pos.z += push * 0.5;
  }

  // Interactive click/tap shockwave — wide, slow-expanding ring
  if (uClickPulse > 0.008) {
    float distToClick = length(pos - uClickOrigin);
    float waveFront = (1.0 - uClickPulse) * 12.0;
    float waveDist = abs(distToClick - waveFront);
    if (waveDist < 2.2) {
      float waveForce = (1.0 - waveDist / 2.2) * uClickPulse * 1.55;
      vec3 waveDir = normalize(pos - uClickOrigin + vec3(0.001));
      pos += waveDir * waveForce;
    }
  }

  vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;

  // Point size with distance attenuation
  float pointDist = max(0.5, -modelViewPosition.z);
  gl_PointSize = (uBaseSize * aSize * uPixelRatio * 300.0) / (pointDist * pointDist + 15.0);

  // Depth falloff and color calculation
  vDepth = clamp((-modelViewPosition.z - 2.0) / 10.0, 0.0, 1.0);

  // Base metallic cool-white / silver with dynamic accent blend
  vec3 baseColor = vec3(0.92, 0.95, 0.98);
  vec3 mixedAccent = mix(uColorActive, uColorNext, blend);

  // Subtle per-particle color tint variation
  float colorMixRatio = clamp(aRandom.z * 0.65 + (sin(uTime + aRandom.y * 5.0) * 0.2), 0.1, 0.9);
  vColor = mix(baseColor, mixedAccent, colorMixRatio);

  // Enhance pulse brightness
  if (uPulse > 0.05) {
    vColor = mix(vColor, vec3(1.0, 1.0, 1.0), uPulse * 0.5);
  }

  // Alpha based on depth and particle random seed
  vAlpha = clamp(0.4 + aRandom.x * 0.5 - vDepth * 0.35, 0.15, 0.95);
}
`;

export const particleFragmentShader = `
uniform float uTime;
varying vec3 vColor;
varying float vAlpha;
varying float vDepth;

void main() {
  // Compute circular point coordinates from gl_PointCoord (0 to 1)
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);

  if (dist > 0.5) {
    discard;
  }

  // Soft Gaussian-like circular falloff
  float intensity = pow(1.0 - dist * 2.0, 1.8);

  // Crisp bright core
  float core = smoothstep(0.18, 0.0, dist);

  vec3 finalColor = vColor + vec3(core * 0.6);
  float finalAlpha = vAlpha * intensity;

  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;
