"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { fadeUp, scrollTransition, viewportOnce } from "@/lib/motion";

interface GalleryPreviewProps {
  photos: { src: string; alt: string }[];
  isArabic: boolean;
}

const layoutClasses = [
  "relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[320px]",
  "relative aspect-square overflow-hidden rounded-3xl md:col-span-5",
  "relative aspect-square overflow-hidden rounded-3xl md:col-span-5",
];

export function GalleryPreview({ photos, isArabic }: GalleryPreviewProps) {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mb-10 flex items-end justify-between gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={scrollTransition}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {isArabic ? "الصور" : "Gallery"}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-bone sm:text-4xl">
              {isArabic ? "أجواء FIX" : "Life at FIX"}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="rounded-full border border-glass-border px-4 py-2 text-sm font-semibold text-bone transition-colors hover:border-primary/30 hover:text-primary"
          >
            {isArabic ? "المعرض →" : "View all →"}
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-12 md:grid-rows-2 md:gap-3">
          {photos.slice(0, 3).map((photo, i) => (
            <motion.div
              key={photo.src}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ ...scrollTransition, delay: i * 0.06 }}
              className={layoutClasses[i]}
            >
              <Link href="/gallery" className="group block h-full w-full">
                <SafeImage
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-primary-dark/0 transition-colors duration-300 group-hover:bg-primary-dark/15" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
