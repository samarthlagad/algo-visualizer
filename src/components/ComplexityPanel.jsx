export default function ComplexityPanel({ info }) {
  if (!info) return null;

  const metrics = [
    { label: "Best", value: info.best },
    { label: "Average", value: info.average },
    { label: "Worst", value: info.worst },
    { label: "Space", value: info.space },
  ];

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-4 text-slate-200">
      {/* Header + Stable Badge */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-white">{info.name}</h2>

        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            info.stable
              ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30"
              : "bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30"
          }`}
        >
          Stable: {info.stable ? "Yes" : "No"}
        </span>
      </div>

      {/* Time & Space Complexity Grid (2x2 on narrow screens, 4x1 on wider screens) */}
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {metrics.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-md bg-slate-950/70 px-3 py-2 text-center"
          >
            <div className="text-xs uppercase tracking-wide text-slate-400">
              {label}
            </div>
            <div className="mt-0.5 font-mono text-sm font-semibold text-sky-300">
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Algorithm Description */}
      <p className="text-sm leading-relaxed text-slate-300">
        {info.description}
      </p>
    </section>
  );
}
