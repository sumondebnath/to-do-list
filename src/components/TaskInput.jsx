import { useCallback, useId, useState } from "react";

import Button from "./Button.jsx";
import Input from "./Input.jsx";

export default function TaskInput({
  onAdd,
  placeholder = "Add a new task…",
  disabled = false,
  toastOnError,
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const inputId = useId();

  const submit = useCallback(() => {
    const title = value;
    const trimmed = String(title ?? "")
      .trim()
      .replace(/\s+/g, " ");
    setError("");

    const res = onAdd?.(trimmed);
    if (res?.ok === false) {
      setError(res.error || "Invalid input.");
      toastOnError?.(res.error || "Invalid input.");
      return;
    }

    setValue("");
  }, [onAdd, toastOnError, value]);

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        if (disabled) return;
        submit();
      }}
    >
      <div className="w-full">
        <label htmlFor={inputId} className="sr-only">
          Task title
        </label>
        <Input
          id={inputId}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          hasError={Boolean(error)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // Form submit handles it.
            }
          }}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        {error ? (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-xs font-medium text-red-700"
          >
            {error}
          </p>
        ) : null}
      </div>
      <Button variant="primary" size="md" disabled={disabled} type="submit">
        Add
      </Button>
    </form>
  );
}
