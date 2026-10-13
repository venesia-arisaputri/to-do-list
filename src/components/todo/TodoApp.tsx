"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export function TodoApp() {
  const [todos, setTodos, isLoaded] = useLocalStorage<Todo[]>("todos", []);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  function addTodo(title: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleComplete(id: string) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function startEdit(todo: Todo) {
    setEditingTodo(todo);
  }

  function updateTodo(id: string, title: string) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
    );
    setEditingTodo(null);
  }

  function cancelEdit() {
    setEditingTodo(null);
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-indigo-500" />
      </div>
    );
  }

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="space-y-6">
      <TodoForm
        onAdd={addTodo}
        editingTodo={editingTodo}
        onUpdate={updateTodo}
        onCancelEdit={cancelEdit}
      />

      {todos.length > 0 && (
        <div className="flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-green-500 transition-all duration-500"
              style={{
                width: `${(completedCount / todos.length) * 100}%`,
              }}
            />
          </div>
          <span className="shrink-0 text-xs text-zinc-400 dark:text-zinc-500">
            {completedCount}/{todos.length}
          </span>
        </div>
      )}

      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggleComplete={toggleComplete}
        onStartEdit={startEdit}
      />
    </div>
  );
}
