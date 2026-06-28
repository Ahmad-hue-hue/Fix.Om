"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light";
}

export function Logo({ className = "", size = "md", variant = "default" }: LogoProps) {
  const sizes = {
    sm: { width: 36, height: 36 },
    md: { width: 44, height: 44 },
    lg: { width: 64, height: 64 },
  };

  const currentSize = sizes[size];

  return (
    <motion.div
      className={cn("flex items-center gap-2.5", className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="relative flex-shrink-0 rounded-xl overflow-hidden"
        style={{ width: currentSize.width, height: currentSize.height }}
      >
        <Image
          src="/assets/logo.png"
          alt="FIX Speciality Coffee"
          fill
          sizes={`${currentSize.width}px`}
          className="object-contain"
        />
      </div>
      <span
        className={cn(
          "font-display font-semibold tracking-tight",
          size === "sm" && "text-lg",
          size === "md" && "text-xl",
          size === "lg" && "text-2xl",
          variant === "light" ? "text-white" : "text-primary"
        )}
      >
        FIX
      </span>
    </motion.div>
  );
}
