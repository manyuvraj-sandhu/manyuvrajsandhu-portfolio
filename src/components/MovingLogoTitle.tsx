"use client";

import { motion } from "framer-motion";
import React from "react";

interface MovingLogoTitleProps {
  title: string;
  logo: React.ReactNode;
  className?: string;
}

export default function MovingLogoTitle({ title, logo, className }: MovingLogoTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex items-center gap-3 uppercase tracking-wide text-3xl font-bold text-black ${className ?? ""}`}
    >
      <motion.div
        aria-hidden="true"
        className="w-6 h-6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        {logo}
      </motion.div>
      <span>{title}</span>
    </motion.div>
  );
}
