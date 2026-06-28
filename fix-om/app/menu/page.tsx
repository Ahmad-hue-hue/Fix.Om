"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageBanner } from "@/components/layout/page-banner";
import { CategoryTabs } from "@/components/menu/category-tabs";
import { MenuItemCard } from "@/components/menu/menu-item-card";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { cafeImages, getItemImage } from "@/lib/images";
import { staggerContainer } from "@/lib/motion";
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
  const current = categories[activeCategory];

  return (
    <div className="min-h-screen bg-obsidian">
      <Header />

      <main id="main-content" className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <PageBanner
          image={cafeImages.menuBanner}
          label={isArabic ? "القائمة" : "Menu"}
          title={isArabic ? "مشروباتنا ووجباتنا" : "Drinks & bites"}
          description={isArabic ? "صُنع بدقة، يُقدَّم بعناية" : "Crafted with precision, served with care"}
        />

        <CategoryTabs
          categories={categories}
          activeIndex={activeCategory}
          onChange={setActiveCategory}
          isArabic={isArabic}
        />

        <motion.div
          key={current.id}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {current.items.map((item, index) => (
            <MenuItemCard
              key={item.id}
              name={isArabic ? item.nameArabic : item.name}
              description={isArabic ? item.descriptionArabic : item.description}
              price={item.price}
              image={getItemImage(current.id, index)}
            />
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
