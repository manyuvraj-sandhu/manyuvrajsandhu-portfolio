"use client";

import React from "react";
import SplashScreen from "@/components/SplashScreen";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { Particles } from "@/components/particles";
import Hero from "@/components/Hero";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import Stack from "@/components/Stack";
import ThinLine from "@/components/ThinLine";
import Navbar from "@/components/Navbar";
import Experience from "@/components/Experience";
import ContactMe from "@/components/ContactMe";
import Projects from "@/components/Projects";
import AboutMe from "@/components/AboutMe";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Navbar />
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
        <AboutMe />
        <ThinLine />
        <Stack />
        <ThinLine />
        <Experience /> 
        <ThinLine />
        <Projects />
        <ThinLine />
        <ContactMe />
        <SmoothCursor />
      </div>
    </>
  );
}
