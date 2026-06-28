"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import brandData from "@/content/brand.json";

const navLinks = [
  { href: "/", label: "Home", labelArabic: "الرئيسية" },
  { href: "/menu", label: "Menu", labelArabic: "القائمة" },
  { href: "/about", label: "About", labelArabic: "عنّا" },
  { href: "/gallery", label: "Gallery", labelArabic: "الصور" },
  { href: "/contact", label: "Contact", labelArabic: "اتصل بنا" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  language: "en" | "ar";
  onToggleLanguage: () => void;
}

const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panel = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 32 },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.98,
    transition: { duration: 0.22 },
  },
};

const linkItem = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function MobileMenu({
  isOpen,
  onClose,
  pathname,
  language,
  onToggleLanguage,
}: MobileMenuProps) {
  const isArabic = language === "ar";

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true">
          <motion.button
            type="button"
            className="absolute inset-0 bg-primary-dark/60 backdrop-blur-md"
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            aria-label="Close menu"
          />

          <motion.div
            className="absolute inset-x-3 top-3 bottom-3 flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-elevated"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between border-b border-glass-border px-5 py-4">
              <Link href="/" onClick={onClose} aria-label="Home">
                <Logo size="sm" />
              </Link>
              <motion.button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-primary"
                whileTap={{ scale: 0.92 }}
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
              </motion.button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile navigation">
              <motion.ul
                className="space-y-1"
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.li key={link.href} custom={i} variants={linkItem}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`group flex items-center justify-between rounded-2xl px-4 py-4 transition-colors ${
                          active
                            ? "bg-primary text-white"
                            : "text-bone hover:bg-cream"
                        }`}
                      >
                        <span className="text-lg font-semibold tracking-tight">
                          {isArabic ? link.labelArabic : link.label}
                        </span>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 ${
                            active ? "text-white/80" : "text-subtext"
                          }`}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>

            <div className="space-y-3 border-t border-glass-border bg-cream/30 px-5 py-5">
              <Link href="/menu" onClick={onClose} className="block">
                <Button size="lg" className="w-full">
                  {isArabic ? "عرض القائمة" : "View Menu"}
                </Button>
              </Link>
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onToggleLanguage}
                  className="flex h-10 flex-1 items-center justify-center rounded-full border border-glass-border bg-surface text-sm font-semibold text-bone"
                >
                  {isArabic ? "English" : "العربية"}
                </button>
                <a
                  href={brandData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 flex-1 items-center justify-center rounded-full border border-glass-border bg-surface text-sm font-semibold text-primary"
                >
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
