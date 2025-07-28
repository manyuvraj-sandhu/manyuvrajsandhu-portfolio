"use client";

import React, { useState } from "react";
import { RippleButton } from "./magicui/ripple-button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  "About",
  "Tech Stack",
  "Experience",
  "Projects",
  "Contact Me",
];

interface NavbarProps {
  onTechStackClick?: () => void;
}

export default function Navbar({ onTechStackClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Helper click handler to close menu and run scroll if "Tech Stack" or "Experience" clicked
  const handleClick = (item: string) => {
    if (item === "Tech Stack" && onTechStackClick) {
      onTechStackClick();
    } else if (item === "Experience") {
      const el = document.getElementById("experience");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
    console.log(`Clicked ${item}`);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Hamburger for small screens */}
          <button
            className="md:hidden text-black p-2 rounded-md focus:outline-none transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>

          {/* Desktop buttons */}
          <div className="hidden md:flex flex-1 justify-center gap-6">
            {navItems.map((item) => (
              <RippleButton
                key={item}
                className="text-black font-semibold text-base rounded-md px-4 py-2 transition-colors focus:outline-none"
                type="button"
                onClick={() => handleClick(item)}
              >
                {item}
              </RippleButton>
            ))}
          </div>
        </div>

        {/* Mobile menu with smooth transition */}
        <div
          className={`md:hidden bg-transparent backdrop-blur-md shadow-md overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="flex flex-col gap-4 px-6">
            {navItems.map((item) => (
              <RippleButton
                key={item}
                className="text-black font-semibold text-lg rounded-md px-4 py-3 w-full text-center transition-colors focus:outline-none"
                type="button"
                onClick={() => handleClick(item)}
              >
                {item}
              </RippleButton>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-16 md:h-16" aria-hidden="true" />
    </>
  );
}
