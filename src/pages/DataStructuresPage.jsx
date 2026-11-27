import { useState } from 'react';
import {
  createInitialStack,
  push,
  pop,
  peek,
} from '../algorithms/stack';
import {
  createInitialQueue,
  enqueue,
  dequeue,
  front,
} from '../algorithms/queue';
import { complexity } from '../data/complexity';
import StackView from '../components/StackView';
import QueueView from '../components/QueueView';
import Button from '../components/Button';
import ComplexityPanel from '../components/ComplexityPanel';

export default function DataStructuresPage() {
  const [mode, setMode] = useState('stack');
  const [stackState, setStackState] = useState(() => createInitialStack());
  const [queueState, setQueueState] = useState(() => createInitialQueue());
  const [valueInput, setValueInput] = useState(() =>
    String(Math.floor(Math.random() * 90) + 10)
  );
  const [logs, setLogs] = useState({
    stack: ['Initialized stack with [12, 27, 45]'],
    queue: ['Initialized queue with [10, 24, 38]'],
  });

  const currentState = mode === 'stack' ? stackState : queueState;
  const info = complexity[mode];

  const appendLog = (targetMode, entry) => {
    setLogs((prev) => ({
      ...prev,
      [targetMode]: [entry, ...prev[targetMode]].slice(0, 10),
    }));
  };

  const applyTransition = (nextState) => {
    if (mode === 'stack') {
      setStackState(nextState);
    } else {
      setQueueState(nextState);
    }
    appendLog(mode, nextState.message);
  };

  const handleAdd = (e) => {
    e?.preventDefault();
    const trimmed = valueInput.trim();
    const parsed = Number(trimmed);
    if (trimmed === '' || Number.isNaN(parsed)) {
      const errorMsg = 'Enter a valid number first.';
      applyTransition({ ...currentState, error: true, message: errorMsg });
      return;
    }

    const nextState =
      mode === 'stack' ? push(stackState, parsed) : enqueue(queueState, parsed);
    applyTransition(nextState);

    if (!nextState.error) {
      setValueInput(String(Math.floor(Math.random() * 90) + 10));
    }
  };

  const handleRemove = () => {
    const nextState =
      mode === 'stack' ? pop(stackState) : dequeue(queueState);
    applyTransition(nextState);
  };

  const handleInspect = () => {
    const nextState =
      mode === 'stack' ? peek(stackState) : front(queueState);
    applyTransition(nextState);
  };

  const handleClear = () => {
    const emptyState =
      mode === 'stack' ? createInitialStack([]) : createInitialQueue([]);
    applyTransition({ ...emptyState, message: `Cleared ${mode}.` });
  };

  return (
    <div className="space-y-5">
      {/* Header & Structure Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">{info.name}</h1>
          <p
            className={`text-sm font-medium ${
              currentState.error ? 'text-rose-400' : 'text-slate-300'
            }`}
          >
            {currentState.message}
          </p>
        </div>

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="rounded bg-slate-900 px-3 py-1.5 text-sm text-slate-200 ring-1 ring-slate-700 focus:outline-none focus:ring-emerald-500"
        >
          <option value="stack">Stack (LIFO)</option>
          <option value="queue">Queue (FIFO)</option>
        </select>
      </div>

      {/* Structure Visualization */}
      {mode === 'stack' ? (
        <StackView state={stackState} />
      ) : (
        <QueueView state={queueState} />
      )}

      {/* Interactive Operations Bar */}
      <form
        onSubmit={handleAdd}
        className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-900 p-4"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <input
            type="number"
            value={valueInput}
            placeholder="Value"
            onChange={(e) => setValueInput(e.target.value)}
            className="w-24 rounded bg-slate-950 px-3 py-1.5 font-mono text-sm text-white ring-1 ring-slate-700 focus:outline-none focus:ring-emerald-500"
          />

          <Button type="submit" variant="primary">
            {mode === 'stack' ? 'Push' : 'Enqueue'}
          </Button>
          <Button type="button" onClick={handleRemove}>
            {mode === 'stack' ? 'Pop' : 'Dequeue'}
          </Button>
          <Button type="button" onClick={handleInspect}>
            {mode === 'stack' ? 'Peek' : 'Front'}
          </Button>
        </div>

        <Button type="button" onClick={handleClear}>
          Clear
        </Button>
      </form>

      {/* Operation Log (Last 10 messages) */}
      <section className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Operation Log (Last 10)
        </h3>
        <ul className="space-y-1 font-mono text-xs text-slate-300">
          {logs[mode].map((entry, idx) => (
            <li
              key={`${idx}-${entry}`}
              className={idx === 0 ? 'text-emerald-300' : 'text-slate-400'}
            >
              {idx === 0 ? '› ' : '  '}
              {entry}
            </li>
          ))}
        </ul>
      </section>

      {/* Complexity Panel */}
      <ComplexityPanel info={info} />
    </div>
  );
}