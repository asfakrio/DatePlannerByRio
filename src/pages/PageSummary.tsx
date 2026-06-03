import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Utensils, Copy, Check, Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface PageSummaryProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedFoods: string[];
}

export const PageSummary: React.FC<PageSummaryProps> = ({
  selectedDate,
  selectedTime,
  selectedFoods,
}) => {
  const [copied, setCopied] = useState(false);

  // Time mappings
  const timeMap: Record<string, { label: string; desc: string }> = {
    morning: { label: "Morning ☀️", desc: "Coffee & sunshine" },
    afternoon: { label: "Afternoon 🌤️", desc: "Lunch & stroll" },
    evening: { label: "Evening 🌙", desc: "Dinner & vibes" },
    "late-night": { label: "Late Night ✨", desc: "Drinks & stars" },
  };

  // Food mappings
  const foodMap: Record<string, { label: string; emoji: string }> = {
    biryani: { label: "Biryani Bliss", emoji: "🍛" },
    kfc: { label: "KFC Chicken", emoji: "🍗" },
    pizza: { label: "Cheesy Pizza", emoji: "🍕" },
    momos: { label: "Steamy Momos", emoji: "🥟" },
    curry: { label: "Curry & Naan", emoji: "🥘" },
    dosa: { label: "Masala Dosa", emoji: "🥞" },
    chaat: { label: "Golgappa & Chaat", emoji: "🥙" },
    chai: { label: "Chai & Samosa", emoji: "☕" },
  };

  // Trigger continuous confetti on load for the celebration screen!
  useEffect(() => {
    // Blast initial confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Fire minor side bursts a few times
    const end = Date.now() + 1.5 * 1000;
    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff4f8b", "#ff85a7"],
      });
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff4f8b", "#ff85a7"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date | null): string => {
    if (!date) return "Not selected";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeId: string | null): string => {
    if (!timeId || !timeMap[timeId]) return "Not selected";
    const slot = timeMap[timeId];
    return `${slot.label} (${slot.desc})`;
  };

  const getFoodString = (): string => {
    if (selectedFoods.length === 0) return "None selected";
    return selectedFoods
      .map((id) => {
        const item = foodMap[id];
        return item ? `${item.emoji} ${item.label}` : id;
      })
      .join(", ");
  };

  const handleCopy = () => {
    const dateText = formatDate(selectedDate);
    const timeText = formatTime(selectedTime);
    const foodText = getFoodString();

    const planText = `💖 It's a Date! 💖\n\n📅 Date: ${dateText}\n⏰ Time: ${timeText}\n🍽️ Food: ${foodText}\n\nI can't wait! 🥰✨`;

    navigator.clipboard.writeText(planText).then(() => {
      setCopied(true);
      // Confetti burst on successful copy!
      confetti({
        particleCount: 40,
        spread: 40,
        colors: ["#ff4f8b", "#ffffff"],
      });
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
      className="flex flex-col items-center w-full max-w-xl px-4 py-8 z-10 select-none"
    >
      {/* Centered Large Summary Card */}
      <div className="glass-panel w-full p-8 md:p-10 rounded-[36px] flex flex-col items-center text-center shadow-[0_20px_50px_rgba(255,79,139,0.1)] border border-pink-100/50">
        
        {/* Pulsing Bouncing Heart Graphic */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center text-[#ff4f8b] mb-6 shadow-[0_6px_16px_rgba(255,79,139,0.15)]"
        >
          <Heart className="w-8 h-8 fill-current text-[#ff4f8b]" />
        </motion.div>

        {/* Heading titles */}
        <h2 className="font-serif font-black text-4xl text-gray-800 mb-2 tracking-tight">
          It's a date! ❤️
        </h2>
        <p className="font-sans font-semibold text-gray-400 text-sm mb-8">
          I'm so excited! Here's the plan:
        </p>

        {/* Plan Details List */}
        <div className="w-full space-y-4 mb-8 text-left">
          
          {/* DATE Slot */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50">
            <div className="w-10 h-10 rounded-xl bg-pink-100/40 text-[#ff4f8b] flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Selected Date
              </span>
              <span className="block text-gray-700 font-bold text-base md:text-lg mt-0.5">
                {formatDate(selectedDate)}
              </span>
            </div>
          </div>

          {/* TIME Slot */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50">
            <div className="w-10 h-10 rounded-xl bg-pink-100/40 text-[#ff4f8b] flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Selected Time
              </span>
              <span className="block text-gray-700 font-bold text-base md:text-lg mt-0.5">
                {formatTime(selectedTime)}
              </span>
            </div>
          </div>

          {/* FOOD choices */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50">
            <div className="w-10 h-10 rounded-xl bg-pink-100/40 text-[#ff4f8b] flex items-center justify-center flex-shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Menu & Vibe
              </span>
              <span className="block text-gray-700 font-bold text-base md:text-lg mt-0.5 leading-relaxed">
                {getFoodString()}
              </span>
            </div>
          </div>
        </div>

        {/* Copy Button */}
        <motion.button
          id="btn-copy-plan"
          onClick={handleCopy}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full py-4 text-base font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all duration-300
            ${
              copied
                ? "bg-emerald-500 text-white shadow-[0_6px_20px_rgba(16,185,129,0.3)]"
                : "bg-[#ff4f8b] hover:bg-[#e03b73] text-white shadow-[0_8px_24px_rgba(255,79,139,0.3)]"
            }
          `}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5 stroke-[3px]" /> Copied! 💖
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <Copy className="w-5 h-5" /> Copy Details
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};
