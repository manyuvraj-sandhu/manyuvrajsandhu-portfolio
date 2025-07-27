"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, easeOut } from "framer-motion";
import MovingLogoTitle from "./MovingLogoTitle"; // Adjust path if needed
import { Layers } from "lucide-react";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

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
      { label: "JavaScript", iconSrc: "/tech-icons/javascript_logo.png" },
      { label: "TypeScript", iconSrc: "/tech-icons/typescript_logo.webp" },
      { label: "React", iconSrc: "/tech-icons/react_logo.png" },
      { label: "Next.js", iconSrc: "/tech-icons/nextjs_logo.webp" },
      { label: "HTML", iconSrc: "/tech-icons/html_logo.png" },
      { label: "CSS", iconSrc: "/tech-icons/css_logo.png" },
      { label: "Tailwind", iconSrc: "/tech-icons/tailwind_logo.png" },
    ],
  },
  {
    title: "BACKEND",
    techs: [
      { label: "Python", iconSrc: "/tech-icons/python_logo.png" },
      { label: "Node.js", iconSrc: "/tech-icons/nodejs_logo.png" },
      { label: "Django", iconSrc: "/tech-icons/django_logo.svg" },
      { label: "Java", iconSrc: "/tech-icons/java_logo.svg" },
      { label: "Julia", iconSrc: "/tech-icons/julia_logo.png" },
      { label: "C++ / C", iconSrc: "/tech-icons/c_logo.png" },
      { label: "RESTful APIs", iconSrc: "/tech-icons/rest_api_logo.png" },
    ],
  },
  {
    title: "DATABASE",
    techs: [
      { label: "PostgreSQL", iconSrc: "/tech-icons/postgresql_logo.svg" },
      { label: "MySQL", iconSrc: "/tech-icons/mysql_logo.webp" },
    ],
  },
  {
    title: "AUTHENTICATION",
    techs: [
      { label: "Supabase", iconSrc: "/tech-icons/supabase_logo.webp" },
      { label: "Firebase", iconSrc: "/tech-icons/firebase_logo.png" },
      { label: "Clerk", iconSrc: "/tech-icons/clerk_logo.png" },
    ],
  },
  {
    title: "TOOLS",
    techs: [
      { label: "Git", iconSrc: "/tech-icons/git_logo.png" },
      { label: "n8n", iconSrc: "/tech-icons/n8n_logo.png" },
      { label: "Amazon Web Services (AWS)", iconSrc: "/tech-icons/aws_logo.png" },
      { label: "Docker", iconSrc: "/tech-icons/docker_logo.webp" },
      { label: "Google Cloud", iconSrc: "/tech-icons/google_cloud_logo.png" },
      { label: "Stripe", iconSrc: "/tech-icons/stripe_logo.png" },
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
      className="flex items-center gap-3 min-w-[120px] sm:min-w-[140px]"
    >
      <Image
        src={iconSrc}
        alt={label}
        width={56}
        height={56}
        className="object-contain"
        loading="lazy"
        draggable={false}
      />
      <span className="text-black font-medium text-base sm:text-lg whitespace-normal break-words">
        {label}
      </span>
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
      className="mb-20 flex flex-col md:flex-row md:items-center md:justify-between"
    >
      {/* Anton font only on these titles */}
      <h2
        className={`${anton.className} font-extrabold tracking-wide mb-6 md:mb-0 md:text-left md:flex-1`}
        style={{
          fontSize: "clamp(2rem, 5vw, 4.5rem)", // responsive font size
          lineHeight: 1,
          color: "black",
          textTransform: "uppercase",
          wordBreak: "break-word",  // allow breaking long words if needed
          overflowWrap: "break-word",
        }}
      >
        {title}
      </h2>

      {/* Tech items on right */}
      <div className="flex flex-wrap gap-6 justify-center md:justify-start md:flex-1">
        {techs.map((tech) => (
          <TechItem key={tech.label} {...tech} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Stack() {
  const ref = React.useRef(null);

  return (
    <section
      ref={ref}
      className="max-w-7xl mx-auto px-6 py-24 text-black relative"
    >
      <MovingLogoTitle
        title="MY STACK"
        logo={<Layers size={24} />}
        className="font-bold mb-12"
      />

      {stackData.map(({ title, techs }) => (
        <StackSection key={title} title={title} techs={techs} />
      ))}
    </section>
  );
}