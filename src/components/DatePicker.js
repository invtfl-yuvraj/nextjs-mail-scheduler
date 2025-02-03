import React, { useState, useEffect, useRef } from "react";
import useOutsideClick from "@/custom-hooks/useOutsideClick";

const DatePicker = ({ setShowDatePicker, setSelectedDate, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [calendarDays, setCalendarDays] = useState([]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setShowDatePicker(false));

  useEffect(() => {
    const generateCalendarDays = () => {
      const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).getDay();
      const days = [];
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null); // Empty space for the first week
      }
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
      }
      setCalendarDays(days);
    };
    generateCalendarDays();
  }, [currentDate]);

  const isDateDisabled = (day) => {
    if (!day) return true;
    const dateToCheck = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return dateToCheck < today;
  };

  const handleDateChange = (day) => {
    if (day && !isDateDisabled(day)) {
      const newDate = new Date(currentDate);
      newDate.setDate(day);
      setCurrentDate(newDate);
    }
  };

  const handleConfirm = () => {
    setSelectedDate(currentDate);
    setShowDatePicker(false);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    if (
      newDate.getMonth() >= today.getMonth() ||
      newDate.getFullYear() > today.getFullYear()
    ) {
      setCurrentDate(newDate);
    }
  };

  const isPreviousMonthDisabled = () => {
    const previousMonth = new Date(currentDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    return (
      previousMonth.getMonth() < today.getMonth() &&
      previousMonth.getFullYear() <= today.getFullYear()
    );
  };

  const getButtonStyles = (day) => {
    if (!day) return "text-transparent cursor-default";

    const isDisabled = isDateDisabled(day);
    const isSelected = day === currentDate.getDate() && !isDisabled;

    // Custom transition colors and logic for button styles
    if (isDisabled) {
      return "text-gray-300 cursor-not-allowed bg-gray-50 transition-colors duration-200";
    }
    if (isSelected) {
      return "bg-purple-600 text-white hover:bg-purple-800 transition-colors duration-200";
    }
    return "text-gray-700 hover:bg-purple-200 transition-colors duration-200";
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute bottom-10 right-0 mt-2 bg-zinc-100 p-4 shadow-lg rounded-lg z-10"
    >
      <h4 className="text-lg font-medium mb-2">Pick a Date</h4>
      {/* Header for month navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousMonth}
          disabled={isPreviousMonthDisabled()}
          className={`px-3 py-1 rounded-md transition-colors ${
            isPreviousMonthDisabled()
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          ◀️
        </button>
        <span className="text-gray-700">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={handleNextMonth}
          className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
        >
          ▶️
        </button>
      </div>
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium text-sm">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateChange(day)}
            disabled={isDateDisabled(day)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors duration-200 ${getButtonStyles(
              day
            )}`}
          >
            {day}
          </button>
        ))}
      </div>
      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowDatePicker(false)}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-800 transition-colors duration-200"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DatePicker;