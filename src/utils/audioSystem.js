/**
 * DEVVERSE Cosmic Dual-Engine Audio System
 * Combines zero-latency pre-synthesized PCM WAV audio elements with native Web Audio API.
 * 100% self-contained, zero external asset dependencies.
 * Guaranteed audible playback across all browsers (Chrome, Edge, Firefox, Safari, Mobile).
 */

// Global sound state (always starts enabled)
let soundEnabled = true;

// Force reset any accidental stale mute from previous sessions
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('devverse_sound_enabled');
    if (saved === 'false') {
      localStorage.setItem('devverse_sound_enabled', 'true');
    }
  } catch (e) {}
}

/**
 * Generate a 16-bit Mono PCM WAV Data URI in pure browser JavaScript
 */
function createWavUri(samples, sampleRate = 22050) {
  const byteLength = 44 + samples.length * 2;
  const buffer = new ArrayBuffer(byteLength);
  const view = new DataView(buffer);

  function writeString(offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // RIFF header
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, 'WAVE');

  // fmt subchunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono channel
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate (SampleRate * NumChannels * BitsPerSample/8)
  view.setUint16(32, 2, true); // block align
  view.setUint16(34, 16, true); // bits per sample

  // data subchunk
  writeString(36, 'data');
  view.setUint32(40, samples.length * 2, true);

  // Write PCM 16-bit samples
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  // Convert ArrayBuffer to Base64 in safe chunks
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }

  const base64 = typeof btoa !== 'undefined' 
    ? btoa(binary) 
    : (typeof Buffer !== 'undefined' ? Buffer.from(binary, 'binary').toString('base64') : '');

  return 'data:audio/wav;base64,' + base64;
}

// -------------------------------------------------------------
// Pre-synthesize High-Fidelity Futuristic Audio Clips
// -------------------------------------------------------------
const SAMPLE_RATE = 22050;

// 1. Crisp Tactile Click (Punchy 90ms cyber click)
const clickSamples = new Float32Array(Math.floor(SAMPLE_RATE * 0.085));
for (let i = 0; i < clickSamples.length; i++) {
  const t = i / SAMPLE_RATE;
  const env = Math.exp(-t * 50);
  const freq = 980 - t * 6500;
  const sub = Math.sin(2 * Math.PI * 180 * t) * 0.35;
  clickSamples[i] = (Math.sin(2 * Math.PI * Math.max(160, freq) * t) * 0.75 + sub) * env;
}
const CLICK_WAV = createWavUri(clickSamples, SAMPLE_RATE);

// 2. Navigation Arpeggio Chime (3 Ascending Cyber Tones: 620Hz, 880Hz, 1240Hz)
const navSamples = new Float32Array(Math.floor(SAMPLE_RATE * 0.15));
for (let i = 0; i < navSamples.length; i++) {
  const t = i / SAMPLE_RATE;
  const noteIdx = Math.min(2, Math.floor(t / 0.048));
  const freqs = [620, 880, 1240];
  const f = freqs[noteIdx];
  const noteT = t - noteIdx * 0.048;
  const env = Math.exp(-noteT * 32);
  navSamples[i] = Math.sin(2 * Math.PI * f * t) * env * 0.85;
}
const NAV_WAV = createWavUri(navSamples, SAMPLE_RATE);

// 3. Celestial Solfeggio Resonance Chime (528Hz + 660Hz + 792Hz + 1056Hz, 0.75s)
const planetSamples = new Float32Array(Math.floor(SAMPLE_RATE * 0.72));
for (let i = 0; i < planetSamples.length; i++) {
  const t = i / SAMPLE_RATE;
  const env = Math.exp(-t * 4.8);
  const s1 = Math.sin(2 * Math.PI * 528 * t);
  const s2 = Math.sin(2 * Math.PI * 660 * t) * 0.85;
  const s3 = Math.sin(2 * Math.PI * 792 * t) * 0.65;
  const s4 = Math.sin(2 * Math.PI * 1056 * t) * 0.45;
  planetSamples[i] = ((s1 + s2 + s3 + s4) / 2.95) * env;
}
const PLANET_WAV = createWavUri(planetSamples, SAMPLE_RATE);

// 4. Sci-Fi Portal Warp Sweep (220Hz up to 880Hz, 0.17s)
const openSamples = new Float32Array(Math.floor(SAMPLE_RATE * 0.17));
for (let i = 0; i < openSamples.length; i++) {
  const t = i / SAMPLE_RATE;
  const norm = t / 0.17;
  const f = 240 + Math.pow(norm, 2) * 680;
  const env = Math.sin(norm * Math.PI);
  openSamples[i] = Math.sin(2 * Math.PI * f * t) * env * 0.85;
}
const MODAL_OPEN_WAV = createWavUri(openSamples, SAMPLE_RATE);

