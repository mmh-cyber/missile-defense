// ============================================================
// MISSILE DEFENSE — Web Audio API Sound Effects
// ============================================================
// Synthesized impact sounds for interceptions, city hits,
// ground impacts, and interceptor launches.
// Each threat type has a distinct intercept sound signature.
// No external audio files needed.
// ============================================================

let audioCtx = null;

function getContext() {
  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// -------------------------------------------------------
// Interception: Type-specific sounds
// Dispatches to different sound signatures per threat type
// -------------------------------------------------------
export function playInterceptSound(volume = 0.7, threatType = 'rocket') {
  try {
    switch (threatType) {
      case 'cruise':     return playInterceptCruise(volume);
      case 'ballistic':  return playInterceptBallistic(volume);
      case 'hypersonic': return playInterceptHypersonic(volume);
      default:           return playInterceptIronDome(volume); // drone + rocket
    }
  } catch (e) {
    // Silently fail if Web Audio not available
  }
}

// -------------------------------------------------------
// Iron Dome Intercept (Drone/Rocket): Sharp crack + pop + zing
// Duration: ~0.25s — quick and snappy for small threats
// -------------------------------------------------------
function playInterceptIronDome(volume) {
  const ctx = getContext();
  const now = ctx.currentTime;

  // White noise burst (60ms) — the "crack"
  const bufferSize = Math.floor(ctx.sampleRate * 0.06);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2000;
  filter.Q.value = 1.5;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume * 1.0, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.18);

  // Tonal pop (descending ~400Hz → 100Hz)
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.25);

  const oscGain = ctx.createGain();
  oscGain.gain.setValueAtTime(volume * 0.6, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.25);

  // High-frequency zing overtone (1200Hz → 600Hz, 0.1s)
  const zing = ctx.createOscillator();
  zing.type = 'sine';
  zing.frequency.setValueAtTime(1200, now);
  zing.frequency.exponentialRampToValueAtTime(600, now + 0.1);

  const zingGain = ctx.createGain();
  zingGain.gain.setValueAtTime(volume * 0.25, now);
  zingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  zing.connect(zingGain);
  zingGain.connect(ctx.destination);
  zing.start(now);
  zing.stop(now + 0.1);
}

// -------------------------------------------------------
// David's Sling Intercept (Cruise): Deep resonant boom + metallic ring
// Duration: ~0.4s — heavier and more resonant than Iron Dome
// -------------------------------------------------------
function playInterceptCruise(volume) {
  const ctx = getContext();
  const now = ctx.currentTime;

  // Deep bass impact (sawtooth 250Hz → 60Hz)
  const bass = ctx.createOscillator();
  bass.type = 'sawtooth';
  bass.frequency.setValueAtTime(250, now);
  bass.frequency.exponentialRampToValueAtTime(60, now + 0.35);

  const bassGain = ctx.createGain();
  bassGain.gain.setValueAtTime(volume * 0.7, now);
  bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  bass.connect(bassGain);
  bassGain.connect(ctx.destination);
  bass.start(now);
  bass.stop(now + 0.4);

  // Metallic ring (triangle wave 800Hz → 400Hz, slow decay)
  const ring = ctx.createOscillator();
  ring.type = 'triangle';
  ring.frequency.setValueAtTime(800, now);
  ring.frequency.exponentialRampToValueAtTime(400, now + 0.35);

  const ringGain = ctx.createGain();
  ringGain.gain.setValueAtTime(volume * 0.35, now);
  ringGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  ring.connect(ringGain);
  ringGain.connect(ctx.destination);
  ring.start(now);
  ring.stop(now + 0.35);

  // Noise burst (wider bandwidth, longer than Iron Dome)
  const bufferSize = Math.floor(ctx.sampleRate * 0.12);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 0.7);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1200;
  filter.Q.value = 0.8;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(volume * 0.6, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.25);
}

