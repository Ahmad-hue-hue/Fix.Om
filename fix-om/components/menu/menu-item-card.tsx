"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { fadeUp, defaultTransition } from "@/lib/motion";

interface MenuItem {
  id: string;
  name: string;
  nameArabic: string;
  price: number;
  description: string;
  descriptionArabic: string;
}

interface MenuItemCardProps {
  item: MenuItem;
  isArabic: boolean;
  image: string;
}

export function MenuItemCard({ item, isArabic, image }: MenuItemCardProps) {
  const name = isArabic ? item.nameArabic : item.name;
  const description = isArabic ? item.descriptionArabic : item.description;

  return (
    <motion.article
      variants={fadeUp}
      transition={defaultTransition}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-2xl border border-glass-border bg-surface shadow-soft transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <SafeImage
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute end-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-primary shadow-soft backdrop-blur-sm">
          {item.price.toFixed(1)} OMR
        </span>
      </div>
      <div className="p-4 md:p-5">
        <h3 className="font-semibold text-bone">{name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-subtext line-clamp-2">
          {description}
        </p>
      </div>
    </motion.article>
  );
}
