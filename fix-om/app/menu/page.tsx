"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useBilingual } from "@/lib/hooks/use-bilingual";
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
      if (pos >= scrollContainer.scrollWidth) pos = 0;
      scrollContainer.scrollLeft = pos;
    }, 16);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main id="main-content" className="pt-24 pb-12 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold">
                {isArabic ? "قائمنا" : "Our Menu"}
              </h1>
              <p className="mt-2 text-subtext text-base sm:text-lg">
                {isArabic ? "صُنع بدقة" : "Crafted with precision"}
              </p>
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-glass-border text-subtext hover:text-bone hover:border-primary transition-all"
            >
              <span className="text-xs font-medium">{language === "en" ? "EN" : "ع"}</span>
              <span className="text-subtext">/</span>
              <span className="text-xs font-medium">{language === "en" ? "ع" : "EN"}</span>
            </button>
          </motion.div>

          <motion.div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
          >
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(index)}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === index
                    ? "bg-primary text-bone"
                    : "bg-glass border border-glass-border text-subtext hover:text-bone hover:border-primary"
                }`}
              >
                {isArabic ? category.nameArabic : category.name}
              </button>
            ))}
          </motion.div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {categories[activeCategory].items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-glass border border-glass-border rounded-xl p-4"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-primary truncate">
                        {isArabic ? item.nameArabic : item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-subtext line-clamp-2 mt-1">
                        {isArabic ? item.descriptionArabic : item.description}
                      </p>
                    </div>
                    <span className="text-sm sm:text-lg font-mono font-medium text-primary whitespace-nowrap">
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
