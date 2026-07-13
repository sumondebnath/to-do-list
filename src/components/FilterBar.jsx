import Badge from "./Badge.jsx";
import { FILTERS } from "../constants/filters";

export default function FilterBar({ filter, onChange, counts }) {
  const tabs = [
    { key: FILTERS.ALL, label: "All", count: counts.total },
    { key: FILTERS.ACTIVE, label: "Active", count: counts.active },
    { key: FILTERS.COMPLETED, label: "Completed", count: counts.completed },
  ];

  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Task filters"
    >
      {tabs.map((t) => {
        const active = t.key === filter;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={active ? "true" : "false"}
            onClick={() => onChange?.(t.key)}
            className={
              "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 " +
              (active
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white/70 text-slate-700 ring-1 ring-slate-200 hover:bg-white")
            }
          >
            {t.label}
            <Badge
              variant={
                t.key === FILTERS.COMPLETED
                  ? "success"
                  : t.key === FILTERS.ACTIVE
                    ? "warning"
                    : "neutral"
              }
              className={active ? "bg-white/20 ring-white/20" : ""}
            >
              {t.count}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
