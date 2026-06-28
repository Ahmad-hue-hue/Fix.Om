"use client";

import { motion } from "framer-motion";
import { useLiveStatus } from "@/lib/hooks/use-live-status";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { fadeUp, staggerContainer, defaultTransition } from "@/lib/motion";

export function StoreInfoBar() {
  const { isOpen } = useLiveStatus();
  const { language } = useBilingual();
  const isArabic = language === "ar";

  const items = [
    {
      label: isArabic ? "الحالة" : "Status",
      value: isOpen
        ? isArabic ? "مفتوح الآن" : "Open now"
        : isArabic ? "مغلق" : "Closed",
      highlight: isOpen,
    },
    {
      label: isArabic ? "ساعات العمل" : "Hours",
      value: isArabic ? "8:00 ص – 11:00 م" : "8:00 AM – 11:00 PM",
      highlight: false,
    },
    {
      label: isArabic ? "الموقع" : "Location",
      value: isArabic ? "الدرزيز، عُمان" : "Ad Driz, Oman",
      highlight: false,
    },
  ];

  return (
    <motion.section
      className="border-b border-glass-border bg-surface"
      aria-label={isArabic ? "معلومات المتجر" : "Store information"}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-3">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: index * 0.06 }}
            className="border-b border-glass-border px-6 py-5 last:border-b-0 sm:border-b-0 sm:border-e sm:last:border-e-0"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-subtext">
              {item.label}
            </p>
            <p
              className={`mt-1 text-sm font-semibold sm:text-[15px] ${
                item.highlight ? "text-green-open" : "text-bone"
              }`}
            >
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
