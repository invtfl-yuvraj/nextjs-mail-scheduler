import React, { useState, useEffect } from "react";

const TimePicker = ({ setSelectedTime, selectedTime, setShowTimePicker, selectedDate }) => {
  const [time, setTime] = useState(selectedTime);
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

  const handleConfirm = () => {
    const now = new Date();
    const date = selectedDate ? new Date(selectedDate) : now; // Ensure selectedDate is a valid Date object
    const isToday = date.toDateString() === now.toDateString();
  
    const selectedHours = time.period === "PM" ? (time.hours % 12) + 12 : time.hours % 12;
    const selectedMinutes = time.minutes;
  
    if (isToday) {
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
  
      if (
        selectedHours < currentHours ||
        (selectedHours === currentHours && selectedMinutes <= currentMinutes)
      ) {
        setError("Selected time is in the past. Adjusting to the next available time.");
        
        let newHours = currentHours;
        let newMinutes = Math.ceil((currentMinutes + 1) / 15) * 15; // Round up to the next 15-minute slot
  
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
  
    setSelectedTime(time);
    setShowTimePicker(false);
  };
  

  return (
    <div className="absolute left-0 mt-2 bg-white p-4 shadow-lg rounded-lg z-10">
      <h4 className="text-lg font-medium mb-2">Pick a Time</h4>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <div className="flex justify-between items-center gap-2 mb-4">
        <select
          value={time.hours}
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
          value={time.minutes}
          onChange={(e) =>
            handleTimeChange("minutes", parseInt(e.target.value))
          }
          className="px-3 py-2 border rounded-md"
        >
          {[0, 15, 30, 45].map((minute) => (
            <option key={minute} value={minute}>
              {minute.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
        <select
          value={time.period}
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

export default TimePicker;
