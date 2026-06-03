import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Mail } from "lucide-react";

interface PageProposalProps {
  onAccept: () => void;
}

interface BurstHeart {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export const PageProposal: React.FC<PageProposalProps> = ({ onAccept }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [burstHearts, setBurstHearts] = useState<BurstHeart[]>([]);
  const [hasMoved, setHasMoved] = useState(false);

  // Trigger runaway movement of the No button
  const moveNoButton = () => {
    setHasMoved(true);
    
    // Viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // We want the button to stay within the viewport but jump randomly.
    // The button starts in a flex row. We'll generate an offset from its origin.
    // Maximum offset is half the viewport size minus padding.
    const maxOffsetW = viewportWidth / 2 - 100;
    const maxOffsetH = viewportHeight / 2 - 100;

    const randomX = (Math.random() * 2 - 1) * maxOffsetW;
    const randomY = (Math.random() * 2 - 1) * maxOffsetH;

    // Safety check: ensure it moves at least 100px away from current position to look like a jump
    const distance = Math.hypot(randomX - noPosition.x, randomY - noPosition.y);
    if (distance < 150) {
      // Add a bit more offset if too close
      setNoPosition({
        x: randomX + (randomX > 0 ? 100 : -100),
        y: randomY + (randomY > 0 ? 100 : -100),
      });
    } else {
      setNoPosition({ x: randomX, y: randomY });
    }
  };

  const handleYesClick = () => {
    setIsAccepted(true);

    // 1. Confetti celebration
    // Single main burst
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff4f8b", "#ff85a7", "#fca5a5", "#ffffff"],
    });

    // Side showers
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: Math.random() * 0.2 + 0.1, y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: Math.random() * 0.2 + 0.7, y: Math.random() - 0.2 } });
    }, 250);

    // 2. Generate Heart Burst Animation
    const hearts: BurstHeart[] = Array.from({ length: 32 }).map((_, i) => {
      const angle = (i / 32) * Math.PI * 2 + (Math.random() * 0.2 - 0.1);
      const speed = 100 + Math.random() * 250;
      return {
        id: i,
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
        scale: 0.5 + Math.random() * 1.2,
        rotation: Math.random() * 360,
      };
    });
    setBurstHearts(hearts);

    // 3. Page transition after animations settle
    setTimeout(() => {
      onAccept();
    }, 1600);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl px-6 text-center z-10 select-none">
      
      {/* Heart Burst Canvas */}
      <AnimatePresence>
        {isAccepted && (
          <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
            {burstHearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: heart.x,
                  y: heart.y,
                  opacity: 0,
                  scale: heart.scale,
                  rotate: heart.rotation,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="absolute text-pink-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ff4f8b"
                  className="w-10 h-10 drop-shadow-[0_4px_8px_rgba(255,79,139,0.3)]"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-col items-center"
      >
        {/* Envelope Bouncing Icon */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: "easeInOut",
          }}
          className="relative w-28 h-28 mb-8 flex items-center justify-center bg-pink-50/50 rounded-full border border-pink-100 shadow-[0_8px_24px_rgba(255,79,139,0.06)]"
        >
          {/* Heart peaking out of envelope */}
          <motion.div
            animate={{ y: [4, -8, 4] }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
            }}
            className="absolute top-6 text-[#ff4f8b]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 drop-shadow-[0_2px_4px_rgba(255,79,139,0.2)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
          <Mail className="w-16 h-16 text-pink-300 stroke-[1.25]" />
        </motion.div>

        {/* Serif Romantic Heading */}
        <h1 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl text-gray-800 tracking-tight leading-tight mb-12 max-w-xl">
          Will you go on a date with Rio?
        </h1>

        {/* Actions Button Row */}
        <div className="relative flex flex-row items-center justify-center gap-6 min-h-[80px] w-full">
          
          {/* YES Button */}
          <motion.button
            id="btn-yes"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYesClick}
            className="px-8 py-3.5 bg-[#ff4f8b] hover:bg-[#e03b73] text-white text-lg font-semibold rounded-full shadow-[0_8px_24px_rgba(255,79,139,0.35)] transition-colors duration-250 cursor-pointer z-10 flex items-center gap-2"
          >
            Yes 💖
          </motion.button>

          {/* RUNAWAY NO Button */}
          <motion.button
            id="btn-no"
            type="button"
            onMouseEnter={moveNoButton}
            onHoverStart={moveNoButton}
            onClick={moveNoButton}
            onTouchStart={moveNoButton}
            onFocus={moveNoButton}
            animate={{
              x: noPosition.x,
              y: noPosition.y,
              position: hasMoved ? ("fixed" as any) : ("relative" as any),
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 14,
              mass: 0.8,
            }}
            className={`px-8 py-3.5 bg-white border border-gray-200 text-gray-600 text-lg font-semibold rounded-full hover:bg-gray-50 transition-colors duration-250 z-20 outline-none
              ${hasMoved ? "left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] shadow-[0_8px_24px_rgba(0,0,0,0.08)]" : "relative"}
            `}
          >
            No
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
