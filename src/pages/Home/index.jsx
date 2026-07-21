import { useMemo } from "react";
import { Link } from "react-router";
import { useApp } from "../../context/AppContext";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaRegCalendarAlt,
  FaPlus,
} from "react-icons/fa";
import { IoAlarm } from "react-icons/io5";
import { format, isToday, isTomorrow, isPast, parseISO } from "date-fns";

const PRIORITY_COLORS = {
  low: "priority-low",
  medium: "priority-medium",
  high: "priority-high",
};

const StatCard = ({ icon, label, value, color, to }) => (
  <Link
    to={to}
    className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
  >
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
      style={{ background: color + "22", color }}
    >
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </Link>
);

const dueDateLabel = (dateStr) => {
  if (!dateStr) return null;
  const d = parseISO(dateStr);
  if (isToday(d)) return { text: "Today", color: "#f59e0b" };
  if (isTomorrow(d)) return { text: "Tomorrow", color: "#8951d7" };
  if (isPast(d)) return { text: "Overdue", color: "#ef4444" };
  return { text: format(d, "MMM d"), color: "#6b7280" };
};

const Home = () => {
  const { tasks, reminders } = useApp();

  const now = new Date();
  const greeting = now.getHours() < 12
    ? "Good morning"
    : now.getHours() < 17
    ? "Good afternoon"
    : "Good evening";

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    active: tasks.filter((t) => !t.completed).length,
    upcomingReminders: reminders.filter((r) => !r.done).length,
  }), [tasks, reminders]);

  const recentTasks = useMemo(
    () =>
      [...tasks]
        .filter((t) => !t.completed)
        .sort((a, b) => {
          if (a.dueDate && b.dueDate)
            return new Date(a.dueDate) - new Date(b.dueDate);
          if (a.dueDate) return -1;
          if (b.dueDate) return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .slice(0, 5),
    [tasks]
  );

  const upcomingReminders = useMemo(
    () =>
      [...reminders]
        .filter((r) => !r.done)
        .sort((a, b) => {
          const da = new Date(`${a.date}T${a.time || "00:00"}`);
          const db = new Date(`${b.date}T${b.time || "00:00"}`);
          return da - db;
        })
        .slice(0, 5),
    [reminders]
  );

  return (
    <div className="h-full overflow-y-auto page-enter space-y-6 pb-4">
      {/* Header */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#8951d7] to-[#b07ef5] text-white shadow-lg">
        <p className="text-xs sm:text-sm font-medium opacity-80">
          {format(now, "EEEE, MMMM d, yyyy")}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold mt-1">{greeting} 👋</h1>
        <p className="mt-1 opacity-80 text-sm">
          {stats.active > 0
            ? `You have ${stats.active} task${stats.active !== 1 ? "s" : ""} left to complete.`
            : "All caught up — great work!"}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          to="/task"
          icon={<FaTasks />}
          label="Total Tasks"
          value={stats.total}
          color="#8951d7"
        />
        <StatCard
          to="/task"
          icon={<FaCheckCircle />}
          label="Completed"
          value={stats.completed}
          color="#16a34a"
        />
        <StatCard
          to="/task"
          icon={<FaClock />}
          label="Active Tasks"
          value={stats.active}
          color="#f59e0b"
        />
        <StatCard
          to="/reminder"
          icon={<IoAlarm />}
          label="Reminders"
          value={stats.upcomingReminders}
          color="#0ea5e9"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Pending Tasks */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <FaTasks className="text-[#8951d7]" /> Pending Tasks
            </h2>
            <Link
              to="/task"
              className="text-xs text-[#8951d7] font-semibold flex items-center gap-1 hover:underline"
            >
              <FaPlus /> Add task
            </Link>
          </div>

          {recentTasks.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <FaTasks className="text-3xl mx-auto mb-2 opacity-30" />
              <p className="text-sm">No pending tasks — add one!</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {recentTasks.map((task) => {
                const due = dueDateLabel(task.dueDate);
                return (
                  <li
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#8951d7] flex-shrink-0" />
                    <span className="flex-1 text-sm font-medium text-gray-700 truncate">
                      {task.title}
                    </span>
                    {due && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: due.color + "22", color: due.color }}
                      >
                        {due.text}
                      </span>
                    )}
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}
                    >
                      {task.priority}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          {tasks.filter((t) => !t.completed).length > 5 && (
            <Link
              to="/task"
              className="block mt-4 text-center text-xs text-[#8951d7] font-semibold hover:underline"
            >
              View all {tasks.filter((t) => !t.completed).length} tasks →
            </Link>
          )}
        </div>

        {/* Upcoming Reminders */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <IoAlarm className="text-[#0ea5e9]" /> Upcoming Reminders
            </h2>
            <Link
              to="/reminder"
              className="text-xs text-[#8951d7] font-semibold flex items-center gap-1 hover:underline"
            >
              <FaPlus /> Add reminder
            </Link>
          </div>

          {upcomingReminders.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <IoAlarm className="text-3xl mx-auto mb-2 opacity-30" />
              <p className="text-sm">No upcoming reminders — add one!</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {upcomingReminders.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-[#0ea5e9] flex-shrink-0" />
                  <span className="flex-1 text-sm font-medium text-gray-700 truncate">
                    {r.title}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1 flex-shrink-0">
                    <FaRegCalendarAlt />
                    {r.date ? format(parseISO(r.date), "MMM d") : "—"}
                    {r.time && ` · ${r.time}`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
