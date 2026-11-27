import { useState, useMemo } from 'react';
import { SEARCH_ALGORITHMS } from '../algorithms';
import { complexity } from '../data/complexity';
import { generateArray } from '../utils/array';
import { usePlayer } from '../hooks/usePlayer';
import SearchBars from '../components/SearchBars';
import Button from '../components/Button';
import PlayerControls from '../components/PlayerControls';
import ComplexityPanel from '../components/ComplexityPanel';

function createSearchArray(size, algo) {
  const raw = generateArray(size);
  return algo === 'binary' ? [...raw].sort((a, b) => a - b) : raw;
}

function getSearchStatusLabel(step, target, isValidTarget, algo) {
  if (!isValidTarget) return 'Enter a target number to begin';
  if (!step) return '';

  const rangeText =
    algo === 'binary' && step.low !== null && step.high !== null
      ? ` — range [${step.low}, ${step.high}]`
      : '';

  if (step.found !== null) {
    return `Found ${target} at index ${step.found}!`;
  }
  if (step.mid !== null) {
    return `Checking mid index ${step.mid} (value ${step.array[step.mid]}) against ${target}${rangeText}`;
  }
  if (step.current !== null) {
    return `Checking index ${step.current} (value ${step.array[step.current]}) against ${target}`;
  }
  if (step.eliminated.length === step.array.length && step.array.length > 0) {
    return `${target} not found in array`;
  }
  if (rangeText) {
    return `Searching for ${target}${rangeText}`;
  }
  return `Ready to search for ${target}`;
}

