import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = ({ width, reminderData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const onDateClick = (day) => setSelectedDate(day);

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-3 px-1">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded-full hover:bg-gray-200 active:scale-95 transition text-gray-700"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base sm:text-lg font-bold text-gray-800">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-full hover:bg-gray-200 active:scale-95 transition text-gray-700"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      const dateObj = addDays(startDate, i);
      days.push(
        <div
          key={i}
          className="text-center font-bold text-gray-500 py-1.5 text-xs sm:text-sm"
        >
          {/* Display 'S', 'M', 'T' on mobile and 'Sun', 'Mon', 'Tue' on larger screens */}
          <span className="hidden xs:inline">{format(dateObj, "EEE")}</span>
          <span className="xs:hidden">{format(dateObj, "EEEEE")}</span>
        </div>,
      );
    }
    return <div className="grid grid-cols-7 mb-1">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");

        const dateKey = format(day, "yyyy-MM-dd");
        const cloneDay = day;

        const dailyReminders = reminderData.filter(
          (reminder) => reminder.date === dateKey,
        );

        days.push(
          <div
            key={day}
            onClick={() => onDateClick(cloneDay)}
            className={`p-1 min-h-15 sm:min-h-21.25 flex flex-col items-center justify-between sm:justify-start rounded-xl cursor-pointer transition-all duration-200 border border-gray-100/50 select-none
              ${
                !isSameMonth(day, monthStart)
                  ? "text-gray-300"
                  : isSameDay(day, selectedDate)
                    ? "bg-gray-300 rounded-xl shadow-inner"
                    : "text-gray-700 hover:bg-gray-200/60 rounded-xl"
              }
            `}
          >
            {/* Day Number bubble */}
            <span
              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-semibold rounded-full transition-all ${
                isSameDay(day, selectedDate)
                  ? "bg-blue-600 text-white shadow-sm"
                  : ""
              }`}
            >
              {formattedDate}
            </span>

            {/* Reminders Container */}
            <div className="w-full flex flex-wrap sm:flex-col gap-1 justify-center items-center mt-auto sm:mt-1 px-0.5 overflow-hidden">
              {dailyReminders.map(
                ({ task, color, timeFrom, timeTo }, index) => (
                  <React.Fragment key={index}>
                    {/* Desktop layout: Full badge */}
                    <div
                      style={{ backgroundColor: color }}
                      className="hidden sm:block text-white px-1 py-0.5 rounded w-full truncate text-center shadow-sm text-[10px] font-medium"
                      title={`${task} at ${timeFrom} to ${timeTo}`}
                    >
                      {task}
                    </div>

                    {/* Mobile layout: Dot indicator */}
                    <div
                      style={{ backgroundColor: color }}
                      className="block sm:hidden w-1.5 h-1.5 rounded-full shadow-sm"
                      title={`${task} at ${timeFrom} to ${timeTo}`}
                    />
                  </React.Fragment>
                ),
              )}
            </div>
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day}>
          {days}
        </div>,
      );
      days = [];
    }
    return <div className="flex flex-col gap-1">{rows}</div>;
  };

  return (
    <div className={`w-full ${width} p-3 rounded-2xl bg-[#eee] shadow-sm`}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
