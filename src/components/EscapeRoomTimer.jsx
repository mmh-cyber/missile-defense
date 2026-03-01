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
      ? 'text-yellow-400'
      : 'text-green-400';

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-gray-600 font-mono tracking-widest">
        ESCAPE ROOM
      </span>
      <span className={`font-mono text-lg font-bold tabular-nums ${colorClass}`}>
        {formatted}
      </span>
    </div>
  );
}