// -------------------------------------------------------
// Arrow 2 Intercept (Ballistic): Massive boom + shockwave rumble
// Duration: ~0.6s — heavy, powerful, low-frequency dominant
// -------------------------------------------------------
function playInterceptBallistic(volume) {
  const ctx = getContext();
  const now = ctx.currentTime;

  // Primary detonation — deep sine sweep (180Hz → 30Hz)
  const det = ctx.createOscillator();
  det.type = 'sine';
  det.frequency.setValueAtTime(180, now);
  det.frequency.exponentialRampToValueAtTime(30, now + 0.5);

  const detGain = ctx.createGain();
  detGain.gain.setValueAtTime(volume * 0.9, now);
  detGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

  det.connect(detGain);
  detGain.connect(ctx.destination);
  det.start(now);
  det.stop(now + 0.6);

  // Shockwave rumble (sawtooth 100Hz → 20Hz, slowly decaying)
  const rumble = ctx.createOscillator();
  rumble.type = 'sawtooth';
  rumble.frequency.setValueAtTime(100, now + 0.05);
  rumble.frequency.exponentialRampToValueAtTime(20, now + 0.5);

  const rumbleGain = ctx.createGain();
  rumbleGain.gain.setValueAtTime(0.001, now);
  rumbleGain.gain.linearRampToValueAtTime(volume * 0.5, now + 0.05);
  rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

  rumble.connect(rumbleGain);
  rumbleGain.connect(ctx.destination);
  rumble.start(now);
  rumble.stop(now + 0.55);

  // Heavy noise burst (low-pass filtered, long)
  const bufferSize = Math.floor(ctx.sampleRate * 0.3);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 0.4);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(100, now + 0.4);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(volume * 0.7, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.4);

  // Sub-bass thump (40Hz pulse)
  const sub = ctx.createOscillator();
  sub.type = 'sine';
  sub.frequency.value = 40;

  const subGain = ctx.createGain();
  subGain.gain.setValueAtTime(volume * 0.6, now);
  subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  sub.connect(subGain);
  subGain.connect(ctx.destination);
  sub.start(now);
  sub.stop(now + 0.25);
}

// -------------------------------------------------------
// Arrow 3 Intercept (Hypersonic): Electric crack + harmonic burst + plasma sizzle
// Duration: ~0.5s — unique sci-fi energy signature, unlike any other
// -------------------------------------------------------
function playInterceptHypersonic(volume) {
  const ctx = getContext();
  const now = ctx.currentTime;

  // Electric crack — very fast white noise with sharp bandpass
  const crackSize = Math.floor(ctx.sampleRate * 0.03);
  const crackBuf = ctx.createBuffer(1, crackSize, ctx.sampleRate);
  const crackData = crackBuf.getChannelData(0);
  for (let i = 0; i < crackSize; i++) {
    crackData[i] = (Math.random() * 2 - 1) * (1 - i / crackSize);
  }
  const crack = ctx.createBufferSource();
  crack.buffer = crackBuf;

  const crackFilter = ctx.createBiquadFilter();
  crackFilter.type = 'highpass';
  crackFilter.frequency.value = 4000;

  const crackGain = ctx.createGain();
  crackGain.gain.setValueAtTime(volume * 1.2, now);
  crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  crack.connect(crackFilter);
  crackFilter.connect(crackGain);
  crackGain.connect(ctx.destination);
  crack.start(now);
  crack.stop(now + 0.06);

  // Harmonic burst — three stacked sine oscillators (fundamental + octave + fifth)
  // Creates a distinctive "energy discharge" chord
  [600, 1200, 1800].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.3, now + 0.3);

    const g = ctx.createGain();
    g.gain.setValueAtTime(volume * (0.5 - i * 0.12), now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  });

  // Descending sweep — "energy dissipation" (2000Hz → 200Hz)
  const sweep = ctx.createOscillator();
  sweep.type = 'sawtooth';
  sweep.frequency.setValueAtTime(2000, now);
  sweep.frequency.exponentialRampToValueAtTime(200, now + 0.2);

  const sweepGain = ctx.createGain();
  sweepGain.gain.setValueAtTime(volume * 0.25, now);
  sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  sweep.connect(sweepGain);
  sweepGain.connect(ctx.destination);
  sweep.start(now);
  sweep.stop(now + 0.2);

  // Plasma sizzle — extended high-frequency noise (0.15s, bandpass 3000-6000Hz)
  const sizzleSize = Math.floor(ctx.sampleRate * 0.15);
  const sizzleBuf = ctx.createBuffer(1, sizzleSize, ctx.sampleRate);
  const sizzleData = sizzleBuf.getChannelData(0);
  for (let i = 0; i < sizzleSize; i++) {
    sizzleData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / sizzleSize, 1.5);
  }
  const sizzle = ctx.createBufferSource();
  sizzle.buffer = sizzleBuf;

  const sizzleFilter = ctx.createBiquadFilter();
  sizzleFilter.type = 'bandpass';
  sizzleFilter.frequency.value = 4500;
  sizzleFilter.Q.value = 0.5;

  const sizzleGain = ctx.createGain();
  sizzleGain.gain.setValueAtTime(volume * 0.4, now + 0.03);
  sizzleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  sizzle.connect(sizzleFilter);
  sizzleFilter.connect(sizzleGain);
  sizzleGain.connect(ctx.destination);
  sizzle.start(now + 0.03);
  sizzle.stop(now + 0.4);

  // Sub-impact bass (deep thud underneath everything)
  const sub = ctx.createOscillator();
  sub.type = 'sine';
  sub.frequency.setValueAtTime(120, now);
  sub.frequency.exponentialRampToValueAtTime(35, now + 0.3);

  const subGain = ctx.createGain();
  subGain.gain.setValueAtTime(volume * 0.5, now);
  subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  sub.connect(subGain);
  subGain.connect(ctx.destination);
  sub.start(now);
  sub.stop(now + 0.35);
}

