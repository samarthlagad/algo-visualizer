function getColor(i, step) {
  if (step.comparing.includes(i)) {
    return step.swapped ? 'bg-red-500' : 'bg-yellow-400';
  }
  if (i >= step.sortedFrom) {
    return 'bg-green-500';
  }
  return 'bg-slate-500';
}

export default function Bars({ step }) {
  if (!step) return null;

  const max = Math.max(...step.array, 1);
  const gapClass = step.array.length > 25 ? 'gap-px' : 'gap-1';

  return (
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
  );
}