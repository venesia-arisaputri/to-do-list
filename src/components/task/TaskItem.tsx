import { Task } from "@/types/task";
import { isOverdue } from "@/lib/taskUtils";

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onSelectTask: (task: Task) => void;
};

export function TaskItem({
  task,
  onDelete,
  onToggleComplete,
  onStartEdit,
  onSelectTask,
}: TaskItemProps) {
  const overdue = isOverdue(task);

  const borderColor = task.completed
    ? "border-l-green-400"
    : overdue
      ? "border-l-red-400"
      : "border-l-zinc-200 dark:border-l-zinc-700";

  return (
    <div
      onClick={() => onSelectTask(task)}
      className={`rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 border-l-4 cursor-pointer ${borderColor}`}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h4
          className={`text-base font-medium ${task.completed ? "text-zinc-400 line-through dark:text-zinc-500" : "text-zinc-900 dark:text-zinc-50"}`}
        >
          {task.title}
        </h4>

        <div className="flex shrink-0 items-center gap-1.5">
          {task.completed && (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              Done
            </span>
          )}
          {overdue && (
            <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
              Overdue
            </span>
          )}
        </div>
      </div>

      {task.description && (
        <p className="mb-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {task.description}
        </p>
      )}

      <p className="mb-3 text-xs text-zinc-400 dark:text-zinc-500">
        {new Date(task.deadline).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })}
      </p>

      <div className="flex items-center gap-3 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <label 
          className="flex cursor-pointer items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="h-4 w-4 rounded border-zinc-300 text-indigo-600 accent-indigo-600"
          />
          {task.completed ? "Completed" : "Mark complete"}
        </label>

        <div className="ml-auto flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartEdit(task);
            }}
            className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="rounded-md px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
