export default function Badge({
  children,
  variant = "neutral",
  className = "",
}) {
  const styles = {
    neutral: "bg-slate-100 text-slate-700 ring-slate-200",
    success: "bg-green-100 text-green-800 ring-green-200",
    danger: "bg-red-100 text-red-800 ring-red-200",
    warning: "bg-amber-100 text-amber-800 ring-amber-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${styles[variant] ?? styles.neutral} ${className}`}
    >
      {children}
    </span>
  );
}
