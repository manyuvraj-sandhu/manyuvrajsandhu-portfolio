"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { Anton } from "next/font/google";
import MovingLogoTitle from "./MovingLogoTitle";
import { Sparkles } from "lucide-react";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const cyan700 = "#006b6b";

type Project = {
  id: number;
  title: string;
  image: string;
  link?: string;
  description: string;
  year?: string;
  skills?: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "MyPagefolio",
    image: "/project-images/mypagefolio.jpeg",
    link: "https://mypagefolio-gb7xrh3um-sumeetsandhus-projects.vercel.app",
    description: `• Developed a full-stack web application using Next.js and Supabase (PostgreSQL) for data storage and authentication, integrating Stripe for secure payment processing, enabling students to create online portfolios from their resumes.`,
    year: "2025",
    skills: ["Full-Stack Development", "Next.js", "TypeScript", "Supabase", "Stripe"],
  },
  {
    id: 2,
    title: "Simple Incident Logger",
    image: "/project-images/simpleincidentlogger.png",
    description: `• Developed a full-stack web application using Next.js and Supabase (PostgreSQL) for data storage and authentication, integrating Stripe for secure payment processing, enabling students to create online portfolios from their resumes.`,
    year: "2025",
    skills: ["Full-Stack Development", "Next.js", "TypeScript", "Supabase", "Stripe"],
  },
  {
    id: 3,
    title: "The Signature Lab",
    image: "/project-images/thesignaturelab.jpeg",
    link: "https://www.thesignaturelab.com",
    description: "React + Redux + i18n e-commerce platform with advanced state management and localization...",
    year: "2022",
    skills: ["React", "Redux", "i18n"],
  },
  {
    id: 4,
    title: "Full-Stack e-Commerce Application",
    image: "/project-images/ecommercestore.jpeg",
    link: "https://ecommerce-store-rho-five.vercel.app",
    description: "GPT-4 powered resume optimization tool built with Next.js and PostgreSQL...",
    year: "2024",
    skills: ["Next.js", "PostgreSQL", "GPT-4"],
  },
  {
    id: 5,
    title: "AI Article Summarizer",
    image: "/project-images/aiarticlesummarizer.jpeg",
    description: "Real estate listing platform built with React.js, Redux, and Tailwind CSS...",
    year: "2023",
    skills: ["React.js", "Redux", "Tailwind CSS"],
  },
  {
    id: 6,
    title: "Spotify Clone",
    image: "/project-images/spotifyclone.jpeg",
    description: "Finance consulting website with clean UI and interactive charts built using React and D3.js...",
    year: "2023",
    skills: ["React", "D3.js"],
  },
];

