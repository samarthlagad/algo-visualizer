import { useState, useMemo } from 'react';
import { ALGORITHMS } from "../algorithms/sorting";
import { complexity } from '../data/complexity';
import { generateArray } from '../utils/array';
import { usePlayer } from '../hooks/usePlayer';
import Bars from '../components/Bars';
import Button from '../components/Button';
import PlayerControls from '../components/PlayerControls';
import ComplexityPanel from '../components/ComplexityPanel';

function getStepLabel(step) {
  if (!step) return '';

  const isAllSorted =
    step.array.length > 0 &&
    step.sorted?.length === step.array.length &&
    step.comparing?.length === 0 &&
    step.swapped?.length === 0;

  if (isAllSorted) return 'Array sorted!';

  if (step.swapped?.length === 2) {
    const [a, b] = step.swapped;
    return `Swapped ${step.array[a]} and ${step.array[b]}`;
  }

  if (step.swapped?.length === 1) {
    const [k] = step.swapped;
    return `Wrote ${step.array[k]} at index ${k}`;
  }

  if (step.comparing?.length === 2) {
    const [a, b] = step.comparing;
    return `Comparing ${step.array[a]} and ${step.array[b]}`;
  }

  if (step.pivot !== null && step.pivot !== undefined) {
    return `Pivot: ${step.array[step.pivot]} (index ${step.pivot})`;
  }

  return 'Ready';
}

function SortingVisualizer({
  algo,
  arr,
  size,
  onAlgoChange,
  onGenerate,
  onSizeChange,
}) {
  const info = complexity[algo];

  const steps = useMemo(() => {
    const sortFn = ALGORITHMS[algo] || ALGORITHMS.bubble;
    return sortFn(arr);
  }, [algo, arr]);

  const stats = useMemo(
    () => ({
      total: steps.length,
      comparisons: steps.filter((s) => s.comparing.length > 0).length,
      swaps: steps.filter((s) => s.swapped.length > 0).length,
    }),
    [steps]
  );

  const { index, isPlaying, delay, next, prev, reset, togglePlay, setDelay } =
    usePlayer(steps.length);

  const step = steps[index];

  return (
    <div className="space-y-5">
      {/* Header, Algorithm Selector & Step Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">{info.name}</h1>
          <p className="text-sm text-slate-400">{getStepLabel(step)}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={algo}
            disabled={isPlaying}
            onChange={(e) => onAlgoChange(e.target.value)}
            className="rounded bg-slate-900 px-3 py-1.5 text-sm text-slate-200 ring-1 ring-slate-700 focus:outline-none focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {Object.keys(ALGORITHMS).map((key) => (
              <option key={key} value={key}>
                {complexity[key].name}
              </option>
            ))}
          </select>

          <span className="rounded bg-slate-900 px-3 py-1 font-mono text-sm text-slate-300">
            Step {index + 1} / {steps.length}
          </span>
        </div>
      </div>

      {/* Bars */}
      <Bars step={step} algo={algo} />

      {/* Live Stats Line */}
      <div className="flex flex-wrap items-center justify-center gap-6 rounded-lg bg-slate-900/60 px-4 py-2 text-xs text-slate-400 sm:text-sm">
        <span>
          Steps:{' '}
          <strong className="font-mono text-slate-200">{stats.total}</strong>
        </span>
        <span>
          Comparisons:{' '}
          <strong className="font-mono text-yellow-400">
            {stats.comparisons}
          </strong>
        </span>
        <span>
          Swaps / Writes:{' '}
          <strong className="font-mono text-red-400">{stats.swaps}</strong>
        </span>
      </div>

      {/* Shared Player Controls + Array Controls */}
      <PlayerControls
        isPlaying={isPlaying}
        index={index}
        total={steps.length}
        delay={delay}
        onToggle={togglePlay}
        onPrev={prev}
        onNext={next}
        onReset={reset}
        onDelayChange={setDelay}
      >
        <Button onClick={onGenerate} disabled={isPlaying}>
          New Array
        </Button>

        <label className="ml-2 flex items-center gap-2 text-sm text-slate-300">
          <span>Size: {size}</span>
          <input
            type="range"
            min="5"
            max="50"
            value={size}
            disabled={isPlaying}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            className="accent-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </label>
      </PlayerControls>

      {/* Complexity Panel */}
      <ComplexityPanel info={info} />
    </div>
  );
}

export default function SortingPage() {
  const [algo, setAlgo] = useState('bubble');
  const [size, setSize] = useState(10);
  const [arr, setArr] = useState(() => generateArray(10));
  const [arrayId, setArrayId] = useState(0);

  const handleGenerate = () => {
    setArr(generateArray(size));
    setArrayId((id) => id + 1);
  };

  const handleSizeChange = (newSize) => {
    setSize(newSize);
    setArr(generateArray(newSize));
    setArrayId((id) => id + 1);
  };

  return (
    <SortingVisualizer
      key={`${algo}-${arrayId}`}
      algo={algo}
      arr={arr}
      size={size}
      onAlgoChange={setAlgo}
      onGenerate={handleGenerate}
      onSizeChange={handleSizeChange}
    />
  );
}