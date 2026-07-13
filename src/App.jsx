import { useCallback, useEffect, useRef } from "react";

import AppShell from "./components/AppShell.jsx";
import ToastHost from "./components/ToastHost.jsx";

import { useTasks } from "./hooks/useTasks.js";
import { useToasts } from "./hooks/useToasts.js";

import TasksPage from "./pages/TasksPage.jsx";

import { FILTERS } from "./constants/filters.js";
import { SORTS } from "./constants/sorts.js";

export default function App() {
  useEffect(() => {
    document.title = "To‑Do List • Nexsoft";
  }, []);

  const toastApi = useToasts();

  const onRestored = useCallback(
    ({ tasks: hasRestoredTasks }) => {
      if (hasRestoredTasks) {
        toastApi.pushToast({
          title: "Tasks restored",
          description:
            "Your tasks and preferences were loaded from this browser.",
          type: "success",
        });
      }
    },
    [toastApi],
  );

  const { ui, derived, storageError, actions } = useTasks({ onRestored });

  const prevStorageError = useRef(null);
  useEffect(() => {
    if (storageError && storageError !== prevStorageError.current) {
      toastApi.pushToast({
        title: "Storage warning",
        description: storageError,
        type: "warning",
      });
    }
    prevStorageError.current = storageError;
  }, [storageError, toastApi]);

  const toast = useCallback(
    ({ title, description, type, durationMs }) =>
      toastApi.pushToast({ title, description, type, durationMs }),
    [toastApi],
  );

  return (
    <>
      <AppShell>
        <TasksPage
          ui={{
            filter: ui?.filter ?? FILTERS.ALL,
            searchQuery: ui?.searchQuery ?? "",
            sortBy: ui?.sortBy ?? SORTS.NEWEST,
          }}
          derived={derived}
          toast={toast}
          onAdd={actions.addTask}
          onUpdate={actions.updateTask}
          onToggleCompleted={actions.toggleCompleted}
          onDelete={actions.removeTask}
          onClearCompleted={actions.clearCompleted}
          onFilterChange={actions.setFilter}
          onSearchChange={actions.setSearchQuery}
          onSortChange={actions.setSortBy}
        />
      </AppShell>

      <ToastHost toasts={toastApi.toasts} onDismiss={toastApi.removeToast} />
    </>
  );
}