const SplitLetters = ({
  text,
  color,
  animate,
}: {
  text: string;
  color: string;
  animate: boolean;
}) => {
  const letterVariants = {
    hidden: { color: "#000000" },
    visible: (i: number) => ({
      color,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <h3
      aria-label={text}
      className={`${anton.className} font-extrabold cursor-pointer select-none`}
      style={{ textAlign: "left", fontSize: "2.75rem", lineHeight: 1.1, userSelect: "none" }}
    >
      {text.split("").map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          variants={letterVariants}
        >
          {letter}
        </motion.span>
      ))}
    </h3>
  );
};

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoverColor, setHoverColor] = useState<string>(cyan700);
  const [isMobile, setIsMobile] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({
    width: 1440,
    height: 900,
  });

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 950);
      const screenWidth = width;
      const screenHeight = window.innerHeight;
      setImageDimensions({
        width: screenWidth,
        height: screenHeight * (900 / 1440),
      });
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (hoveredId !== null) {
      setHoverColor(cyan700);
    }
  }, [hoveredId]);

  const selectedProject = projects.find((p) => p.id === selectedId);
  const showRightPanelId = selectedId ?? hoveredId;

  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimation();
  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0, pointerEvents: "auto" });
    else controls.start({ opacity: 0, y: 50, pointerEvents: "none" });
  }, [inView, controls]);

  const closeDetail = () => {
    setSelectedId(null);
    setHoveredId(null);
  };

  return (
    <>
      <section
        ref={ref}
        id="projects"
        className="w-screen max-w-7xl p-6 md:p-12 relative min-h-[600px] transition-all duration-500"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(50px)" }}
      >
        <div className="px-6" style={{ textAlign: "left" }}>
          <MovingLogoTitle title="PROJECTS" logo={<Sparkles size={24} />} className="font-bold mb-12" />
        </div>

        <div
          className={`flex flex-col ${
            isMobile ? "gap-6" : "md:flex-row gap-8 md:gap-12"
          }`}
        >
          <ul className="flex flex-col gap-6" style={{ textAlign: "left" }}>
            {projects.map(({ id, title }) => {
              const isHovered = hoveredId === id;
              const isSelected = selectedId === id;

              return (
                <li
                  key={id}
                  onMouseEnter={() => !isMobile && !isSelected && setHoveredId(id)}
                  onMouseLeave={() => !isMobile && !isSelected && setHoveredId(null)}
                  onClick={() => setSelectedId(id)}
                  className={`cursor-pointer select-none transition-colors ${
                    isHovered || isSelected ? "text-black" : "text-gray-700"
                  } ${anton.className} font-extrabold`}
                  style={{
                    textAlign: "left",
                    fontSize: "2.75rem",
                    lineHeight: 1.1,
                    minWidth: "fit-content",
                    userSelect: "none",
                  }}
                >
                  {(isHovered || isSelected) ? (
                    <SplitLetters text={title} color={hoverColor} animate />
                  ) : (
                    <h3>{title}</h3>
                  )}
                  {isHovered && !isSelected && !isMobile && (
                    <p className="text-sm text-gray-700 mt-2">Click for more</p>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop right panel */}
          {!isMobile && showRightPanelId !== null && (
            <motion.div
              className={`md:w-2/3 rounded-lg p-8 relative flex flex-col
                transition-all duration-700
                ${selectedId === showRightPanelId ? "bg-white" : "bg-transparent"}
              `}
              style={{
                boxShadow:
                  selectedId === showRightPanelId ? `0 0 18px 5px ${hoverColor}AA` : "none",
                color: "black",
                width: "100%",
                maxWidth: "720px",
                minWidth: "600px",
              }}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: selectedId === showRightPanelId ? 1 : 0.95 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              layout
            >
              {selectedId === showRightPanelId && (
                <button
                  onClick={closeDetail}
                  aria-label="Close project detail"
                  className="absolute top-3 right-3 text-black hover:text-gray-700 text-4xl font-bold focus:outline-none"
                >
                  &times;
                </button>
              )}

              <img
                src={projects.find((p) => p.id === showRightPanelId)?.image}
                alt={projects.find((p) => p.id === showRightPanelId)?.title}
                className="w-full h-auto object-cover rounded-md mb-6"
                style={{
                  width: `${imageDimensions.width}px`,
                  height: `${imageDimensions.height}px`,
                }}
                draggable={false}
              />
              <h3 className="text-4xl font-extrabold mb-3">
                {projects.find((p) => p.id === showRightPanelId)?.title}
              </h3>
              {projects.find((p) => p.id === showRightPanelId)?.link && (
                <div>
                  <a
                    href={projects.find((p) => p.id === showRightPanelId)?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-blue-700 hover:underline mb-5 break-words"
                  >
                    {projects.find((p) => p.id === showRightPanelId)?.link}
                  </a>
                </div>
              )}
              {projects.find((p) => p.id === showRightPanelId)?.year && (
                <p className="text-md text-gray-700 mt-4">
                  {projects.find((p) => p.id === showRightPanelId)?.year}
                </p>
              )}
              {projects.find((p) => p.id === showRightPanelId)?.skills && (
                <p className="text-sm text-gray-700 mt-2">
                  Skills: {projects.find((p) => p.id === showRightPanelId)?.skills?.join(" · ")}
                </p>
              )}
              <div className="overflow-y-auto max-h-56 text-black text-lg leading-relaxed whitespace-pre-line">
                {projects.find((p) => p.id === showRightPanelId)?.description}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Mobile popup */}
      <AnimatePresence>
        {isMobile && selectedProject && (
          <motion.div
            key="mobile-popup"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="bg-transparent backdrop-blur-md rounded-lg shadow-md p-6 max-w-md w-full relative flex flex-col max-h-[80vh] overflow-hidden"
              style={{ color: "black" }}
            >
              <button
                onClick={closeDetail}
                aria-label="Close popup"
                className="absolute top-3 right-3 text-black hover:text-gray-700 text-3xl font-bold focus:outline-none"
              >
                &times;
              </button>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-48 object-cover rounded-md mb-4"
                draggable={false}
              />
              <h3 className="text-3xl font-extrabold mb-4">{selectedProject.title}</h3>
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-700 hover:underline mb-4 break-words"
                >
                  {selectedProject.link}
                </a>
              )}
              {selectedProject.year && (
                <p className="text-sm text-gray-700 mt-4">{selectedProject.year}</p>
              )}
              {selectedProject.skills && (
                <p className="text-sm text-gray-700 mt-2">
                  Skills: {selectedProject.skills.join(" · ")}
                </p>
              )}
              <div className="overflow-y-auto text-black text-sm leading-relaxed whitespace-pre-line flex-grow max-h-[60vh]">
                {selectedProject.description}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
