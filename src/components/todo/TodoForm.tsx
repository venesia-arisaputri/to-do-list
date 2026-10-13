"use client";

import { useState } from "react";

type TodoFormProps = {
  onAdd: (title: string) => void;
  editingTodo: { id: string; title: string } | null;
  onUpdate: (id: string, title: string) => void;
  onCancelEdit: () => void;
};

export function TodoForm({
  onAdd,
  editingTodo,
  onUpdate,
  onCancelEdit,
}: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const [prevEditId, setPrevEditId] = useState<string | null>(null);
  if (editingTodo && editingTodo.id !== prevEditId) {
    setTitle(editingTodo.title);
    setTitleError("");
    setPrevEditId(editingTodo.id);
  } else if (!editingTodo && prevEditId !== null) {
    setPrevEditId(null);
  }

  function handleSubmit() {
    if (title.trim() === "") {
      setTitleError("Title is required.");
      return;
    }
    setTitleError("");

    if (editingTodo == null) {
      onAdd(title.trim());
    } else {
      onUpdate(editingTodo.id, title.trim());
    }
    setTitle("");
    setPrevEditId(null);
  }

  function handleCancel() {
    onCancelEdit();
    setTitle("");
    setTitleError("");
    setPrevEditId(null);
  }

  const isEditing = editingTodo != null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
        {isEditing ? "Edit Todo" : "Quick Add"}
      </h3>

      <div className="flex gap-2">
        <div className="flex-1">
          <input
            id="todo-title-input"
            placeholder="What do you need to do?"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 transition-colors dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
          {titleError && (
            <p className="mt-1 text-xs text-red-500">{titleError}</p>
          )}
        </div>

        <button
          id="todo-submit-btn"
          onClick={handleSubmit}
          className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 active:bg-indigo-800"
        >
          {isEditing ? "Update" : "Add"}
        </button>

        {isEditing && (
          <button
            id="todo-cancel-btn"
            onClick={handleCancel}
            className="shrink-0 rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
