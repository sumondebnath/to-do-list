import { useCallback, useEffect, useMemo, useState } from "react";

import { STORAGE_KEYS } from "../constants/storageKeys";
import { FILTERS } from "../constants/filters";
import { SORTS } from "../constants/sorts";
import { createId } from "../utils/id";
import { normalizeTitle } from "../utils/normalize";
import { safeReadJSON, safeWriteJSON } from "../utils/storage";

const defaultUI = {
  filter: FILTERS.ALL,
  searchQuery: "",
  sortBy: SORTS.NEWEST,
};

function loadInitial() {
  const restoredTasks = safeReadJSON(STORAGE_KEYS.TASKS) ?? [];
  const restoredUI = safeReadJSON(STORAGE_KEYS.UI) ?? defaultUI;
  return {
    tasks: Array.isArray(restoredTasks) ? restoredTasks : [],
    ui: { ...defaultUI, ...restoredUI },
  };
}

function coerceTask(t) {
  return {
    id: String(t.id),
    title: String(t.title ?? ""),
    createdAt: t.createdAt ?? new Date().toISOString(),
    completedAt: t.completedAt ?? null,
  };
}

export function useTasks({ onRestored } = {}) {
  const initial = useMemo(() => loadInitial(), []);

  // If a consumer wants to know whether we restored anything from storage,
  // we notify exactly once after mount without render-time side effects.
  useEffect(() => {
    if (!onRestored) return;
    const hasRestoredTasks =
      Array.isArray(initial.tasks) && initial.tasks.length > 0;
    const hasRestoredUI =
      initial.ui &&
      (initial.ui.filter !== defaultUI.filter ||
        initial.ui.searchQuery !== defaultUI.searchQuery ||
        initial.ui.sortBy !== defaultUI.sortBy);
    if (hasRestoredTasks || hasRestoredUI)
      onRestored({ tasks: hasRestoredTasks });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [tasks, setTasks] = useState(() => initial.tasks.map(coerceTask));
  const [ui, setUi] = useState(() => initial.ui);

  const [storageError, setStorageError] = useState(null);

  const persist = useCallback((nextTasks, nextUI) => {
    const tasksOk = safeWriteJSON(STORAGE_KEYS.TASKS, nextTasks);
    const uiOk = safeWriteJSON(STORAGE_KEYS.UI, nextUI);
    if (!tasksOk || !uiOk) {
      setStorageError("Storage is full. Changes may not persist.");
      return false;
    }
    setStorageError(null);
    return true;
  }, []);

  const addTask = useCallback(
    (rawTitle) => {
      const title = String(rawTitle ?? "")
        .trim()
        .replace(/\s+/g, " ");
      if (!title) return { ok: false, error: "Task title cannot be empty." };

      const normalized = normalizeTitle(title);
      const existing = tasks.some(
        (t) => normalizeTitle(t.title) === normalized,
      );
      if (existing) return { ok: false, error: "Task already exists." };

      const now = new Date().toISOString();
      const nextTasks = [
        {
          id: createId(),
          title,
          createdAt: now,
          completedAt: null,
        },
        ...tasks,
      ];
      setTasks(nextTasks);
      const saved = persist(nextTasks, ui);
      if (saved === false)
        return { ok: false, error: "Could not save to storage." };
      return { ok: true, task: nextTasks[0] };
    },
    [persist, tasks, ui],
  );

  const updateTask = useCallback(
    (id, rawTitle) => {
      const title = String(rawTitle ?? "")
        .trim()
        .replace(/\s+/g, " ");
      if (!title) return { ok: false, error: "Task title cannot be empty." };

      const normalized = normalizeTitle(title);
      const duplicate = tasks.some(
        (t) => t.id !== id && normalizeTitle(t.title) === normalized,
      );
      if (duplicate) return { ok: false, error: "Task already exists." };

      const nextTasks = tasks.map((t) => (t.id === id ? { ...t, title } : t));
      setTasks(nextTasks);
      const saved = persist(nextTasks, ui);
      if (saved === false)
        return { ok: false, error: "Could not save to storage." };

      const updated = nextTasks.find((t) => t.id === id);
      return { ok: true, task: updated };
    },
    [persist, tasks, ui],
  );

  const toggleCompleted = useCallback(
    (id) => {
      const now = new Date().toISOString();
      const nextTasks = tasks.map((t) => {
        if (t.id !== id) return t;
        const completedAt = t.completedAt ? null : now;
        return { ...t, completedAt };
      });
      setTasks(nextTasks);
      const saved = persist(nextTasks, ui);
      if (saved === false)
        return { ok: false, error: "Could not save to storage." };
      return { ok: true };
    },
    [persist, tasks, ui],
  );

  const removeTask = useCallback(
    (id) => {
      const nextTasks = tasks.filter((t) => t.id !== id);
      setTasks(nextTasks);
      const saved = persist(nextTasks, ui);
      if (saved === false)
        return { ok: false, error: "Could not save to storage." };
      return { ok: true };
    },
    [persist, tasks, ui],
  );

  const clearCompleted = useCallback(() => {
    const nextTasks = tasks.filter((t) => !t.completedAt);
    setTasks(nextTasks);
    const saved = persist(nextTasks, ui);
    if (saved === false)
      return { ok: false, error: "Could not save to storage." };
    return { ok: true };
  }, [persist, tasks, ui]);

  const setFilter = useCallback(
    (filter) => {
      const nextUI = { ...ui, filter };
      setUi(nextUI);
      persist(tasks, nextUI);
    },
    [persist, tasks, ui],
  );

  const setSearchQuery = useCallback(
    (searchQuery) => {
      const nextUI = { ...ui, searchQuery };
      setUi(nextUI);
      persist(tasks, nextUI);
    },
    [persist, tasks, ui],
  );

  const setSortBy = useCallback(
    (sortBy) => {
      const nextUI = { ...ui, sortBy };
      setUi(nextUI);
      persist(tasks, nextUI);
    },
    [persist, tasks, ui],
  );

  const derived = useMemo(() => {
    const search = String(ui.searchQuery ?? "")
      .trim()
      .toLowerCase();

    let filtered = tasks;
    if (ui.filter === FILTERS.ACTIVE)
      filtered = filtered.filter((t) => !t.completedAt);
    if (ui.filter === FILTERS.COMPLETED)
      filtered = filtered.filter((t) => Boolean(t.completedAt));

    if (search) {
      filtered = filtered.filter((t) => t.title.toLowerCase().includes(search));
    }

    const compareTitleAsc = (a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
    const compareTitleDesc = (a, b) =>
      b.title.localeCompare(a.title, undefined, { sensitivity: "base" });
    const compareCreatedDesc = (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    const compareCreatedAsc = (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

    const withCompletedRank = (completedFirst) => (a, b) => {
      const ra = a.completedAt ? 0 : 1;
      const rb = b.completedAt ? 0 : 1;
      const rank = completedFirst ? ra - rb : rb - ra;
      if (rank !== 0) return rank;
      return compareCreatedDesc(a, b);
    };

    const sorted = [...filtered];
    switch (ui.sortBy) {
      case SORTS.NEWEST:
        sorted.sort(compareCreatedDesc);
        break;
      case SORTS.OLDEST:
        sorted.sort(compareCreatedAsc);
        break;
      case SORTS.AZ:
        sorted.sort(compareTitleAsc);
        break;
      case SORTS.ZA:
        sorted.sort(compareTitleDesc);
        break;
      case SORTS.COMPLETED_FIRST:
        sorted.sort(withCompletedRank(true));
        break;
      case SORTS.ACTIVE_FIRST:
        sorted.sort(withCompletedRank(false));
        break;
      default:
        sorted.sort(compareCreatedDesc);
    }

    const total = tasks.length;
    const completed = tasks.filter((t) => Boolean(t.completedAt)).length;
    const active = total - completed;
    const completionPct =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return { tasks: sorted, total, active, completed, completionPct };
  }, [tasks, ui.filter, ui.searchQuery, ui.sortBy]);

  return {
    tasks,
    ui,
    derived,
    storageError,
    actions: {
      addTask,
      updateTask,
      toggleCompleted,
      removeTask,
      clearCompleted,
      setFilter,
      setSearchQuery,
      setSortBy,
    },
  };
}