// -------------------------------------------------------
// Beard Zap: Twangy hair-pluck snap + fuzzy buzz
// Duration: ~0.25s — like a wiry beard hair pulled taut and released
// Unique comedic-tactical sound unlike any military intercept
// -------------------------------------------------------
export function playBeardZapSound(volume = 0.7) {
  try {
    const ctx = getContext();
    const now = ctx.currentTime;

    // Layer 1: Twang — descending "pluck" (triangle 600Hz → 120Hz)
    // Fast attack, quick decay like a taut hair snapping
    const twang = ctx.createOscillator();
    twang.type = 'triangle';
    twang.frequency.setValueAtTime(600, now);
    twang.frequency.exponentialRampToValueAtTime(120, now + 0.15);

    const twangGain = ctx.createGain();
    twangGain.gain.setValueAtTime(volume * 0.55, now);
    twangGain.gain.exponentialRampToValueAtTime(volume * 0.2, now + 0.04);
    twangGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    twang.connect(twangGain);
    twangGain.connect(ctx.destination);
    twang.start(now);
    twang.stop(now + 0.2);

    // Layer 2: Fuzzy buzz — short filtered noise for "hair vibration" texture
    const buzzLen = Math.floor(ctx.sampleRate * 0.08);
    const buzzBuf = ctx.createBuffer(1, buzzLen, ctx.sampleRate);
    const buzzData = buzzBuf.getChannelData(0);
    for (let i = 0; i < buzzLen; i++) {
      buzzData[i] = (Math.random() * 2 - 1) * (1 - i / buzzLen) * 0.7;
    }
    const buzz = ctx.createBufferSource();
    buzz.buffer = buzzBuf;

    const buzzFilter = ctx.createBiquadFilter();
    buzzFilter.type = 'bandpass';
    buzzFilter.frequency.value = 2200;
    buzzFilter.Q.value = 3;

    const buzzGain = ctx.createGain();
    buzzGain.gain.setValueAtTime(volume * 0.35, now);
    buzzGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    buzz.connect(buzzFilter);
    buzzFilter.connect(buzzGain);
    buzzGain.connect(ctx.destination);
    buzz.start(now);
    buzz.stop(now + 0.1);

    // Layer 3: Snap transient — ultra-short click at attack (like hair releasing)
    const snapLen = Math.floor(ctx.sampleRate * 0.008);
    const snapBuf = ctx.createBuffer(1, snapLen, ctx.sampleRate);
    const snapData = snapBuf.getChannelData(0);
    for (let i = 0; i < snapLen; i++) {
      snapData[i] = (Math.random() * 2 - 1) * (1 - i / snapLen);
    }
    const snap = ctx.createBufferSource();
    snap.buffer = snapBuf;

    const snapGain = ctx.createGain();
    snapGain.gain.setValueAtTime(volume * 0.6, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    snap.connect(snapGain);
    snapGain.connect(ctx.destination);
    snap.start(now);
    snap.stop(now + 0.015);

    // Layer 4: Wobble overtone — slight pitch wobble for "wiry" character
    const wobble = ctx.createOscillator();
    wobble.type = 'sine';
    wobble.frequency.setValueAtTime(900, now);
    wobble.frequency.setValueAtTime(700, now + 0.03);
    wobble.frequency.setValueAtTime(850, now + 0.06);
    wobble.frequency.exponentialRampToValueAtTime(200, now + 0.18);

    const wobbleGain = ctx.createGain();
    wobbleGain.gain.setValueAtTime(volume * 0.2, now);
    wobbleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    wobble.connect(wobbleGain);
    wobbleGain.connect(ctx.destination);
    wobble.start(now);
    wobble.stop(now + 0.18);
  } catch (e) {
    // Silently fail
  }
}

// -------------------------------------------------------
// City Hit: Heavy explosion with low rumble
// Duration: ~0.8s
// -------------------------------------------------------
export function playCityHitSound(volume = 0.7) {
  try {
    const ctx = getContext();
    const now = ctx.currentTime;

    // Low frequency rumble (sawtooth 80Hz → 20Hz)
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.8);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(volume * 0.6, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.8);

    // Noise burst (400ms, low-pass filtered)
    const bufferSize = Math.floor(ctx.sampleRate * 0.4);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 0.5);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1500, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.5);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(volume * 0.7, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.5);

    // Impact thud (sine 60Hz, fast decay)
    const thud = ctx.createOscillator();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(60, now);
    thud.frequency.exponentialRampToValueAtTime(25, now + 0.3);

    const thudGain = ctx.createGain();
    thudGain.gain.setValueAtTime(volume * 0.8, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    thud.connect(thudGain);
    thudGain.connect(ctx.destination);
    thud.start(now);
    thud.stop(now + 0.3);
  } catch (e) {
    // Silently fail
  }
}

