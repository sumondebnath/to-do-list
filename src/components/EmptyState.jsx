import Button from "./Button.jsx";

export default function EmptyState({
  variant = "tasks",
  title,
  description,
  actionLabel,
  onAction,
}) {
  const presets = {
    tasks: {
      title: "No tasks yet",
      description:
        "Add your first task to get started. Your list will be saved automatically.",
      actionLabel: "Add a task",
    },
    active: {
      title: "No active tasks",
      description:
        "Once you complete tasks, they’ll show up here until you clear them.",
      actionLabel: "Add a task",
    },
    completed: {
      title: "No completed tasks",
      description:
        "Complete a task to see it here. You can clear completed items anytime.",
      actionLabel: "Add a task",
    },
    results: {
      title: "No matching results",
      description: "Try a different search term or adjust your filters.",
      actionLabel: "Clear search",
    },
  };

  const p = presets[variant] ?? presets.tasks;

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/70 px-5 py-10 text-center shadow-sm">
      <div className="mx-auto max-w-md">
        <div className="text-sm font-semibold text-slate-900">
          {title ?? p.title}
        </div>
        <div className="mt-2 text-sm text-slate-600">
          {description ?? p.description}
        </div>
        {onAction ? (
          <div className="mt-5">
            <Button variant="secondary" onClick={onAction}>
              {actionLabel ?? p.actionLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
