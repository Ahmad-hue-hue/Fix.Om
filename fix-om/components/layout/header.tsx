"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./logo";
import { useBilingual } from "@/lib/hooks/use-bilingual";

const navLinks = [
  { href: "/", label: "Home", labelArabic: "الرئيسية" },
  { href: "/menu", label: "Menu", labelArabic: "القائمة" },
  { href: "/about", label: "About", labelArabic: "عنّا" },
  { href: "/gallery", label: "Gallery", labelArabic: "الصور" },
  { href: "/contact", label: "Contact", labelArabic: "اتصل بنا" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useBilingual();

  const isHome = pathname === "/";
  const onHero = isHome && !isScrolled;

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        onHero
          ? "bg-transparent py-3 md:py-4"
          : "border-b border-glass-border bg-surface/95 py-2.5 shadow-soft backdrop-blur-xl md:py-3"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Home" className="shrink-0">
          <Logo size="md" variant={onHero ? "light" : "default"} />
        </Link>

        {/* Desktop nav — Mobbin pill bar */}
        <nav
          className={`hidden items-center gap-0.5 rounded-full p-1 md:flex ${
            onHero ? "bg-white/10 backdrop-blur-md" : "bg-cream/60"
          }`}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? onHero
                      ? "text-primary"
                      : "text-primary"
                    : onHero
                      ? "text-white/80 hover:text-white"
                      : "text-subtext hover:text-primary"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="header-nav-pill"
                    className={`absolute inset-0 rounded-full shadow-soft ${
                      onHero ? "bg-white" : "bg-surface"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {language === "ar" ? link.labelArabic : link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <motion.button
            type="button"
            onClick={toggleLanguage}
            className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors ${
              onHero
                ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "bg-primary text-white hover:bg-primary-light"
            }`}
            whileTap={{ scale: 0.96 }}
            aria-label="Toggle language"
          >
            <FontAwesomeIcon icon={faGlobe} className="h-3.5 w-3.5" />
            {language === "en" ? "EN" : "ع"}
          </motion.button>

          <motion.button
            type="button"
            className={`flex h-9 w-9 items-center justify-center rounded-full md:hidden ${
              onHero ? "text-white" : "text-primary"
            }`}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            whileTap={{ scale: 0.92 }}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 top-14 z-40 bg-primary-dark/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              aria-label="Close menu overlay"
            />
            <motion.nav
              className="fixed bottom-0 end-0 top-14 z-50 flex w-[min(100%,300px)] flex-col border-s border-glass-border bg-surface md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 32 }}
              aria-label="Mobile navigation"
            >
              <ul className="flex-1 space-y-1 p-4">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className={`block rounded-xl px-4 py-3.5 text-[15px] font-medium ${
                          active
                            ? "bg-primary text-white"
                            : "text-bone hover:bg-cream"
                        }`}
                      >
                        {language === "ar" ? link.labelArabic : link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="border-t border-glass-border p-4">
                <p className="text-center text-xs text-subtext">
                  {language === "ar" ? "FIX — قهوه متخصصة" : "FIX — Speciality Coffee"}
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