// -------------------------------------------------------
// Ground Impact: Muffled distant thud + crumbling debris
// Duration: ~0.7s — distinct "whump" with dirt/gravel scatter
// Designed to sound NOTHING like launch or intercept sounds:
//   - Uses mid-range (150-400Hz) thud, not sub-bass
//   - Descending "whump" envelope, not ascending whoosh
//   - Granular debris texture, not smooth noise
//   - Reverberant echo tail for distance feel
// -------------------------------------------------------
export function playGroundImpactSound(volume = 0.7) {
  try {
    const ctx = getContext();
    const now = ctx.currentTime;

    // Layer 1: Mid-range thud — the "WHUMP" (150Hz → 80Hz, fast attack)
    // Sits in audible range unlike the old sub-bass version
    const thud = ctx.createOscillator();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(150, now);
    thud.frequency.exponentialRampToValueAtTime(80, now + 0.15);

    const thudGain = ctx.createGain();
    thudGain.gain.setValueAtTime(0.001, now);
    thudGain.gain.linearRampToValueAtTime(volume * 0.45, now + 0.008); // snappy 8ms attack
    thudGain.gain.exponentialRampToValueAtTime(volume * 0.15, now + 0.06);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    // Lowpass muffle — makes it sound buried/distant
    const thudLPF = ctx.createBiquadFilter();
    thudLPF.type = 'lowpass';
    thudLPF.frequency.value = 350;
    thudLPF.Q.value = 1.0;

    thud.connect(thudLPF);
    thudLPF.connect(thudGain);
    thudGain.connect(ctx.destination);
    thud.start(now);
    thud.stop(now + 0.25);

    // Layer 2: Crumbling debris — granular scattered noise
    // Unlike the smooth noise in launch sounds, this has "chunks"
    const debrisLen = Math.floor(ctx.sampleRate * 0.5);
    const debrisBuf = ctx.createBuffer(1, debrisLen, ctx.sampleRate);
    const debrisData = debrisBuf.getChannelData(0);
    for (let i = 0; i < debrisLen; i++) {
      const t = i / debrisLen;
      // Delayed onset (50ms after impact), then granular decay
      const onset = t < 0.1 ? t / 0.1 : 1;
      const decay = Math.pow(1 - t, 3);
      // Granular texture — random amplitude modulation for "chunks of dirt"
      const grain = Math.random() < 0.15 ? (Math.random() * 1.5 + 0.5) : 0.3;
      debrisData[i] = (Math.random() * 2 - 1) * onset * decay * grain * 0.5;
    }
    const debris = ctx.createBufferSource();
    debris.buffer = debrisBuf;

    // Bandpass centered at 1200Hz — gritty gravel/dirt texture
    // Much higher than launch sounds (which use 800Hz or lower)
    const debrisBPF = ctx.createBiquadFilter();
    debrisBPF.type = 'bandpass';
    debrisBPF.frequency.setValueAtTime(1800, now);
    debrisBPF.frequency.exponentialRampToValueAtTime(600, now + 0.4);
    debrisBPF.Q.value = 0.8;

    const debrisGain = ctx.createGain();
    debrisGain.gain.setValueAtTime(0.001, now);
    debrisGain.gain.linearRampToValueAtTime(volume * 0.22, now + 0.06);
    debrisGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    debris.connect(debrisBPF);
    debrisBPF.connect(debrisGain);
    debrisGain.connect(ctx.destination);
    debris.start(now);
    debris.stop(now + 0.5);

    // Layer 3: Echo tail — reverberant "thoom" that fades (200Hz → 100Hz)
    // Delayed 80ms to simulate sound bouncing off terrain
    const echo = ctx.createOscillator();
    echo.type = 'triangle';
    echo.frequency.setValueAtTime(200, now + 0.08);
    echo.frequency.exponentialRampToValueAtTime(100, now + 0.5);

    const echoGain = ctx.createGain();
    echoGain.gain.setValueAtTime(0.001, now);
    echoGain.gain.linearRampToValueAtTime(volume * 0.12, now + 0.1);
    echoGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    // Lowpass to keep it muffled and distant
    const echoLPF = ctx.createBiquadFilter();
    echoLPF.type = 'lowpass';
    echoLPF.frequency.value = 400;

    echo.connect(echoLPF);
    echoLPF.connect(echoGain);
    echoGain.connect(ctx.destination);
    echo.start(now + 0.08);
    echo.stop(now + 0.7);
  } catch (e) {
    // Silently fail
  }
}

