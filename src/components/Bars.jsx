function getColor(i, step) {
  if (Array.isArray(step.swapped) && step.swapped.includes(i)) {
    return 'bg-red-500';
  }
  if (step.swapped === true && step.comparing?.includes(i)) {
    return 'bg-red-500';
  }

  if (step.comparing?.includes(i)) {
    return 'bg-yellow-400';
  }

  if (Array.isArray(step.sorted) && step.sorted.includes(i)) {
    return 'bg-green-500';
  }
  if (typeof step.sortedFrom === 'number' && i >= step.sortedFrom) {
    return 'bg-green-500';
  }

  if (
    step.range?.[0] !== undefined &&
    i >= step.range[0] &&
    i <= step.range[1]
  ) {
    return 'bg-sky-300';
  }

  return 'bg-slate-500';
}

export default function Bars({ step }) {
  if (!step) return null;

  const max = Math.max(...step.array, 1);
  const gapClass = step.array.length > 25 ? 'gap-px' : 'gap-1';
  const hasRange = step.range?.[0] !== undefined;

  return (
    <div className="w-full">
      <div
        className={`flex h-80 w-full items-end rounded-lg bg-slate-900 p-4 ${gapClass}`}
      >
        {step.array.map((value, i) => (
          <div
            key={i}
            style={{ height: `${(value / max) * 100}%` }}
            className={`flex-1 rounded-t transition-all duration-100 ${getColor(i, step)}`}
            title={`Index ${i}: ${value}`}
          />
        ))}
      </div>

      <p className="mt-2 h-5 text-center text-sm text-slate-400">
        {hasRange ? `Merging indices ${step.range[0]} to ${step.range[1]}` : ''}
      </p>
    </div>
  );
}