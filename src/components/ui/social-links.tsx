"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Social {
  name: string;
  image: string;
  href?: string;
}

interface SocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[];
}

export function SocialLinks({ socials, className, ...props }: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null);
  const [rotation, setRotation] = React.useState<number>(0);
  const [clicked, setClicked] = React.useState<boolean>(false);

  const animation = {
    scale: clicked ? [1, 1.3, 1] : 1,
    transition: { duration: 0.3 },
  };

  React.useEffect(() => {
    const handleClick = () => {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 200);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [clicked]);

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 sm:gap-4 md:gap-6",
        className
      )}
      {...props}
    >
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.href ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative cursor-pointer px-3 py-2 transition-opacity duration-200",
            hoveredSocial && hoveredSocial !== social.name
              ? "opacity-50"
              : "opacity-100"
          )}
          onMouseEnter={() => {
            setHoveredSocial(social.name);
            setRotation(Math.random() * 20 - 10);
          }}
          onMouseLeave={() => setHoveredSocial(null)}
          onClick={() => setClicked(true)}
          aria-label={social.name}
        >
          <span className="block text-base sm:text-lg md:text-xl font-medium">
            {social.name}
          </span>
          <AnimatePresence>
            {hoveredSocial === social.name && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 flex h-full w-full items-center justify-center"
                animate={animation}
              >
                <motion.img
                  key={social.name}
                  src={social.image}
                  alt={social.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  initial={{
                    y: -40,
                    rotate: rotation,
                    opacity: 0,
                    filter: "blur(2px)",
                  }}
                  animate={{ y: -50, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -40, opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </a>
      ))}
    </div>
  );
}
