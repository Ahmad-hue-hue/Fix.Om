"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const fillColor = useTransform(scrollYProgress, [0, 0.5], ["#F5F5F7", "#D4AF37"]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);

  const sizes = {
    sm: { width: 40, height: 40, text: "text-xl" },
    md: { width: 56, height: 56, text: "text-2xl" },
    lg: { width: 72, height: 72, text: "text-4xl" },
  };

  const currentSize = sizes[size];

  return (
    <motion.div
      ref={containerRef}
      className={`flex items-center gap-2 ${className}`}
      style={{ scale, position: "relative" }}
    >
      <svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4AF37" />
            <stop offset="1" stopColor="#E5C76B" />
          </linearGradient>
        </defs>
        <motion.rect
          width="40"
          height="40"
          rx="4"
          fill="url(#logo-gradient)"
        />
        <motion.path
          d="M10 24V18C10 16.8954 10.8954 16 12 16H22C23.1046 16 24 16.8954 24 18V24C24 25.6569 22.6569 27 21 27H13C11.3431 27 10 25.6569 10 24ZM12 18H22V24H12V18ZM26 20C26 20 28 20 28 22C28 24 26 24 26 24C26 24 27 25 27 26C27 27.5 26 28 24 28H13C10.5 28 8 26 8 24V20H26ZM14 21C14 20.4477 14.4477 20 15 20C15.5523 20 16 20.4477 16 21C16 21.5523 15.5523 22 15 22C14.4477 22 14 21.5523 14 21ZM19 21C19 20.4477 19.4477 20 20 20C20.5523 20 21 20.4477 21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21Z"
          fill={fillColor}
        />
      </svg>
      <motion.span
        className={`font-bold tracking-tight ${currentSize.text}`}
        style={{ color: fillColor }}
      >
        FIX
      </motion.span>
    </motion.div>
  );
}