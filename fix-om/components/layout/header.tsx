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
  { href: "/about", label: "About", labelArabic: "عن الفيكس" },
  { href: "/gallery", label: "Gallery", labelArabic: "الصور" },
  { href: "/contact", label: "Contact", labelArabic: "اتصل بنا" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useBilingual();

  const isHome = pathname === "/";
  const isHeroHeader = isHome && !isScrolled;

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = (active: boolean) => {
    if (isHeroHeader) {
      return active
        ? "text-white"
        : "text-white/70 hover:text-white";
    }
    return active
      ? "text-primary"
      : "text-subtext hover:text-primary";
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHome
          ? "bg-surface/90 backdrop-blur-xl border-b border-glass-border py-3 shadow-soft"
          : "bg-transparent py-5 md:py-6"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Logo size="md" variant={isHeroHeader ? "light" : "default"} />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.06 }}
              >
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${navLinkClass(pathname === link.href)}`}
                >
                  {language === "ar" ? link.labelArabic : link.label}
                  {pathname === link.href && (
                    <motion.span
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full ${
                        isHeroHeader ? "bg-white" : "bg-primary"
                      }`}
                      layoutId="nav-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                isHeroHeader
                  ? "bg-white/15 text-white border border-white/20 hover:bg-white/25"
                  : "bg-primary text-white hover:bg-primary-light"
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
            >
              <FontAwesomeIcon icon={faGlobe} className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{language === "en" ? "EN" : "ع"}</span>
            </motion.button>

            <motion.button
              className={`md:hidden p-2 rounded-full transition-colors ${
                isHeroHeader ? "text-white" : "text-primary"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              type="button"
              whileTap={{ scale: 0.92 }}
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faXmark : faBars}
                className="w-5 h-5"
                aria-hidden="true"
              />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 top-[68px] bg-bone/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="md:hidden fixed top-[68px] right-0 bottom-0 w-[min(100%,280px)] bg-surface border-l border-glass-border shadow-elevated"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <nav className="flex flex-col pt-8 px-6 gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-3 px-3 rounded-xl text-base font-medium transition-colors duration-300 ${
                        pathname === link.href
                          ? "bg-primary/10 text-primary"
                          : "text-bone hover:bg-cream hover:text-primary"
                      }`}
                    >
                      {language === "ar" ? link.labelArabic : link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
