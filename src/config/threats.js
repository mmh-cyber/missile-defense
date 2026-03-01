// ============================================================
// MISSILE DEFENSE — Threat Configuration (5-Level Campaign)
// ============================================================
//
// Defense System Matching:
//   Iron Dome     → Drones          (Key 1)
//   David's Sling → Cruise Missiles (Key 2)
//   Arrow 2       → Ballistic       (Key 3)
//   Arrow 3       → Hypersonic      (Key 4)
//
// Intel Levels: 'full' | 'partial' | 'minimal'
// reveal_pct: Fraction of countdown remaining when impact zone reveals
//   1.0 = revealed immediately, 0.4 = revealed at 40% time remaining
// course_correct: { new_impact_zone, new_is_populated, at_pct }
// priority: true for Dimona targets (triggers longer siren)
// is_final_salvo: Part of the named final salvo wave
// ============================================================

// Command center — single launch point for ALL interceptors
export const COMMAND_CENTER = { x: 0.29, y: 0.40 };

export const POPULATED_ZONES = [
  { name: 'Tel Aviv', x: 0.29, y: 0.38 },
  { name: 'Jerusalem', x: 0.45, y: 0.43 },
  { name: 'Haifa', x: 0.28, y: 0.18 },
  { name: 'Ashdod', x: 0.30, y: 0.48 },
  { name: 'Beersheba', x: 0.40, y: 0.60 },
  { name: 'Eilat', x: 0.45, y: 0.90 },
  { name: 'Dimona', x: 0.48, y: 0.65 },
  { name: 'Netanya', x: 0.30, y: 0.32 },
  { name: 'Ashkelon', x: 0.28, y: 0.52 },
  { name: 'Teveriah', x: 0.42, y: 0.22 },
  { name: 'Tzfat', x: 0.40, y: 0.15 },
  { name: 'Kiryat Shmona', x: 0.42, y: 0.08 },
];

export const THREAT_COLORS = {
  drone: '#eab308',
  cruise: '#3b82f6',
  ballistic: '#ef4444',
  hypersonic: '#a855f7',
};

// Shared map of all impact zone names to radar coordinates
export const IMPACT_POSITIONS = {
  'Tel Aviv': { x: 0.29, y: 0.38 },
  'Jerusalem': { x: 0.45, y: 0.43 },
  'Haifa': { x: 0.28, y: 0.18 },
  'Ashdod': { x: 0.30, y: 0.48 },
  'Beersheba': { x: 0.40, y: 0.60 },
  'Eilat': { x: 0.45, y: 0.90 },
  'Dimona': { x: 0.48, y: 0.65 },
  'Netanya': { x: 0.30, y: 0.32 },
  'Ashkelon': { x: 0.28, y: 0.52 },
  'Teveriah': { x: 0.42, y: 0.22 },
  'Tzfat': { x: 0.40, y: 0.15 },
  'Kiryat Shmona': { x: 0.42, y: 0.08 },
  // Open ground areas
  'Negev Desert': { x: 0.38, y: 0.72 },
  'Northern Negev': { x: 0.35, y: 0.58 },
  'Central Negev': { x: 0.42, y: 0.70 },
  'Southern Negev': { x: 0.43, y: 0.80 },
  'Dead Sea Region': { x: 0.50, y: 0.50 },
  'Golan Heights': { x: 0.48, y: 0.15 },
  'Jordan Valley': { x: 0.52, y: 0.35 },
  'Judean Hills': { x: 0.42, y: 0.48 },
  'Judean Desert': { x: 0.50, y: 0.45 },
  'Arava Valley': { x: 0.50, y: 0.75 },
  'Mediterranean (off-coast)': { x: 0.18, y: 0.35 },
  'Western Galilee': { x: 0.28, y: 0.15 },
  'Upper Galilee': { x: 0.38, y: 0.10 },
  'Coastal Plain': { x: 0.25, y: 0.42 },
  'Sinai Border Region': { x: 0.32, y: 0.78 },
  'Off-course (Saudi Arabia)': { x: 0.80, y: 0.65 },
  'Off-course (Red Sea)': { x: 0.55, y: 0.85 },
  'Off-course (Jordan)': { x: 0.65, y: 0.45 },
};

// Interceptor system colors — matched to threat type colors
export const INTERCEPTOR_COLORS = {
  iron_dome:    '#eab308',   // matches drone yellow
  davids_sling: '#3b82f6',   // matches cruise blue
  arrow_2:      '#ef4444',   // matches ballistic red
  arrow_3:      '#a855f7',   // matches hypersonic purple
};

