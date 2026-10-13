import { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onStartEdit: (todo: Todo) => void;
};

export function TodoItem({
  todo,
  onDelete,
  onToggleComplete,
  onStartEdit,
}: TodoItemProps) {
  return (
    <div className="group flex items-center gap-3 border-b border-zinc-100 py-3 last:border-b-0 dark:border-zinc-800">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
        className="h-4 w-4 shrink-0 rounded border-zinc-300 accent-indigo-600"
      />

      <span
        className={`flex-1 text-sm ${
          todo.completed
            ? "text-zinc-400 line-through dark:text-zinc-500"
            : "text-zinc-800 dark:text-zinc-100"
        }`}
      >
        {todo.title}
      </span>

      {todo.completed && (
        <span className="h-2 w-2 shrink-0 rounded-full bg-green-400" />
      )}

      <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onStartEdit(todo)}
          className="rounded px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="rounded px-2 py-1 text-xs text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
