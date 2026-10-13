import { Task } from "@/types/task";

export function isOverdue(task: Task): boolean {
  const today = new Date().toISOString().split("T")[0];

  return task.deadline < today && !task.completed;
}
