import { useEffect, useMemo, useRef, useState } from "react";

import Badge from "./Badge.jsx";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import { formatDateTime } from "../utils/dates.js";
import { normalizeTitle } from "../utils/normalize.js";

function CheckIcon({ checked }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16.7 5.8a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0L3.3 9.6a1 1 0 0 1 1.4-1.4l3 3 6.5-6.5a1 1 0 0 1 1.5 0Z"
        fill={checked ? "currentColor" : "none"}
        stroke={checked ? "none" : "currentColor"}
        strokeWidth="1.2"
      />
    </svg>
  );
}

export default function TaskCard({
  task,
  onToggle,
  onEdit,
  onCancelEdit,
  editing,
  onStartEdit,
  onRequestDelete,
}) {
  const [draft, setDraft] = useState(task.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!editing) return;
    window.setTimeout(() => {
      setDraft(task.title);
      inputRef.current?.focus?.();
    }, 0);
  }, [editing, task.title]);

  const created = useMemo(
    () => formatDateTime(task.createdAt),
    [task.createdAt],
  );

  return (
    <article
      className={
        "rounded-2xl ring-1 transition shadow-sm " +
        (task.completedAt
          ? "bg-white/60 ring-green-200/70"
          : "bg-white/80 ring-slate-200/80 hover:shadow-md")
      }
    >
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => onToggle?.(task.id)}
            className={
              "mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl ring-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 " +
              (task.completedAt
                ? "bg-green-50 text-green-800 ring-green-200"
                : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50")
            }
            aria-label={
              task.completedAt ? "Mark task incomplete" : "Mark task complete"
            }
            aria-pressed={task.completedAt ? "true" : "false"}
          >
            <CheckIcon checked={Boolean(task.completedAt)} />
          </button>

          <div className="min-w-0">
            {editing ? (
              <div className="space-y-2">
                <Input
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const trimmed = String(draft).trim().replace(/\s+/g, " ");
                      onEdit?.(task.id, trimmed);
                    }
                    if (e.key === "Escape") {
                      e.preventDefault();
                      onCancelEdit?.();
                    }
                  }}
                  hasError={normalizeTitle(draft) === ""}
                  placeholder="Edit task"
                  aria-label="Edit task title"
                />
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="primary"
                    onClick={() => {
                      const trimmed = String(draft).trim().replace(/\s+/g, " ");
                      onEdit?.(task.id, trimmed);
                    }}
                  >
                    Save
                  </Button>
                  <Button variant="secondary" onClick={onCancelEdit}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h3
                  className={
                    "break-words text-sm font-semibold text-slate-900 " +
                    (task.completedAt ? "line-through text-slate-500" : "")
                  }
                >
                  <button
                    type="button"
                    onClick={() => onStartEdit?.(task.id)}
                    className="-ml-1 rounded-lg px-1 py-0.5 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
                    aria-label={`Edit task: ${task.title}`}
                  >
                    {task.title}
                  </button>
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-slate-600">
                    Created {created}
                  </span>
                  {task.completedAt ? (
                    <Badge variant="success">Completed</Badge>
                  ) : (
                    <Badge variant="neutral">Active</Badge>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {!editing ? (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => onStartEdit?.(task.id)}
              className="hidden sm:inline-flex"
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => onRequestDelete?.(task)}
              aria-label={`Delete task: ${task.title}`}
            >
              Delete
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  );
}
