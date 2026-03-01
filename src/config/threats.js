// ============================================================
// MISSILE DEFENSE — Threat Configuration (7-Level Campaign)
// ============================================================
//
// Defense System Matching:
//   Iron Dome     → Drones + Rockets  (Key 1)
//   David's Sling → Cruise Missiles   (Key 2)
//   Arrow 2       → Ballistic         (Key 3)
//   Arrow 3       → Hypersonic        (Key 4)
//
// Intel Levels: 'full' (all levels use full intel)
// reveal_pct: Fraction of countdown remaining when impact zone reveals
//   1.0 = revealed immediately, 0.4 = revealed at 40% time remaining
// priority: true for Dimona targets (triggers longer siren)
// is_final_salvo: Part of the named final salvo wave
// ============================================================

// Command center — single launch point for ALL interceptors
export const COMMAND_CENTER = { x: 0.30, y: 0.38 };

export const POPULATED_ZONES = [
  { name: 'Tel Aviv', x: 0.30, y: 0.33 },
  { name: 'Jerusalem', x: 0.42, y: 0.39 },
  { name: 'Haifa', x: 0.36, y: 0.17 },
  { name: 'Ashdod', x: 0.27, y: 0.39 },
  { name: 'Beersheba', x: 0.31, y: 0.51 },
  { name: 'Eilat', x: 0.35, y: 0.89 },
  { name: 'Dimona', x: 0.37, y: 0.55 },
  { name: 'Netanya', x: 0.33, y: 0.27 },
  { name: 'Ashkelon', x: 0.25, y: 0.42 },
  { name: 'Teveriah', x: 0.51, y: 0.17 },
  { name: 'Tzfat', x: 0.50, y: 0.13 },
  { name: 'Kiryat Shmona', x: 0.52, y: 0.08 },
  { name: 'Sderot', x: 0.26, y: 0.45 },
  { name: 'Nahariya', x: 0.39, y: 0.12 },
];

export const THREAT_COLORS = {
  drone: '#eab308',
  rocket: '#f97316',
  cruise: '#3b82f6',
  ballistic: '#ef4444',
  hypersonic: '#a855f7',
};

// Shared map of all impact zone names to radar coordinates
export const IMPACT_POSITIONS = {
  'Tel Aviv': { x: 0.30, y: 0.33 },
  'Jerusalem': { x: 0.42, y: 0.39 },
  'Haifa': { x: 0.36, y: 0.17 },
  'Ashdod': { x: 0.27, y: 0.39 },
  'Beersheba': { x: 0.31, y: 0.51 },
  'Eilat': { x: 0.35, y: 0.89 },
  'Dimona': { x: 0.37, y: 0.55 },
  'Netanya': { x: 0.33, y: 0.27 },
  'Ashkelon': { x: 0.25, y: 0.42 },
  'Teveriah': { x: 0.51, y: 0.17 },
  'Tzfat': { x: 0.50, y: 0.13 },
  'Kiryat Shmona': { x: 0.52, y: 0.08 },
  'Sderot': { x: 0.26, y: 0.45 },
  'Nahariya': { x: 0.39, y: 0.12 },
  // Open ground areas
  'Negev Desert': { x: 0.31, y: 0.61 },
  'Northern Negev': { x: 0.26, y: 0.50 },
  'Central Negev': { x: 0.34, y: 0.65 },
  'Southern Negev': { x: 0.36, y: 0.74 },
  'Dead Sea Region': { x: 0.48, y: 0.45 },
  'Golan Heights': { x: 0.56, y: 0.13 },
  'Jordan Valley': { x: 0.51, y: 0.30 },
  'Judean Hills': { x: 0.40, y: 0.41 },
  'Judean Desert': { x: 0.46, y: 0.43 },
  'Arava Valley': { x: 0.40, y: 0.79 },
  'Mediterranean (off-coast)': { x: 0.20, y: 0.32 },
  'Western Galilee': { x: 0.38, y: 0.12 },
  'Upper Galilee': { x: 0.48, y: 0.11 },
  'Coastal Plain': { x: 0.30, y: 0.37 },
  'Sinai Border Region': { x: 0.20, y: 0.68 },
  'Off-course (Saudi Arabia)': { x: 0.80, y: 0.65 },
  'Off-course (Red Sea)': { x: 0.55, y: 0.85 },
  'Off-course (Jordan)': { x: 0.65, y: 0.45 },
};

