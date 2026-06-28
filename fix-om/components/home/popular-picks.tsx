"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { assignUniqueImages } from "@/lib/images";
import { fadeUp, scrollTransition, viewportOnce } from "@/lib/motion";

interface FeaturedItem {
  id: string;
  name: string;
  nameArabic: string;
  price: number;
  description: string;
  descriptionArabic: string;
  categoryId: string;
}

interface PopularPicksProps {
  items: FeaturedItem[];
  isArabic: boolean;
}

export function PopularPicks({ items, isArabic }: PopularPicksProps) {
  const images = useMemo(
    () => assignUniqueImages(items.map((item) => ({ categoryId: item.categoryId, itemId: item.id }))),
    [items]
  );

  return (
    <section className="relative overflow-hidden bg-obsidian py-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={scrollTransition}
        >
          <div>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              {isArabic ? "الأكثر طلباً" : "Trending now"}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-bone sm:text-4xl">
              {isArabic ? "اختياراتنا المميزة" : "Customer favorites"}
            </h2>
          </div>

          <Link
            href="/menu"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-card"
          >
            {isArabic ? "عرض القائمة" : "Full menu"}
            <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1 scrollbar-hide snap-x snap-mandatory sm:-mx-6 sm:gap-5 sm:px-6">
          {items.map((item, i) => {
            const name = isArabic ? item.nameArabic : item.name;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ ...scrollTransition, delay: i * 0.05 }}
                className="w-[260px] shrink-0 snap-start sm:w-[280px]"
              >
                <Link href="/menu" className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-primary-dark shadow-card ring-1 ring-black/[0.04] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-elevated">
                    <SafeImage
                      src={images[i]}
                      alt={name}
                      fill
                      sizes="280px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <span className="absolute end-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-primary shadow-sm">
                      {item.price.toFixed(1)} OMR
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="font-semibold leading-snug text-white">{name}</h3>
                      <p className="mt-1 line-clamp-1 text-xs text-white/70">
                        {isArabic ? item.descriptionArabic : item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
