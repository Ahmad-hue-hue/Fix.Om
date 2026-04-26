"use client";

import { useState, useMemo, memo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BilingualToggle } from "@/components/menu/bilingual-toggle";
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

const MenuItemCard = memo(function MenuItemCard({ 
  item, 
  isArabic 
}: { 
  item: MenuItem; 
  isArabic: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative rounded-xl sm:rounded-2xl overflow-hidden ${
        item.image 
          ? "glass" 
          : "bg-glass border border-glass-border"
      }`}
    >
      {item.image && (
        <div className="relative h-36 sm:h-48 w-full overflow-hidden">
          <Image
            src={item.image}
            alt={isArabic ? item.nameArabic : item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
        </div>
      )}
      <div className={`p-4 sm:p-6 ${!item.image ? 'glass' : ''}`}>
        <div className="flex items-start justify-between gap-2 sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-bone truncate">
              {isArabic ? item.nameArabic : item.name}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-subtext line-clamp-2">
              {isArabic ? item.descriptionArabic : item.description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="text-sm sm:text-lg font-mono font-medium text-gold">
              {item.price.toFixed(1)} OMR
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default function MenuPage() {
  const { language } = useBilingual();
  const [activeTab, setActiveTab] = useState("coffee-hot-cold");
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const categories: Category[] = useMemo(() => menuData.categories, []);
  const isArabic = language === "ar";

  useEffect(() => {
    if (!tabsListRef.current || isPaused) return;

    const scrollContainer = tabsListRef.current;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      if (isPaused) return;
      scrollPosition += scrollSpeed;
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => {
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main id="main-content" className="pt-24 pb-12 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8"
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
            <BilingualToggle />
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />
              <TabsList 
                ref={tabsListRef}
                className="p-1 sm:p-1.5 overflow-x-auto scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
                  >
                    {isArabic ? category.nameArabic : category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {category.items.map((item) => (
                      <MenuItemCard 
                        key={item.id} 
                        item={item} 
                        isArabic={isArabic}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}