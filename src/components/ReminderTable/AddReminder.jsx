import { useRef, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

import "./style.css";

const AddReminder = ({ width, reminderData, setReminderData }) => {
  const nameRef = useRef();
  const colorRef = useRef();
  const categoryRef = useRef();
  const TimeFromRef = useRef();
  const TimeToRef = useRef();
  const dateRef = useRef();

  const categorys = [
    { categoryName: "Activity", categoryColor: "#002aff" },
    { categoryName: "Study", categoryColor: "#ffbb00" },
  ];
  const [color, setColor] = useState(categorys[0].categoryColor);
  const handelChange = (categoryRef) => {
    categorys.forEach(({ categoryName, categoryColor }) => {
      if (categoryName === categoryRef.current.value) setColor(categoryColor);
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    const reminderName = nameRef.current.value;
    const reminderColor = color;
    const reminderCategory = categoryRef.current.value;
    const reminderTimeFrom = TimeFromRef.current.value;
    const reminderTimeTo = TimeToRef.current.value;
    const reminderDate = dateRef.current.value;

    const newData = [
      ...reminderData,
      {
        task: reminderName,
        color: reminderColor,
        category: reminderCategory,
        timeFrom: reminderTimeFrom,
        timeTo: reminderTimeTo,
        date: reminderDate,
      },
    ];

    localStorage.setItem("reminders", JSON.stringify(newData));
    setReminderData(newData);

    nameRef.current.value = "";
    setColor(categorys[0].categoryColor);
    categoryRef.current.value = categorys[0].categoryName;
    TimeFromRef.current.value = "";
    TimeToRef.current.value = "";
    dateRef.current.value = "";
  };

  return (
    <form
      onSubmit={handelSubmit}
      className={`w-full ${width} p-4 rounded-2xl bg-[#eee] flex flex-col gap-3.5`}
    >
      {/* Reminder Name Input */}
      <input
        type="text"
        placeholder="Reminder Name ..."
        ref={nameRef}
        required
        className="w-full h-11 p-2.5 rounded-xl outline-none bg-white text-gray-800 border border-transparent focus:border-blue-500 transition-all"
      />

      {/* Row 1: Color, Category & Date */}
      {/* Switches from single-column on mobile to side-by-side on tablet/desktop */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
        <div className="flex gap-2.5 items-center flex-1">
          {/* Color preview container with styling fixes */}
          <div className="w-16 h-11 flex items-center justify-center bg-white rounded-xl overflow-hidden border border-gray-200">
            <input
              type="color"
              value={color}
              disabled
              required
              className="w-full h-full border-none cursor-not-allowed scale-150"
            />
          </div>
          
          <select
            onChange={() => {
              handelChange(categoryRef);
            }}
            ref={categoryRef}
            className="flex-1 h-11 p-2.5 rounded-xl outline-none bg-white text-gray-800 border border-transparent focus:border-blue-500 transition-all cursor-pointer"
          >
            {categorys.map(({ categoryName, categoryColor }) => {
              return (
                <option
                  key={categoryName}
                  style={{ background: categoryColor, color: "#fff" }}
                  value={categoryName}
                >
                  {categoryName}
                </option>
              );
            })}
          </select>
        </div>

        <input
          type="date"
          ref={dateRef}
          required
          className="flex-1 h-11 p-2.5 rounded-xl outline-none bg-white text-gray-800 border border-transparent focus:border-blue-500 transition-all cursor-pointer"
        />
      </div>

      {/* Row 2: Time Inputs */}
      {/* Elements scale dynamically on small screens; arrow hides/transforms if space is tight */}
      <div className="flex items-center gap-2.5">
        <input
          type="time"
          ref={TimeFromRef}
          required
          className="w-[45%] h-11 p-2.5 rounded-xl outline-none bg-white text-gray-800 border border-transparent focus:border-blue-500 transition-all cursor-pointer"
        />
        <div className="w-[10%] flex justify-center items-center text-gray-600">
          <FaLongArrowAltRight className="text-xl shrink-0" />
        </div>
        <input
          type="time"
          ref={TimeToRef}
          required
          className="w-[45%] h-11 p-2.5 rounded-xl outline-none bg-white text-gray-800 border border-transparent focus:border-blue-500 transition-all cursor-pointer"
        />
      </div>

      {/* Row 3: Submit Button */}
      <button
        type="submit"
        className="w-full h-11 p-2.5 rounded-xl cursor-pointer bg-green-500 hover:bg-green-600 active:scale-[0.98] transition-all text-white font-bold text-center"
      >
        Add
      </button>
    </form>
  );
};

export default AddReminder;