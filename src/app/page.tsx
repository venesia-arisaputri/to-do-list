"use client";

import { useState } from "react";
import { TaskApp } from "@/components/task/TaskApp";
import { TodoApp } from "@/components/todo/TodoApp";
import { Calendar } from "@/components/Calendar";
import { Task } from "@/types/task";
import { isOverdue } from "@/lib/taskUtils";

type View = "tasks" | "todos";

const tabs: { key: View; label: string }[] = [
  { key: "tasks", label: "Tasks" },
  { key: "todos", label: "Todos" },
];

export default function Home() {
  const [activeView, setActiveView] = useState<View>("tasks");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            TaskFlow
          </h1>

          <nav className="flex gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                id={`tab-${tab.key}`}
                onClick={() => setActiveView(tab.key)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeView === tab.key
                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-6 py-8">
        <section className="min-w-0 flex-1">
          {activeView === "tasks" ? (
            <TaskApp
              selectedDate={selectedDate}
              onSelectTask={setSelectedTask}
            />
          ) : (
            <TodoApp />
          )}
        </section>

        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-8 space-y-4">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Info
              </h3>

              {selectedTask ? (
                <div className="space-y-3">
                  <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
                    {selectedTask.title}
                  </h4>
                  {selectedTask.description && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {selectedTask.description}
                    </p>
                  )}
                  <div className="text-xs text-zinc-400 dark:text-zinc-500">
                    <span className="block mb-1">
                      Deadline:{" "}
                      {new Date(selectedTask.deadline).toLocaleDateString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </span>
                    <span className="block">
                      Status:{" "}
                      {selectedTask.completed
                        ? "Completed"
                        : isOverdue(selectedTask)
                          ? "Overdue"
                          : "Pending"}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Select a task to see its details here, or use the calendar
                  view to plan your week.
                </p>
              )}
            </div>

            <Calendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>
        </aside>
      </main>
    </div>
  );
}
