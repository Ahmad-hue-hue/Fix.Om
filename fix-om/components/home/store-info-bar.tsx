"use client";

import { useLiveStatus } from "@/lib/hooks/use-live-status";
import { useBilingual } from "@/lib/hooks/use-bilingual";

export function StoreInfoBar() {
  const { isOpen } = useLiveStatus();
  const { language } = useBilingual();
  const isArabic = language === "ar";

  const items = [
    {
      label: isArabic ? "الحالة" : "Status",
      value: isOpen
        ? isArabic
          ? "مفتوح الآن"
          : "Open now"
        : isArabic
          ? "مغلق"
          : "Closed",
      accent: isOpen,
    },
    {
      label: isArabic ? "ساعات العمل" : "Hours",
      value: isArabic ? "8:00 ص – 11:00 م" : "8:00 AM – 11:00 PM",
      accent: false,
    },
    {
      label: isArabic ? "الموقع" : "Location",
      value: isArabic ? "الدرزيز، عُمان" : "Ad Driz, Oman",
      accent: false,
    },
  ];

  return (
    <section
      className="border-b border-glass-border bg-surface"
      aria-label={isArabic ? "معلومات المتجر" : "Store information"}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 border-glass-border px-6 py-5 sm:border-r last:sm:border-r-0 not-last:border-b sm:not-last:border-b-0"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-subtext">
              {item.label}
            </span>
            <span
              className={`text-sm font-semibold sm:text-base ${
                item.accent ? "text-green-open" : "text-bone"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
