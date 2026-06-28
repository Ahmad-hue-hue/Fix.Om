"use client";

import { motion } from "framer-motion";
import { useLiveStatus } from "@/lib/hooks/use-live-status";
import { useBilingual } from "@/lib/hooks/use-bilingual";

export function LiveStatusBadge() {
  const { isOpen, nextOpenTime } = useLiveStatus();
  const { language } = useBilingual();
  const isArabic = language === "ar";

  const openText = isArabic ? "مفتوح الآن" : "Open Now";
  const closedText = isArabic ? "مغلق" : "Closed";
  const opensAtText = isArabic ? "يفتح في" : "Opens at";

  return (
    <motion.div
      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md border ${
        isOpen
          ? "bg-green-open/15 text-green-open border-green-open/25"
          : "bg-white/10 text-white/80 border-white/20"
      }`}
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.span
        className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-open" : "bg-white/50"}`}
        animate={isOpen ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <span>
        {isOpen ? openText : `${closedText} — ${opensAtText} ${nextOpenTime}`}
      </span>
    </motion.div>
  );
}