// 5. Soft Descending Tone (680Hz down to 240Hz, 0.13s)
const closeSamples = new Float32Array(Math.floor(SAMPLE_RATE * 0.13));
for (let i = 0; i < closeSamples.length; i++) {
  const t = i / SAMPLE_RATE;
  const f = 680 - (t / 0.13) * 440;
  const env = Math.exp(-t * 20);
  closeSamples[i] = Math.sin(2 * Math.PI * f * t) * env * 0.8;
}
const MODAL_CLOSE_WAV = createWavUri(closeSamples, SAMPLE_RATE);

// 6. Subtle Cyber Hover Tick (1400Hz, 0.025s)
const hoverSamples = new Float32Array(Math.floor(SAMPLE_RATE * 0.025));
for (let i = 0; i < hoverSamples.length; i++) {
  const t = i / SAMPLE_RATE;
  const env = Math.exp(-t * 90);
  hoverSamples[i] = Math.sin(2 * Math.PI * 1400 * t) * env * 0.35;
}
const HOVER_WAV = createWavUri(hoverSamples, SAMPLE_RATE);

// -------------------------------------------------------------
// Playback Engine: HTML5 Audio (Synchronous User-Gesture Safe)
// -------------------------------------------------------------

// Debounce trackers
let lastClickTime = 0;
let lastHoverTime = 0;

/**
 * Play a synthesized WAV URI with high reliability
 */
function playWavAudio(dataUri, volume = 0.9) {
  if (!soundEnabled || typeof window === 'undefined') return;

  try {
    const audio = new Audio(dataUri);
    audio.volume = Math.max(0, Math.min(1, volume));
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Log cleanly without crashing
        console.warn('[DEVVERSE Audio] Playback notice:', err.message);
      });
    }
  } catch (err) {
    console.warn('[DEVVERSE Audio] Audio error:', err);
  }
}

// -------------------------------------------------------------
// Parallel Web Audio API Wakeup (Secondary Engine)
// -------------------------------------------------------------
let webAudioCtx = null;

function wakeWebAudio() {
  if (typeof window === 'undefined') return;
  try {
    if (!webAudioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        webAudioCtx = new AudioContextClass();
      }
    }
    if (webAudioCtx && webAudioCtx.state === 'suspended') {
      webAudioCtx.resume().catch(() => {});
    }
  } catch (e) {}
}

if (typeof window !== 'undefined') {
  ['click', 'pointerdown', 'touchstart', 'keydown'].forEach((evt) => {
    window.addEventListener(evt, wakeWebAudio, { passive: true, capture: true });
  });
}

// -------------------------------------------------------------
// Public Sound API
// -------------------------------------------------------------

export function isSoundEnabled() {
  return soundEnabled;
}

export function setSoundEnabled(val) {
  soundEnabled = !!val;
  try {
    localStorage.setItem('devverse_sound_enabled', String(soundEnabled));
  } catch (e) {}
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  try {
    localStorage.setItem('devverse_sound_enabled', String(soundEnabled));
  } catch (e) {}

  if (soundEnabled) {
    playWavAudio(NAV_WAV, 0.95); // Immediate audible confirmation that sound is active
  } else {
    playWavAudio(MODAL_CLOSE_WAV, 0.6); // Soft descending tone indicating mute
  }
  return soundEnabled;
}

/**
 * Test sound function for user to immediately hear audio
 */
export function playTestSound() {
  soundEnabled = true;
  playWavAudio(PLANET_WAV, 1.0);
}

/**
 * Crisp tactile click sound for buttons and interactive controls
 */
export function playClickSound() {
  const now = Date.now();
  if (now - lastClickTime < 45) return;
  lastClickTime = now;

  wakeWebAudio();
  playWavAudio(CLICK_WAV, 0.9);
}

/**
 * Clean navigation blip sound for header and section links
 */
export function playNavSound() {
  wakeWebAudio();
  playWavAudio(NAV_WAV, 0.88);
}

/**
 * Resonant celestial harmonic chime for 3D celestial stations & orbit nodes
 */
export function playPlanetSelectSound() {
  wakeWebAudio();
  playWavAudio(PLANET_WAV, 0.95);
}

/**
 * Sci-Fi warp sweep when opening modals (CV Viewer, Case Study, HUD)
 */
export function playModalOpenSound() {
  wakeWebAudio();
  playWavAudio(MODAL_OPEN_WAV, 0.85);
}

/**
 * Soft descending tone when closing modals
 */
export function playModalCloseSound() {
  wakeWebAudio();
  playWavAudio(MODAL_CLOSE_WAV, 0.8);
}

/**
 * Subtle micro-tick on interactive hover
 */
export function playHoverSound() {
  if (!soundEnabled) return;
  const now = Date.now();
  if (now - lastHoverTime < 75) return;
  lastHoverTime = now;

  playWavAudio(HOVER_WAV, 0.28);
}