function SearchVisualizer({
  algo,
  arr,
  size,
  parsedTarget,
  isValidTarget,
  onAlgoChange,
  onGenerate,
  onSizeChange,
  onPlayingChange,
}) {
  const info = complexity[algo];

  const steps = useMemo(() => {
    if (!isValidTarget) {
      return [
        {
          array: [...arr],
          current: null,
          found: null,
          low: null,
          high: null,
          mid: null,
          eliminated: [],
        },
      ];
    }
    const searchFn = SEARCH_ALGORITHMS[algo] || SEARCH_ALGORITHMS.linear;
    return searchFn(arr, parsedTarget);
  }, [algo, arr, parsedTarget, isValidTarget]);

  const { index, isPlaying, delay, next, prev, reset, togglePlay, setDelay } =
    usePlayer(steps.length);

  const handleToggle = () => {
    onPlayingChange?.(!isPlaying);
    togglePlay();
  };

  const handleReset = () => {
    onPlayingChange?.(false);
    reset();
  };

  const handlePrev = () => {
    onPlayingChange?.(false);
    prev();
  };

  const step = steps[index];

  // Derive outcome summary from the last step
  const lastStep = steps[steps.length - 1];
  const comparisonsCount = steps.filter((s) => s.current !== null).length;
  const resultSummary = !isValidTarget
    ? 'Waiting for a valid target value.'
    : lastStep.found !== null
      ? `Found ${parsedTarget} at index ${lastStep.found} after ${comparisonsCount} comparison${comparisonsCount === 1 ? '' : 's'}.`
      : `${parsedTarget} not found after ${comparisonsCount} comparison${comparisonsCount === 1 ? '' : 's'}.`;

  return (
    <div className="space-y-5">
      {/* Header, Algorithm Selector & Step Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-100">{info.name}</h1>
            {algo === 'binary' && (
              <span className="rounded-full bg-sky-500/15 px-2.5 py-0.5 text-xs font-medium text-sky-300 ring-1 ring-sky-500/30">
                Sorted array required
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400">
            {getSearchStatusLabel(step, parsedTarget, isValidTarget, algo)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={algo}
            disabled={isPlaying}
            onChange={(e) => onAlgoChange(e.target.value)}
            className="rounded bg-slate-900 px-3 py-1.5 text-sm text-slate-200 ring-1 ring-slate-700 focus:outline-none focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {Object.keys(SEARCH_ALGORITHMS).map((key) => (
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

      {/* Search Bars */}
      <SearchBars step={step} />

      {/* Result Summary Banner */}
      <div className="rounded-lg bg-slate-900/60 px-4 py-2 text-center text-sm font-medium">
        <span
          className={
            !isValidTarget
              ? 'text-slate-400'
              : lastStep.found !== null
                ? 'text-emerald-400'
                : 'text-rose-400'
          }
        >
          {resultSummary}
        </span>
      </div>

      {/* Shared Player Controls + Array Controls */}
      <PlayerControls
        isPlaying={isPlaying}
        index={index}
        total={steps.length}
        delay={delay}
        onToggle={handleToggle}
        onPrev={handlePrev}
        onNext={next}
        onReset={handleReset}
        onDelayChange={setDelay}
      >
        <Button onClick={onGenerate} disabled={isPlaying}>
          {algo === 'binary' ? 'New Sorted Array' : 'New Array'}
        </Button>

        <label className="ml-2 flex items-center gap-2 text-sm text-slate-300">
          <span>Size: {size}</span>
          <input
            type="range"
            min="5"
            max="20"
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

export default function SearchPage() {
  const [algo, setAlgo] = useState('linear');
  const [size, setSize] = useState(12);
  const [arr, setArr] = useState(() => createSearchArray(12, 'linear'));
  const [arrayId, setArrayId] = useState(0);
  const [targetInput, setTargetInput] = useState(() => String(arr[0]));
  const [isPlaying, setIsPlaying] = useState(false);

  const trimmed = targetInput.trim();
  const parsedTarget = trimmed === '' ? NaN : Number(trimmed);
  const isValidTarget = trimmed !== '' && !Number.isNaN(parsedTarget);

  const pickRandomFrom = (list) => {
    if (!list.length) return '';
    return String(list[Math.floor(Math.random() * list.length)]);
  };

  const handleAlgoChange = (nextAlgo) => {
    const nextArr = createSearchArray(size, nextAlgo);
    setIsPlaying(false);
    setAlgo(nextAlgo);
    setArr(nextArr);
    setTargetInput(pickRandomFrom(nextArr));
    setArrayId((id) => id + 1);
  };

  const handleGenerate = () => {
    const nextArr = createSearchArray(size, algo);
    setIsPlaying(false);
    setArr(nextArr);
    setTargetInput(pickRandomFrom(nextArr));
    setArrayId((id) => id + 1);
  };

  const handleSizeChange = (newSize) => {
    const nextArr = createSearchArray(newSize, algo);
    setIsPlaying(false);
    setSize(newSize);
    setArr(nextArr);
    setTargetInput(pickRandomFrom(nextArr));
    setArrayId((id) => id + 1);
  };

  const handlePickFromArray = () => {
    setIsPlaying(false);
    setTargetInput(pickRandomFrom(arr));
  };

  const handleTargetChange = (value) => {
    setIsPlaying(false);
    setTargetInput(value);
  };

  return (
    <div className="space-y-4">
      {/* Target Controls live OUTSIDE the keyed visualizer so input never loses focus */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-900/70 p-3">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <span>Target:</span>
            <input
              type="number"
              value={targetInput}
              disabled={isPlaying}
              placeholder="e.g. 42"
              onChange={(e) => handleTargetChange(e.target.value)}
              className="w-24 rounded bg-slate-950 px-3 py-1.5 font-mono text-sm text-white ring-1 ring-slate-700 focus:outline-none focus:ring-emerald-500 disabled:opacity-50"
            />
          </label>

          <Button onClick={handlePickFromArray} disabled={isPlaying}>
            Pick from array
          </Button>
        </div>

        <span className="text-xs text-slate-400">
          {algo === 'binary'
            ? 'Array is generated in ascending order for binary search'
            : isValidTarget
              ? `Searching for ${parsedTarget}`
              : 'Type a number or pick from array'}
        </span>
      </div>

      <SearchVisualizer
        key={`${algo}-${arrayId}-${isValidTarget ? parsedTarget : 'empty'}`}
        algo={algo}
        arr={arr}
        size={size}
        parsedTarget={parsedTarget}
        isValidTarget={isValidTarget}
        onAlgoChange={handleAlgoChange}
        onGenerate={handleGenerate}
        onSizeChange={handleSizeChange}
        onPlayingChange={setIsPlaying}
      />
    </div>
  );
}