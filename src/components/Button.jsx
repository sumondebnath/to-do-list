export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };

  const variants = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-sm shadow-slate-900/10",
    secondary:
      "bg-white/80 text-slate-900 ring-1 ring-slate-200 hover:bg-white shadow-sm",
    danger:
      "bg-red-600 text-white hover:bg-red-500 shadow-sm shadow-red-600/10",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 ring-1 ring-transparent hover:ring-slate-200",
  };

  return (
    <button
      type={props.type ?? "button"}
      className={`${base} ${sizes[size] ?? sizes.md} ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    />
  );
}
