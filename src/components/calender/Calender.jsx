import { useState } from "react";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  const startDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();
  const endDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    daysInMonth
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const prevMonthDays = Array.from(
    { length: startDayOfMonth },
    (_, i) => -i - 1
  ).reverse();
  const nextMonthDays = Array.from(
    { length: 6 - endDayOfMonth },
    (_, i) => i + 1
  );

  const allDays = [...prevMonthDays, ...days, ...nextMonthDays];

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth}>Prev</button>
        <h2>{selectedDate.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="grid grid-cols-7 gap-8">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
        {allDays.map((day, i) => (
          <div
            key={i}
            className={`text-center ${
              day === selectedDate.getDate() ? "bg-blue-500 text-white rounded-full" : ""
            }`}
          >
            {day > 0 ? day : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
