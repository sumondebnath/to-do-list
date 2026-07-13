import Input from "./Input.jsx";

export default function SearchBar({
  query,
  onQueryChange,
  placeholder = "Search tasks…",
}) {
  return (
    <div className="w-full">
      <label htmlFor="task-search" className="sr-only">
        Search tasks
      </label>
      <Input
        id="task-search"
        value={query}
        placeholder={placeholder}
        onChange={(e) => onQueryChange?.(e.target.value)}
        className="h-11"
      />
    </div>
  );
}
