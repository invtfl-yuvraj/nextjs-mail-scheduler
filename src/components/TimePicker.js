import React, { useState, useEffect, useRef } from "react";
import useOutsideClick from "@/custom-hooks/useOutsideClick";

const TimePicker = ({ setSelectedTime, selectedTime, setShowTimePicker, selectedDate }) => {
  const [time, setTime] = useState(() => {
    return selectedTime && typeof selectedTime === "object"
      ? { ...selectedTime }
      : { hours: 12, minutes: 0, period: "AM" };
  });

  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setShowTimePicker(false));

  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [time]);

  const handleTimeChange = (field, value) => {
    setTime((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isSelectedDateToday = () => {
    if (!selectedDate) return false;
    const today = new Date();
    const selected = new Date(selectedDate);
    return (
      selected.getDate() === today.getDate() &&
      selected.getMonth() === today.getMonth() &&
      selected.getFullYear() === today.getFullYear()
    );
  };

  const handleConfirm = () => {
    if (!time) {
      setError("Invalid time selection.");
      return;
    }

    const { hours = 12, minutes = 0, period = "AM" } = time;
    const selectedHours = period === "PM" ? (hours % 12) + 12 : hours % 12;
    const selectedMinutes = minutes;

    // Only validate time if the selected date is today
    if (isSelectedDateToday()) {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      if (selectedHours < currentHours || (selectedHours === currentHours && selectedMinutes <= currentMinutes)) {
        setError("Selected time is in the past. Adjusting to the next available time.");

        let newHours = currentHours;
        let newMinutes = Math.ceil((currentMinutes + 1) / 15) * 15;

        if (newMinutes >= 60) {
          newMinutes = 0;
          newHours++;
        }

        const newPeriod = newHours >= 12 ? "PM" : "AM";
        newHours = newHours > 12 ? newHours - 12 : newHours === 0 ? 12 : newHours;

        setTime({
          hours: newHours,
          minutes: newMinutes,
          period: newPeriod,
        });

        return;
      }
    }
    
    // For non-today dates or valid times, set the time without further validation
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  return (
    <div ref={dropdownRef} className="absolute bottom-16 right-0 mt-2 bg-zinc-100 p-4 shadow-lg rounded-lg z-10">
      <h4 className="text-lg font-medium mb-2">Pick a Time</h4>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <div className="flex justify-between items-center gap-2 mb-4">
        <select
          value={time?.hours || 12}
          onChange={(e) => handleTimeChange("hours", parseInt(e.target.value))}
          className="px-3 py-2 border rounded-md"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <span>:</span>
        <select
          value={time?.minutes || 0}
          onChange={(e) => handleTimeChange("minutes", parseInt(e.target.value))}
          className="px-3 py-2 border rounded-md"
        >
          {[0, 15, 30, 45].map((minute) => (
            <option key={minute} value={minute}>
              {minute.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
        <select
          value={time?.period || "AM"}
          onChange={(e) => handleTimeChange("period", e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowTimePicker(false)}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

TimePicker.defaultProps = {
  selectedTime: { hours: 12, minutes: 0, period: "AM" },
};

export default TimePicker;