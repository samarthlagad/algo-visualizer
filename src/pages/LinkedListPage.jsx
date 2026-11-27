import { useState } from 'react';
import {
  fromArray,
  toArray,
  getInsertHeadSteps,
  getInsertTailSteps,
  getInsertAtSteps,
  getDeleteValueSteps,
  getDeleteAtSteps,
  getSearchSteps,
} from '../algorithms/linkedList';
import { complexity } from '../data/complexity';
import { usePlayer } from '../hooks/usePlayer';
import LinkedListView from '../components/LinkedListView';
import PlayerControls from '../components/PlayerControls';
import ComplexityPanel from '../components/ComplexityPanel';
import Button from '../components/Button';

function LinkedListVisualizer({ steps, speed, setSpeed }) {
  const player = usePlayer(steps, speed);
  const currentStep = steps[player.step] ?? steps[0];

  return (
    <div className="space-y-4">
      <p
        className={`text-sm font-medium ${
          currentStep.error ? 'text-rose-400' : 'text-emerald-300'
        }`}
      >
        {currentStep.message}
      </p>

      <LinkedListView step={currentStep} />

      <PlayerControls
        player={player}
        totalSteps={steps.length}
        speed={speed}
        setSpeed={setSpeed}
      />
    </div>
  );
}

export default function LinkedListPage() {
  const [operation, setOperation] = useState('insertTail');
  const [valueInput, setValueInput] = useState('42');
  const [indexInput, setIndexInput] = useState('1');
  const [speed, setSpeed] = useState(450);

  const [session, setSession] = useState(() => {
    const initialHead = fromArray([10, 25, 37]);
    return {
      runId: 0,
      head: initialHead,
      steps: [
        {
          head: initialHead,
          items: toArray(initialHead),
          current: null,
          target: null,
          message: 'Linked list ready. Choose an operation and click Run.',
          error: false,
          done: true,
        },
      ],
    };
  });

  const needsValue = ['insertHead', 'insertTail', 'insertAt', 'deleteValue', 'search'].includes(operation);
  const needsIndex = ['insertAt', 'deleteAt'].includes(operation);

  const handleRun = (e) => {
    e.preventDefault();
    const val = Number(valueInput);
    const idx = Number(indexInput);

    if (needsValue && (valueInput.trim() === '' || Number.isNaN(val))) return;
    if (needsIndex && (indexInput.trim() === '' || Number.isNaN(idx))) return;

    let generatedSteps;
    switch (operation) {
      case 'insertHead':
        generatedSteps = getInsertHeadSteps(session.head, val);
        break;
      case 'insertTail':
        generatedSteps = getInsertTailSteps(session.head, val);
        break;
      case 'insertAt':
        generatedSteps = getInsertAtSteps(session.head, idx, val);
        break;
      case 'deleteValue':
        generatedSteps = getDeleteValueSteps(session.head, val);
        break;
      case 'deleteAt':
        generatedSteps = getDeleteAtSteps(session.head, idx);
        break;
      case 'search':
        generatedSteps = getSearchSteps(session.head, val);
        break;
      default:
        return;
    }

    const finalStep = generatedSteps[generatedSteps.length - 1];
    setSession((prev) => ({
      runId: prev.runId + 1,
      head: finalStep.head,
      steps: generatedSteps,
    }));

    if (needsValue && !finalStep.error && operation.startsWith('insert')) {
      setValueInput(String(Math.floor(Math.random() * 90) + 10));
    }
  };

  const handleReset = () => {
    const freshHead = fromArray([10, 25, 37]);
    setSession((prev) => ({
      runId: prev.runId + 1,
      head: freshHead,
      steps: [
        {
          head: freshHead,
          items: toArray(freshHead),
          current: null,
          target: null,
          message: 'Reset list to [10 → 25 → 37].',
          error: false,
          done: true,
        },
      ],
    }));
  };

  const handleClear = () => {
    setSession((prev) => ({
      runId: prev.runId + 1,
      head: null,
      steps: [
        {
          head: null,
          items: [],
          current: null,
          target: null,
          message: 'Cleared list (HEAD → NULL).',
          error: false,
          done: true,
        },
      ],
    }));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-100">
          {complexity.linkedList.name}
        </h1>

        <div className="flex gap-2">
          <Button type="button" onClick={handleReset}>
            Reset Sample
          </Button>
          <Button type="button" onClick={handleClear}>
            Empty List
          </Button>
        </div>
      </div>

      {/* Operation Controls */}
      <form
        onSubmit={handleRun}
        className="flex flex-wrap items-center gap-3 rounded-lg bg-slate-900 p-4"
      >
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="rounded bg-slate-950 px-3 py-1.5 text-sm text-slate-200 ring-1 ring-slate-700 focus:outline-none focus:ring-emerald-500"
        >
          <option value="insertHead">Insert at Head — O(1)</option>
          <option value="insertTail">Insert at Tail — O(n)</option>
          <option value="insertAt">Insert at Index — O(n)</option>
          <option value="deleteValue">Delete by Value — O(n)</option>
          <option value="deleteAt">Delete at Index — O(n)</option>
          <option value="search">Search Value — O(n)</option>
        </select>

        {needsIndex && (
          <label className="flex items-center gap-1.5 text-xs text-slate-400">
            Index
            <input
              type="number"
              value={indexInput}
              onChange={(e) => setIndexInput(e.target.value)}
              className="w-16 rounded bg-slate-950 px-2.5 py-1.5 font-mono text-sm text-white ring-1 ring-slate-700 focus:outline-none focus:ring-emerald-500"
            />
          </label>
        )}

        {needsValue && (
          <label className="flex items-center gap-1.5 text-xs text-slate-400">
            Value
            <input
              type="number"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              className="w-20 rounded bg-slate-950 px-2.5 py-1.5 font-mono text-sm text-white ring-1 ring-slate-700 focus:outline-none focus:ring-emerald-500"
            />
          </label>
        )}

        <Button type="submit" variant="primary">
          Run Traversal
        </Button>
      </form>

      {/* Step-by-step Traversal Player */}
      <LinkedListVisualizer
        key={session.runId}
        steps={session.steps}
        speed={speed}
        setSpeed={setSpeed}
      />

      <ComplexityPanel info={complexity.linkedList} />
    </div>
  );
}