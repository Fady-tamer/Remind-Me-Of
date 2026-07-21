import { useState } from "react";
import { FaTrash, FaCheck, FaRedo } from "react-icons/fa";
import { IoAlarm } from "react-icons/io5";
import { format, parseISO, isPast } from "date-fns";

const REPEAT_LABELS = { once: "Once", daily: "Daily", weekly: "Weekly" };
const REPEAT_COLORS = {
  once: { bg: "#e0e7ff", text: "#4338ca" },
  daily: { bg: "#dcfce7", text: "#15803d" },
  weekly: { bg: "#fef9c3", text: "#a16207" },
};

// ── Add Reminder Form ─────────────────────────────────────────────────────
export const ReminderForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [repeat, setRepeat] = useState("once");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    onAdd({ title: title.trim(), date, time, repeat });
    setTitle("");
    setDate("");
    setTime("");
    setRepeat("once");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3"
    >
      <h2 className="font-bold text-gray-700 text-base flex items-center gap-2">
        <IoAlarm className="text-[#0ea5e9]" /> Add New Reminder
      </h2>
      <input
        id="reminder-title"
        type="text"
        placeholder="What should I remind you about?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] transition"
      />
      {/* Fields — 1 col on mobile, 2 cols on sm, 4 cols on md */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 font-medium">Date *</label>
          <input
            id="reminder-date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] transition"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 font-medium">Time</label>
          <input
            id="reminder-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] transition"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 font-medium">Repeat</label>
          <select
            id="reminder-repeat"
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] transition bg-white"
          >
            <option value="once">Once</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 justify-end">
          <label className="text-xs text-transparent font-medium select-none hidden md:block">
            &nbsp;
          </label>
          <button
            id="reminder-submit"
            type="submit"
            className="w-full px-5 py-2 rounded-xl bg-[#0ea5e9] text-white text-sm font-semibold hover:bg-[#0284c7] transition-colors active:scale-95"
          >
            Set Reminder
          </button>
        </div>
      </div>
    </form>
  );
};

// ── Reminder Item ─────────────────────────────────────────────────────────
export const ReminderItem = ({ reminder, onToggle, onDelete }) => {
  const overdue =
    reminder.date &&
    isPast(new Date(`${reminder.date}T${reminder.time || "23:59"}`)) &&
    !reminder.done;

  const rc = REPEAT_COLORS[reminder.repeat] || REPEAT_COLORS.once;

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl group transition-all duration-200 hover:bg-gray-50 ${
        reminder.done ? "opacity-50" : ""
      }`}
    >
      <button
        id={`toggle-reminder-${reminder.id}`}
        onClick={() => onToggle(reminder.id)}
        className="w-7 h-7 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all"
        style={{
          borderColor: reminder.done ? "#16a34a" : "#0ea5e9",
          background: reminder.done ? "#16a34a" : "transparent",
          color: "white",
        }}
        aria-label="Toggle reminder"
      >
        {reminder.done && <FaCheck className="text-xs" />}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${
            reminder.done ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {reminder.title}
        </p>
        <p
          className={`text-xs mt-0.5 flex items-center gap-1 ${
            overdue ? "text-red-500 font-semibold" : "text-gray-400"
          }`}
        >
          {overdue && "⚠ Overdue · "}
          {reminder.date ? format(parseISO(reminder.date), "MMM d, yyyy") : "—"}
          {reminder.time && ` · ${reminder.time}`}
        </p>
      </div>

      {reminder.repeat !== "once" && (
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0"
          style={{ background: rc.bg, color: rc.text }}
        >
          <FaRedo className="text-[10px]" />
          {REPEAT_LABELS[reminder.repeat]}
        </span>
      )}

      {/* Delete — always visible on touch, hover-reveal on pointer devices */}
      <button
        id={`delete-reminder-${reminder.id}`}
        onClick={() => onDelete(reminder.id)}
        className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0
                   opacity-100 md:opacity-0 md:group-hover:opacity-100"
        aria-label="Delete reminder"
      >
        <FaTrash />
      </button>
    </div>
  );
};

const ReminderComponents = { ReminderForm, ReminderItem };
export default ReminderComponents;
