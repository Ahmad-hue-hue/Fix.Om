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
          d="M11 23V18C11 16.8954 11.8954 16 13 16H21C22.1046 16 23 16.8954 23 18V23C23 24.6569 21.6569 26 20 26H14C12.3431 26 11 24.6569 11 23ZM13 18H21V23H13V18ZM25 19C25 19 27 19 27 21C27 23 25 23 25 23C25 23 26 24 26 25C26 26.5 25 27 23 27H14C11.5 27 9 25 9 23V19H25ZM15 20C15 19.4477 15.4477 19 16 19C16.5523 19 17 19.4477 17 20C17 20.5523 16.5523 21 16 21C15.4477 21 15 20.5523 15 20ZM19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20Z"
          fill={fillColor}
        />
        <motion.path
          d="M15 13C15 13 14 11 15 10C15.5 9.5 16.5 9 17 9C18 9 18.5 9.5 18.5 9.5C18.5 9.5 19 10 19 11C19 12 18 13 18 13"
          stroke={fillColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <motion.path
          d="M17 11C17 11 16.5 10 17 9.5"
          stroke={fillColor}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          style={{ opacity: 0.6 }}
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