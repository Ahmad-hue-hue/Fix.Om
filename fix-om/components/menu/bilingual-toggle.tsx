"use client";

import { motion } from "framer-motion";
import { useBilingual } from "@/lib/hooks/use-bilingual";

interface BilingualToggleProps {
  className?: string;
}

export function BilingualToggle({ className = "" }: BilingualToggleProps) {
  const { language, toggleLanguage } = useBilingual();

  return (
    <motion.button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-glass-border text-subtext hover:text-bone hover:border-gold transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-xs font-medium">{language === "en" ? "EN" : "ع"}</span>
      <span className="text-subtext">/</span>
      <span className="text-xs font-medium">{language === "en" ? "ع" : "EN"}</span>
    </motion.button>
  );
}