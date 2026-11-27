import Button from './Button';

const MAX_DELAY = 1000;

export default function PlayerControls({
  isPlaying,
  index,
  total,
  delay,
  onToggle,
  onPrev,
  onNext,
  onReset,
  onDelayChange,
  children,
}) {
  const isAtEnd = total <= 1 || index >= total - 1;
  const speedValue = MAX_DELAY - delay;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-slate-900 p-4">
      {/* Generic playback buttons + optional page-specific buttons (e.g. New Array) */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="primary"
          onClick={onToggle}
          disabled={total <= 1}
          className="w-20"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button onClick={onPrev} disabled={index === 0}>
          Prev
        </Button>
        <Button onClick={onNext} disabled={isAtEnd}>
          Next
        </Button>
        <Button onClick={onReset} disabled={index === 0 && !isPlaying}>
          Reset
        </Button>
        {children}
      </div>

      {/* Generic speed slider + optional page-specific sliders (e.g. Size) */}
      <div className="flex flex-wrap items-center gap-5">
        <label className="flex items-center gap-2.5 text-sm text-slate-300">
          <span>Speed</span>
          <input
            type="range"
            min="50"
            max="950"
            step="50"
            value={speedValue}
            onChange={(e) => onDelayChange(MAX_DELAY - Number(e.target.value))}
            className="accent-emerald-500"
          />
        </label>
      </div>
    </div>
  );
}