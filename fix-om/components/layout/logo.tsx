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
      style={{ scale }}
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
          d="M12 28V12H18.6667C20.3442 12 21.3333 12.988 21.3333 14.6667C21.3333 15.7556 20.8444 16.5111 20.0889 16.9778C21.3333 17.4444 22 18.5333 22 20C22 21.7556 20.7333 23 18.6667 23H12V28ZM16.2222 19.1111H18.4444C19.1111 19.1111 19.5556 18.6667 19.5556 18C19.5556 17.3333 19.1111 16.8889 18.4444 16.8889H16.2222V19.1111ZM18.6667 21.1111C19.3333 21.1111 19.7778 20.6667 19.7778 20C19.7778 19.3333 19.3333 18.8889 18.6667 18.8889H16.2222V21.1111H18.6667Z"
          style={{ fill: fillColor }}
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