// Interceptor system colors — matched to threat type colors
export const INTERCEPTOR_COLORS = {
  iron_dome:    '#eab308',   // matches drone/rocket warm tones
  davids_sling: '#3b82f6',   // matches cruise blue
  arrow_2:      '#ef4444',   // matches ballistic red
  arrow_3:      '#a855f7',   // matches hypersonic purple
};

// -----------------------------------------------------------
// Threat Builder Helpers
// -----------------------------------------------------------
export const THREAT_DATA = {
  drone: {
    names: ['Samad-3 Attack Drone', 'Shahed-136 Attack Drone', 'Ababil-3 Drone'],
    speeds: [0.2, 0.3, 0.4, 0.5],
    altitudes: [1, 2, 3, 4, 5],
    trajectories: ['Low altitude, flat, steady', 'Low altitude, erratic pattern', 'Low, hugging terrain contours'],
    correct_action: 'iron_dome',
  },
  rocket: {
    names: ['Qassam Rocket', 'Grad Rocket', 'Fajr-5 Rocket'],
    speeds: [1.0, 1.2, 1.5, 1.8, 2.0],
    altitudes: [8, 10, 12, 15, 18],
    trajectories: ['Unguided ballistic arc', 'Short-range ballistic', 'High-angle lob trajectory'],
    correct_action: 'iron_dome',
  },
  cruise: {
    names: ['Quds Cruise Missile', 'Soumar Cruise Missile', 'Paveh Cruise Missile'],
    speeds: [0.8, 0.9, 1.0, 1.1, 1.2],
    altitudes: [5, 6, 7, 8, 9, 10],
    trajectories: ['Low altitude, terrain-following', 'Sea-skimming approach, low profile', 'Low altitude, weaving trajectory'],
    correct_action: 'davids_sling',
  },
  ballistic: {
    names: ['Shahab-3 Ballistic Missile', 'Fateh-110 Ballistic Missile', 'Emad Ballistic Missile', 'Toofan Ballistic Missile'],
    speeds: [7, 7.5, 8, 8.5, 9, 9.5],
    altitudes: [25, 28, 32, 35, 38, 40, 42],
    trajectories: ['High parabolic arc, steep descent', 'High arc, standard ballistic trajectory', 'Medium arc, steep terminal phase'],
    correct_action: 'arrow_2',
  },
  hypersonic: {
    names: ['DF-ZF Hypersonic Glide Vehicle', 'Fattah Hypersonic Missile'],
    speeds: [12, 13, 14, 15, 16],
    altitudes: [75, 80, 85, 90, 95, 100],
    trajectories: ['Very high arc, exo-atmospheric, fast reentry', 'Boost-glide trajectory, maneuvering', 'Skip-glide reentry, high energy'],
    correct_action: 'arrow_3',
  },
};

function pick(arr, seed) {
  return arr[seed % arr.length];
}

function threat(id, time, type, zone, populated, cdn, intel, reveal, extra = {}) {
  const d = THREAT_DATA[type];
  return {
    id,
    name: pick(d.names, id),
    type,
    speed_mach: pick(d.speeds, id + 3),
    altitude_km: pick(d.altitudes, id + 1),
    trajectory: pick(d.trajectories, id),
    impact_zone: zone,
    is_populated: populated,
    correct_action: d.correct_action,
    appear_time: time,
    countdown: cdn,
    intel,
    reveal_pct: reveal,
    origin: 'southeast', // default — overridden per-threat for geographic accuracy
    priority: false,
    is_final_salvo: false,
    ...extra,
  };
}

