import TaskCard from "./TaskCard.jsx";

export default function TaskList({
  tasks,
  editingId,
  onToggle,
  onStartEdit,
  onEdit,
  onCancelEdit,
  onRequestDelete,
}) {
  if (!tasks?.length) return null;

  return (
    <div className="space-y-3" role="list" aria-label="Task list">
      {tasks.map((t) => (
        <div key={t.id} role="listitem">
          <TaskCard
            task={t}
            editing={editingId === t.id}
            onToggle={onToggle}
            onStartEdit={onStartEdit}
            onEdit={onEdit}
            onCancelEdit={onCancelEdit}
            onRequestDelete={onRequestDelete}
          />
        </div>
      ))}
    </div>
  );
}
