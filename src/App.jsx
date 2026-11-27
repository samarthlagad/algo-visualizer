import { useState, useMemo } from 'react';
import { ALGORITHMS } from './algorithms';
import { complexity } from './data/complexity';
import { generateArray } from './utils/array';
import { usePlayer } from './hooks/usePlayer';
import Bars from './components/Bars';
import Button from './components/Button';
import ComplexityPanel from './components/ComplexityPanel';

const MAX_DELAY = 1000;

function getStepLabel(step) {
  if (!step) return '';

  const isAllSorted =
    step.array.length > 0 &&
    step.sorted?.length === step.array.length &&
    step.comparing?.length === 0 &&
    step.swapped?.length === 0;

  if (isAllSorted) {
    return 'Array sorted!';
  }

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

function Visualizer({
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
  const isAtEnd = index >= steps.length - 1;
  const speedValue = MAX_DELAY - delay;

  return (
    <div className="space-y-5">
      {/* Header, Algorithm Selector & Status */}
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
            {Object.entries(complexity).map(([key, v]) => (
              <option key={key} value={key}>
                {v.name}
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

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-slate-900 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" onClick={togglePlay} className="w-20">
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button onClick={prev} disabled={index === 0}>
            Prev
          </Button>
          <Button onClick={next} disabled={isAtEnd}>
            Next
          </Button>
          <Button onClick={reset}>Reset</Button>
          <Button onClick={onGenerate} disabled={isPlaying}>
            New Array
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <label className="flex items-center gap-2.5 text-sm text-slate-300">
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

          <label className="flex items-center gap-2.5 text-sm text-slate-300">
            <span>Speed</span>
            <input
              type="range"
              min="50"
              max="950"
              step="50"
              value={speedValue}
              onChange={(e) => setDelay(MAX_DELAY - Number(e.target.value))}
              className="accent-emerald-500"
            />
          </label>
        </div>
      </div>

      {/* Complexity Panel */}
      <ComplexityPanel info={info} />
    </div>
  );
}

export default function App() {
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
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl p-6">
        <Visualizer
          key={`${algo}-${arrayId}`}
          algo={algo}
          arr={arr}
          size={size}
          onAlgoChange={setAlgo}
          onGenerate={handleGenerate}
          onSizeChange={handleSizeChange}
        />
      </div>
    </div>
  );
}