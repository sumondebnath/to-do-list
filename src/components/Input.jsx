export default function Input({ className = "", hasError = false, ...props }) {
  const base =
    "w-full rounded-xl bg-white px-4 py-3 text-sm text-slate-900 shadow-sm ring-1 transition placeholder:text-slate-400 focus:outline-none focus-visible:ring-2";

  const ring = hasError
    ? "ring-red-200 focus-visible:ring-red-500/30"
    : "ring-slate-200 focus-visible:ring-slate-900/30";

  return (
    <input
      className={`${base} ${ring} ${className}`}
      aria-invalid={hasError ? "true" : "false"}
      {...props}
    />
  );
}
