"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Light variant for dark hero backgrounds */
  variant?: "default" | "light";
}

const sizes = {
  sm: { width: 40, height: 40 },
  md: { width: 48, height: 48 },
  lg: { width: 56, height: 56 },
} as const;

export function Logo({ className = "", size = "md", variant = "default" }: LogoProps) {
  const currentSize = sizes[size];

  return (
    <motion.div
      className={cn("relative flex-shrink-0", className)}
      style={{ width: currentSize.width, height: currentSize.height }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Image
        src="/assets/logo.png"
        alt="FIX Speciality Coffee"
        fill
        sizes={`${currentSize.width}px`}
        className={cn(
          "object-contain",
          variant === "light" && "brightness-0 invert"
        )}
        priority={size === "md"}
      />
    </motion.div>
  );
}
