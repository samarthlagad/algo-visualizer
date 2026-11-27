import { STACK_CAPACITY } from "../dataStructures/stack";

export default function StackView({ state }) {
  const { items, highlight, action, removedValue, error } = state;

  return (
    <div className="flex flex-col items-center rounded-lg bg-slate-900 p-6">
      <div className="mb-3 flex w-full items-center justify-between text-xs text-slate-400">
        <span>LIFO — Last In, First Out</span>
        <span className="font-mono">
          Size: {items.length} / {STACK_CAPACITY}
        </span>
      </div>

      {/* Removed ghost banner so popped value is still visually clear */}
      <div className="mb-2 h-7">
        {action === 'remove' && removedValue !== null && (
          <span className="inline-flex items-center gap-1.5 rounded border border-dashed border-rose-400/60 bg-rose-500/15 px-3 py-0.5 font-mono text-xs text-rose-300">
            ↑ Popped: {removedValue}
          </span>
        )}
      </div>

      {/* Open-top stack bucket */}
      <div className="flex min-h-[290px] w-56 flex-col-reverse justify-start gap-2 rounded-b-xl border-x-2 border-b-2 border-slate-700 bg-slate-950/60 p-3">
        {items.length === 0 ? (
          <div className="my-auto text-center text-sm text-slate-500">
            Empty Stack
          </div>
        ) : (
          items.map((value, i) => {
            const isTop = i === items.length - 1;
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
                className={`relative flex h-10 items-center justify-center rounded-md border font-mono text-sm font-semibold transition-all ${boxStyle}`}
              >
                <span>{value}</span>
                {isTop && (
                  <span className="absolute right-2 rounded bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-sky-300">
                    TOP
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