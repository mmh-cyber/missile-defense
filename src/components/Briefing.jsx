import { THREAT_COLORS, INTERCEPTOR_COLORS } from '../config/threats.js';

const ALL_MATCHINGS = [
  {
    system: 'IRON DOME',
    systemHebrew: 'כִּפַּת בַּרְזֶל',
    systemColor: INTERCEPTOR_COLORS.iron_dome,
    shortcut: '1',
    threat: 'DRONES',
    threatHebrew: 'כטב"מ',
    threatColor: THREAT_COLORS.drone,
    description: 'Low altitude, slow moving',
  },
  {
    system: "DAVID'S SLING",
    systemHebrew: 'קֶלַע דָּוִד',
    systemColor: INTERCEPTOR_COLORS.davids_sling,
    shortcut: '2',
    threat: 'CRUISE MISSILES',
    threatHebrew: 'טִילֵי שִׁיּוּט',
    threatColor: THREAT_COLORS.cruise,
    description: 'Low altitude, terrain-following',
  },
  {
    system: 'ARROW 2',
    systemHebrew: 'חֵץ 2',
    systemColor: INTERCEPTOR_COLORS.arrow_2,
    shortcut: '3',
    threat: 'BALLISTIC MISSILES',
    threatHebrew: 'טִילִים בָּלִיסְטִיִּם',
    threatColor: THREAT_COLORS.ballistic,
    description: 'High arc, fast reentry',
  },
  {
    system: 'ARROW 3',
    systemHebrew: 'חֵץ 3',
    systemColor: INTERCEPTOR_COLORS.arrow_3,
    shortcut: '4',
    threat: 'HYPERSONIC MISSILES',
    threatHebrew: 'טִילִים הִיפֶּרְסוֹנִיִּם',
    threatColor: THREAT_COLORS.hypersonic,
    description: 'Exo-atmospheric, extreme speed',
  },
];

function DroneAnimation() {
  return (
    <div className="mt-5 mb-2 flex justify-center">
      <svg viewBox="0 0 300 80" width="300" height="80" className="overflow-visible">
        {/* Ground reference */}
        <line x1="0" y1="72" x2="300" y2="72" stroke="#22c55e" strokeWidth="0.3" opacity="0.15" />
        {/* Altitude reference */}
        <line x1="0" y1="40" x2="300" y2="40" stroke="#eab308" strokeWidth="0.3" opacity="0.06" strokeDasharray="4,8" />
        <text x="6" y="38" fill="#eab308" fontSize="5" fontFamily="monospace" opacity="0.2">LOW ALT</text>

        {/* Drone — side profile, flying left to right */}
        <g className="drone-fly">
          {/* Propeller blur at rear */}
          <circle cx="-14" cy="0" r="4" fill="#eab308" opacity="0.12" className="drone-rotor-spin" />
          <line x1="-14" y1="-3.5" x2="-14" y2="3.5" stroke="#eab308" strokeWidth="0.8" opacity="0.3" className="drone-rotor-spin" />

          {/* Fuselage — long narrow body */}
          <path
            d="M16,0 L12,-1.2 L-10,-1.2 L-13,0 L-10,1.2 L12,1.2 Z"
            fill="#eab308" opacity="0.85"
          />

          {/* Wing — delta swept back, seen from side as a thick profile */}
          <path
            d="M4,-1.2 L-2,-8 L-8,-7 L-6,-1.2"
            fill="#eab308" opacity="0.7"
          />
          <path
            d="M4,1.2 L-2,8 L-8,7 L-6,1.2"
            fill="#eab308" opacity="0.7"
          />

          {/* Tail fins — V-tail */}
          <path
            d="M-10,-1.2 L-13,-5 L-11,-4.5 L-10,-1.2"
            fill="#eab308" opacity="0.6"
          />
          <path
            d="M-10,1.2 L-13,5 L-11,4.5 L-10,1.2"
            fill="#eab308" opacity="0.6"
          />

          {/* Nose / sensor dome */}
          <ellipse cx="15" cy="0" rx="2" ry="1" fill="#fbbf24" opacity="0.9" />
          <circle cx="16.5" cy="0" r="0.5" fill="#fef08a" opacity="0.8" />

          {/* Engine exhaust glow */}
          <circle cx="-15" cy="0" r="2" fill="#f59e0b" opacity="0.3" className="drone-exhaust-glow" />
        </g>
      </svg>
    </div>
  );
}

