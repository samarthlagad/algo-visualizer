import { QUEUE_CAPACITY } from "../dataStructures/queue";

export default function QueueView({ state }) {
  const { items, highlight, action, removedValue, error } = state;

  return (
    <div className="flex flex-col items-center rounded-lg bg-slate-900 p-6">
      <div className="mb-3 flex w-full items-center justify-between text-xs text-slate-400">
        <span>FIFO — First In, First Out</span>
        <span className="font-mono">
          Size: {items.length} / {QUEUE_CAPACITY}
        </span>
      </div>

      {/* Removed ghost banner for dequeued item */}
      <div className="mb-3 h-7">
        {action === 'remove' && removedValue !== null && (
          <span className="inline-flex items-center gap-1.5 rounded border border-dashed border-rose-400/60 bg-rose-500/15 px-3 py-0.5 font-mono text-xs text-rose-300">
            ← Dequeued: {removedValue}
          </span>
        )}
      </div>

      {/* Direction labels */}
      <div className="mb-2 flex w-full items-center justify-between text-xs font-medium">
        <span className="text-rose-300">← Dequeue (Front)</span>
        <span className="text-emerald-300">Enqueue (Rear) ←</span>
      </div>

      {/* Horizontal queue channel */}
      <div className="flex min-h-[120px] w-full items-center justify-start gap-2.5 overflow-x-auto rounded-lg border-y-2 border-slate-700 bg-slate-950/60 px-4 py-6">
        {items.length === 0 ? (
          <div className="mx-auto text-sm text-slate-500">Empty Queue</div>
        ) : (
          items.map((value, i) => {
            const isFront = i === 0;
            const isRear = i === items.length - 1;
            const isHighlighted = highlight === i;

            let boxStyle = 'border-slate-700 bg-slate-800 text-slate-100';
            if (isHighlighted && error) {
              boxStyle = 'border-rose-400 bg-rose-500/25 text-rose-200';
            } else if (isHighlighted && action === 'add') {
              boxStyle = 'border-emerald-400 bg-emerald-500/25 text-emerald-200';
            } else if (isHighlighted && action === 'peek') {
              boxStyle = 'border-amber-400 bg-amber-500/25 text-amber-200';
            }

            return (
              <div
                key={`${i}-${value}`}
                className={`relative flex h-14 min-w-[64px] flex-1 flex-col items-center justify-center rounded-md border font-mono text-sm font-semibold transition-all ${boxStyle}`}
              >
                {isFront && (
                  <span className="absolute -top-5 text-[10px] font-bold tracking-wider text-sky-300">
                    FRONT
                  </span>
                )}
                <span>{value}</span>
                {isRear && (
                  <span className="absolute -bottom-5 text-[10px] font-bold tracking-wider text-purple-300">
                    REAR
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}