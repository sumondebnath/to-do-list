export default function ToastHost({ toasts, onDismiss }) {
  const typeStyles = (type) => {
    switch (type) {
      case "success":
        return {
          ring: "ring-green-500/30",
          border: "border-green-200/60",
          icon: "bg-green-500/15 text-green-700",
        };
      case "error":
        return {
          ring: "ring-red-500/30",
          border: "border-red-200/60",
          icon: "bg-red-500/15 text-red-700",
        };
      case "warning":
        return {
          ring: "ring-amber-500/30",
          border: "border-amber-200/60",
          icon: "bg-amber-500/15 text-amber-700",
        };
      default:
        return {
          ring: "ring-blue-500/30",
          border: "border-blue-200/60",
          icon: "bg-blue-500/15 text-blue-700",
        };
    }
  };

  return (
    <div
      aria-live="polite"
      aria-relevant="additions removals"
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center px-3"
    >
      <div className="w-full max-w-md space-y-2">
        {toasts.map((t) => {
          const s = typeStyles(t.type);
          return (
            <div
              key={t.id}
              className={`pointer-events-auto rounded-2xl border bg-white/95 p-3 shadow-lg backdrop-blur ${s.ring} ${s.border}`}
              role="status"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-xl px-2 py-1 text-sm font-semibold ${s.icon}`}
                >
                  {t.type?.toUpperCase?.() ?? "INFO"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-900">
                    {t.title}
                  </div>
                  {t.description ? (
                    <div className="mt-1 text-sm text-slate-600">
                      {t.description}
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => onDismiss(t.id)}
                  className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
                  aria-label="Dismiss notification"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293-4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