export default function Briefing({ onReady, level = 1 }) {
  // For Level 1: only show Iron Dome
  const matchings = level === 1 ? ALL_MATCHINGS.slice(0, 1) : ALL_MATCHINGS;

  return (
    <div className="h-screen bg-[#0a0e1a] flex items-center justify-center relative overflow-y-auto">
      <div className="max-w-3xl w-full py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-green-900 font-mono text-xs tracking-[1em] mb-4">
            &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;
          </div>
          <div className="text-green-500/50 font-mono text-xs tracking-[0.4em] mb-2">
            MISSION BRIEFING
          </div>
          <h1 className="text-3xl font-bold font-mono text-green-400 tracking-wider mb-1">
            LEVEL {level}
          </h1>
          {level === 1 && (
            <div className="text-sm font-mono text-gray-500 tracking-wider mt-2">
              Drone swarm detected. You are Israel's last line of defense.
            </div>
          )}
          <div className="h-px bg-green-900 w-48 mx-auto mt-3" />
        </div>

        {/* System-Threat Matching Grid */}
        <div className="mb-8">
          <div className="text-xs text-gray-500 font-mono tracking-widest mb-4 text-center">
            {level === 1 ? 'YOUR WEAPON' : 'INTERCEPTOR — THREAT MATCHING'}
          </div>

          <div className="space-y-3">
            {matchings.map(({ system, systemHebrew, systemColor, shortcut, threat, threatHebrew, threatColor, description }) => (
              <div
                key={system}
                className="flex items-center gap-4 p-3 rounded-lg bg-gray-900/50 border border-gray-800"
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded border-2 flex items-center justify-center font-mono font-bold text-sm"
                  style={{ borderColor: systemColor, color: systemColor }}
                >
                  {shortcut}
                </div>
                <div className="flex-1 text-right">
                  <div className="font-mono font-bold text-sm tracking-wider" style={{ color: systemColor }}>
                    {system}
                  </div>
                  <div className="text-xs font-bold mt-0.5" style={{ color: systemColor, opacity: 0.75, fontFamily: 'Arial, sans-serif' }}>
                    {systemHebrew}
                  </div>
                </div>
                <div className="flex-shrink-0 text-green-600 font-mono text-xl px-2">&#x2192;</div>
                <div className="flex-1">
                  <div className="font-mono font-bold text-sm tracking-wider" style={{ color: threatColor }}>{threat}</div>
                  <div className="text-xs font-bold mt-0.5" style={{ color: threatColor, opacity: 0.75, fontFamily: 'Arial, sans-serif' }}>
                    {threatHebrew}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono mt-0.5">{description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Drone animation for Level 1 */}
          {level === 1 && <DroneAnimation />}
        </div>

        {/* Hold Fire Doctrine */}
        <div className="border border-gray-700 rounded-lg p-5 mb-8 bg-gray-900/30">
          <div className="text-xs text-gray-400 font-mono tracking-widest mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded border border-gray-400 flex items-center justify-center text-gray-400 font-bold text-[10px]">5</span>
            HOLD FIRE DOCTRINE
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded border border-red-900/50 bg-red-950/20">
              <div className="text-red-400 font-mono text-xs font-bold mb-1">&#x25CF; POPULATED AREA</div>
              <div className="text-xs text-gray-400 font-mono">
                City targeted &#x2192; <span className="text-green-400 font-bold">MUST INTERCEPT</span>
              </div>
            </div>
            <div className="p-3 rounded border border-gray-700 bg-gray-800/30">
              <div className="text-gray-400 font-mono text-xs font-bold mb-1">&#x25CB; OPEN GROUND</div>
              <div className="text-xs text-gray-400 font-mono">
                Desert / off-course &#x2192; <span className="text-gray-200 font-bold">HOLD FIRE</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 font-mono mt-3 text-center">
            Interceptors are limited. Conserve ammunition for threats targeting cities.
          </div>
        </div>

        {/* Controls Reference */}
        <div className="border border-gray-800 rounded-lg p-4 mb-8 bg-gray-900/20">
          <div className="text-xs text-gray-500 font-mono tracking-widest mb-3">CONTROLS</div>
          <div className="flex gap-6 justify-center text-xs font-mono text-gray-400 flex-wrap">
            {level === 1 ? (
              <>
                <span><span className="text-green-400">1</span> Iron Dome</span>
                <span><span className="text-green-400">5 / Space</span> Hold Fire</span>
                <span><span className="text-green-400">Tab</span> Cycle Threats</span>
                <span><span className="text-green-400">ESC</span> Pause</span>
              </>
            ) : (
              <>
                <span><span className="text-green-400">1-4</span> Interceptors</span>
                <span><span className="text-green-400">5 / Space</span> Hold Fire</span>
                <span><span className="text-green-400">Tab</span> Cycle Threats</span>
                <span><span className="text-green-400">ESC</span> Pause</span>
              </>
            )}
          </div>
        </div>

        {/* Begin button */}
        <div className="text-center">
          <button
            onClick={onReady}
            className="px-12 py-5 bg-green-900/30 border-2 border-green-500 text-green-400
              font-mono font-bold text-xl tracking-widest rounded-lg
              hover:bg-green-900/50 hover:border-green-300 hover:text-green-300
              hover:shadow-[0_0_30px_rgba(0,255,136,0.3)]
              transition-all active:scale-95 cursor-pointer"
          >
            BEGIN MISSION
          </button>
        </div>

        <div className="text-green-900 font-mono text-xs tracking-[1em] mt-6 text-center">
          &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;
        </div>
      </div>
    </div>
  );
}
