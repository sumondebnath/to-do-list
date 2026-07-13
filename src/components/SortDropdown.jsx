import { SORT_LABELS } from "../constants/sorts";

export default function SortDropdown({ sortBy, onChange }) {
  const options = Object.keys(SORT_LABELS);

  return (
    <div className="w-full sm:w-52">
      <label htmlFor="task-sort" className="sr-only">
        Sort tasks
      </label>
      <select
        id="task-sort"
        value={sortBy}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full h-11 rounded-xl bg-white px-4 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
      >
        {options.map((k) => (
          <option key={k} value={k}>
            {SORT_LABELS[k]}
          </option>
        ))}
      </select>
    </div>
  );
}
