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

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [nameAnimationDone, setNameAnimationDone] = useState(false);
  const [startSlideUp, setStartSlideUp] = useState(false);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    const lettersCount = name.replace(/ /g, "").length;
    const letterAnimTime = 0.2; // seconds per letter
    const nameAnimDuration = lettersCount * letterAnimTime * 1000; // ms
    const holdDuration = 2000; // 2 seconds hold

    const nameAnimTimer = setTimeout(() => {
      setNameAnimationDone(true);
    }, nameAnimDuration);

    const slideTimer = setTimeout(() => {
      setStartSlideUp(true);
    }, nameAnimDuration + holdDuration);

    const endSplashTimer = setTimeout(() => {
      setShowSplash(false);
    }, nameAnimDuration + holdDuration + 1000);

    return () => {
      clearTimeout(nameAnimTimer);
      clearTimeout(slideTimer);
      clearTimeout(endSplashTimer);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showSplash]);

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
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ y: 0 }}
          animate={startSlideUp ? { y: "-100vh" } : { y: 0 }}
          exit={{ y: "-100vh" }}
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
              )
            )}
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
