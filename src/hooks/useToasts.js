import { useCallback, useMemo, useState } from "react";

function createToastId() {
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    ({ title, description, type = "info", durationMs = 3500 }) => {
      const id = createToastId();
      const toast = { id, title, description, type };
      setToasts((prev) => [toast, ...prev].slice(0, 5));

      window.setTimeout(() => removeToast(id), durationMs);
      return id;
    },
    [removeToast],
  );

  const api = useMemo(() => {
    return { toasts, pushToast, removeToast };
  }, [toasts, pushToast, removeToast]);

  return api;
}
