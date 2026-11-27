function getColor(i, step) {
  if (step.swapped?.includes(i)) return 'bg-red-500';
  if (step.comparing?.includes(i)) return 'bg-yellow-400';
  if (step.pivot === i) return 'bg-purple-500';
  if (step.sorted?.includes(i)) return 'bg-green-500';
  if (
    step.range?.[0] !== undefined &&
    i >= step.range[0] &&
    i <= step.range[1]
  ) {
    return 'bg-sky-300';
  }
  return 'bg-slate-500';
}

function getCaption(step, algo) {
  if (step.range?.[0] !== undefined) {
    const prefix =
      step.pivot !== null && step.pivot !== undefined
        ? 'Partitioning indices'
        : 'Merging indices';
    return `${prefix} ${step.range[0]} to ${step.range[1]}`;
  }
  if (algo === 'insertion') {
    return 'Green bars are sorted relative to each other, not yet in final position';
  }
  return '';
}

export default function Bars({ step, algo }) {
  if (!step) return null;

  const max = Math.max(...step.array, 1);
  const gapClass = step.array.length > 25 ? 'gap-px' : 'gap-1';
  const caption = getCaption(step, algo);

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

      <p className="mt-2 h-5 text-center text-sm text-slate-400">{caption}</p>
    </div>
  );
}