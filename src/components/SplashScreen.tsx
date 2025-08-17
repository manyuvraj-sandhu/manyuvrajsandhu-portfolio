"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const NAME = "MANYUVRAJ SANDHU";

interface SplashScreenProps {
  onHidden?: () => void;
}

export default function SplashScreen({ onHidden }: SplashScreenProps) {
  const [startSlideUp, setStartSlideUp] = useState(false);

  // --- Tunable timings (fast) ---
  const PER_LETTER_DELAY = 0.06;      // sec
  const LETTER_ANIM_DURATION = 0.28;  // sec
  const HOLD_AFTER_NAME = 0.8;        // sec
  const SLIDE_DURATION = 1.5;         // sec

  const letters = useMemo(() => NAME.split(""), []);
  const lettersCount = useMemo(() => NAME.replace(/ /g, "").length, []);

  const totalRevealSeconds =
    Math.max(lettersCount - 1, 0) * PER_LETTER_DELAY +
    LETTER_ANIM_DURATION +
    HOLD_AFTER_NAME;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const slideTimer = setTimeout(() => setStartSlideUp(true), totalRevealSeconds * 1000);
    const hideTimer = setTimeout(() => {
      onHidden?.();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }, (totalRevealSeconds + SLIDE_DURATION) * 1000);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [onHidden, totalRevealSeconds]);

  const letterVariants: Variants = {
    hidden: { opacity: 0, scale: 0.2, y: 8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * PER_LETTER_DELAY,
        duration: LETTER_ANIM_DURATION,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        initial={{ y: 0, opacity: 1 }}
        animate={startSlideUp ? { y: "-100vh", opacity: 0 } : { y: 0, opacity: 1 }}
        exit={{ y: "-100vh", opacity: 0 }}
        transition={{ duration: SLIDE_DURATION, ease: [0.4, 0, 0.2, 1] }}
        style={{ willChange: "transform, opacity" }}
        className="fixed inset-0 h-screen w-screen bg-gradient-to-b from-black via-black to-white flex items-center justify-center z-50 px-4"
      >
        <h1
          className={`text-yellow-500 uppercase select-none whitespace-nowrap ${anton.className}`}
          style={{ fontSize: "8vw", fontWeight: 400, letterSpacing: "0.02em" }}
        >
          {letters.map((char, i) =>
            char === " " ? (
              <span
                key={`space-${i}`}
                style={{ display: "inline-block", width: "0.5em" }}
                aria-hidden="true"
              >
                &nbsp;
              </span>
            ) : (
              <motion.span
                key={`char-${i}-${char}`}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block will-change-transform"
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ),
          )}
        </h1>
      </motion.div>
    </AnimatePresence>
  );
}
