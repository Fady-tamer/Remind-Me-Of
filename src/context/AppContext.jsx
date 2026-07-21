/* eslint-disable react/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { loadFromStorage } from "../utils/storage";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => loadFromStorage("rmo_tasks", []));
  const [reminders, setReminders] = useState(() =>
    loadFromStorage("rmo_reminders", []),
  );

  useEffect(() => {
    localStorage.setItem("rmo_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("rmo_reminders", JSON.stringify(reminders));
  }, [reminders]);

  // ── Task helpers ────────────────────────────────────────────────────
  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: task.title,
        dueDate: task.dueDate || null,
        priority: task.priority || "medium",
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTask = (id, changes) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...changes } : t)),
    );
  };

  // ── Reminder helpers ─────────────────────────────────────────────────
  const addReminder = (reminder) => {
    setReminders((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: reminder.title,
        date: reminder.date,
        time: reminder.time || "",
        repeat: reminder.repeat || "once",
        done: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const toggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r)),
    );
  };

  const deleteReminder = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        updateTask,
        reminders,
        addReminder,
        toggleReminder,
        deleteReminder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
