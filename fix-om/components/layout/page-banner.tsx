"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface PageBannerProps {
  image: string;
  label: string;
  title: string;
  description?: string;
}

export function PageBanner({ image, label, title, description }: PageBannerProps) {
  return (
    <section className="relative isolate -mx-4 mb-10 overflow-hidden sm:-mx-6 md:mb-14">
      <div className="relative aspect-[16/9] max-h-[320px] w-full md:aspect-[21/9] md:max-h-[360px]">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/50 to-primary-dark/20" />
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 px-4 pb-8 sm:px-6 md:pb-10"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
          {label}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-lg text-sm text-white/80 md:text-base">{description}</p>
        )}
      </motion.div>
    </section>
  );
}
