import { useRef, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./style.css";

const AddReminder = ({ width = "w-full", reminderData, setReminderData }) => {
  const nameRef = useRef();
  const categoryRef = useRef();
  const timeFromRef = useRef();
  const timeToRef = useRef();
  const dateRef = useRef();

  const categories = [
    { categoryName: "Activity", categoryColor: "#002aff" },
    { categoryName: "Study", categoryColor: "#ffbb00" },
  ];

  const [color, setColor] = useState(categories[0].categoryColor);

  const handleChange = (e) => {
    const selectedCategory = categories.find(
      (cat) => cat.categoryName === e.target.value,
    );
    if (selectedCategory) {
      setColor(selectedCategory.categoryColor);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = [
      ...reminderData,
      {
        task: nameRef.current.value,
        color: color,
        category: categoryRef.current.value,
        timeFrom: timeFromRef.current.value,
        timeTo: timeToRef.current.value,
        date: dateRef.current.value,
      },
    ];

    setReminderData(newData);

    // Reset form fields
    nameRef.current.value = "";
    setColor(categories[0].categoryColor);
    categoryRef.current.value = categories[0].categoryName;
    timeFromRef.current.value = "";
    timeToRef.current.value = "";
    dateRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full ${width} p-4 rounded-2xl bg-[#eee] flex flex-col gap-3.5`}
    >
      <input
        type="text"
        placeholder="Reminder Name ..."
        ref={nameRef}
        required
        className="w-full h-11 p-2.5 rounded-xl outline-none bg-white text-gray-800 border border-transparent focus:border-blue-500 transition-all"
      />

      {/* Row 1: Color, Category & Date */}
      {/* Changed sm:flex-row to xl:flex-row so it stacks until the screen is very wide */}
      <div className="flex flex-col xl:flex-row gap-2.5 items-stretch xl:items-center">
        {/* ADDED: min-w-0 to allow internal items to shrink */}
        <div className="flex gap-2.5 items-center flex-1 min-w-0">
          <div className="w-16 h-11 shrink-0 flex items-center justify-center bg-white rounded-xl overflow-hidden border border-gray-200">
            <input
              type="color"
              value={color}
              disabled
              required
              className="w-full h-full border-none cursor-not-allowed scale-150"
            />
          </div>

          <select
            onChange={handleChange}
            ref={categoryRef}
            // ADDED: min-w-0
            className="flex-1 min-w-0 h-11 p-2.5 rounded-xl outline-none bg-white text-gray-800 border border-transparent focus:border-blue-500 transition-all cursor-pointer"
          >
            {categories.map(({ categoryName, categoryColor }) => {
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
          // ADDED: min-w-0
          className="flex-1 min-w-0 h-11 p-2.5 rounded-xl outline-none bg-white text-gray-800 border border-transparent focus:border-blue-500 transition-all cursor-pointer"
        />
      </div>

      {/* Row 2: Time Inputs */}
      <div className="flex items-center gap-2.5">
        <input
          type="time"
          ref={timeFromRef}
          required
          // CHANGED: Removed w-[45%], added flex-1 and min-w-0
          className="flex-1 min-w-0 h-11 p-2.5 rounded-xl outline-none bg-white text-gray-800 border border-transparent focus:border-blue-500 transition-all cursor-pointer"
        />
        {/* CHANGED: Removed w-[10%], added shrink-0 */}
        <div className="shrink-0 flex justify-center items-center text-gray-600 px-1">
          <FaLongArrowAltRight className="text-xl" />
        </div>
        <input
          type="time"
          ref={timeToRef}
          required
          // CHANGED: Removed w-[45%], added flex-1 and min-w-0
          className="flex-1 min-w-0 h-11 p-2.5 rounded-xl outline-none bg-white text-gray-800 border border-transparent focus:border-blue-500 transition-all cursor-pointer"
        />
      </div>

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
