function getSearchBarStyle(i, step) {
  if (step.found === i) {
    return 'bg-emerald-500 ring-2 ring-emerald-300';
  }
  if (step.current === i || step.mid === i) {
    return 'bg-amber-400';
  }
  if (step.eliminated?.includes(i)) {
    return 'bg-slate-800 opacity-40';
  }
  if (
    step.low !== null &&
    step.high !== null &&
    i >= step.low &&
    i <= step.high
  ) {
    return 'bg-sky-400';
  }
  return 'bg-slate-500';
}

export default function SearchBars({ step }) {
  if (!step) return null;

  const max = Math.max(...step.array, 1);
  const showLabels = step.array.length <= 25;
  const gapClass = step.array.length > 25 ? 'gap-px' : 'gap-1.5';

  return (
    <div
      className={`flex h-80 w-full items-end rounded-lg bg-slate-900 p-4 ${gapClass}`}
    >
      {step.array.map((value, i) => (
        <div
          key={i}
          className="flex h-full flex-1 flex-col items-center justify-end"
        >
          {showLabels && (
            <span className="mb-1 font-mono text-xs text-slate-300">
              {value}
            </span>
          )}
          <div
            style={{ height: `${(value / max) * 88}%` }}
            className={`w-full rounded-t transition-all duration-150 ${getSearchBarStyle(i, step)}`}
            title={`Index ${i}: ${value}`}
          />
          {showLabels && (
            <span className="mt-1 font-mono text-[10px] text-slate-500">
              {i}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}