"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, defaultTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ label, title, description, className }: PageHeaderProps) {
  return (
    <motion.header
      className={cn("mb-10 md:mb-14", className)}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={defaultTransition}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        {label}
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-bone sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-xl text-base text-subtext leading-relaxed md:text-lg">
          {description}
        </p>
      )}
    </motion.header>
  );
}
