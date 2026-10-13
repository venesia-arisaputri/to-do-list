"use client";

import { useState } from "react";

type CalendarProps = {
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
};

export function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded-md px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
        >
          &lt;
        </button>
        <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {monthNames[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="rounded-md px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-zinc-400 dark:text-zinc-500 mb-2">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="p-1"></div>
        ))}
        {days.map((day) => {
          const isToday = isCurrentMonth && day === today.getDate();
          const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isSelected = selectedDate === dateString;

          let dayClasses = "rounded-md py-1 cursor-pointer transition-colors ";
          if (isSelected) {
            dayClasses += "bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium";
          } else if (isToday) {
            dayClasses += "border border-indigo-500 text-indigo-600 dark:text-indigo-400 font-medium";
          } else {
            dayClasses += "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800";
          }

          return (
            <div
              key={day}
              className={dayClasses}
              onClick={() => onSelectDate(isSelected ? null : dateString)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
