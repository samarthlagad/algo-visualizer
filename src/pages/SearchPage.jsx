import { useState, useMemo } from 'react';
import { getLinearSearchSteps } from '../algorithms/linearSearch';
import { complexity } from '../data/complexity';
import { generateArray } from '../utils/array';
import { usePlayer } from '../hooks/usePlayer';
import SearchBars from '../components/SearchBars';
import Button from '../components/Button';
import PlayerControls from '../components/PlayerControls';
import ComplexityPanel from '../components/ComplexityPanel';

function getSearchStatusLabel(step, target, isValidTarget) {
  if (!isValidTarget) return 'Enter a target number to begin';
  if (!step) return '';

  if (step.found !== null) {
    return `Found ${target} at index ${step.found}!`;
  }
  if (step.current !== null) {
    return `Checking index ${step.current} (value ${step.array[step.current]}) against ${target}`;
  }
  if (step.eliminated.length === step.array.length && step.array.length > 0) {
    return `${target} not found in array`;
  }
  return `Ready to search for ${target}`;
}

function SearchVisualizer({
  arr,
  size,
  targetInput,
  parsedTarget,
  isValidTarget,
  onTargetChange,
  onPickFromArray,
  onGenerate,
  onSizeChange,
}) {
  const info = complexity.linear;

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
    return getLinearSearchSteps(arr, parsedTarget);
  }, [arr, parsedTarget, isValidTarget]);

  const { index, isPlaying, delay, next, prev, reset, togglePlay, setDelay } =
    usePlayer(steps.length);

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
      {/* Header & Step Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">{info.name}</h1>
          <p className="text-sm text-slate-400">
            {getSearchStatusLabel(step, parsedTarget, isValidTarget)}
          </p>
        </div>

        <span className="rounded bg-slate-900 px-3 py-1 font-mono text-sm text-slate-300">
          Step {index + 1} / {steps.length}
        </span>
      </div>

      {/* Search Bars */}
      <SearchBars step={step} />

      {/* Target Input & Pick From Array Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-900/70 p-3">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <span>Target:</span>
            <input
              type="number"
              value={targetInput}
              disabled={isPlaying}
              placeholder="e.g. 42"
              onChange={(e) => onTargetChange(e.target.value)}
              className="w-24 rounded bg-slate-950 px-3 py-1.5 font-mono text-sm text-white ring-1 ring-slate-700 focus:outline-none focus:ring-emerald-500 disabled:opacity-50"
            />
          </label>

          <Button onClick={onPickFromArray} disabled={isPlaying}>
            Pick from array
          </Button>
        </div>

        <p
          className={`text-sm font-medium ${
            !isValidTarget
              ? 'text-slate-400'
              : lastStep.found !== null
                ? 'text-emerald-400'
                : 'text-rose-400'
          }`}
        >
          {resultSummary}
        </p>
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
  const [size, setSize] = useState(12);
  const [arr, setArr] = useState(() => generateArray(12));
  const [arrayId, setArrayId] = useState(0);
  const [targetInput, setTargetInput] = useState(() => String(arr[0]));

  const trimmed = targetInput.trim();
  const parsedTarget = trimmed === '' ? NaN : Number(trimmed);
  const isValidTarget = trimmed !== '' && !Number.isNaN(parsedTarget);

  const pickRandomFrom = (list) => {
    if (!list.length) return '';
    return String(list[Math.floor(Math.random() * list.length)]);
  };

  const handleGenerate = () => {
    const nextArr = generateArray(size);
    setArr(nextArr);
    setTargetInput(pickRandomFrom(nextArr));
    setArrayId((id) => id + 1);
  };

  const handleSizeChange = (newSize) => {
    const nextArr = generateArray(newSize);
    setSize(newSize);
    setArr(nextArr);
    setTargetInput(pickRandomFrom(nextArr));
    setArrayId((id) => id + 1);
  };

  const handlePickFromArray = () => {
    setTargetInput(pickRandomFrom(arr));
  };

  return (
    <SearchVisualizer
      key={`${arrayId}-${isValidTarget ? parsedTarget : 'empty'}`}
      arr={arr}
      size={size}
      targetInput={targetInput}
      parsedTarget={parsedTarget}
      isValidTarget={isValidTarget}
      onTargetChange={setTargetInput}
      onPickFromArray={handlePickFromArray}
      onGenerate={handleGenerate}
      onSizeChange={handleSizeChange}
    />
  );
}