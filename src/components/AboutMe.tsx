"use client";

import React from "react";
import { ContainerScroll, CardSticky, NAVBAR_HEIGHT } from "@/components/ui/cards-stack";
import MovingLogoTitle from "./MovingLogoTitle";
import { Sparkle } from "lucide-react";

const ABOUT_ME_DESCRIPTIONS = [
  "Passionate software engineer with 3+ years of experience building scalable web applications and APIs.",
  "Experienced in React, Next.js, TypeScript, and backend development using Node.js and Python.",
  "Strong believer in clean code, testing, and agile methodologies.",
  "Enjoys collaborating with cross-functional teams to deliver impactful solutions.",
  "Lifelong learner eager to explore new technologies and improve user experiences.",
];

const incrementY = 40;

const AboutMe = () => {
  const numCards = ABOUT_ME_DESCRIPTIONS.length;
  const minHeight = NAVBAR_HEIGHT + (numCards + 1) * incrementY + 100;

  return (
    <div
      id="about"
      className="container min-h-screen max-w-7xl px-6 text-stone-900 xl:px-12 py-24"
    >
      {/* Use flex-col on small screens and grid 2-cols on md+ */}
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8 xl:gap-12">
        {/* Left panel: sticky only on md+ */}
        <div
          className="md:sticky md:top-[80px] md:self-start md:max-h-[calc(100vh-80px)] md:overflow-auto mb-8 md:mb-0"
          style={{ top: NAVBAR_HEIGHT }}
        >
          <div className="mx-auto">
            <MovingLogoTitle
              title="ABOUT ME"
              logo={<Sparkle size={24} />}
              className="font-bold mb-12 text-left"
            />
          </div>
          <p className="max-w-prose text-sm">
            I am a dedicated software engineer who loves solving complex problems and building elegant solutions. This brief overview highlights the core strengths and values that drive my work and passion in tech.
          </p>
        </div>

        {/* Cards container */}
        <ContainerScroll
          className="space-y-8 py-12"
          style={{ minHeight: `${minHeight}px` }}
        >
          {ABOUT_ME_DESCRIPTIONS.map((desc, index) => (
            <CardSticky
              key={index}
              index={index + 2}
              incrementY={incrementY}
              className="rounded-2xl border p-8 shadow-md backdrop-blur-md bg-transparent"
            >
              <p className="text-foreground text-lg leading-relaxed">{desc}</p>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </div>
  );
};

export default AboutMe;
