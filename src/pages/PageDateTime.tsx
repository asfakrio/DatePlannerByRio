import React from "react";
import { motion } from "framer-motion";
import { DatePicker } from "../components/DatePicker";

interface TimeSlot {
  id: string;
  label: string;
  desc: string;
}

interface PageDateTimeProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  selectedTime: string | null;
  onSelectTime: (timeId: string) => void;
  onNext: () => void;
}

export const PageDateTime: React.FC<PageDateTimeProps> = ({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  onNext,
}) => {
  const timeSlots: TimeSlot[] = [
    { id: "morning", label: "Morning ☀️", desc: "Coffee & sunshine" },
    { id: "afternoon", label: "Afternoon 🌤️", desc: "Lunch & stroll" },
    { id: "evening", label: "Evening 🌙", desc: "Dinner & vibes" },
    { id: "late-night", label: "Late Night ✨", desc: "Drinks & stars" },
  ];

  const isValid = selectedDate !== null && selectedTime !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center w-full max-w-4xl px-4 md:px-6 py-6 z-10 select-none"
    >
      {/* Title */}
      <h2 className="font-serif font-black text-3xl md:text-4xl text-gray-800 text-center mb-8 tracking-tight">
        When should our date be? 📅
      </h2>

      {/* Main Grid: Date (Left) and Time (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch justify-items-center mb-10">
        
        {/* Calendar Side */}
        <div className="w-full flex flex-col items-center">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 self-center md:self-start md:pl-2">
            Select a Date
          </p>
          <div className="w-full flex justify-center">
            <DatePicker selectedDate={selectedDate} onChange={onSelectDate} />
          </div>
        </div>

        {/* Time Selection Side */}
        <div className="w-full flex flex-col items-stretch max-w-sm">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 pl-2">
            Select a Time
          </p>
          
          <div className="space-y-3.5 flex-1 flex flex-col justify-between">
            {timeSlots.map((slot) => {
              const isSelected = selectedTime === slot.id;
              return (
                <button
                  key={slot.id}
                  id={`btn-time-${slot.id}`}
                  type="button"
                  onClick={() => onSelectTime(slot.id)}
                  className={`w-full flex items-center justify-between p-4 bg-white border rounded-2xl text-left cursor-pointer transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.02)]
                    ${
                      isSelected
                        ? "border-[#ff4f8b] ring-2 ring-[#ff4f8b]/15 bg-pink-50/10 shadow-[0_6px_20px_rgba(255,79,139,0.12)]"
                        : "border-gray-100/90 hover:border-pink-200 hover:shadow-[0_8px_20px_rgba(255,79,139,0.06)] hover:-translate-y-0.5"
                    }
                  `}
                >
                  <div>
                    <h4 className="font-sans font-bold text-gray-800 text-base">
                      {slot.label}
                    </h4>
                    <p className="font-sans font-medium text-gray-400 text-xs mt-0.5">
                      {slot.desc}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200
                      ${
                        isSelected
                          ? "border-[#ff4f8b] bg-[#ff4f8b]"
                          : "border-gray-200 bg-white"
                      }
                    `}
                  >
                    {isSelected && (
                      <span className="block w-2 h-2 rounded-full bg-white animate-scale-in" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Date Prompt Guidance Banner */}
      {!isValid && (
        <p className="text-pink-400/80 font-medium text-sm mb-4 text-center animate-pulse">
          {!selectedDate && !selectedTime
            ? "Pick a date and a time slot to continue ✨"
            : !selectedDate
            ? "Now select a date on the calendar 📅"
            : "Almost there! Pick a time slot ⏰"}
        </p>
      )}

      {/* Bottom Button */}
      <motion.button
        id="btn-datetime-next"
        disabled={!isValid}
        whileHover={isValid ? { scale: 1.05 } : {}}
        whileTap={isValid ? { scale: 0.96 } : {}}
        onClick={onNext}
        className={`px-10 py-3.5 text-base font-semibold rounded-full flex items-center gap-2 shadow-lg transition-all duration-300 cursor-pointer
          ${
            isValid
              ? "bg-[#ff4f8b] hover:bg-[#e03b73] text-white shadow-[0_8px_20px_rgba(255,79,139,0.3)]"
              : "bg-gray-100 text-gray-400 border border-gray-100 cursor-not-allowed shadow-none"
          }
        `}
      >
        Next 💞
      </motion.button>
    </motion.div>
  );
};
