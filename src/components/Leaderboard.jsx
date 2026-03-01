import { getLeaderboard, clearLeaderboard } from '../hooks/useGameEngine.js';

export default function Leaderboard({ onClose, highlightTeam }) {
  const entries = getLeaderboard();

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0a0e1a] border border-green-900/50 rounded-xl p-6 w-[520px] max-h-[80vh] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="font-mono text-sm text-green-500 tracking-widest">
            LEADERBOARD
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors text-xl cursor-pointer"
          >
            &#x2715;
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-gray-600 font-mono text-3xl mb-3">---</div>
              <div className="text-gray-600 font-mono text-sm">NO SCORES RECORDED</div>
              <div className="text-gray-700 font-mono text-xs mt-1">COMPLETE A MISSION TO RANK</div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Column headers */}
            <div className="flex items-center text-[10px] text-gray-600 font-mono tracking-wider mb-2 px-2">
              <span className="w-8">RNK</span>
              <span className="flex-1">CALLSIGN</span>
              <span className="w-16 text-right">SCORE</span>
              <span className="w-14 text-center">STARS</span>
              <span className="w-14 text-center">SIRENS</span>
              <span className="w-12 text-center">MODE</span>
            </div>

            {entries.slice(0, 20).map((entry, i) => {
              const isHighlight = highlightTeam && entry.teamName === highlightTeam && entry.date === highlightTeam._date;
              const rank = i + 1;
              const rankColor = rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-300' : rank === 3 ? 'text-orange-400' : 'text-gray-500';

              return (
                <div
                  key={i}
                  className={`flex items-center py-2 px-2 rounded mb-1 font-mono text-sm ${
                    isHighlight
                      ? 'bg-green-900/30 border border-green-700'
                      : i % 2 === 0 ? 'bg-gray-900/30' : ''
                  }`}
                >
                  <span className={`w-8 font-bold ${rankColor}`}>
                    {rank === 1 ? '👑' : rank <= 3 ? `#${rank}` : rank}
                  </span>
                  <span className="flex-1 text-green-400 font-bold tracking-wider truncate">
                    {entry.teamName}
                  </span>
                  <span className="w-16 text-right text-white font-bold tabular-nums">
                    {entry.score.toLocaleString()}
                  </span>
                  <span className="w-14 text-center">
                    {Array.from({ length: 5 }, (_, j) => (
                      <span key={j} className={j < entry.stars ? 'text-yellow-400' : 'text-gray-800'}>
                        ★
                      </span>
                    ))}
                  </span>
                  <span className={`w-14 text-center tabular-nums ${entry.sirenCount > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {entry.sirenCount}
                  </span>
                  <span className="w-12 text-center text-gray-500 text-xs">
                    {entry.gameMode === 'SHORT' ? 'SHT' : 'FUL'}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
          <div className="text-[10px] text-gray-700 font-mono">
            {entries.length} ENTRIES
          </div>
          {entries.length > 0 && (
            <button
              onClick={() => {
                clearLeaderboard();
                onClose();
              }}
              className="text-xs text-red-900 hover:text-red-500 font-mono tracking-wider transition-colors cursor-pointer"
            >
              CLEAR ALL
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
