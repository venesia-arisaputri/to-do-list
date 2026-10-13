import { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onStartEdit: (task: Task) => void;
  onSelectTask: (task: Task) => void;
};

export function TaskList({
  tasks,
  onDelete,
  onToggleComplete,
  onStartEdit,
  onSelectTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 py-16 dark:border-zinc-800">
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          No tasks found. Create one above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onStartEdit={onStartEdit}
          onSelectTask={onSelectTask}
        />
      ))}
    </div>
  );
}
