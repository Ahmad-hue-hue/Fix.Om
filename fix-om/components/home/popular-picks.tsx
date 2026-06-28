"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { getItemImage } from "@/lib/images";
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
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/40 via-obsidian to-obsidian" />
      <div className="pointer-events-none absolute -end-24 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -start-16 bottom-0 h-56 w-56 rounded-full bg-primary/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={scrollTransition}
        >
          <div>
            <span className="inline-flex items-center rounded-full border border-glass-border bg-surface/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary shadow-soft backdrop-blur-sm">
              {isArabic ? "الأكثر طلباً" : "Trending now"}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-bone sm:text-3xl md:text-4xl">
              {isArabic ? "اختياراتنا المميزة" : "Customer favorites"}
            </h2>
            <p className="mt-2 max-w-md text-sm text-subtext sm:text-base">
              {isArabic
                ? "أشهر المشروبات والحلويات — جاهزة للطلب"
                : "Our most-loved drinks and treats, ready to order"}
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-glass-border bg-surface px-5 py-2.5 text-sm font-semibold text-bone shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-card"
          >
            {isArabic ? "عرض القائمة" : "Full menu"}
            <span aria-hidden className="text-primary">→</span>
          </Link>
        </motion.div>

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide snap-x snap-mandatory sm:-mx-6 sm:gap-5 sm:px-6">
          {items.map((item, i) => {
            const name = isArabic ? item.nameArabic : item.name;
            const isFeatured = i === 0;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ ...scrollTransition, delay: i * 0.06 }}
                className={`group shrink-0 snap-start ${isFeatured ? "w-[280px] sm:w-[300px]" : "w-[240px] sm:w-[260px]"}`}
              >
                <Link href="/menu" className="block">
                  <div
                    className={`relative overflow-hidden rounded-[1.75rem] bg-primary-dark shadow-card ring-1 ring-black/5 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-elevated ${
                      isFeatured ? "aspect-[3/4.2]" : "aspect-[3/4]"
                    }`}
                  >
                    <SafeImage
                      src={getItemImage(item.categoryId, item.id, i)}
                      alt={name}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/25 to-transparent" />

                    {isFeatured && (
                      <span className="absolute start-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary shadow-soft backdrop-blur-md">
                        {isArabic ? "الأكثر طلباً" : "#1 pick"}
                      </span>
                    )}

                    <span className="absolute end-4 top-4 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md ring-1 ring-white/20">
                      {item.price.toFixed(1)} OMR
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">
                        {name}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/75">
                        {isArabic ? item.descriptionArabic : item.description}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {isArabic ? "اطلب الآن" : "Order now"}
                        <span className="transition-transform group-hover:translate-x-0.5">→</span>
                      </span>
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
