"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

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

  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);

  const sizes = {
    sm: { width: 36, height: 36, text: "text-xl" },
    md: { width: 48, height: 48, text: "text-2xl" },
    lg: { width: 64, height: 64, text: "text-4xl" },
  };

  const currentSize = sizes[size];

  return (
    <motion.div
      ref={containerRef}
      className={`flex items-center gap-2 ${className}`}
      style={{ scale, position: "relative" }}
    >
      <div className="relative flex-shrink-0" style={{ width: currentSize.width, height: currentSize.height }}>
        <Image
          src="/assets/logo.jpeg"
          alt="FIX"
          fill
          sizes={`${currentSize.width}px`}
          className="object-contain"
        />
      </div>
      <motion.span
        className={`font-bold tracking-tight ${currentSize.text}`}
        style={{ color: "#D4AF37" }}
      >
        FIX
      </motion.span>
    </motion.div>
  );
}