// -------------------------------------------------------
// Shield Bounce: Hollow "bonk" + metallic ring when threat deflects off turtle shell
// Duration: ~0.35s — satisfying rubbery bounce with shell resonance
// -------------------------------------------------------
export function playShieldBounceSound(volume = 0.7) {
  try {
    const ctx = getContext();
    const now = ctx.currentTime;

    // Hollow bonk — descending tone (800Hz → 200Hz, fast)
    const bonk = ctx.createOscillator();
    bonk.type = 'triangle';
    bonk.frequency.setValueAtTime(800, now);
    bonk.frequency.exponentialRampToValueAtTime(200, now + 0.12);

    const bonkGain = ctx.createGain();
    bonkGain.gain.setValueAtTime(volume * 0.7, now);
    bonkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    bonk.connect(bonkGain);
    bonkGain.connect(ctx.destination);
    bonk.start(now);
    bonk.stop(now + 0.15);

    // Shell resonance — ringing overtone (1200Hz → 600Hz)
    const ring = ctx.createOscillator();
    ring.type = 'sine';
    ring.frequency.setValueAtTime(1200, now);
    ring.frequency.exponentialRampToValueAtTime(600, now + 0.3);

    const ringGain = ctx.createGain();
    ringGain.gain.setValueAtTime(volume * 0.3, now + 0.02);
    ringGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    ring.connect(ringGain);
    ringGain.connect(ctx.destination);
    ring.start(now + 0.02);
    ring.stop(now + 0.3);

    // Bouncy spring overtone (ascending 400Hz → 900Hz, quick)
    const spring = ctx.createOscillator();
    spring.type = 'sine';
    spring.frequency.setValueAtTime(400, now);
    spring.frequency.exponentialRampToValueAtTime(900, now + 0.08);

    const springGain = ctx.createGain();
    springGain.gain.setValueAtTime(volume * 0.25, now);
    springGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    spring.connect(springGain);
    springGain.connect(ctx.destination);
    spring.start(now);
    spring.stop(now + 0.1);

    // Short noise tap — the "hit" texture
    const bufferSize = Math.floor(ctx.sampleRate * 0.03);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1500;
    filter.Q.value = 2;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(volume * 0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.05);
  } catch (e) {
    // Silently fail
  }
}

