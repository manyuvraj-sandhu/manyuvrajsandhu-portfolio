"use client";

import React, { useRef } from "react";
import SplashScreen from "@/components/SplashScreen";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { Particles } from "@/components/particles";
import Hero from "@/components/Hero";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import Stack from "@/components/Stack";
import ThinLine from "@/components/ThinLine";
import Navbar from "@/components/Navbar";

export default function Home() {
  const stackRef = useRef<HTMLElement>(null);

  const scrollToStack = () => {
    if (stackRef.current) {
      stackRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <SplashScreen />
      <Navbar onTechStackClick={scrollToStack} />
      <Particles
        className="fixed inset-0 z-0 pointer-events-none"
        color="#94a3b8"
        quantity={500}
        size={0.8}
      />
      <ScrollProgress />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-0 m-0 z-10 bg-transparent">
        <Hero />
        <ThinLine />
        {/* Pass ref to Stack */}
        <Stack ref={stackRef} />
        <SmoothCursor />
      </div>
    </>
  );
}
