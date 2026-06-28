"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  nameArabic: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeIndex: number;
  onChange: (index: number) => void;
  isArabic: boolean;
}

export function CategoryTabs({
  categories,
  activeIndex,
  onChange,
  isArabic,
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  return (
    <div className="sticky top-[72px] z-40 -mx-4 mb-8 border-b border-glass-border bg-obsidian/95 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 md:top-[68px]">
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide snap-x snap-mandatory"
          role="tablist"
          aria-label={isArabic ? "فئات القائمة" : "Menu categories"}
        >
          {categories.map((category, index) => {
            const isActive = activeIndex === index;
            const label = isArabic ? category.nameArabic : category.name;

            return (
              <button
                key={category.id}
                ref={isActive ? activeRef : undefined}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(index)}
                className={`relative shrink-0 snap-center rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-white"
                    : "border border-glass-border bg-surface text-subtext hover:border-primary/20 hover:text-primary"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="menu-category-pill"
                    className="absolute inset-0 rounded-full bg-primary shadow-soft"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 start-0 w-6 bg-gradient-to-e from-obsidian to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 end-0 w-6 bg-gradient-to-s from-obsidian to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}
