"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import MovingLogoTitle from "./MovingLogoTitle";
import { Briefcase } from "lucide-react";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

type ExperienceCardProps = {
  profilePic: string;
  title: string;
  company: string;
  city: string;
  date: string;
  description: string;
};

const experienceData: ExperienceCardProps[] = [
  {
    profilePic: "/experience-logos/dasensai_logo.jpeg",
    title: "Full Stack Developer",
    company: "Dasens AI",
    city: "Calgary, AB",
    date: "Jan 2025 - Present",
    description:
      `• Led full-stack development of AI-driven web applications, SmartSRED and InventGenie, using Next.js, TypeScript, Tailwind CSS, and HTML, delivering responsive, production-ready interfaces that enhanced user engagement and client satisfaction
• Engineered and automated backend workflows using n8n and embedded dynamic Airtable dashboards, streamlining client operations and improving data visualization capabilities
• Integrated Supabase for user authentication and Stripe for secure payment processing, delivering a seamless and secure user experience that supported scalable growth
• Optimized website performance by refining site architecture and applying SEO strategies, leading to improved load times and increased organic traffic
• Utilized Supabase with PostgreSQL for data storage and management, ensuring application scalability, data integrity, and reliable backend operations`,
  },
  {
    profilePic: "/experience-logos/ic_controls_logo.jpeg",
    title: "Embedded Systems Developer",
    company: "IC Controls",
    city: "Orangeville, ON",
    date: "May 2024 - Aug 2024",
    description:
      `• Developed software using Python for a digital process water analyzer, enabling accurate multi-input, multi-parameter measurements of pH, DO, and ORP sensors, improving data precision
• Enhanced user interfaces with Python and Raspberry Pi by leveraging Linux administration and SQL, streamlining operations and boosting system responsiveness
• Strengthened data security and product integrity by implementing code obfuscation techniques, reducing the risk of reverse engineering
• Improved code quality and efficiency by participating in daily code reviews and optimizing Python, Linux, and C++ components across the platform
• Provided data-driven insights for hardware optimization by graphing and analyzing EMI effects on sensor boards using Python`,
  },
  {
    profilePic: "/experience-logos/uwaterloo_logo.avif",
    title: "Software Developer",
    company: "University of Waterloo",
    city: "Waterloo, ON",
    date: "Sept 2023 - Dec 2023",
    description:
      `• Developed a scheduling optimization model using Julia and Bash scripts, improving company schedule efficiency and reducing planning time
• Enhanced shipping decision-making by refining the model to factor in cost, availability, and operational efficiency, leading to more cost-effective logistics
• Resolved tray order sequencing issues, increasing scheduling accuracy and minimizing operational delays
• Collaborated regularly with company staff to identify workflow challenges, integrating feedback to drive continuous process improvements
• Iteratively refined optimization models, resulting in smoother scheduling workflows and measurable gains in overall productivity`,
  },
  {
    profilePic: "/experience-logos/d1g1tinc_logo.jpg",
    title: "Associate Software Engineer",
    company: "d1g1t Inc.",
    city: "Toronto, ON",
    date: "Sept 2021 - Aug 2023",
    description:
      `• Updated client drivers and base code, completing Jira tickets related to data-loader tasks using Python, Bash scripts, and HTML, improving integration reliability and task turnaround time
• Managed client databases with PgAdmin and Amazon Web Services (AWS), strengthening SQL proficiency and ensuring data integrity and availability
• Leveraged AWS services, including EC2 and S3, to execute client-data updates and refreshes, and streamlined deployment processes using Jenkins
• Analyzed system performance metrics with DataDog to proactively identify inefficiencies, reducing downtime and enhancing system stability
• Automated repetitive operational tasks by developing RunDeck Jobs with integrated SQL, Python, and Bash scripting, improving workflow efficiency
• Collaborated with cross-functional teams to resolve client issues, ensuring seamless integration and maintaining high client satisfaction`,
  },
];

