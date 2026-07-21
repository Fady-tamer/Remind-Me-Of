import { useMemo, useState } from "react";
import { useApp } from "../../context/AppContext";
import { TaskForm, TaskItem } from "../../components/ToDoList";
import { FaTasks, FaCheckCircle, FaListUl } from "react-icons/fa";

const FILTERS = ["All", "Active", "Completed"];
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

const ToDoList = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useApp();
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("created"); // "created" | "priority" | "dueDate"

  const filtered = useMemo(() => {
    let result = [...tasks];

    // Filter
    if (filter === "Active") result = result.filter((t) => !t.completed);
    else if (filter === "Completed") result = result.filter((t) => t.completed);

    // Sort
    result.sort((a, b) => {
      if (sort === "priority") {
        return (PRIORITY_ORDER[a.priority] ?? 1) - (PRIORITY_ORDER[b.priority] ?? 1);
      }
      if (sort === "dueDate") {
        if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
        if (a.dueDate) return -1;
        if (b.dueDate) return 1;
        return 0;
      }
      // default: newest first
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return result;
  }, [tasks, filter, sort]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="h-full overflow-y-auto page-enter space-y-4 pb-4">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#8951d7] to-[#b07ef5] text-white shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
          <FaTasks /> My Tasks
        </h1>
        <p className="text-sm opacity-80 mt-1">
          {completedCount} of {tasks.length} tasks completed
        </p>
        {/* Progress bar */}
        <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 bg-white rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Add Task Form */}
      <TaskForm onAdd={addTask} />

      {/* Filter & Sort controls */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Filter pills */}
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              id={`filter-${f.toLowerCase()}`}
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                filter === f
                  ? "bg-[#8951d7] text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Sort select */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium">Sort by:</span>
          <select
            id="task-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="flex-1 sm:flex-none border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#8951d7] bg-white"
          >
            <option value="created">Newest</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>

      {/* Task list */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            {filter === "Completed" ? (
              <>
                <FaCheckCircle className="text-4xl mb-3 opacity-30" />
                <p className="text-sm">No completed tasks yet.</p>
              </>
            ) : (
              <>
                <FaListUl className="text-4xl mb-3 opacity-30" />
                <p className="text-sm">No tasks here — add one above!</p>
              </>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-50 p-2">
            {filtered.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* Clear completed */}
      {completedCount > 0 && (
        <div className="text-right">
          <button
            id="clear-completed"
            onClick={() =>
              tasks.filter((t) => t.completed).forEach((t) => deleteTask(t.id))
            }
            className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors"
          >
            Clear {completedCount} completed task{completedCount !== 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
