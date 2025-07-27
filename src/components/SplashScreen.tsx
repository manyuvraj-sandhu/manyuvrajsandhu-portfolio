"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const name = "MANYUVRAJ SANDHU";

interface SplashScreenProps {
  onHidden?: () => void; // called when splash fully gone
}

export default function SplashScreen({ onHidden }: SplashScreenProps) {
  const [startSlideUp, setStartSlideUp] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const lettersCount = name.replace(/ /g, "").length;
    const letterAnimTime = 0.2 * 1000; // ms per letter
    const nameAnimDuration = lettersCount * letterAnimTime;
    const holdDuration = 2000; // ms hold after letters appear
    const slideDuration = 1000; // ms slide animation duration

    // Start sliding up after letters + hold
    const slideTimer = setTimeout(() => {
      setStartSlideUp(true);
    }, nameAnimDuration + holdDuration);

    // Notify parent after slide animation completes
    const hideTimer = setTimeout(() => {
      onHidden?.();
      // Restore scroll when splash fully hidden
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }, nameAnimDuration + holdDuration + slideDuration);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [onHidden]);

  const letterVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: easeOut,
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
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
        className="fixed inset-0 h-screen w-screen bg-gradient-to-b from-black via-black to-white flex items-center justify-center z-50 px-4"
      >
        <h1
          className={`text-yellow-500 uppercase select-none whitespace-nowrap ${anton.className}`}
          style={{
            fontSize: "8vw",
            fontWeight: 400,
          }}
        >
          {name.split("").map((char, i) =>
            char === " " ? (
              <span
                key={i}
                style={{ display: "inline-block", width: "0.5em" }}
                aria-hidden="true"
              >
                &nbsp;
              </span>
            ) : (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
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
