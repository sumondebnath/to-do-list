export default function Statistics({
  total,
  active,
  completed,
  completionPct,
}) {
  return (
    <section
      aria-label="Task statistics"
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
    >
      <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200/70">
        <div className="text-xs font-semibold text-slate-600">Total</div>
        <div className="mt-1 text-2xl font-bold text-slate-900">{total}</div>
      </div>
      <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200/70">
        <div className="text-xs font-semibold text-slate-600">Active</div>
        <div className="mt-1 text-2xl font-bold text-slate-900">{active}</div>
      </div>
      <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200/70">
        <div className="text-xs font-semibold text-slate-600">Completed</div>
        <div className="mt-1 text-2xl font-bold text-slate-900">
          {completed}
        </div>
      </div>
      <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200/70">
        <div className="text-xs font-semibold text-slate-600">Completion</div>
        <div className="mt-1 text-2xl font-bold text-slate-900">
          {completionPct}%
        </div>
      </div>
    </section>
  );
}
