export default function EscapeRoomTimer({ escapeRoomTime }) {
  const neg = escapeRoomTime < 0;
  const abs = Math.abs(Math.floor(escapeRoomTime));
  const m = Math.floor(abs / 60);
  const s = abs % 60;
  const formatted = `${neg ? '-' : ''}${m}:${String(s).padStart(2, '0')}`;

  const colorClass =
    escapeRoomTime < 60
      ? 'text-red-400 animate-pulse'
      : escapeRoomTime < 180
      ? 'text-amber-400'
      : 'text-purple-300';

  return (
    <div
      className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full
        bg-purple-950/80 border border-purple-800/60 backdrop-blur-sm
        shadow-[0_0_12px_rgba(168,85,247,0.15)]"
    >
      <span className="text-sm">&#x1F512;</span>
      <span className="text-[10px] text-purple-500 font-mono tracking-widest">
        ESCAPE ROOM
      </span>
      <span className={`font-mono text-lg font-bold tabular-nums ${colorClass}`}>
        {formatted}
      </span>
    </div>
  );
}
