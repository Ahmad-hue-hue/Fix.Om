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
        "mb-10 md:mb-12",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl text-start",
        className
      )}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={defaultTransition}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-bone sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-subtext sm:text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}
