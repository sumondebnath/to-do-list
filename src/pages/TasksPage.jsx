import { useMemo, useState } from "react";

import ConfirmationModal from "../components/ConfirmationModal.jsx";
import EmptyState from "../components/EmptyState.jsx";
import FilterBar from "../components/FilterBar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import Statistics from "../components/Statistics.jsx";
import TaskInput from "../components/TaskInput.jsx";
import TaskList from "../components/TaskList.jsx";

import { FILTERS } from "../constants/filters.js";
import { SORTS } from "../constants/sorts.js";

export default function TasksPage({
  ui,

  derived,
  onAdd,
  onUpdate,
  onToggleCompleted,
  onDelete,
  onClearCompleted,
  onFilterChange,
  onSearchChange,
  onSortChange,
  toast,
}) {
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [clearCompletedOpen, setClearCompletedOpen] = useState(false);

  const counts = useMemo(
    () => ({
      total: derived.total,
      active: derived.active,
      completed: derived.completed,
    }),
    [derived.active, derived.completed, derived.total],
  );

  const filteredTasks = derived.tasks;

  const emptyVariant = useMemo(() => {
    if (ui.searchQuery?.trim()) return "results";
    if (ui.filter === FILTERS.ACTIVE) return "active";
    if (ui.filter === FILTERS.COMPLETED) return "completed";
    return "tasks";
  }, [ui.filter, ui.searchQuery]);

  const handleRequestDelete = (task) => {
    setDeleteTarget(task);
  };

  return (
    <main>
      <section className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            To‑Do List
          </h1>
          <p className="text-sm text-slate-600">
            A production-ready tasks experience with search, sorting, filters,
            and persistent storage.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <TaskInput
              onAdd={(title) => onAdd(title)}
              toastOnError={(msg) =>
                toast?.({
                  title: "Could not add task",
                  description: msg,
                  type: "error",
                })
              }
            />
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <SearchBar
                  query={ui.searchQuery}
                  onQueryChange={onSearchChange}
                />
              </div>
              <div>
                <SortDropdown
                  sortBy={ui.sortBy ?? SORTS.NEWEST}
                  onChange={onSortChange}
                />
              </div>
              <div>
                <FilterBar
                  filter={ui.filter}
                  onChange={onFilterChange}
                  counts={counts}
                />
              </div>
            </div>
          </div>
        </div>

        <Statistics
          total={derived.total}
          active={derived.active}
          completed={derived.completed}
          completionPct={derived.completionPct}
        />

        <section aria-label="Tasks" className="space-y-4">
          {filteredTasks.length ? (
            <TaskList
              tasks={filteredTasks}
              editingId={editingId}
              onToggle={onToggleCompleted}
              onStartEdit={setEditingId}
              onEdit={(id, title) => {
                const res = onUpdate(id, title);
                if (res?.ok === false) {
                  toast?.({
                    title: "Could not update task",
                    description: res.error,
                    type: "error",
                  });
                  return;
                }
                setEditingId(null);
                toast?.({
                  title: "Task updated",
                  description: res?.task?.title
                    ? `Updated: ${res.task.title}`
                    : undefined,
                  type: "success",
                });
              }}
              onCancelEdit={() => setEditingId(null)}
              onRequestDelete={(task) => handleRequestDelete(task)}
            />
          ) : (
            <EmptyState
              variant={emptyVariant}
              onAction={
                emptyVariant === "results"
                  ? () => onSearchChange("")
                  : undefined
              }
              actionLabel={
                emptyVariant === "results" ? "Clear search" : undefined
              }
            />
          )}
        </section>

        <section className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <div className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredTasks.length}
            </span>{" "}
            task(s).
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setClearCompletedOpen(true)}
              disabled={derived.completed === 0}
              className="inline-flex items-center justify-center rounded-xl bg-white/70 px-4 py-3 text-sm font-semibold shadow-sm ring-1 ring-slate-200/70 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
            >
              Clear completed
            </button>
          </div>
        </section>
      </section>

      <ConfirmationModal
        open={Boolean(deleteTarget)}
        title="Delete task?"
        description={
          deleteTarget
            ? `This will permanently remove “${deleteTarget.title}”.`
            : undefined
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        tone="danger"
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          const res = onDelete(deleteTarget.id);
          if (res?.ok !== false) {
            toast?.({
              title: "Task deleted",
              description: deleteTarget.title,
              type: "success",
            });
          } else {
            toast?.({
              title: "Could not delete task",
              description: res.error,
              type: "error",
            });
          }
          setDeleteTarget(null);
          setEditingId((prev) => (prev === deleteTarget.id ? null : prev));
        }}
      />

      <ConfirmationModal
        open={clearCompletedOpen}
        title="Clear all completed tasks?"
        description={`This will remove ${derived.completed} completed task(s).`}
        confirmLabel="Clear"
        cancelLabel="Cancel"
        tone="danger"
        onClose={() => setClearCompletedOpen(false)}
        onConfirm={() => {
          const res = onClearCompleted();
          if (res?.ok !== false) {
            toast?.({ title: "Completed tasks cleared", type: "success" });
          } else {
            toast?.({
              title: "Could not clear completed tasks",
              description: res.error,
              type: "error",
            });
          }
          setClearCompletedOpen(false);
        }}
      />
    </main>
  );
}