// -----------------------------------------------------------
// Threat Builder Helpers
// -----------------------------------------------------------
export const THREAT_DATA = {
  ballistic: {
    names: ['Toofan Ballistic Missile', 'Aqeel Ballistic Missile', 'Shahab-3 Ballistic Missile', 'Emad Ballistic Missile'],
    speeds: [7, 7.5, 8, 8.5, 9, 9.5],
    altitudes: [25, 28, 32, 35, 38, 40, 42],
    trajectories: ['High parabolic arc, steep descent', 'High arc, standard ballistic trajectory', 'Medium arc, steep terminal phase'],
    correct_action: 'arrow_2',
  },
  cruise: {
    names: ['Quds Cruise Missile', 'Soumar Cruise Missile', 'Paveh Cruise Missile'],
    speeds: [0.8, 0.9, 1.0, 1.1, 1.2],
    altitudes: [5, 6, 7, 8, 9, 10],
    trajectories: ['Low altitude, terrain-following', 'Sea-skimming approach, low profile', 'Low altitude, weaving trajectory'],
    correct_action: 'davids_sling',
  },
  drone: {
    names: ['Samad-3 Attack Drone', 'Shahed-136 Attack Drone', 'Ababil-3 Drone'],
    speeds: [0.2, 0.3, 0.4, 0.5],
    altitudes: [1, 2, 3, 4, 5],
    trajectories: ['Low altitude, flat, steady', 'Low altitude, erratic pattern', 'Low, hugging terrain contours'],
    correct_action: 'iron_dome',
  },
  hypersonic: {
    names: ['Palestine-2 Hypersonic Missile', 'Fattah Hypersonic Missile'],
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
    origin: 'southeast', // default: Yemen direction
    priority: false,
    is_final_salvo: false,
    course_correct: null,
    ...extra,
  };
}

// ============================================================
// LEVEL 1: Drones only, Iron Dome only
// Duration: 90s | 15 threats | Teaches: intercept + hold fire
// Pacing: fast start, quick escalation, ends with closing wave
// ============================================================
const THREATS_L1 = [
  // t=3: First threat — Beersheba (south), generous countdown
  threat(1,  3,  'drone', 'Beersheba',       true,  16, 'full', 1.0),
  // t=11: Hold fire lesson — Negev Desert (open ground, south)
  threat(2,  11, 'drone', 'Negev Desert',    false, 14, 'full', 1.0),
  // t=19: Reinforce intercept — Ashdod
  threat(3,  19, 'drone', 'Ashdod',          true,  14, 'full', 1.0),
  // t=27: Second hold-fire test
  threat(4,  27, 'drone', 'Arava Valley',    false, 14, 'full', 1.0),
  // t=34: Countdown tightens, pair!
  threat(5,  34, 'drone', 'Jerusalem',       true,  14, 'full', 1.0),
  threat(6,  36, 'drone', 'Northern Negev',  false, 13, 'full', 1.0),
  // t=45: Tempo up
  threat(7,  45, 'drone', 'Tel Aviv',        true,  12, 'full', 1.0),
  threat(8,  52, 'drone', 'Dimona',          true,  12, 'full', 1.0),
  // t=60: Triple overlap
  threat(9,  60, 'drone', 'Ashkelon',        true,  13, 'full', 1.0),
  threat(10, 62, 'drone', 'Central Negev',   false, 12, 'full', 1.0),
  // ESCALATION — final burst
  threat(11, 70, 'drone', 'Netanya',         true,  11, 'full', 1.0, { origin: 'south' }),
  threat(12, 70, 'drone', 'Beersheba',       true,  11, 'full', 1.0),
  // CLIMAX — closing wave
  threat(13, 76, 'drone', 'Haifa',           true,  11, 'full', 1.0, { origin: 'north' }),
  threat(14, 78, 'drone', 'Judean Hills',    false, 11, 'full', 1.0),  // hold fire
  threat(15, 80, 'drone', 'Tel Aviv',        true,  10, 'full', 1.0),
];

