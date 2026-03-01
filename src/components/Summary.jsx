import { useState, useMemo } from 'react';
import { calculateScore, saveToLeaderboard } from '../hooks/useGameEngine.js';

const RESULT_LABELS = {
  correct_intercept: { label: 'INTERCEPTED', color: 'text-green-400', icon: '✓' },
  correct_hold: { label: 'HOLD FIRE — SAFE', color: 'text-green-400', icon: '✓' },
  wasted_intercept: { label: 'INTERCEPTED (OPEN GROUND)', color: 'text-yellow-400', icon: '⚠' },
  timeout: { label: 'CITY HIT — SIREN', color: 'text-red-400', icon: '✕' },
  timeout_open: { label: 'GROUND IMPACT — NO DAMAGE', color: 'text-gray-400', icon: '—' },
  hold_populated: { label: 'CITY HIT — SIREN', color: 'text-red-400', icon: '✕' },
};

export default function Summary({ stats, onReset, leaderboardMode }) {
  const {
    totalThreats,
    correctIntercepts,
    populatedThreats,
    correctHolds,
    openGroundThreats,
    wrongIntercepts,
    timeouts,
    wastedIntercepts,
    ammoRemaining,
    totalPenaltyTime,
    sirenCount,
    bestStreak,
    rating,
    resultLog,
    gameMode,
  } = stats;

  const [teamName, setTeamName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);

  const score = useMemo(() => calculateScore(stats), [stats]);
  const stars = Array.from({ length: 5 }, (_, i) => i < rating.stars);

  const handleSubmit = () => {
    if (!teamName.trim()) return;
    saveToLeaderboard({
      teamName: teamName.trim().toUpperCase(),
      score,
      stars: rating.stars,
      sirenCount,
      gameMode,
      date: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-green-500 font-mono text-sm tracking-[0.3em] mb-2">
            MISSION COMPLETE
          </div>
          <div className="text-4xl font-bold font-mono text-green-400 tracking-wider mb-2">
            ALL CLEAR
          </div>
          <div className="h-px bg-green-900 w-48 mx-auto" />
        </div>

        {/* Rating + Score */}
        <div className="text-center mb-6 py-5 border border-green-900/50 rounded-lg bg-green-950/20">
          <div className="text-3xl font-bold font-mono text-white tracking-wider mb-2">
            {rating.label}
          </div>
          <div className="text-3xl tracking-wider mb-3">
            {stars.map((filled, i) => (
              <span
                key={i}
                className={filled ? 'text-yellow-400' : 'text-gray-700'}
              >
                &#9733;
              </span>
            ))}
          </div>
          <div className="text-5xl font-bold font-mono text-green-400 tabular-nums">
            {score.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 font-mono tracking-widest mt-1">
            MISSION SCORE
          </div>
        </div>

        {/* Leaderboard Submit */}
        {leaderboardMode && (
          <div className="mb-6 p-4 border border-green-900/50 rounded-lg bg-green-950/10">
            {!submitted ? (
              <div>
                <div className="text-xs text-gray-500 font-mono tracking-widest mb-3 text-center">
                  ENTER TEAM NAME FOR LEADERBOARD
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value.slice(0, 20))}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="TEAM NAME..."
                    maxLength={20}
                    className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3
                      font-mono text-green-400 text-lg tracking-wider
                      focus:border-green-600 focus:outline-none
                      placeholder:text-gray-700 uppercase"
                    autoFocus
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={!teamName.trim()}
                    className={`px-6 py-3 rounded-lg font-mono font-bold tracking-wider transition-all
                      ${teamName.trim()
                        ? 'bg-green-900/40 border-2 border-green-600 text-green-400 hover:bg-green-900/60 cursor-pointer active:scale-95'
                        : 'bg-gray-900 border-2 border-gray-700 text-gray-600 cursor-not-allowed'
                      }`}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-green-400 font-mono font-bold tracking-wider text-lg mb-1">
                  ✓ SCORE SUBMITTED
                </div>
                <div className="text-gray-500 font-mono text-xs tracking-wider">
                  {teamName.trim().toUpperCase()} — {score.toLocaleString()} PTS
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <StatRow label="TOTAL THREATS FACED" value={totalThreats} />
          <StatRow
            label="CORRECT INTERCEPTIONS"
            value={`${correctIntercepts} / ${populatedThreats}`}
            good
          />
          <StatRow
            label="CORRECT HOLDS"
            value={`${correctHolds} / ${openGroundThreats}`}
            good
          />
          <StatRow
            label="WRONG INTERCEPTOR"
            value={wrongIntercepts}
            bad={wrongIntercepts > 0}
          />
          <StatRow
            label="TIMEOUTS (POPULATED)"
            value={timeouts}
            bad={timeouts > 0}
          />
          <StatRow
            label="WASTED INTERCEPTORS"
            value={wastedIntercepts}
            bad={wastedIntercepts > 0}
          />
          <StatRow
            label="TOTAL SIRENS"
            value={sirenCount}
            bad={sirenCount > 0}
          />
          <StatRow
            label="PENALTY TIME"
            value={`${totalPenaltyTime}s`}
            bad={totalPenaltyTime > 0}
          />
          {bestStreak > 0 && (
            <StatRow
              label="BEST STREAK"
              value={`🔥 ${bestStreak}`}
              good
            />
          )}
        </div>

        {/* Ammo remaining */}
        <div className="mb-5 p-4 border border-gray-800 rounded-lg bg-gray-900/30">
          <div className="text-xs text-gray-500 font-mono tracking-widest mb-3">
            AMMUNITION REMAINING
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { key: 'iron_dome', label: 'IRON DOME', color: '#22c55e' },
              { key: 'davids_sling', label: "DAVID'S SLING", color: '#3b82f6' },
              { key: 'arrow_2', label: 'ARROW 2', color: '#a855f7' },
              { key: 'arrow_3', label: 'ARROW 3', color: '#ef4444' },
            ].map(({ key, label, color }) => (
              <div key={key} className="text-center">
                <div className="text-[10px] text-gray-500 font-mono mb-1">{label}</div>
                <div
                  className="text-2xl font-bold font-mono tabular-nums"
                  style={{ color }}
                >
                  {ammoRemaining[key]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Debrief Toggle */}
        {resultLog && resultLog.length > 0 && (
          <div className="mb-5">
            <button
              onClick={() => setShowDebrief(!showDebrief)}
              className="w-full py-3 bg-gray-900/50 border border-gray-700 rounded-lg
                font-mono text-sm text-gray-400 tracking-wider
                hover:border-gray-500 hover:text-gray-300 transition-all cursor-pointer"
            >
              {showDebrief ? '▼ HIDE MISSION DEBRIEF' : '▶ VIEW MISSION DEBRIEF'}
            </button>

            {showDebrief && (
              <div className="mt-3 border border-gray-800 rounded-lg bg-gray-900/30 p-4 max-h-[320px] overflow-y-auto custom-scrollbar">
                <div className="text-xs text-gray-500 font-mono tracking-widest mb-3">
                  THREAT TIMELINE — CHRONOLOGICAL
                </div>
                {resultLog.map((entry, i) => {
                  const info = RESULT_LABELS[entry.result] || {
                    label: entry.result,
                    color: 'text-gray-500',
                    icon: '?',
                  };

                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-3 py-2 px-2 rounded mb-1 ${
                        i % 2 === 0 ? 'bg-gray-900/30' : ''
                      }`}
                    >
                      {/* Index */}
                      <span className="text-gray-600 font-mono text-xs w-5 pt-0.5 text-right">
                        {i + 1}
                      </span>

                      {/* Icon */}
                      <span className={`${info.color} font-bold text-sm w-5 text-center`}>
                        {info.icon}
                      </span>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
                            style={{
                              backgroundColor: `${typeColor(entry.type)}30`,
                              color: typeColor(entry.type),
                            }}
                          >
                            {entry.type}
                          </span>
                          <span className="text-xs font-mono text-gray-400 truncate">
                            {entry.name}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={`text-xs font-mono font-bold ${info.color}`}>
                            {info.label}
                          </span>
                          <span className="text-gray-700">→</span>
                          <span className={`text-xs font-mono ${entry.is_populated ? 'text-red-300' : 'text-gray-500'}`}>
                            {entry.impact_zone}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Reset button */}
        <div className="text-center">
          <button
            onClick={onReset}
            className="px-8 py-3 bg-green-900/30 border-2 border-green-600 text-green-400
              font-mono font-bold tracking-wider rounded-lg
              hover:bg-green-900/50 hover:border-green-400 transition-all
              active:scale-95 cursor-pointer text-lg"
          >
            RESET MISSION
          </button>
        </div>
      </div>
    </div>
  );
}

function typeColor(type) {
  const colors = {
    ballistic: '#ef4444',
    cruise: '#f97316',
    hypersonic: '#a855f7',
    drone: '#eab308',
  };
  return colors[type] || '#6b7280';
}

function StatRow({ label, value, good, bad }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-900/30 border border-gray-800 rounded">
      <span className="text-xs text-gray-500 font-mono tracking-wider">{label}</span>
      <span
        className={`text-lg font-bold font-mono tabular-nums ${
          bad ? 'text-red-400' : good ? 'text-green-400' : 'text-gray-300'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