// ============================================================
// LEVEL 1: Drones only, Iron Dome only
// Duration: 120s | 15 threats | Teaches: intercept + hold fire
// ============================================================
const THREATS_L1 = [
  // Opening: quick intro — 6s gaps (drones from southeast = Yemen/Iran corridor)
  threat(1,  3,  'drone', 'Beersheba',       true,  14, 'full', 1.0, { origin: 'southeast' }),
  threat(2,  9,  'drone', 'Negev Desert',    false, 13, 'full', 1.0, { origin: 'southeast' }),  // hold fire
  threat(3,  15, 'drone', 'Ashdod',          true,  13, 'full', 1.0, { origin: 'southeast' }),
  threat(4,  21, 'drone', 'Arava Valley',    false, 13, 'full', 1.0, { origin: 'south' }),      // hold fire
  // Pairs begin — 7s gaps, first overlap
  threat(5,  28, 'drone', 'Jerusalem',       true,  12, 'full', 1.0, { origin: 'east' }),
  threat(6,  30, 'drone', 'Northern Negev',  false, 12, 'full', 1.0, { origin: 'southeast' }),  // hold fire
  // Tempo up — 6s gaps
  threat(7,  37, 'drone', 'Tel Aviv',        true,  11, 'full', 1.0, { origin: 'east' }),
  threat(8,  43, 'drone', 'Dimona',          true,  11, 'full', 1.0, { origin: 'southeast' }),
  // Triple overlap
  threat(9,  50, 'drone', 'Ashkelon',        true,  11, 'full', 1.0, { origin: 'southeast' }),
  threat(10, 52, 'drone', 'Central Negev',   false, 11, 'full', 1.0, { origin: 'south' }),      // hold fire
  // Escalation — simultaneous pair
  threat(11, 60, 'drone', 'Netanya',         true,  10, 'full', 1.0, { origin: 'east' }),
  threat(12, 60, 'drone', 'Beersheba',       true,  10, 'full', 1.0, { origin: 'southeast' }),
  // Closing wave — rapid fire
  threat(13, 68, 'drone', 'Haifa',           true,  10, 'full', 1.0, { origin: 'north' }),      // Lebanon/Hezbollah
  threat(14, 70, 'drone', 'Judean Hills',    false, 10, 'full', 1.0, { origin: 'east' }),       // hold fire
  threat(15, 72, 'drone', 'Tel Aviv',        true,  9,  'full', 1.0, { origin: 'east' }),
];

