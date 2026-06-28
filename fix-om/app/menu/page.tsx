"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { fadeUp, staggerContainer, defaultTransition } from "@/lib/motion";
import menuData from "@/content/menu.json";

interface MenuItem {
  id: string;
  name: string;
  nameArabic: string;
  price: number;
  description: string;
  descriptionArabic: string;
}

interface Category {
  id: string;
  name: string;
  nameArabic: string;
  items: MenuItem[];
}

export default function MenuPage() {
  const { language } = useBilingual();
  const [activeCategory, setActiveCategory] = useState(0);
  const categories: Category[] = useMemo(() => menuData.categories, []);
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen bg-obsidian">
      <Header />

      <main id="main-content" className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6">
        <PageHeader
          label={isArabic ? "القائمة" : "Menu"}
          title={isArabic ? "مشروباتنا" : "Our drinks & bites"}
          description={isArabic ? "صُنع بدقة" : "Crafted with precision"}
        />

        <div className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(index)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === index
                  ? "bg-primary text-white"
                  : "border border-glass-border bg-surface text-subtext hover:text-primary"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              {isArabic ? category.nameArabic : category.name}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {categories[activeCategory].items.map((item) => (
              <motion.article
                key={item.id}
                layout
                variants={fadeUp}
                transition={defaultTransition}
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-glass-border bg-surface p-5 shadow-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-bone">
                      {isArabic ? item.nameArabic : item.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-subtext line-clamp-2">
                      {isArabic ? item.descriptionArabic : item.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-cream px-2.5 py-1 text-xs font-semibold text-primary">
                    {item.price.toFixed(1)} OMR
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