// ============================================================
// LEVEL 2: ESCALATION — Drones + Cruise Missiles
// Duration: 105s | 16 threats | Introduces: David's Sling
// ============================================================
const THREATS_L2 = [
  // Opening: familiar drone, then cruise missile
  threat(1,  3,  'drone',  'Beersheba',      true,  14, 'full', 1.0),
  threat(2,  10, 'cruise', 'Tel Aviv',       true,  12, 'full', 1.0),  // First cruise — faster!
  threat(3,  18, 'drone',  'Arava Valley',   false, 13, 'full', 1.0),  // hold fire
  threat(4,  26, 'cruise', 'Dimona',         true,  11, 'full', 1.0),
  // Mixed pair
  threat(5,  34, 'drone',  'Ashkelon',       true,  13, 'full', 1.0),
  threat(6,  35, 'cruise', 'Negev Desert',   false, 11, 'full', 1.0),  // hold fire
  // Tempo picks up
  threat(7,  44, 'cruise', 'Jerusalem',      true,  10, 'full', 1.0),
  threat(8,  52, 'drone',  'Northern Negev', false, 13, 'full', 1.0),  // hold fire
  threat(9,  60, 'cruise', 'Ashdod',         true,  10, 'full', 1.0),
  threat(10, 67, 'drone',  'Netanya',        true,  12, 'full', 1.0),
  // Pairs start overlapping
  threat(11, 74, 'cruise', 'Tel Aviv',       true,  10, 'full', 1.0),
  threat(12, 76, 'drone',  'Beersheba',      true,  12, 'full', 1.0),
  // Build-up to final burst
  threat(16, 82, 'drone',  'Ashdod',         true,  12, 'full', 1.0),
  // ESCALATION — final triple
  threat(13, 86, 'cruise', 'Dimona',         true,  10, 'full', 1.0),
  threat(14, 86, 'drone',  'Jerusalem',      true,  11, 'full', 1.0),
  threat(15, 88, 'cruise', 'Central Negev',  false, 10, 'full', 1.0),  // hold fire
];

// ============================================================
// LEVEL 3: BALLISTIC ARC — + Ballistic Missiles + Arrow 2
// Duration: 100s | 19 threats | Introduces: Arrow 2, course corrections
// Pacing: quick escalation, course correction surprise, ends with quad
// ============================================================
const THREATS_L3 = [
  // Familiar opening
  threat(1,  3,  'drone',     'Beersheba',       true,  14, 'full', 1.0),
  threat(2,  10, 'cruise',    'Haifa',           true,  11, 'full', 1.0, { origin: 'north' }),
  // First ballistic! Safe intro on open ground
  threat(3,  17, 'ballistic', 'Negev Desert',    false, 14, 'full', 0.45),
  threat(4,  24, 'ballistic', 'Tel Aviv',        true,  13, 'full', 0.40),
  threat(5,  30, 'drone',     'Golan Heights',   false, 13, 'full', 1.0, { origin: 'north' }),  // hold fire
  // Mixed pair
  threat(6,  37, 'cruise',    'Jerusalem',       true,  10, 'full', 1.0),
  threat(7,  38, 'ballistic', 'Beersheba',       true,  12, 'partial', 0.40),
  // Course correction!
  threat(8,  46, 'ballistic', 'Central Negev',   false, 13, 'full', 0.45, {
    course_correct: { new_impact_zone: 'Beersheba', new_is_populated: true, at_pct: 0.55 },
  }),
  threat(9,  53, 'drone',     'Ashdod',          true,  12, 'full', 1.0),
  threat(10, 58, 'cruise',    'Dead Sea Region', false, 10, 'full', 1.0),   // hold fire
  // Triple!
  threat(11, 64, 'ballistic', 'Dimona',          true,  12, 'full', 0.35, { priority: true }),
  threat(12, 65, 'drone',     'Netanya',         true,  12, 'full', 1.0),
  threat(13, 66, 'cruise',    'Arava Valley',    false, 10, 'full', 1.0),   // hold fire
  // ESCALATION — final quad
  threat(14, 78, 'ballistic', 'Jerusalem',       true,  11, 'full', 0.35),
  threat(15, 78, 'cruise',    'Haifa',           true,  10, 'full', 1.0, { origin: 'north' }),
  threat(16, 80, 'drone',     'Ashkelon',        true,  11, 'full', 1.0),
  threat(17, 80, 'ballistic', 'Northern Negev',  false, 12, 'partial', 0.40),  // hold fire
  // Extended climax
  threat(18, 84, 'cruise',    'Ashdod',          true,  10, 'full', 1.0),
  threat(19, 86, 'drone',     'Sinai Border Region', false, 11, 'full', 1.0),  // hold fire
];

