"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
  image?: string;
}

interface Category {
  id: string;
  name: string;
  nameArabic: string;
  items: MenuItem[];
}

export default function MenuPage() {
  const { language, toggleLanguage } = useBilingual();
  const [activeCategory, setActiveCategory] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const categories: Category[] = useMemo(() => menuData.categories, []);
  const isArabic = language === "ar";

  useEffect(() => {
    if (!scrollRef.current || isPaused) return;

    const scrollContainer = scrollRef.current;
    let pos = 0;
    const speed = 0.3;

    const interval = setInterval(() => {
      pos += speed;
      if (pos >= scrollContainer.scrollWidth / 2) pos = 0;
      scrollContainer.scrollLeft = pos;
    }, 16);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="min-h-screen bg-obsidian">
      <Header />

      <main id="main-content" className="pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={defaultTransition}
          >
            <div>
              <p className="text-primary text-xs uppercase tracking-[0.2em] font-medium mb-2">
                {isArabic ? "FIX" : "FIX Coffee"}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-bone">
                {isArabic ? "قائمنا" : "Our Menu"}
              </h1>
              <p className="mt-3 text-subtext text-base md:text-lg">
                {isArabic ? "صُنع بدقة" : "Crafted with precision"}
              </p>
            </div>
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full surface-card text-subtext hover:text-primary transition-all"
              whileTap={{ scale: 0.96 }}
              aria-label="Toggle language"
            >
              <span className="text-xs font-semibold">{language === "en" ? "EN" : "ع"}</span>
              <span className="text-subtext/50">/</span>
              <span className="text-xs font-semibold">{language === "en" ? "ع" : "EN"}</span>
            </motion.button>
          </motion.div>

          <motion.div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide -mx-1 px-1"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(index)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === index
                    ? "bg-primary text-white shadow-soft"
                    : "surface-card text-subtext hover:text-primary"
                }`}
                whileTap={{ scale: 0.96 }}
                layout
              >
                {isArabic ? category.nameArabic : category.name}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {categories[activeCategory].items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={fadeUp}
                  transition={defaultTransition}
                  whileHover={{ y: -4 }}
                  className="surface-card p-5 group"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-bone group-hover:text-primary transition-colors">
                        {isArabic ? item.nameArabic : item.name}
                      </h3>
                      <p className="text-sm text-subtext line-clamp-2 mt-1.5 leading-relaxed">
                        {isArabic ? item.descriptionArabic : item.description}
                      </p>
                    </div>
                    <span className="text-sm font-mono font-semibold text-primary bg-cream px-2.5 py-1 rounded-full whitespace-nowrap">
                      {item.price.toFixed(1)} OMR
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
