import { useMemo } from "react";
import { getBubbleSortSteps } from "./algorithms/bubbleSort";
import { usePlayer } from "./hooks/usePlayer";
import Bars from "./components/Bars";

const INITIAL_ARRAY = [5, 3, 8, 1, 9, 2];

function Visualizer({ array }) {
  const steps = useMemo(() => getBubbleSortSteps(array), [array]);
  const { index, isPlaying, delay, next, prev, reset, togglePlay, setDelay } =
    usePlayer(steps.length);

  const step = steps[index];
  const isAtEnd = index >= steps.length - 1;

  return (
    <div className="w-full max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-100">Bubble Sort</h1>
        <span className="font-mono text-sm text-slate-400">
          Step {index + 1} / {steps.length}
        </span>
      </div>

      <Bars step={step} />

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-slate-900 p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-20 rounded bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={prev}
            disabled={index === 0}
            className="rounded bg-slate-800 px-3 py-2 text-sm font-medium hover:bg-slate-700 disabled:opacity-40"
          >
            Prev
          </button>
          <button
            onClick={next}
            disabled={isAtEnd}
            className="rounded bg-slate-800 px-3 py-2 text-sm font-medium hover:bg-slate-700 disabled:opacity-40"
          >
            Next
          </button>
          <button
            onClick={reset}
            className="rounded bg-slate-800 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700"
          >
            Reset
          </button>
        </div>

        <label className="flex items-center gap-3 text-sm text-slate-300">
          <span>Delay: {delay}ms</span>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            className="accent-emerald-500"
          />
        </label>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 text-white">
      <Visualizer key={INITIAL_ARRAY.join(",")} array={INITIAL_ARRAY} />
    </div>
  );
}