// ============================================================
// LEVEL 4: HYPERSONIC — All 4 systems, introduces Arrow 3
// Duration: 120s | 22 threats
// Pacing: intro hypersonic early, quad escalation, ends intense
// ============================================================
const THREATS_L4 = [
  // Quick warm-up with familiar types
  threat(1,  3,  'drone',      'Beersheba',       true,  13, 'full', 1.0),
  threat(2,  9,  'cruise',     'Haifa',           true,  10, 'full', 1.0, { origin: 'north' }),
  threat(3,  16, 'ballistic',  'Negev Desert',    false, 12, 'full', 0.45),   // hold fire
  // Introduce hypersonic!
  threat(4,  23, 'hypersonic', 'Tel Aviv',        true,  10, 'full', 0.40),
  threat(5,  30, 'drone',      'Golan Heights',   false, 12, 'full', 1.0, { origin: 'north' }),   // hold fire
  threat(6,  36, 'hypersonic', 'Jerusalem',       true,   9, 'full', 0.35),
  // Mixed pairs — tempo up
  threat(7,  43, 'cruise',     'Netanya',         true,  10, 'full', 1.0),
  threat(8,  44, 'ballistic',  'Beersheba',       true,  11, 'full', 0.40),
  threat(9,  52, 'hypersonic', 'Dead Sea Region', false,  9, 'full', 0.50),   // hold fire
  threat(10, 58, 'drone',      'Ashkelon',        true,  12, 'full', 1.0),
  // Course correction
  threat(11, 64, 'ballistic',  'Central Negev',   false, 12, 'full', 0.45, {
    course_correct: { new_impact_zone: 'Dimona', new_is_populated: true, at_pct: 0.50 },
    priority: true,
  }),
  threat(12, 70, 'cruise',     'Arava Valley',    false, 10, 'full', 1.0),    // hold fire
  // Triple
  threat(13, 76, 'hypersonic', 'Haifa',           true,   9, 'full', 0.35, { origin: 'north' }),
  threat(14, 77, 'drone',      'Ashdod',          true,  12, 'full', 1.0),
  threat(15, 78, 'ballistic',  'Jerusalem',       true,  11, 'full', 0.35),
  // ESCALATION — final quad
  threat(16, 90, 'hypersonic', 'Tel Aviv',        true,   9, 'full', 0.35),
  threat(17, 90, 'cruise',     'Haifa',           true,  10, 'full', 1.0, { origin: 'north' }),
  threat(18, 92, 'ballistic',  'Beersheba',       true,  11, 'full', 0.40),
  threat(19, 92, 'drone',      'Netanya',         true,  11, 'full', 1.0),
  threat(20, 94, 'hypersonic', 'Northern Negev',  false,  9, 'full', 0.50),   // hold fire
];

// ============================================================
// LEVEL 5: IRON STORM — All 4 systems + final salvo
// Duration: 150s | 24 threats | Degraded intel, chaos
// Pacing: relentless escalation, 5-threat final salvo
// ============================================================
const THREATS_L5 = [
  // Opening — intel already degraded
  threat(1,  3,  'drone',      'Tel Aviv',        true,  13, 'full', 1.0),
  threat(2,  9,  'cruise',     'Haifa',           true,  10, 'partial', 0.50, { origin: 'north' }),
  threat(3,  16, 'ballistic',  'Negev Desert',    false, 12, 'partial', 0.45),  // hold fire
  threat(4,  28, 'hypersonic', 'Jerusalem',       true,  10, 'partial', 0.35),
  threat(5,  34, 'drone',      'Coastal Plain',   false, 12, 'minimal', 0.50),  // hold fire
  threat(6,  40, 'cruise',     'Beersheba',       true,  10, 'partial', 0.45),
  // Mixed pair
  threat(7,  47, 'ballistic',  'Ashkelon',        true,  11, 'minimal', 0.40),
  threat(8,  48, 'drone',      'Jordan Valley',   false, 12, 'minimal', 0.50),  // hold fire
  threat(9,  58, 'hypersonic', 'Tel Aviv',        true,   9, 'partial', 0.35),
  threat(10, 64, 'cruise',     'Golan Heights',   false, 10, 'full', 1.0, { origin: 'north' }),  // hold fire
  // Course correction
  threat(11, 70, 'ballistic',  'Northern Negev',  false, 12, 'partial', 0.45, {
    course_correct: { new_impact_zone: 'Dimona', new_is_populated: true, at_pct: 0.50 },
    priority: true,
  }),
  threat(12, 76, 'hypersonic', 'Haifa',           true,   9, 'partial', 0.35, { origin: 'north' }),
  threat(13, 77, 'drone',      'Western Galilee', false, 11, 'minimal', 0.50, { origin: 'north' }),  // hold fire
  // Triple
  threat(14, 86, 'ballistic',  'Jerusalem',       true,  11, 'minimal', 0.35),
  threat(15, 87, 'cruise',     'Ashdod',          true,  10, 'partial', 0.45),
  threat(16, 88, 'hypersonic', 'Judean Hills',    false,  8, 'minimal', 0.50),  // hold fire
  // Quad
  threat(17, 96, 'drone',      'Netanya',         true,  11, 'partial', 0.45),
  threat(18, 96, 'ballistic',  'Ashkelon',        true,  11, 'minimal', 0.40),
  threat(19, 98, 'cruise',     'Beersheba',       true,  10, 'partial', 0.45),
  threat(20, 98, 'hypersonic', 'Teveriah',        true,   8, 'partial', 0.35, { origin: 'north' }),
  // Pre-salvo
  threat(21, 110,'ballistic',  'Southern Negev',  false, 11, 'minimal', 0.50),  // hold fire

  // FINAL SALVO — "OPERATION IRON STORM"
  threat(22, 130,'drone',      'Beersheba',       true,  13, 'full', 0.35, { is_final_salvo: true }),
  threat(23, 130,'cruise',     'Jerusalem',       true,  10, 'partial', 0.35, { is_final_salvo: true }),
  threat(24, 130,'ballistic',  'Dimona',          true,  12, 'full', 0.30, { priority: true, is_final_salvo: true }),
  threat(25, 130,'hypersonic', 'Tel Aviv',        true,   9, 'partial', 0.35, { is_final_salvo: true }),
  threat(26, 130,'cruise',     'Negev Desert',    false, 10, 'minimal', 0.50, { is_final_salvo: true }),
];