// -------------------------------------------------------
// Launch: Interceptor-specific launch sounds
// Each defense system has a RADICALLY different audio signature.
// Design principle: different attack character + different tail.
//   Iron Dome  = percussive POP → brief zip       (snappy, light)
//   David's Sling = metallic CLUNK → hissing burn  (chunky, mid-weight)
//   Arrow 2    = cannon THOOM → rolling rumble      (heavy, powerful)
//   Arrow 3    = electric ZAP → rising whistle      (sci-fi, ascending)
// -------------------------------------------------------
export function playLaunchSound(volume = 0.7, systemKey = 'iron_dome') {
  try {
    const ctx = getContext();
    const now = ctx.currentTime;
    // Boost launch sounds so they cut through the mix
    const v = Math.min(volume * 1.4, 1.0);

    if (systemKey === 'iron_dome') {
      // ── Iron Dome: POP-zip ──────────────────────────────
      // Percussive click/pop attack → short upward zip tail
      // Signature: bright, snappy, over fast. Like a bottle-rocket pop.

      // Layer 1: Sharp percussive POP — ultra-short noise click
      const popLen = Math.floor(ctx.sampleRate * 0.012);
      const popBuf = ctx.createBuffer(1, popLen, ctx.sampleRate);
      const popData = popBuf.getChannelData(0);
      for (let i = 0; i < popLen; i++) {
        popData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / popLen, 3);
      }
      const pop = ctx.createBufferSource(); pop.buffer = popBuf;
      const popG = ctx.createGain();
      popG.gain.setValueAtTime(v * 0.9, now);
      popG.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      pop.connect(popG); popG.connect(ctx.destination);
      pop.start(now); pop.stop(now + 0.025);

      // Layer 2: Quick upward "zip" — sine 800→3000Hz, very fast
      const zip = ctx.createOscillator();
      zip.type = 'sine';
      zip.frequency.setValueAtTime(800, now);
      zip.frequency.exponentialRampToValueAtTime(3000, now + 0.08);
      const zipG = ctx.createGain();
      zipG.gain.setValueAtTime(v * 0.35, now + 0.005);
      zipG.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      zip.connect(zipG); zipG.connect(ctx.destination);
      zip.start(now + 0.005); zip.stop(now + 0.1);

      // Layer 3: Tiny tonal "ping" at 1600Hz for character
      const ping = ctx.createOscillator();
      ping.type = 'triangle';
      ping.frequency.value = 1600;
      const pingG = ctx.createGain();
      pingG.gain.setValueAtTime(v * 0.2, now);
      pingG.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      ping.connect(pingG); pingG.connect(ctx.destination);
      ping.start(now); ping.stop(now + 0.06);

    } else if (systemKey === 'davids_sling') {
      // ── David's Sling: CLUNK-hisssss ───────────────────
      // Metallic clunk attack → sustained white-noise hiss tail
      // Signature: chunky ignition thud, then you hear the rocket burning.

      // Layer 1: Metallic clunk — two quick descending tones (like a latch releasing)
      const clunk1 = ctx.createOscillator();
      clunk1.type = 'square';
      clunk1.frequency.setValueAtTime(400, now);
      clunk1.frequency.exponentialRampToValueAtTime(150, now + 0.04);
      const clunkG1 = ctx.createGain();
      clunkG1.gain.setValueAtTime(v * 0.5, now);
      clunkG1.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      clunk1.connect(clunkG1); clunkG1.connect(ctx.destination);
      clunk1.start(now); clunk1.stop(now + 0.06);

      const clunk2 = ctx.createOscillator();
      clunk2.type = 'square';
      clunk2.frequency.setValueAtTime(300, now + 0.03);
      clunk2.frequency.exponentialRampToValueAtTime(100, now + 0.07);
      const clunkG2 = ctx.createGain();
      clunkG2.gain.setValueAtTime(v * 0.35, now + 0.03);
      clunkG2.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      clunk2.connect(clunkG2); clunkG2.connect(ctx.destination);
      clunk2.start(now + 0.03); clunk2.stop(now + 0.09);

      // Layer 2: Sustained hiss — bandpass-filtered noise, ramps up then decays
      // This is the "rocket burn" that makes it sound totally different from Iron Dome
      const hissLen = Math.floor(ctx.sampleRate * 0.35);
      const hissBuf = ctx.createBuffer(1, hissLen, ctx.sampleRate);
      const hissData = hissBuf.getChannelData(0);
      for (let i = 0; i < hissLen; i++) {
        hissData[i] = (Math.random() * 2 - 1) * 0.8;
      }
      const hiss = ctx.createBufferSource(); hiss.buffer = hissBuf;
      const hissBP = ctx.createBiquadFilter();
      hissBP.type = 'bandpass'; hissBP.frequency.value = 3500; hissBP.Q.value = 0.7;
      const hissG = ctx.createGain();
      hissG.gain.setValueAtTime(0.001, now);
      hissG.gain.linearRampToValueAtTime(v * 0.3, now + 0.06);
      hissG.gain.setValueAtTime(v * 0.25, now + 0.15);
      hissG.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      hiss.connect(hissBP); hissBP.connect(hissG); hissG.connect(ctx.destination);
      hiss.start(now + 0.02); hiss.stop(now + 0.35);

      // Layer 3: Low thump on ignition
      const thump = ctx.createOscillator();
      thump.type = 'sine';
      thump.frequency.setValueAtTime(120, now);
      thump.frequency.exponentialRampToValueAtTime(50, now + 0.08);
      const thumpG = ctx.createGain();
      thumpG.gain.setValueAtTime(v * 0.4, now);
      thumpG.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      thump.connect(thumpG); thumpG.connect(ctx.destination);
      thump.start(now); thump.stop(now + 0.12);

    } else if (systemKey === 'arrow_2') {
      // ── Arrow 2: THOOM-rumble ──────────────────────────
      // Deep cannon-shot boom → rolling low-frequency rumble
      // Signature: you FEEL this one. Massive bass punch, shakes the room.

      // Layer 1: Cannon shot — powerful sine thud (55Hz, fast attack)
      const cannon = ctx.createOscillator();
      cannon.type = 'sine';
      cannon.frequency.setValueAtTime(55, now);
      cannon.frequency.exponentialRampToValueAtTime(28, now + 0.2);
      const cannonG = ctx.createGain();
      cannonG.gain.setValueAtTime(v * 0.9, now);
      cannonG.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      cannon.connect(cannonG); cannonG.connect(ctx.destination);
      cannon.start(now); cannon.stop(now + 0.3);

      // Layer 2: Rolling rumble — low-pass filtered noise, slow buildup + long tail
      const rumbleLen = Math.floor(ctx.sampleRate * 0.5);
      const rumbleBuf = ctx.createBuffer(1, rumbleLen, ctx.sampleRate);
      const rumbleData = rumbleBuf.getChannelData(0);
      for (let i = 0; i < rumbleLen; i++) {
        const t = i / rumbleLen;
        rumbleData[i] = (Math.random() * 2 - 1) * (t < 0.1 ? t / 0.1 : Math.pow(1 - t, 0.6));
      }
      const rumble = ctx.createBufferSource(); rumble.buffer = rumbleBuf;
      const rumbleLP = ctx.createBiquadFilter();
      rumbleLP.type = 'lowpass'; rumbleLP.frequency.value = 400;
      const rumbleG = ctx.createGain();
      rumbleG.gain.setValueAtTime(v * 0.45, now + 0.02);
      rumbleG.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      rumble.connect(rumbleLP); rumbleLP.connect(rumbleG); rumbleG.connect(ctx.destination);
      rumble.start(now + 0.02); rumble.stop(now + 0.5);

      // Layer 3: Secondary bass pulse (staggered 30ms later for "double thud" feel)
      const pulse = ctx.createOscillator();
      pulse.type = 'sine';
      pulse.frequency.setValueAtTime(40, now + 0.03);
      pulse.frequency.exponentialRampToValueAtTime(20, now + 0.15);
      const pulseG = ctx.createGain();
      pulseG.gain.setValueAtTime(v * 0.5, now + 0.03);
      pulseG.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      pulse.connect(pulseG); pulseG.connect(ctx.destination);
      pulse.start(now + 0.03); pulse.stop(now + 0.2);

    } else if (systemKey === 'arrow_3') {
      // ── Arrow 3: ZAP-weeeee ────────────────────────────
      // Electric crackle/zap attack → ascending whistle fading into space
      // Signature: sci-fi energy weapon feel. Nothing else sounds like this.

      // Layer 1: Electric ZAP — rapid oscillating burst (FM synthesis feel)
      const zap = ctx.createOscillator();
      zap.type = 'sawtooth';
      zap.frequency.setValueAtTime(2000, now);
      zap.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      const zapG = ctx.createGain();
      zapG.gain.setValueAtTime(v * 0.6, now);
      zapG.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      zap.connect(zapG); zapG.connect(ctx.destination);
      zap.start(now); zap.stop(now + 0.06);

      // Layer 2: Electric crackle — very short high-freq noise burst
      const crackLen = Math.floor(ctx.sampleRate * 0.025);
      const crackBuf = ctx.createBuffer(1, crackLen, ctx.sampleRate);
      const crackData = crackBuf.getChannelData(0);
      for (let i = 0; i < crackLen; i++) {
        crackData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / crackLen, 2);
      }
      const crack = ctx.createBufferSource(); crack.buffer = crackBuf;
      const crackHP = ctx.createBiquadFilter();
      crackHP.type = 'highpass'; crackHP.frequency.value = 5000;
      const crackG = ctx.createGain();
      crackG.gain.setValueAtTime(v * 0.7, now);
      crackG.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      crack.connect(crackHP); crackHP.connect(crackG); crackG.connect(ctx.destination);
      crack.start(now); crack.stop(now + 0.04);

      // Layer 3: Ascending whistle — the "going to space" signature
      // Rises from 600Hz → 5000Hz over 0.4s, unique ascending character
      const whistle = ctx.createOscillator();
      whistle.type = 'sine';
      whistle.frequency.setValueAtTime(600, now + 0.04);
      whistle.frequency.exponentialRampToValueAtTime(5000, now + 0.45);
      const whistleG = ctx.createGain();
      whistleG.gain.setValueAtTime(0.001, now);
      whistleG.gain.linearRampToValueAtTime(v * 0.2, now + 0.08);
      whistleG.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      whistle.connect(whistleG); whistleG.connect(ctx.destination);
      whistle.start(now + 0.04); whistle.stop(now + 0.45);

      // Layer 4: Sub thud — slight bass anchor so it doesn't feel weightless
      const sub = ctx.createOscillator();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(80, now);
      sub.frequency.exponentialRampToValueAtTime(30, now + 0.1);
      const subG = ctx.createGain();
      subG.gain.setValueAtTime(v * 0.3, now);
      subG.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      sub.connect(subG); subG.connect(ctx.destination);
      sub.start(now); sub.stop(now + 0.12);
    }
  } catch (e) {
    // Silently fail
  }
}


