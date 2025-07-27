"use client";

import SplashScreen from "@/components/SplashScreen";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { Particles } from "@/components/particles";
import Hero from "@/components/Hero";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import Stack from "@/components/Stack";
import ThinLine from "@/components/ThinLine";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Particles
          className="absolute inset-0 z-0 pointer-events-none"
          color="#94a3b8"
          quantity={500}
          size={0.8}
        />
      <ScrollProgress />
      <div className="flex flex-col items-center justify-center min-h-screen p-0 m-0">
        <Hero />
        <ThinLine />
        <Stack />
        <SmoothCursor />
      </div>
    </>
  );
}
