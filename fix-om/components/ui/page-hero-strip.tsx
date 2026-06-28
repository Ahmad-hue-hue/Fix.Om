"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface PageHeroStripProps {
  image: string;
  label: string;
  title: string;
  description?: string;
}

export function PageHeroStrip({ image, label, title, description }: PageHeroStripProps) {
  return (
    <motion.section
      className="relative mb-10 overflow-hidden rounded-2xl md:mb-14"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <div className="relative aspect-[21/9] min-h-[160px] max-h-[220px] w-full">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-primary-dark/30" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
            {label}
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-md text-sm text-white/80 sm:text-base">{description}</p>
          )}
        </div>
      </div>
    </motion.section>
  );
}
