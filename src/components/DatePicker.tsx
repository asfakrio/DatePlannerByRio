import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
}) => {
  const [viewDate, setViewDate] = useState<Date>(selectedDate || new Date());
  
  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth(); // 0-indexed

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Helper to get number of days in the current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get the starting weekday (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const startDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  // Today for disabling past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectDay = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    onChange(clickedDate);
  };

  const nextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const prevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // Build calendar day cells
  const dayCells = [];
  
  // Pad the start with empty slots
  for (let i = 0; i < startDayIndex; i++) {
    dayCells.push(<div key={`empty-${i}`} className="h-10" />);
  }

  // Populate days
  for (let day = 1; day <= totalDays; day++) {
    const cellDate = new Date(currentYear, currentMonth, day);
    cellDate.setHours(0, 0, 0, 0);
    const isPast = cellDate < today;
    const isSelected =
      selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear;
    
    const isToday =
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear;

    dayCells.push(
      <button
        key={`day-${day}`}
        type="button"
        id={`btn-date-${currentYear}-${currentMonth + 1}-${day}`}
        disabled={isPast}
        onClick={() => selectDay(day)}
        className={`h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200
          ${isPast ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
          ${isSelected 
            ? "bg-[#ff4f8b] text-white shadow-[0_4px_12px_rgba(255,79,139,0.3)] scale-110" 
            : !isPast 
              ? "text-gray-700 hover:bg-pink-50 hover:text-[#ff4f8b]" 
              : ""
          }
          ${isToday && !isSelected ? "border border-[#ff4f8b] text-[#ff4f8b]" : ""}
        `}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100/80">
      {/* Month Year Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          id="btn-prev-month"
          onClick={prevMonth}
          className="p-2 rounded-full border border-gray-100 hover:bg-gray-50 hover:text-[#ff4f8b] transition-all text-gray-500 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-serif font-bold text-gray-800 text-lg">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <button
          type="button"
          id="btn-next-month"
          onClick={nextMonth}
          className="p-2 rounded-full border border-gray-100 hover:bg-gray-50 hover:text-[#ff4f8b] transition-all text-gray-500 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 text-center mb-3">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-xs font-semibold text-gray-400 h-6 flex items-center justify-center uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-2 gap-x-1 justify-items-center">
        {dayCells}
      </div>
    </div>
  );
};
