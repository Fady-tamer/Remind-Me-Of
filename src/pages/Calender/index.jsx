import { useMemo, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";
import { useApp } from "../../context/AppContext";
import { FaChevronLeft, FaChevronRight, FaCalendar } from "react-icons/fa";
import { IoAlarm } from "react-icons/io5";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const WEEKDAYS_FULL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calender = () => {
  const { tasks, reminders } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  // Build all calendar cells (including leading/trailing days to fill grid)
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  // Map from dateStr → { tasks, reminders }
  const dayData = useMemo(() => {
    const map = {};
    tasks.forEach((t) => {
      if (!t.dueDate) return;
      const key = t.dueDate.slice(0, 10);
      if (!map[key]) map[key] = { tasks: [], reminders: [] };
      map[key].tasks.push(t);
    });
    reminders.forEach((r) => {
      if (!r.date) return;
      const key = r.date.slice(0, 10);
      if (!map[key]) map[key] = { tasks: [], reminders: [] };
      map[key].reminders.push(r);
    });
    return map;
  }, [tasks, reminders]);

  const selectedKey = format(selectedDay, "yyyy-MM-dd");
  const selectedData = dayData[selectedKey] || { tasks: [], reminders: [] };

  return (
    <div className="h-full overflow-y-auto page-enter space-y-4 pb-4">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <FaCalendar /> Calendar
        </h1>
        <p className="text-xs sm:text-sm opacity-80 mt-1">
          Tap any day to see its tasks and reminders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-5">
            <button
              id="prev-month"
              onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-[#8951d7] hover:text-white flex items-center justify-center transition-all"
              aria-label="Previous month"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <h2 className="font-bold text-gray-800 text-lg">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button
              id="next-month"
              onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-[#8951d7] hover:text-white flex items-center justify-center transition-all"
              aria-label="Next month"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-2">
            {WEEKDAYS_FULL.map((d, i) => (
              <div
                key={d + i}
                className="text-center text-xs font-semibold text-gray-400 py-1"
              >
                {/* Show 1-letter on xs, 3-letter on sm+ */}
                <span className="sm:hidden">{WEEKDAYS[i]}</span>
                <span className="hidden sm:inline">{d}</span>
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day) => {
              const key = format(day, "yyyy-MM-dd");
              const data = dayData[key];
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isSelected = isSameDay(day, selectedDay);
              const isTodayDay = isToday(day);
              const hasItems = !!data;

              return (
                <button
                  id={`cal-day-${key}`}
                  key={key}
                  onClick={() => setSelectedDay(day)}
                  className={`
                    relative flex flex-col items-center rounded-xl py-1 sm:py-2 px-0.5 sm:px-1 transition-all duration-150 text-xs sm:text-sm font-medium
                    ${!isCurrentMonth ? "opacity-25" : ""}
                    ${isSelected ? "bg-[#8951d7] text-white shadow-md" : "hover:bg-purple-50 text-gray-700"}
                    ${isTodayDay && !isSelected ? "ring-2 ring-[#8951d7] ring-offset-1" : ""}
                  `}
                >
                  <span>{format(day, "d")}</span>

                  {/* Dot indicators */}
                  {hasItems && (
                    <div className="flex gap-0.5 mt-1">
                      {data.tasks.length > 0 && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: isSelected ? "white" : "#8951d7",
                          }}
                        />
                      )}
                      {data.reminders.length > 0 && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: isSelected ? "white" : "#0ea5e9",
                          }}
                        />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8951d7] inline-block" />
              Task due
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0ea5e9] inline-block" />
              Reminder
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md ring-2 ring-[#8951d7] inline-block" />
              Today
            </span>
          </div>
        </div>

        {/* Day detail panel */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
              Selected
            </p>
            <h3 className="text-xl font-bold text-gray-800 mt-0.5">
              {format(selectedDay, "EEEE")}
            </h3>
            <p className="text-sm text-gray-500">
              {format(selectedDay, "MMMM d, yyyy")}
            </p>
          </div>

          {/* Tasks for the day */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
              <FaCalendar className="text-[#8951d7]" /> Tasks (
              {selectedData.tasks.length})
            </p>
            {selectedData.tasks.length === 0 ? (
              <p className="text-xs text-gray-300 italic">No tasks due.</p>
            ) : (
              <ul className="space-y-1.5">
                {selectedData.tasks.map((t) => (
                  <li
                    key={t.id}
                    className={`text-sm flex items-center gap-2 p-2 rounded-lg ${
                      t.completed ? "opacity-50" : ""
                    }`}
                    style={{ background: "#8951d711" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        background: t.completed ? "#16a34a" : "#8951d7",
                      }}
                    />
                    <span
                      className={`flex-1 truncate ${t.completed ? "line-through text-gray-400" : "text-gray-700"}`}
                    >
                      {t.title}
                    </span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                        t.priority === "high"
                          ? "priority-high"
                          : t.priority === "low"
                            ? "priority-low"
                            : "priority-medium"
                      }`}
                    >
                      {t.priority}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Reminders for the day */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
              <IoAlarm className="text-[#0ea5e9]" /> Reminders (
              {selectedData.reminders.length})
            </p>
            {selectedData.reminders.length === 0 ? (
              <p className="text-xs text-gray-300 italic">No reminders.</p>
            ) : (
              <ul className="space-y-1.5">
                {selectedData.reminders.map((r) => (
                  <li
                    key={r.id}
                    className={`text-sm flex items-center gap-2 p-2 rounded-lg ${
                      r.done ? "opacity-50" : ""
                    }`}
                    style={{ background: "#0ea5e911" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: r.done ? "#16a34a" : "#0ea5e9" }}
                    />
                    <span
                      className={`flex-1 truncate ${r.done ? "line-through text-gray-400" : "text-gray-700"}`}
                    >
                      {r.title}
                    </span>
                    {r.time && (
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {r.time}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedData.tasks.length === 0 &&
            selectedData.reminders.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-gray-300 flex-col gap-2 py-8">
                <FaCalendar className="text-3xl opacity-30" />
                <p className="text-xs italic">
                  Nothing scheduled for this day.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Calender;
