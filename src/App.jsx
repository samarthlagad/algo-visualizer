import { useState, useMemo } from 'react';
import { getBubbleSortSteps } from './algorithms/bubbleSort';
import { generateArray } from './utils/array';
import { usePlayer } from './hooks/usePlayer';
import Bars from './components/Bars';
import Button from './components/Button';

const MAX_DELAY = 1000;

function getStepLabel(step) {
  if (!step) return '';
  if (step.sortedFrom === 0 && step.comparing.length === 0) {
    return 'Array sorted!';
  }
  if (step.comparing.length === 2) {
    const [a, b] = step.comparing;
    const valA = step.array[a];
    const valB = step.array[b];
    return step.swapped
      ? `Swapped ${valA} and ${valB}`
      : `Comparing ${valA} and ${valB}`;
  }
  return 'Ready';
}

function Visualizer({ arr, size, onGenerate, onSizeChange }) {
  const steps = useMemo(() => getBubbleSortSteps(arr), [arr]);
  const { index, isPlaying, delay, next, prev, reset, togglePlay, setDelay } =
    usePlayer(steps.length);

  const step = steps[index];
  const isAtEnd = index >= steps.length - 1;
  const speedValue = MAX_DELAY - delay;

  return (
    <div className="space-y-5">
      {/* Header & Status */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Bubble Sort</h1>
          <p className="text-sm text-slate-400">{getStepLabel(step)}</p>
        </div>
        <span className="rounded bg-slate-900 px-3 py-1 font-mono text-sm text-slate-300">
          Step {index + 1} / {steps.length}
        </span>
      </div>

      {/* Bars */}
      <Bars step={step} />

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-slate-900 p-4">
        {/* Playback buttons */}
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

        {/* Sliders */}
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
    </div>
  );
}

export default function App() {
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
          key={arrayId}
          arr={arr}
          size={size}
          onGenerate={handleGenerate}
          onSizeChange={handleSizeChange}
        />
      </div>
    </div>
  );
}