import { useState, useMemo } from 'react';
import { getBubbleSortSteps } from './algorithms/bubbleSort';
import Bars from './components/Bars';

const INITIAL_ARRAY = [5, 3, 8, 1, 9, 2];

export default function App() {
  const steps = useMemo(() => getBubbleSortSteps(INITIAL_ARRAY), []);
  const [index, setIndex] = useState(0);

  const step = steps[index];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 p-6 text-white">
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-100">Bubble Sort</h1>
          <span className="font-mono text-sm text-slate-400">
            Step {index + 1} / {steps.length}
          </span>
        </div>

        <Bars step={step} />

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
            disabled={index === 0}
            className="rounded bg-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-700 disabled:opacity-40"
          >
            Prev
          </button>
          <button
            onClick={() => setIndex((i) => Math.min(i + 1, steps.length - 1))}
            disabled={index === steps.length - 1}
            className="rounded bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}