// ============================================================
// LEVEL CONFIGURATION
// ============================================================
export const LEVELS = [
  {
    id: 1,
    duration: 90,
    ammo: { iron_dome: 12 },
    available_systems: ['iron_dome'],
    auto_end_delay: 3000,
    new_system: null,
    new_threat: null,
    final_salvo_warning_time: null,
    final_salvo_start_time: null,
    threats: THREATS_L1,
  },
  {
    id: 2,
    duration: 105,
    ammo: { iron_dome: 8, davids_sling: 6 },
    available_systems: ['iron_dome', 'davids_sling'],
    auto_end_delay: 5000,
    new_system: { key: 'davids_sling', name: "DAVID'S SLING", shortcut: '2', color: '#3b82f6' },
    new_threat: { type: 'cruise', name: 'CRUISE MISSILES', description: 'Low altitude, terrain-following', speed: 'Mach 0.8–1.2' },
    final_salvo_warning_time: null,
    final_salvo_start_time: null,
    threats: THREATS_L2,
  },
  {
    id: 3,
    duration: 100,
    ammo: { iron_dome: 6, davids_sling: 5, arrow_2: 6 },
    available_systems: ['iron_dome', 'davids_sling', 'arrow_2'],
    auto_end_delay: 5000,
    new_system: { key: 'arrow_2', name: 'ARROW 2', shortcut: '3', color: '#ef4444' },
    new_threat: { type: 'ballistic', name: 'BALLISTIC MISSILES', description: 'High arc, fast reentry', speed: 'Mach 7–9.5' },
    final_salvo_warning_time: null,
    final_salvo_start_time: null,
    threats: THREATS_L3,
  },
  {
    id: 4,
    duration: 120,
    ammo: { iron_dome: 5, davids_sling: 4, arrow_2: 5, arrow_3: 4 },
    available_systems: ['iron_dome', 'davids_sling', 'arrow_2', 'arrow_3'],
    auto_end_delay: 5000,
    new_system: { key: 'arrow_3', name: 'ARROW 3', shortcut: '4', color: '#a855f7' },
    new_threat: { type: 'hypersonic', name: 'HYPERSONIC MISSILES', description: 'Exo-atmospheric, extreme speed', speed: 'Mach 12–16' },
    final_salvo_warning_time: null,
    final_salvo_start_time: null,
    threats: THREATS_L4,
  },
  {
    id: 5,
    duration: 150,
    ammo: { iron_dome: 5, davids_sling: 4, arrow_2: 5, arrow_3: 4 },
    available_systems: ['iron_dome', 'davids_sling', 'arrow_2', 'arrow_3'],
    auto_end_delay: 8000,
    new_system: null,
    new_threat: null,
    new_mechanic: null,
    final_salvo_warning_time: 110,
    final_salvo_start_time: 130,
    threats: THREATS_L5,
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