const haloColors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  // Responsive cards per view
  useEffect(() => {
    function updateCardsPerView() {
      const width = window.innerWidth;
      if (width >= 1280) setCardsPerView(3);
      else if (width >= 1024) setCardsPerView(2);
      else if (width >= 768) setCardsPerView(1);
      else setCardsPerView(0);
      setScrollIndex(0);
      if (containerRef.current) containerRef.current.scrollTo({ left: 0 });
    }
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Scroll left/right by one card width
  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const card = containerRef.current.querySelector<HTMLElement>("div[data-card]");
    if (!card) return;

    const cardWidth = card.offsetWidth + 24; // card + gap
    const currentScroll = containerRef.current.scrollLeft;

    const newScroll =
      direction === "left" ? currentScroll - cardWidth : currentScroll + cardWidth;

    containerRef.current.scrollTo({ left: newScroll, behavior: "smooth" });

    setScrollIndex((prev) =>
      direction === "left"
        ? Math.max(prev - 1, 0)
        : Math.min(prev + 1, experienceData.length - cardsPerView)
    );
  };

  return (
    <section
      className="max-w-7xl pb-32 pt-20 text-black relative overflow-x-hidden"
      style={{ overscrollBehaviorX: "contain" }}
      id="experience"
    >
      <div className="mx-auto px-6">
        <MovingLogoTitle
          title="EXPERIENCE"
          logo={<Briefcase size={24} />}
          className="font-bold mb-12 text-center"
        />
      </div>

      {/* Cards for desktop/tablet */}
      {cardsPerView > 0 && (
        <>
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide
              pl-16 md:pl-20 lg:pl-24 pr-12 md:pr-16 lg:pr-20 pt-10 pb-24"
            style={{
              scrollSnapType: "x mandatory",
              scrollPaddingLeft: "4rem",
              scrollPaddingRight: "3rem",
              touchAction: "pan-y",
              maxWidth: "100vw",
              boxSizing: "border-box",
            }}
          >
            {experienceData.map(
              (
                { profilePic, title, company, city, date, description },
                i
              ) => {
                const haloColor = haloColors[i % haloColors.length];
                return (
                  <motion.div
                    key={i}
                    data-card
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 0 18px 5px ${haloColor}`,
                      zIndex: 10,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="snap-start flex-shrink-0 bg-white rounded-xl shadow-lg p-6 relative cursor-pointer flex flex-col overflow-visible"
                    style={{
                      width: `calc((100% - ${(cardsPerView - 1) * 24}px) / ${cardsPerView})`,
                      minWidth: "320px",
                      maxWidth: "480px",
                      height: "auto",
                      maxHeight: "480px",
                    }}
                    onClick={() => setExpandedIndex(null)}
                  >
                    {/* Profile pic top quarter */}
                    <div className="relative w-full h-1/4 rounded-md overflow-hidden mb-4">
                      <img
                        src={profilePic}
                        alt={title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 min-h-0">
                      <h3
                        className={`${anton.className} text-2xl font-extrabold mb-1`}
                        style={{ lineHeight: 1.2 }}
                      >
                        {title}
                      </h3>
                      <p className="text-sm font-medium text-gray-700 mb-0.5">
                        {company}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        {city} &bull; {date}
                      </p>
                      <div
                        className="overflow-y-auto text-gray-800 text-sm leading-relaxed whitespace-pre-line flex-grow"
                        style={{ maxHeight: "200px" }}
                      >
                        {description}
                      </div>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>

          {/* Navigation arrows below cards */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              aria-label="Scroll Left"
              onClick={() => scroll("left")}
              className="bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
            </button>

            <button
              aria-label="Scroll Right"
              onClick={() => scroll("right")}
              className="bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </>
      )}

      {/* Mobile dropdown */}
      {cardsPerView === 0 && (
        <div className="md:hidden px-4 sm:px-6 overflow-hidden">
          {experienceData.map(({ title, company, city, date, description }, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <div
                key={i}
                className={`mb-6 bg-white rounded-xl shadow-md p-4 cursor-pointer select-none max-w-full text-left`}
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                aria-expanded={isExpanded}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setExpandedIndex(isExpanded ? null : i);
                  }
                }}
                style={{
                  width: "calc(100vw - 2rem)", // full viewport width minus container px-4 (1rem each side)
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className={`${anton.className} text-xl font-extrabold`}>
                      {title}
                    </h3>
                    <p className="text-sm font-medium text-gray-700">{company}</p>
                    <p className="text-xs text-gray-500">
                      {city} &bull; {date}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUpIcon className="w-6 h-6 text-gray-700" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6 text-gray-700" />
                  )}
                </div>
                {isExpanded && (
                  <div
                    className="mt-3 text-gray-800 text-sm leading-relaxed whitespace-pre-line overflow-y-auto"
                    style={{ maxHeight: "150px" }}
                  >
                    {description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