// ── Perfect Level Fanfare ─────────────────────────────────────
// Triumphant ascending brass chord + shimmer cascade (~2.3s)
// Played when a level ends with 0 sirens, 0 wasted, 0 wrong system
export function playPerfectFanfare(volume = 0.7) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const v = volume;

    // Layer 1: Ascending brass chord  C4 → E4 → G4 → C5
    const brassNotes = [261.63, 329.63, 392.00, 523.25];
    brassNotes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + i * 0.18);

      const filt = ctx.createBiquadFilter();
      filt.type = 'lowpass';
      filt.frequency.setValueAtTime(1200, now + i * 0.18);
      filt.Q.setValueAtTime(2, now);

      const g = ctx.createGain();
      const onset = now + i * 0.18;
      g.gain.setValueAtTime(0.001, onset);
      g.gain.linearRampToValueAtTime(v * 0.18, onset + 0.06);
      g.gain.setValueAtTime(v * 0.18, onset + 0.4);
      g.gain.exponentialRampToValueAtTime(0.001, onset + 1.8);

      osc.connect(filt);
      filt.connect(g);
      g.connect(ctx.destination);
      osc.start(onset);
      osc.stop(onset + 1.8);
    });

    // Layer 2: Shimmer cascade — high sparkle notes
    const shimmerFreqs = [1568, 2093, 2637, 3136, 2093];
    shimmerFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.7 + i * 0.1);

      const g = ctx.createGain();
      const onset = now + 0.7 + i * 0.1;
      g.gain.setValueAtTime(0.001, onset);
      g.gain.linearRampToValueAtTime(v * 0.08, onset + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, onset + 0.35);

      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(onset);
      osc.stop(onset + 0.35);
    });

    // Layer 3: Sustained power chord (C4+G4) — warm pad underneath
    [261.63, 392.00].forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + 0.5);

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.001, now + 0.5);
      g.gain.linearRampToValueAtTime(v * 0.12, now + 0.8);
      g.gain.setValueAtTime(v * 0.12, now + 1.5);
      g.gain.exponentialRampToValueAtTime(0.001, now + 2.3);

      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now + 0.5);
      osc.stop(now + 2.3);
    });

    // Layer 4: Victory thump — satisfying low-end punch
    const thump = ctx.createOscillator();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(100, now);
    thump.frequency.exponentialRampToValueAtTime(40, now + 0.2);
    const thumpG = ctx.createGain();
    thumpG.gain.setValueAtTime(v * 0.4, now);
    thumpG.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    thump.connect(thumpG);
    thumpG.connect(ctx.destination);
    thump.start(now);
    thump.stop(now + 0.25);
  } catch (e) {
    // Silently fail
  }
}
