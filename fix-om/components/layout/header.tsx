"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
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
    <>
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
                      ? "text-primary"
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
              className={`hidden h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors sm:flex ${
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
              className={`flex h-10 w-10 items-center justify-center rounded-full border md:hidden ${
                onHero
                  ? "border-white/25 bg-white/10 text-white backdrop-blur-sm"
                  : "border-glass-border bg-surface text-primary shadow-soft"
              }`}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              whileTap={{ scale: 0.92 }}
            >
              <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        pathname={pathname}
        language={language}
        onToggleLanguage={toggleLanguage}
      />
    </>
  );
}
