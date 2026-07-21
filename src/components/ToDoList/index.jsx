import { useState } from "react";
import { FaTrash, FaCheckCircle, FaRegCircle, FaFlag } from "react-icons/fa";
import { format, parseISO, isPast, isToday } from "date-fns";

const PRIORITY_COLORS = {
  low: "priority-low",
  medium: "priority-medium",
  high: "priority-high",
};

// ── Add Task Form ─────────────────────────────────────────────────────────
export const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), dueDate, priority });
    setTitle("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3"
    >
      <h2 className="font-bold text-gray-700 text-base">Add New Task</h2>
      <input
        id="task-title"
        type="text"
        placeholder="What do you need to do?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8951d7] transition"
      />
      {/* Fields row — stacks vertically on mobile, horizontal on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 font-medium">Due Date</label>
          <input
            id="task-due-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8951d7] transition"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 font-medium">Priority</label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8951d7] transition bg-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 sm:justify-end">
          <label className="text-xs text-transparent font-medium select-none hidden sm:block">
            &nbsp;
          </label>
          <button
            id="task-submit"
            type="submit"
            className="w-full px-5 py-2 rounded-xl bg-[#8951d7] text-white text-sm font-semibold hover:bg-[#7040bb] transition-colors active:scale-95"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

// ── Task Item ─────────────────────────────────────────────────────────────
export const TaskItem = ({ task, onToggle, onDelete }) => {
  const overdue =
    task.dueDate &&
    isPast(parseISO(task.dueDate)) &&
    !isToday(parseISO(task.dueDate)) &&
    !task.completed;

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group hover:bg-gray-50 ${
        task.completed ? "opacity-50" : ""
      }`}
    >
      <button
        id={`toggle-task-${task.id}`}
        onClick={() => onToggle(task.id)}
        className="text-xl flex-shrink-0 transition-colors"
        style={{ color: task.completed ? "#16a34a" : "#d1d5db" }}
        aria-label="Toggle task"
      >
        {task.completed ? <FaCheckCircle /> : <FaRegCircle />}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${
            task.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.title}
        </p>
        {task.dueDate && (
          <p
            className={`text-xs mt-0.5 ${
              overdue ? "text-red-500 font-semibold" : "text-gray-400"
            }`}
          >
            {overdue ? "Overdue · " : "Due "}
            {format(parseISO(task.dueDate), "MMM d, yyyy")}
          </p>
        )}
      </div>

      <span
        className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${PRIORITY_COLORS[task.priority]}`}
      >
        <FaFlag className="inline mr-1" />
        {task.priority}
      </span>

      {/* Delete — always visible on touch, hover-reveal on pointer devices */}
      <button
        id={`delete-task-${task.id}`}
        onClick={() => onDelete(task.id)}
        className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0
                   opacity-100 md:opacity-0 md:group-hover:opacity-100"
        aria-label="Delete task"
      >
        <FaTrash />
      </button>
    </div>
  );
};

// Default export: both combined (for direct usage in stories/tests)
const ToDoListComponents = { TaskForm, TaskItem };
export default ToDoListComponents;
