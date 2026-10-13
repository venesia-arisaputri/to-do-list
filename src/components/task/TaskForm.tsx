"use client";

import { Task } from "@/types/task";
import { useEffect, useState } from "react";

type TaskFormProps = {
  onAdd: (title: string, description: string, deadline: string) => void;
  onUpdate: (
    id: string,
    title: string,
    description: string,
    deadline: string,
  ) => void;
  editingTask: Task | null;
  onCancelEdit: () => void;
};

const inputClasses =
  "w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 transition-colors";

export function TaskForm({
  onAdd,
  onUpdate,
  editingTask,
  onCancelEdit,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [titleError, setTitleError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");

  useEffect(() => {
    if (editingTask != null) {
      setTitle(editingTask.title);
      setDescription(editingTask.description ?? "");
      setDeadline(editingTask.deadline);
    }
  }, [editingTask]);

  function handleSubmit() {
    let hasError = false;
    if (title.trim() === "") {
      setTitleError("Title is required.");
      hasError = true;
    } else {
      setTitleError("");
    }
    if (deadline.trim() === "") {
      setDeadlineError("Deadline is required.");
      hasError = true;
    } else {
      setDeadlineError("");
    }

    if (hasError) return;

    if (editingTask == null) {
      onAdd(title, description, deadline);
    } else {
      onUpdate(editingTask.id, title, description, deadline);
    }
    setTitle("");
    setDescription("");
    setDeadline("");
  }

  function handleCancel() {
    onCancelEdit();
    setTitle("");
    setDescription("");
    setDeadline("");
    setTitleError("");
    setDeadlineError("");
  }

  const isEditing = editingTask != null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
        {isEditing ? "Edit Task" : "New Task"}
      </h3>

      <div className="space-y-3">
        <div>
          <input
            id="task-title-input"
            placeholder="Task title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClasses}
          />
          {titleError && (
            <p className="mt-1 text-xs text-red-500">{titleError}</p>
          )}
        </div>

        <input
          id="task-description-input"
          placeholder="Description (optional)"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClasses}
        />

        <div>
          <input
            id="task-deadline-input"
            placeholder="Deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={inputClasses}
          />
          {deadlineError && (
            <p className="mt-1 text-xs text-red-500">{deadlineError}</p>
          )}
        </div>

        <div className="flex gap-2 pt-1">
          <button
            id="task-submit-btn"
            onClick={handleSubmit}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 active:bg-indigo-800"
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
          {isEditing && (
            <button
              id="task-cancel-btn"
              onClick={handleCancel}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
