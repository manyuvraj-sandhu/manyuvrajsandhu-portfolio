"use client";

import { cn } from "@/lib/utils";
import React, { MouseEvent, useEffect, useState } from "react";

const auroraColors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"];

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  duration?: string;
}

export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      className,
      children,
      duration = "600ms",
      onClick,
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number; color: string }>
    >([]);

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      // Pick a random aurora color for this ripple
      const color = auroraColors[Math.floor(Math.random() * auroraColors.length)];

      const newRipple = { x, y, size, key: Date.now(), color };
      setRipples((prev) => [...prev, newRipple]);
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      onClick?.(event);
    };

    useEffect(() => {
      if (ripples.length > 0) {
        const lastKey = ripples[ripples.length - 1].key;
        const timeout = setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.key !== lastKey));
        }, parseInt(duration));
        return () => clearTimeout(timeout);
      }
    }, [ripples, duration]);

    return (
      <button
        className={cn(
          "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-transparent backdrop-blur-sm px-4 py-2 text-center text-primary focus:outline-none",
          className,
        )}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <span className="pointer-events-none absolute inset-0 overflow-hidden">
          {ripples.map(({ x, y, size, key, color }) => (
            <span
              key={key}
              className="absolute rounded-full opacity-30 animate-rippling"
              style={{
                width: size,
                height: size,
                top: y,
                left: x,
                backgroundColor: color,
                animationDuration: duration,
                transformOrigin: "center center",
                pointerEvents: "none",
              }}
            />
          ))}
        </span>
      </button>
    );
  },
);

RippleButton.displayName = "RippleButton";
