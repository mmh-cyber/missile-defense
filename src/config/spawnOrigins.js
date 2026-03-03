// ============================================================
//  Spawn Origin System — shared between RadarDisplay + useGameEngine
//  Absolute map-space coordinates for where threats appear on radar.
// ============================================================

// Short-range threats (rockets, nearby drones) spawn from the border
export const SPAWN_NEAR = {
  gaza:      { x: 0.10, y: 0.48 },    // Gaza border
  north:     { x: 0.42, y: 0.02 },    // Lebanese border
  northeast: { x: 0.70, y: 0.02 },    // Syrian/Golan border
  east:      { x: 0.75, y: 0.35 },    // Eastern border
  southeast: { x: 0.55, y: 0.80 },    // SE border
};

// Long-range threats (missiles, distant drones) spawn from off-map
export const SPAWN_FAR = {
  gaza:      { x: 0.02, y: 0.48 },    // Beyond Gaza
  north:     { x: 0.42, y: -0.15 },   // Well north of Lebanon
  northeast: { x: 0.85, y: -0.10 },   // NE of Syria
  east:      { x: 1.08, y: 0.58 },    // Iran (~100° bearing, off-map east)
  southeast: { x: 0.75, y: 1.05 },    // Yemen (off-map south)
  south:     { x: 0.50, y: 1.10 },
  southwest: { x: 0.10, y: 0.95 },
};

/**
 * Get the spawn origin for a threat based on its type and origin direction.
 * Rockets are always short-range. Drones from nearby origins are short/medium range.
 * Everything else (missiles, distant drones) is long-range.
 */
export function getSpawnOrigin(type, origin) {
  // Rockets are always short-range
  if (type === 'rocket') return SPAWN_NEAR[origin] || SPAWN_NEAR.gaza;
  // Drones from nearby origins (Gaza, Lebanon, Syria) are short/medium range
  if (type === 'drone' && ['gaza', 'north', 'northeast'].includes(origin)) {
    return SPAWN_NEAR[origin] || SPAWN_NEAR.north;
  }
  // Everything else (missiles, distant drones) is long-range
  return SPAWN_FAR[origin] || SPAWN_FAR.east;
}
