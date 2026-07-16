import Navbar from "../../components/Navbar";
import Calendar from "../../components/Calender";
import ReminderTable from "../../components/ReminderTable";
import AddReminder from "../../components/ReminderTable/AddReminder";
import ToDoTable from "../../components/ToDoTable";
import DoneToDoTable from "../../components/DoneToDoTable";

import { useState } from "react";

const Home = () => {
  const [reminderData, setReminderData] = useState(
    JSON.parse(localStorage.getItem("reminders")) || [],
  );

  const [toDoData, setToDoData] = useState(
    JSON.parse(localStorage.getItem("todos")) || [],
  );

  const [doneToDoData, setDoneToDoData] = useState(
    JSON.parse(localStorage.getItem("doneTodos")) || [],
  );

  return (
    <div>
      <Navbar />

      {/* Calender */}
      <div className="max-w-325 mx-auto p-7 xlg:px-0">
        <p className="py-4 font-bold">Calender</p>
        <Calendar width={"w-12/12"} reminderData={reminderData} />
      </div>

      <div className="max-w-325 mx-auto p-7 xlg:px-0 flex flex-col lg:flex-row gap-7">
        {/* todo */}
        <div className="lg:w-6/12">
          <p className="py-4 font-bold">ToDo's Table</p>

          <ToDoTable
            width={"w-12/12"}
            toDoData={toDoData}
            setToDoData={setToDoData}
            doneToDoData={doneToDoData}
            setDoneToDoData={setDoneToDoData}
          />
        </div>

        {/* done todo */}
        <div className="lg:w-6/12">
          <p className="py-4 font-bold">Done ToDo's Table</p>

          <DoneToDoTable
            width={"w-12/12"}
            toDoData={toDoData}
            setToDoData={setToDoData}
            doneToDoData={doneToDoData}
            setDoneToDoData={setDoneToDoData}
          />
        </div>
      </div>

      {/* reminder */}
      <div className="max-w-325 mx-auto p-7 xlg:px-0">
        <p className="py-4 font-bold">Reminder Table</p>
        <div className="flex flex-col lg:flex-row gap-7">
          <AddReminder
            width={"lg:w-5/12"}
            reminderData={reminderData}
            setReminderData={setReminderData}
          />
          <ReminderTable
            width={"lg:w-7/12"}
            reminderData={reminderData}
            setReminderData={setReminderData}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
