import Navbar from "../../components/Navbar";
import Calendar from "../../components/Calender";
import ReminderTable from "../../components/ReminderTable";
import AddReminder from "../../components/ReminderTable/AddReminder";
import ToDoTable from "../../components/ToDoTable";
import DoneToDoTable from "../../components/DoneToDoTable";

import { useState, useEffect } from "react";

const Home = () => {
  // 1. Lazy Initialization: Pass a function to useState so localStorage is only read on the initial render.
  const [reminderData, setReminderData] = useState(() => {
    return JSON.parse(localStorage.getItem("reminders")) || [];
  });

  const [toDoData, setToDoData] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });

  const [doneToDoData, setDoneToDoData] = useState(() => {
    return JSON.parse(localStorage.getItem("doneTodos")) || [];
  });

  // 2. State Syncing: Ensure localStorage stays updated when your state changes.
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminderData));
  }, [reminderData]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDoData));
  }, [toDoData]);

  useEffect(() => {
    localStorage.setItem("doneTodos", JSON.stringify(doneToDoData));
  }, [doneToDoData]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Navbar />

      <div className="flex-1 h-screen overflow-y-auto">
        {/* Calendar Section */}
        <div className="max-w-325 mx-auto p-7 pb-0 xl:px-0">
          <p className="font-bold text-gray-800 mb-3">Calendar</p>
          <Calendar width={"w-full"} reminderData={reminderData} />
        </div>

        {/* ToDo Tables Section */}
        <div className="max-w-325 mx-auto p-7 pb-0 xl:px-0 flex flex-col lg:flex-row gap-7">
          {/* Active ToDo */}
          {/* ADDED: min-w-0 */}
          <div className="lg:w-6/12 min-w-0">
            <p className="font-bold text-gray-800 mb-3">ToDo's Table</p>
            <ToDoTable
              width={"w-full"}
              toDoData={toDoData}
              setToDoData={setToDoData}
              doneToDoData={doneToDoData}
              setDoneToDoData={setDoneToDoData}
            />
          </div>

          {/* Done ToDo */}
          {/* ADDED: min-w-0 */}
          <div className="lg:w-6/12 min-w-0">
            <p className="font-bold text-gray-800 mb-3">Done ToDo's Table</p>
            <DoneToDoTable
              width={"w-full"}
              toDoData={toDoData}
              setToDoData={setToDoData}
              doneToDoData={doneToDoData}
              setDoneToDoData={setDoneToDoData}
            />
          </div>
        </div>

        {/* Reminder Section */}
        <div className="max-w-325 mx-auto p-7 pb-0 xl:px-0 mb-10">
          <p className="font-bold text-gray-800 mb-3">Reminder Table</p>
          {/* CHANGED: Swapped flex flex-row for a 12-column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            <AddReminder
              // CHANGED: Converted w-5/12 to col-span-5
              width={"lg:col-span-5"}
              reminderData={reminderData}
              setReminderData={setReminderData}
            />
            <ReminderTable
              // CHANGED: Converted w-7/12 to col-span-7
              width={"lg:col-span-7 min-w-0"}
              reminderData={reminderData}
              setReminderData={setReminderData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
