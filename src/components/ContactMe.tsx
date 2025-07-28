"use client";

import React from "react";
import { SocialLinks } from "@/components/ui/social-links";

const socials = [
  {
    name: "LinkedIn",
    image: "https://link-hover-lndev.vercel.app/linkedin.png",
    href: "https://www.linkedin.com/in/manyuvraj-sandhu/",
  },
  {
    name: "GitHub",
    image: "/contact-icons/github_logo.png",
    href: "https://github.com/manyuvraj-sandhu",
  },
  {
    name: "Resume",
    image: "/contact-icons/resume_logo.png",
    href: "/Resume.pdf",
  },
];

export default function ContactMe() {
  return (
    <section
      id="contactme"
      className="py-24 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 text-center max-w-4xl mx-auto"
    >
      <h1
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900"
        style={{ fontFamily: "'Anton', sans-serif" }}
      >
        Reach Out Anytime
      </h1>

      <a
        href="mailto:manyuvraj.sandhu@gmail.com"
        className="text-lg sm:text-xl md:text-2xl text-gray-700 hover:text-gray-900 transition underline mb-24 sm:mb-32 md:mb-36"
      >
        manyuvraj.sandhu@gmail.com
      </a>

      <div className="w-full flex justify-center">
        <SocialLinks
          socials={socials}
          className="flex justify-center gap-6 sm:gap-10 md:gap-16"
        />
      </div>
    </section>
  );
}
