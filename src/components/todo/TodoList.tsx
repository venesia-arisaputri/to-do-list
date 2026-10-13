import { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onStartEdit: (todo: Todo) => void;
};

export function TodoList({
  todos,
  onDelete,
  onToggleComplete,
  onStartEdit,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 py-16 dark:border-zinc-800">
        <p className="mt-2 text-sm text-zinc-400 dark:text-zinc-500">
          No todos yet. You&apos;re all caught up!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-900">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onStartEdit={onStartEdit}
        />
      ))}
    </div>
  );
}
