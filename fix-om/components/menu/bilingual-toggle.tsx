"use client";

import { motion } from "framer-motion";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { cn } from "@/lib/utils";

interface BilingualToggleProps {
  className?: string;
  variant?: "default" | "hero";
}

export function BilingualToggle({ className = "", variant = "default" }: BilingualToggleProps) {
  const { language, toggleLanguage } = useBilingual();
  const isHero = variant === "hero";

  return (
    <motion.button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300",
        isHero
          ? "border-white/25 bg-white/10 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/15"
          : "border-glass-border bg-glass text-subtext hover:border-primary hover:text-bone",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
      type="button"
    >
      <span
        className={cn(
          "text-xs font-semibold",
          language === "en"
            ? isHero
              ? "text-white"
              : "text-bone"
            : isHero
              ? "text-white/50"
              : "text-subtext"
        )}
      >
        EN
      </span>
      <span className={cn("text-xs", isHero ? "text-white/40" : "text-subtext")} aria-hidden="true">
        /
      </span>
      <span
        className={cn(
          "text-xs font-semibold",
          language === "ar"
            ? isHero
              ? "text-white"
              : "text-bone"
            : isHero
              ? "text-white/50"
              : "text-subtext"
        )}
      >
        AR
      </span>
    </motion.button>
  );
}
