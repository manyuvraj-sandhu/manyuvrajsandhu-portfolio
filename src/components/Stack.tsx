"use client";

import React, { useRef } from "react";
import { motion, useInView, easeOut } from "framer-motion";
import MovingLogoTitle from "./MovingLogoTitle";
import { Layers } from "lucide-react";

type Tech = {
  label: string;
  iconSrc: string;
};

type StackCategory = {
  title: string;
  techs: Tech[];
};

const stackData: StackCategory[] = [
  {
    title: "FRONTEND",
    techs: [
      { label: "JavaScript", iconSrc: "/tech-icons/javascript.svg" },
      { label: "TypeScript", iconSrc: "/tech-icons/typescript.svg" },
      { label: "React", iconSrc: "/tech-icons/react.svg" },
      { label: "Next.Js", iconSrc: "/tech-icons/nextjs.svg" },
      { label: "Redux", iconSrc: "/tech-icons/redux.svg" },
      { label: "Tailwind CSS", iconSrc: "/tech-icons/tailwind.svg" },
      { label: "GSAP", iconSrc: "/tech-icons/gsap.svg" },
      { label: "Framer Motion", iconSrc: "/tech-icons/framer-motion.svg" },
      { label: "Sass", iconSrc: "/tech-icons/sass.svg" },
      { label: "Bootstrap", iconSrc: "/tech-icons/bootstrap.svg" },
    ],
  },
  {
    title: "BACKEND",
    techs: [
      { label: "Node.Js", iconSrc: "/tech-icons/nodejs.svg" },
      { label: "NestJS", iconSrc: "/tech-icons/nestjs.svg" },
      { label: "Express.Js", iconSrc: "/tech-icons/express.svg" },
    ],
  },
  {
    title: "DATABASE",
    techs: [
      // Add database tech here if needed
    ],
  },
  {
    title: "TOOLS",
    techs: [
      // Add tools here if needed
    ],
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

function TechItem({ label, iconSrc }: Tech) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex items-center gap-2 min-w-[140px] sm:min-w-[160px]"
    >
      <img
        src={iconSrc}
        alt={label}
        className="w-8 h-8 object-contain"
        loading="lazy"
        draggable={false}
      />
      <span className="text-black font-medium">{label}</span>
    </motion.div>
  );
}

function StackSection({ title, techs }: StackCategory) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: easeOut },
        },
      }}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold text-black mb-8 tracking-wide">{title}</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {techs.map((tech) => (
          <TechItem key={tech.label} {...tech} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Stack() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 py-20">
      <MovingLogoTitle title="MY STACK" logo={<Layers size={24} />} className="mb-12" />

      {stackData.map(({ title, techs }) => (
        <StackSection key={title} title={title} techs={techs} />
      ))}
    </section>
  );
}
