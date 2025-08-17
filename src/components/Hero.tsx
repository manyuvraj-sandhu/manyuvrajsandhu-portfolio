"use client";

import Image from "next/image";
import { AuroraText } from "@/components/magicui/aurora-text";

const stats = [
  { label: "Years of Experience", value: "3+" },
  { label: "Completed Projects", value: "9+" },
  { label: "Hours Worked", value: "5K+" },
];

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-16 max-w-5xl mx-auto">
      {/* Headline */}
      <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl mb-4">
        Hello I&apos;m <AuroraText>Manyuvraj</AuroraText>!
      </h1>

      {/* Subtitle */}
      <p className="text-3xl md:text-5xl mb-4">
        I am a{" "}
        <span className="text-cyan-700 font-bold">Full Stack</span>{" "}
        Software Developer
      </p>

      {/* Description */}
      <p className="max-w-xl text-sm md:text-base text-gray-700 mb-12 px-4">
        An experienced Full Stack Developer with a strong foundation in AI-focused
        solutions, automation, and scalable web applications.
      </p>

      {/* Stats */}
      <div className="flex gap-12 justify-center mb-12 flex-wrap">
        {stats.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center min-w-[100px]">
            <span className="text-4xl md:text-5xl font-extrabold text-cyan-700">
              {value}
            </span>
            <span className="text-gray-700 text-sm md:text-base mt-1">{label}</span>
          </div>
        ))}
      </div>

      {/* University */}
      <div className="flex flex-col items-center">
        <Image
          src="/uwaterloo_logo.png"
          alt="University of Waterloo Logo"
          width={80}
          height={80}
          className="object-contain"
          priority
        />
        <p className="mt-2 text-gray-700 text-sm md:text-base">
          University of Waterloo Alumnus
        </p>
      </div>
    </section>
  );
}
