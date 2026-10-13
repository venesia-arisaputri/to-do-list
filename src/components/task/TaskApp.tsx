"use client";

import { useState } from "react";
import { Task } from "@/types/task";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TaskList } from "./TaskList";
import { TaskForm } from "./TaskForm";

type TaskAppProps = {
  selectedDate?: string | null;
  onSelectTask?: (task: Task) => void;
};

export function TaskApp({ selectedDate, onSelectTask }: TaskAppProps) {
  const [tasks, setTasks, isLoaded] = useLocalStorage<Task[]>("tasks", []);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  function addTask(title: string, description: string, deadline: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      deadline,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id: string) {
    const taskArray = tasks.filter((task) => task.id !== id);
    setTasks(taskArray);
  }

  function toggleComplete(id: string) {
    const updated = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updated);
  }

  function startEdit(task: Task) {
    setEditingTask(task);
  }

  function updateTask(
    id: string,
    title: string,
    description: string,
    deadline: string,
  ) {
    const updated = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title, description, deadline };
      }
      return task;
    });
    setTasks(updated);
    setEditingTask(null);
  }

  function cancelEdit() {
    setEditingTask(null);
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-indigo-500" />
      </div>
    );
  }

  const filteredTasks = selectedDate
    ? tasks.filter((task) => task.deadline === selectedDate)
    : tasks;

  return (
    <div className="space-y-6">
      <TaskForm
        onAdd={addTask}
        onUpdate={updateTask}
        editingTask={editingTask}
        onCancelEdit={cancelEdit}
      />
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggleComplete={toggleComplete}
        onStartEdit={startEdit}
        onSelectTask={onSelectTask || (() => {})}
      />
    </div>
  );
}
