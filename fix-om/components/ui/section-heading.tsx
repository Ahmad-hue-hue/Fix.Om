"use client";

import { motion } from "framer-motion";
import { fadeUp, defaultTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" ? "text-center mx-auto max-w-2xl" : "text-left max-w-xl",
        className
      )}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={defaultTransition}
    >
      <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-3">
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-bone tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 md:mt-4 text-subtext text-sm sm:text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