// ============================================================
// LEVEL 2: Rockets + Drones, Iron Dome only
// Duration: 120s | 16 threats | Introduces: rockets
// ============================================================
const THREATS_L2 = [
  // Opening: familiar drone, then first rocket — 6s gaps
  threat(1,  4,  'drone',  'Sderot',          true,  14, 'full', 1.0, { origin: 'southeast' }),
  threat(2,  10, 'rocket', 'Ashkelon',        true,  13, 'full', 1.0, { origin: 'southwest' }),  // First rocket! From Gaza
  threat(3,  16, 'drone',  'Negev Desert',    false, 13, 'full', 1.0, { origin: 'southeast' }),  // hold fire
  threat(4,  22, 'rocket', 'Sderot',          true,  12, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  // Mixed pair — 7s gap, then overlap
  threat(5,  29, 'drone',  'Beersheba',       true,  12, 'full', 1.0, { origin: 'southeast' }),
  threat(6,  31, 'rocket', 'Northern Negev',  false, 12, 'full', 1.0, { origin: 'southwest' }),  // hold fire, Gaza
  // Tempo up — 6s gaps
  threat(7,  38, 'rocket', 'Ashdod',          true,  11, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  threat(8,  45, 'drone',  'Arava Valley',    false, 12, 'full', 1.0, { origin: 'south' }),      // hold fire
  threat(9,  52, 'rocket', 'Tel Aviv',        true,  11, 'full', 1.0, { origin: 'southwest' }),  // Gaza (long range)
  threat(10, 58, 'drone',  'Netanya',         true,  11, 'full', 1.0, { origin: 'east' }),
  // Pairs overlap — 4s gaps
  threat(11, 65, 'rocket', 'Jerusalem',       true,  11, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  threat(12, 67, 'drone',  'Ashkelon',        true,  11, 'full', 1.0, { origin: 'southeast' }),
  // Closing burst — rapid fire
  threat(13, 75, 'rocket', 'Sderot',          true,  10, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  threat(14, 77, 'drone',  'Beersheba',       true,  11, 'full', 1.0, { origin: 'southeast' }),
  threat(15, 85, 'rocket', 'Dimona',          true,  10, 'full', 1.0, { origin: 'southwest', priority: true }),  // Gaza
  threat(16, 87, 'rocket', 'Central Negev',   false, 11, 'full', 1.0, { origin: 'southwest' }),  // hold fire, Gaza
];

// ============================================================
// LEVEL 3: Cruise + Drones + Rockets, introduces David's Sling
// Duration: 160s | 18 threats
// ============================================================
const THREATS_L3 = [
  // Warm-up with known types
  threat(1,  4,  'drone',  'Beersheba',       true,  14, 'full', 1.0, { origin: 'southeast' }),
  threat(2,  14, 'rocket', 'Sderot',          true,  12, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  // First cruise missile! From Iran
  threat(3,  24, 'cruise', 'Tel Aviv',        true,  12, 'full', 1.0, { origin: 'east' }),
  threat(4,  34, 'drone',  'Arava Valley',    false, 13, 'full', 1.0, { origin: 'south' }),      // hold fire
  threat(5,  42, 'cruise', 'Haifa',           true,  11, 'full', 1.0, { origin: 'north' }),      // Lebanon
  threat(6,  50, 'rocket', 'Ashkelon',        true,  12, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  // Mixed pair
  threat(7,  60, 'cruise', 'Jerusalem',       true,  11, 'full', 1.0, { origin: 'east' }),       // Iran
  threat(8,  62, 'drone',  'Northern Negev',  false, 13, 'full', 1.0, { origin: 'southeast' }),  // hold fire
  // Tempo up
  threat(9,  72, 'rocket', 'Ashdod',          true,  11, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  threat(10, 80, 'cruise', 'Netanya',         true,  10, 'full', 1.0, { origin: 'east' }),       // Iran
  threat(11, 88, 'drone',  'Beersheba',       true,  12, 'full', 1.0, { origin: 'southeast' }),
  // Pairs overlap
  threat(12, 98, 'cruise', 'Tel Aviv',        true,  10, 'full', 1.0, { origin: 'east' }),       // Iran
  threat(13, 100,'rocket', 'Sderot',          true,  11, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  // Closing triple
  threat(14, 118,'cruise', 'Dimona',          true,  10, 'full', 1.0, { origin: 'east', priority: true }),  // Iran
  threat(15, 120,'drone',  'Haifa',           true,  12, 'full', 1.0, { origin: 'north' }),      // Lebanon
  threat(16, 122,'rocket', 'Ashkelon',        true,  11, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  // Final pair
  threat(17, 134,'cruise', 'Central Negev',   false, 10, 'full', 1.0, { origin: 'east' }),       // hold fire, Iran
  threat(18, 136,'drone',  'Jerusalem',       true,  12, 'full', 1.0, { origin: 'east' }),
];

// ============================================================
// LEVEL 4: Ballistic + all previous, introduces Arrow 2
// Duration: 170s | 20 threats
// ============================================================
const THREATS_L4 = [
  // Warm-up with known types
  threat(1,  4,  'drone',     'Beersheba',       true,  13, 'full', 1.0, { origin: 'southeast' }),
  threat(2,  12, 'cruise',    'Haifa',           true,  11, 'full', 1.0, { origin: 'north' }),       // Lebanon
  threat(3,  20, 'rocket',    'Sderot',          true,  12, 'full', 1.0, { origin: 'southwest' }),   // Gaza
  // First ballistic! From Iran
  threat(4,  30, 'ballistic', 'Tel Aviv',        true,  13, 'full', 0.40, { origin: 'east' }),
  threat(5,  40, 'drone',     'Negev Desert',    false, 13, 'full', 1.0, { origin: 'southeast' }),   // hold fire
  threat(6,  48, 'ballistic', 'Jerusalem',       true,  12, 'full', 0.40, { origin: 'east' }),       // Iran
  // Mixed pairs
  threat(7,  58, 'cruise',    'Netanya',         true,  10, 'full', 1.0, { origin: 'east' }),        // Iran
  threat(8,  60, 'rocket',    'Ashkelon',        true,  11, 'full', 1.0, { origin: 'southwest' }),   // Gaza
  threat(9,  70, 'ballistic', 'Beersheba',       true,  12, 'full', 0.40, { origin: 'east' }),       // Iran
  threat(10, 78, 'drone',     'Golan Heights',   false, 12, 'full', 1.0, { origin: 'northeast' }),   // hold fire, Syria
  // Triple
  threat(11, 88, 'ballistic', 'Dimona',          true,  12, 'full', 0.35, { origin: 'east', priority: true }),  // Iran
  threat(12, 90, 'cruise',    'Ashdod',          true,  10, 'full', 1.0, { origin: 'east' }),        // Iran
  threat(13, 92, 'rocket',    'Sderot',          true,  11, 'full', 1.0, { origin: 'southwest' }),   // Gaza
  // Tempo up
  threat(14, 104,'drone',     'Tel Aviv',        true,  12, 'full', 1.0, { origin: 'east' }),
  threat(15, 112,'ballistic', 'Haifa',           true,  11, 'full', 0.40, { origin: 'east' }),       // Iran
  threat(16, 120,'cruise',    'Arava Valley',    false, 10, 'full', 1.0, { origin: 'east' }),        // hold fire, Iran
  // Closing quad
  threat(17, 134,'ballistic', 'Jerusalem',       true,  11, 'full', 0.35, { origin: 'east' }),       // Iran
  threat(18, 136,'cruise',    'Netanya',         true,  10, 'full', 1.0, { origin: 'north' }),       // Lebanon
  threat(19, 138,'rocket',    'Beersheba',       true,  11, 'full', 1.0, { origin: 'southwest' }),   // Gaza
  threat(20, 140,'drone',     'Northern Negev',  false, 12, 'full', 1.0, { origin: 'southeast' }),   // hold fire
];

// ============================================================
// LEVEL 5: Hypersonic + all types, introduces Arrow 3
// Duration: 180s | 22 threats
// ============================================================
const THREATS_L5 = [
  // Warm-up
  threat(1,  4,  'drone',      'Beersheba',       true,  13, 'full', 1.0, { origin: 'southeast' }),
  threat(2,  12, 'cruise',     'Haifa',           true,  10, 'full', 1.0, { origin: 'north' }),      // Lebanon
  threat(3,  20, 'ballistic',  'Negev Desert',    false, 12, 'full', 0.45, { origin: 'east' }),      // hold fire, Iran
  // First hypersonic! From Iran
  threat(4,  30, 'hypersonic', 'Tel Aviv',        true,  10, 'full', 0.40, { origin: 'east' }),
  threat(5,  40, 'rocket',     'Sderot',          true,  12, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  threat(6,  48, 'hypersonic', 'Jerusalem',       true,   9, 'full', 0.35, { origin: 'east' }),      // Iran
  // Mixed pairs
  threat(7,  58, 'cruise',     'Netanya',         true,  10, 'full', 1.0, { origin: 'east' }),       // Iran
  threat(8,  60, 'ballistic',  'Beersheba',       true,  11, 'full', 0.40, { origin: 'east' }),      // Iran
  threat(9,  70, 'hypersonic', 'Dead Sea Region', false,  9, 'full', 0.50, { origin: 'east' }),      // hold fire, Iran
  threat(10, 78, 'drone',      'Ashkelon',        true,  12, 'full', 1.0, { origin: 'southeast' }),
  // Escalation — triple
  threat(11, 90, 'ballistic',  'Dimona',          true,  11, 'full', 0.35, { origin: 'east', priority: true }),  // Iran
  threat(12, 92, 'hypersonic', 'Haifa',           true,   9, 'full', 0.35, { origin: 'east' }),      // Iran
  threat(13, 94, 'rocket',     'Ashdod',          true,  11, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  // More mixed
  threat(14, 108,'cruise',     'Tel Aviv',        true,  10, 'full', 1.0, { origin: 'east' }),       // Iran
  threat(15, 116,'drone',      'Golan Heights',   false, 12, 'full', 1.0, { origin: 'northeast' }),  // hold fire, Syria
  threat(16, 124,'hypersonic', 'Jerusalem',       true,   9, 'full', 0.35, { origin: 'east' }),      // Iran
  threat(17, 130,'ballistic',  'Ashkelon',        true,  11, 'full', 0.40, { origin: 'east' }),      // Iran
  // Closing quad
  threat(18, 146,'hypersonic', 'Tel Aviv',        true,   9, 'full', 0.35, { origin: 'east' }),      // Iran
  threat(19, 148,'cruise',     'Haifa',           true,  10, 'full', 1.0, { origin: 'north' }),      // Lebanon
  threat(20, 150,'ballistic',  'Beersheba',       true,  11, 'full', 0.40, { origin: 'east' }),      // Iran
  threat(21, 152,'rocket',     'Netanya',         true,  11, 'full', 1.0, { origin: 'north' }),      // Lebanon rockets
  threat(22, 154,'drone',      'Northern Negev',  false, 12, 'full', 1.0, { origin: 'southeast' }),  // hold fire
];

// ============================================================
// LEVEL 6: Wave-based assault — all types, all systems
// Duration: 180s | 24 threats in clear waves
// ============================================================
const THREATS_L6 = [
  // WAVE 1: Easy warm-up pair
  threat(1,  4,  'drone',      'Beersheba',       true,  14, 'full', 1.0, { origin: 'southeast' }),
  threat(2,  6,  'rocket',     'Sderot',          true,  13, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  // WAVE 2: Add cruise + hold fire
  threat(3,  22, 'cruise',     'Tel Aviv',        true,  11, 'full', 1.0, { origin: 'east' }),       // Iran
  threat(4,  24, 'drone',      'Negev Desert',    false, 13, 'full', 1.0, { origin: 'southeast' }),  // hold fire
  // WAVE 3: All types mixed — simultaneous!
  threat(5,  42, 'ballistic',  'Jerusalem',       true,  12, 'full', 0.40, { origin: 'east' }),      // Iran
  threat(6,  44, 'cruise',     'Haifa',           true,  10, 'full', 1.0, { origin: 'north' }),      // Lebanon
  threat(7,  46, 'rocket',     'Ashkelon',        true,  12, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  // WAVE 4: Hypersonic + ballistic
  threat(8,  64, 'hypersonic', 'Tel Aviv',        true,  10, 'full', 0.40, { origin: 'east' }),      // Iran
  threat(9,  66, 'ballistic',  'Beersheba',       true,  11, 'full', 0.40, { origin: 'east' }),      // Iran
  threat(10, 68, 'drone',      'Arava Valley',    false, 12, 'full', 1.0, { origin: 'south' }),      // hold fire
  // WAVE 5: Heavy pressure — 4 simultaneous
  threat(11, 86, 'cruise',     'Netanya',         true,  10, 'full', 1.0, { origin: 'north' }),      // Lebanon
  threat(12, 86, 'rocket',     'Sderot',          true,  11, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  threat(13, 88, 'ballistic',  'Dimona',          true,  11, 'full', 0.35, { origin: 'east', priority: true }),  // Iran
  threat(14, 88, 'hypersonic', 'Haifa',           true,   9, 'full', 0.35, { origin: 'east' }),      // Iran
  // WAVE 6: Mixed with hold fires
  threat(15, 108,'drone',      'Tel Aviv',        true,  12, 'full', 1.0, { origin: 'east' }),
  threat(16, 108,'cruise',     'Dead Sea Region', false, 10, 'full', 1.0, { origin: 'east' }),       // hold fire, Iran
  threat(17, 110,'ballistic',  'Jerusalem',       true,  11, 'full', 0.40, { origin: 'east' }),      // Iran
  threat(18, 110,'rocket',     'Ashkelon',        true,  11, 'full', 1.0, { origin: 'southwest' }),  // Gaza
  // WAVE 7: Final massive wave — 6 threats
  threat(19, 136,'hypersonic', 'Tel Aviv',        true,   9, 'full', 0.35, { origin: 'east' }),      // Iran
  threat(20, 136,'ballistic',  'Haifa',           true,  11, 'full', 0.40, { origin: 'east' }),      // Iran
  threat(21, 138,'cruise',     'Beersheba',       true,  10, 'full', 1.0, { origin: 'east' }),       // Iran
  threat(22, 138,'drone',      'Netanya',         true,  12, 'full', 1.0, { origin: 'east' }),
  threat(23, 140,'rocket',     'Dimona',          true,  10, 'full', 1.0, { origin: 'southwest', priority: true }),  // Gaza
  threat(24, 140,'hypersonic', 'Central Negev',   false,  9, 'full', 0.50, { origin: 'east' }),      // hold fire, Iran
];

// ============================================================
// LEVEL 7: Final Stand — massive salvos, limited ammo
// Duration: 180s | 28 threats, tight ammo
// ============================================================
const THREATS_L7 = [
  // Opening — deceptively calm
  threat(1,  4,  'drone',      'Beersheba',       true,  13, 'full', 1.0, { origin: 'southeast' }),
  threat(2,  10, 'rocket',     'Northern Negev',  false, 12, 'full', 1.0, { origin: 'southwest' }),   // hold fire, Gaza
  threat(3,  18, 'cruise',     'Haifa',           true,  10, 'full', 1.0, { origin: 'north' }),       // Lebanon
  threat(4,  26, 'ballistic',  'Negev Desert',    false, 12, 'full', 0.45, { origin: 'east' }),       // hold fire, Iran
  // Pressure builds — must be selective
  threat(5,  36, 'hypersonic', 'Tel Aviv',        true,  10, 'full', 0.40, { origin: 'east' }),       // Iran
  threat(6,  38, 'rocket',     'Sderot',          true,  11, 'full', 1.0, { origin: 'southwest' }),   // Gaza
  threat(7,  40, 'drone',      'Arava Valley',    false, 12, 'full', 1.0, { origin: 'south' }),       // hold fire
  // Salvos start — 3 at once
  threat(8,  52, 'ballistic',  'Jerusalem',       true,  11, 'full', 0.40, { origin: 'east' }),       // Iran
  threat(9,  52, 'cruise',     'Tel Aviv',        true,  10, 'full', 1.0, { origin: 'east' }),        // Iran
  threat(10, 54, 'rocket',     'Ashkelon',        true,  11, 'full', 1.0, { origin: 'southwest' }),   // Gaza
  // More salvos
  threat(11, 70, 'hypersonic', 'Haifa',           true,   9, 'full', 0.35, { origin: 'east' }),       // Iran
  threat(12, 70, 'drone',      'Beersheba',       true,  12, 'full', 1.0, { origin: 'southeast' }),
  threat(13, 72, 'ballistic',  'Dimona',          true,  11, 'full', 0.35, { origin: 'east', priority: true }),  // Iran
  threat(14, 72, 'cruise',     'Central Negev',   false, 10, 'full', 1.0, { origin: 'east' }),        // hold fire, Iran
  // Relentless — 4 at once
  threat(15, 90, 'hypersonic', 'Jerusalem',       true,   9, 'full', 0.35, { origin: 'east' }),       // Iran
  threat(16, 90, 'ballistic',  'Netanya',         true,  11, 'full', 0.40, { origin: 'east' }),       // Iran
  threat(17, 92, 'cruise',     'Ashdod',          true,  10, 'full', 1.0, { origin: 'east' }),        // Iran
  threat(18, 92, 'rocket',     'Sderot',          true,  11, 'full', 1.0, { origin: 'southwest' }),   // Gaza
  // Brief breather with hold fires
  threat(19, 110,'drone',      'Judean Hills',    false, 12, 'full', 1.0, { origin: 'east' }),        // hold fire
  threat(20, 112,'ballistic',  'Southern Negev',  false, 12, 'full', 0.45, { origin: 'east' }),       // hold fire, Iran
  // FINAL SALVO — 8 threats, overwhelming
  threat(21, 130,'hypersonic', 'Tel Aviv',        true,   9, 'full', 0.35, { origin: 'east', is_final_salvo: true }),      // Iran
  threat(22, 130,'ballistic',  'Jerusalem',       true,  11, 'full', 0.35, { origin: 'east', is_final_salvo: true }),      // Iran
  threat(23, 132,'cruise',     'Haifa',           true,  10, 'full', 1.0,  { origin: 'north', is_final_salvo: true }),     // Lebanon
  threat(24, 132,'rocket',     'Beersheba',       true,  10, 'full', 1.0,  { origin: 'southwest', is_final_salvo: true }),  // Gaza
  threat(25, 134,'hypersonic', 'Dimona',          true,   9, 'full', 0.35, { origin: 'east', is_final_salvo: true, priority: true }),  // Iran
  threat(26, 134,'drone',      'Ashkelon',        true,  12, 'full', 1.0,  { origin: 'southeast', is_final_salvo: true }),
  threat(27, 136,'ballistic',  'Netanya',         true,  11, 'full', 0.40, { origin: 'east', is_final_salvo: true }),      // Iran
  threat(28, 136,'cruise',     'Northern Negev',  false, 10, 'full', 1.0,  { origin: 'east', is_final_salvo: true }),      // hold fire, Iran
];

// ============================================================
// LEVEL CONFIGURATION
// ============================================================
export const LEVELS = [
  // Level 1: Drones + Iron Dome
  {
    id: 1,
    duration: 120,
    ammo: { iron_dome: 12 },
    available_systems: ['iron_dome'],
    auto_end_delay: 3000,
    new_system: null,
    new_threat: null,
    final_salvo_warning_time: null,
    final_salvo_start_time: null,
    threats: THREATS_L1,
  },
  // Level 2: Rockets (still Iron Dome only)
  {
    id: 2,
    duration: 120,
    ammo: { iron_dome: 14 },
    available_systems: ['iron_dome'],
    auto_end_delay: 3000,
    new_system: null,
    new_threat: { type: 'rocket', name: 'SHORT-RANGE ROCKETS', description: 'Unguided ballistic arc, short range', speed: 'Mach 1–2' },
    final_salvo_warning_time: null,
    final_salvo_start_time: null,
    threats: THREATS_L2,
  },
  // Level 3: Cruise Missiles + David's Sling
  {
    id: 3,
    duration: 160,
    ammo: { iron_dome: 10, davids_sling: 6 },
    available_systems: ['iron_dome', 'davids_sling'],
    auto_end_delay: 5000,
    new_system: { key: 'davids_sling', name: "DAVID'S SLING", shortcut: '2', color: '#3b82f6' },
    new_threat: { type: 'cruise', name: 'CRUISE MISSILES', description: 'Low altitude, terrain-following', speed: 'Mach 0.8–1.2' },
    final_salvo_warning_time: null,
    final_salvo_start_time: null,
    threats: THREATS_L3,
  },
  // Level 4: Ballistic Missiles + Arrow 2
  {
    id: 4,
    duration: 170,
    ammo: { iron_dome: 8, davids_sling: 5, arrow_2: 6 },
    available_systems: ['iron_dome', 'davids_sling', 'arrow_2'],
    auto_end_delay: 5000,
    new_system: { key: 'arrow_2', name: 'ARROW 2', shortcut: '3', color: '#ef4444' },
    new_threat: { type: 'ballistic', name: 'BALLISTIC MISSILES', description: 'High arc, fast reentry', speed: 'Mach 7–9.5' },
    final_salvo_warning_time: null,
    final_salvo_start_time: null,
    threats: THREATS_L4,
  },
  // Level 5: Hypersonic + Arrow 3
  {
    id: 5,
    duration: 180,
    ammo: { iron_dome: 7, davids_sling: 5, arrow_2: 5, arrow_3: 4 },
    available_systems: ['iron_dome', 'davids_sling', 'arrow_2', 'arrow_3'],
    auto_end_delay: 5000,
    new_system: { key: 'arrow_3', name: 'ARROW 3', shortcut: '4', color: '#a855f7' },
    new_threat: { type: 'hypersonic', name: 'HYPERSONIC GLIDE VEHICLES', description: 'Exo-atmospheric, extreme speed', speed: 'Mach 12–16' },
    final_salvo_warning_time: null,
    final_salvo_start_time: null,
    threats: THREATS_L5,
  },
  // Level 6: Wave-based assault — all types
  {
    id: 6,
    duration: 180,
    ammo: { iron_dome: 6, davids_sling: 5, arrow_2: 5, arrow_3: 4 },
    available_systems: ['iron_dome', 'davids_sling', 'arrow_2', 'arrow_3'],
    auto_end_delay: 6000,
    new_system: null,
    new_threat: null,
    final_salvo_warning_time: null,
    final_salvo_start_time: null,
    threats: THREATS_L6,
  },
  // Level 7: Final Stand — massive salvos, limited ammo
  {
    id: 7,
    duration: 180,
    ammo: { iron_dome: 5, davids_sling: 4, arrow_2: 4, arrow_3: 3 },
    available_systems: ['iron_dome', 'davids_sling', 'arrow_2', 'arrow_3'],
    auto_end_delay: 8000,
    new_system: null,
    new_threat: null,
    final_salvo_warning_time: 110,
    final_salvo_start_time: 130,
    threats: THREATS_L7,
  },
];

// -----------------------------------------------------------
// Public API — level-based
// -----------------------------------------------------------
export function getThreats(level) {
  const lvl = LEVELS[level - 1];
  return lvl ? lvl.threats : [];
}

export function getConfig(level) {
  return LEVELS[level - 1] || LEVELS[0];
}

export function getLevelConfig(level) {
  return LEVELS[level - 1] || LEVELS[0];
}

export const TOTAL_LEVELS = LEVELS.length;
