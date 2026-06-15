import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface FoodOption {
  id: string;
  emoji: string;
  label: string;
}

interface PageFoodProps {
  selectedFoods: string[];
  onToggleFood: (foodId: string) => void;
  onPlan: () => void;
}

export const PageFood: React.FC<PageFoodProps> = ({
  selectedFoods,
  onToggleFood,
  onPlan,
}) => {
  const foodOptions: FoodOption[] = [
    { id: "biryani", emoji: "🍛", label: "Biryani Bliss" },
    { id: "kfc", emoji: "🍗", label: "KFC Chicken" },
    { id: "pizza", emoji: "🍕", label: "Cheesy Pizza" },
    { id: "momos", emoji: "🥟", label: "Steamy Momos" },
    { id: "curry", emoji: "🥘", label: "Curry & Naan" },
    { id: "dosa", emoji: "🥞", label: "Masala Dosa" },
    { id: "chaat", emoji: "🥙", label: "Golgappa & Chaat" },
    { id: "chai", emoji: "☕", label: "Chai & Samosa" },
  ];

  const hasSelection = selectedFoods.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center w-full max-w-4xl px-4 md:px-6 py-6 z-10 select-none"
    >
      {/* Title & Subtitle */}
      <h2 className="font-serif font-black text-3xl md:text-4xl text-gray-800 text-center mb-2 tracking-tight">
        What are you feeling? 🍽️
      </h2>
      <p className="font-sans font-semibold text-white/80 text-sm mb-8 text-center">
        Pick as many as you like!
      </p>

      {/* Grid of Food Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full justify-items-center mb-10">
        {foodOptions.map((food) => {
          const isSelected = selectedFoods.includes(food.id);
          return (
            <motion.button
              key={food.id}
              id={`btn-food-${food.id}`}
              type="button"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleFood(food.id)}
              className={`relative w-full aspect-square max-w-[170px] flex flex-col items-center justify-center p-5 bg-white border rounded-3xl cursor-pointer transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.02)]
                ${
                  isSelected
                    ? "selected-glow border-[#ff4f8b] ring-2 ring-[#ff4f8b]/10 bg-pink-50/5 scale-[1.03]"
                    : "border-gray-100/90 hover:border-pink-200 hover:shadow-[0_8px_20px_rgba(255,79,139,0.08)]"
                }
              `}
            >
              {/* Check Indicator badge */}
              <div
                className={`absolute top-3 right-3 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200
                  ${
                    isSelected
                      ? "border-[#ff4f8b] bg-[#ff4f8b] scale-100 opacity-100"
                      : "border-gray-200 bg-white opacity-0 scale-50"
                  }
                `}
              >
                <Check className="w-3 h-3 text-white stroke-[3px]" />
              </div>

              {/* Emoji */}
              <span className="text-4xl md:text-5xl mb-3 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)] select-none">
                {food.emoji}
              </span>

              {/* Label */}
              <span className="font-sans font-bold text-gray-700 text-sm md:text-base text-center line-clamp-1 leading-tight">
                {food.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Helper validation text */}
      {!hasSelection && (
        <p className="text-pink-400/80 font-medium text-sm mb-4 text-center animate-pulse">
          Choose at least one mouth-watering option 🍕
        </p>
      )}

      {/* Plan It Button */}
      <motion.button
        id="btn-food-next"
        disabled={!hasSelection}
        whileHover={hasSelection ? { scale: 1.05 } : {}}
        whileTap={hasSelection ? { scale: 0.96 } : {}}
        onClick={onPlan}
        className={`px-10 py-3.5 text-base font-semibold rounded-full flex items-center gap-2 shadow-lg transition-all duration-300 cursor-pointer
          ${
            hasSelection
              ? "bg-[#ff4f8b] hover:bg-[#e03b73] text-white shadow-[0_8px_20px_rgba(255,79,139,0.3)]"
              : "bg-gray-100 text-gray-400 border border-gray-100 cursor-not-allowed shadow-none"
          }
        `}
      >
        Plan Our Date ✨
      </motion.button>
    </motion.div>
  );
};
