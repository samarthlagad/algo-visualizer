import { LINKED_LIST_CAPACITY } from "../dataStructures/linkedList";

export default function LinkedListView({ step }) {
  const { items = [], current = null, target = null, error = false } = step;

  return (
    <div className="rounded-lg bg-slate-900 p-6">
      <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
        <span>Singly Linked List (Node: value + next pointer)</span>
        <span className="font-mono">
          Nodes: {items.length} / {LINKED_LIST_CAPACITY}
        </span>
      </div>

      <div className="flex min-h-[150px] items-center overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/60 px-6 py-8">
        {items.length === 0 ? (
          <div className="mx-auto flex items-center gap-3 font-mono text-sm">
            <span className="rounded bg-sky-500/20 px-2 py-0.5 text-xs font-bold text-sky-300">
              HEAD
            </span>
            <span className="text-slate-500">→</span>
            <span className="rounded border border-dashed border-slate-700 px-3 py-1 text-slate-400">
              NULL
            </span>
          </div>
        ) : (
          <div className="flex items-center">
            {items.map((value, idx) => {
              const isHead = idx === 0;
              const isVisiting = current === idx;
              const isTarget = target === idx;

              let borderClass = 'border-slate-700 bg-slate-800';
              if (isTarget && !error) {
                borderClass = 'border-emerald-400 bg-emerald-500/20 ring-2 ring-emerald-400/30';
              } else if (isVisiting) {
                borderClass = 'border-amber-400 bg-amber-500/20 ring-2 ring-amber-400/30';
              }

              return (
                <div key={`${idx}-${value}`} className="flex items-center">
                  {/* Node Box */}
                  <div className="relative flex flex-col items-center">
                    {isHead && (
                      <span className="absolute -top-6 rounded bg-sky-500/20 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-sky-300">
                        HEAD
                      </span>
                    )}

                    <div
                      className={`flex overflow-hidden rounded-md border font-mono text-sm transition-all ${borderClass}`}
                    >
                      {/* Data cell */}
                      <div className="flex h-12 w-14 items-center justify-center font-bold text-white">
                        {value}
                      </div>
                      {/* Next pointer cell */}
                      <div className="flex h-12 w-10 items-center justify-center border-l border-slate-700/80 bg-slate-900/70 text-[10px] text-slate-400">
                        next
                      </div>
                    </div>

                    <span className="mt-1.5 font-mono text-[11px] text-slate-500">
                      [{idx}]
                    </span>
                  </div>

                  {/* Pointer Arrow */}
                  <div className="mx-2 flex items-center text-slate-400">
                    <div className="h-0.5 w-5 bg-slate-600" />
                    <span className="-ml-1 text-base leading-none text-slate-400">
                      →
                    </span>
                  </div>
                </div>
              );
            })}

            {/* NULL Terminator */}
            <div className="flex h-12 items-center rounded-md border border-dashed border-slate-700 bg-slate-900/50 px-3 font-mono text-xs font-semibold text-slate-400">
              NULL
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-amber-400 bg-amber-500/30" />
          Visiting pointer
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-emerald-400 bg-emerald-500/30" />
          Inserted / Found node
        </span>
      </div>
    </div>
  );
}