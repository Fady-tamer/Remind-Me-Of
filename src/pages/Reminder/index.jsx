import { useMemo, useState } from "react";
import { useApp } from "../../context/AppContext";
import { ReminderForm, ReminderItem } from "../../components/Reminder";
import { IoAlarm } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { isPast } from "date-fns";

const FILTERS = ["All", "Upcoming", "Done"];

const Reminder = () => {
  const { reminders, addReminder, toggleReminder, deleteReminder } = useApp();
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    let result = [...reminders];

    if (filter === "Upcoming") {
      result = result.filter((r) => !r.done);
    } else if (filter === "Done") {
      result = result.filter((r) => r.done);
    }

    // Sort by date ascending
    result.sort((a, b) => {
      const da = new Date(`${a.date}T${a.time || "00:00"}`);
      const db = new Date(`${b.date}T${b.time || "00:00"}`);
      return da - db;
    });

    return result;
  }, [reminders, filter]);

  const overdueCount = reminders.filter(
    (r) =>
      !r.done && r.date && isPast(new Date(`${r.date}T${r.time || "23:59"}`)),
  ).length;

  const upcomingCount = reminders.filter((r) => !r.done).length;
  const doneCount = reminders.filter((r) => r.done).length;

  return (
    <div className="h-full overflow-y-auto page-enter space-y-4 pb-4">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-white shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <IoAlarm /> My Reminders
        </h1>
        <p className="text-xs sm:text-sm opacity-80 mt-1">
          {upcomingCount} upcoming · {doneCount} done
          {overdueCount > 0 && (
            <span className="ml-2 bg-red-400/30 px-2 py-0.5 rounded-full text-xs font-bold">
              ⚠ {overdueCount} overdue
            </span>
          )}
        </p>
      </div>

      {/* Add Reminder Form */}
      <ReminderForm onAdd={addReminder} />

      {/* Filter pills */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-2">
        {FILTERS.map((f) => (
          <button
            id={`reminder-filter-${f.toLowerCase()}`}
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              filter === f
                ? "bg-[#0ea5e9] text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Reminder list */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            {filter === "Done" ? (
              <>
                <FaCheckCircle className="text-4xl mb-3 opacity-30" />
                <p className="text-sm">No done reminders yet.</p>
              </>
            ) : (
              <>
                <IoAlarm className="text-4xl mb-3 opacity-30" />
                <p className="text-sm">No reminders here — add one above!</p>
              </>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-50 p-2">
            {filtered.map((r) => (
              <ReminderItem
                key={r.id}
                reminder={r}
                onToggle={toggleReminder}
                onDelete={deleteReminder}
              />
            ))}
          </div>
        )}
      </div>

      {/* Clear done */}
      {doneCount > 0 && (
        <div className="text-right">
          <button
            id="clear-done-reminders"
            onClick={() =>
              reminders
                .filter((r) => r.done)
                .forEach((r) => deleteReminder(r.id))
            }
            className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors"
          >
            Clear {doneCount} done reminder{doneCount !== 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  );
};

export default Reminder;
