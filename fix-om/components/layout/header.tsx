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

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-obsidian/95 backdrop-blur-md py-3" : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Logo size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    pathname === link.href ? "text-primary" : "text-white hover:text-primary"
                  }`}
                >
                  {language === "ar" ? link.labelArabic : link.label}
                  {pathname === link.href && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="nav-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-glass border border-glass-border text-subtext hover:text-bone hover:border-primary transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
            >
              <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs font-medium">{language === "en" ? "EN" : "ع"}</span>
            </motion.button>

            <motion.button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              type="button"
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="w-6 h-6" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-[72px]"
            style={{ position: "fixed", zIndex: 999999, backgroundColor: "#F7F7F7" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`text-2xl font-semibold transition-colors duration-300 ${
                      pathname === link.href ? "text-primary" : "text-white hover:text-primary"
                    }`}
                  >
                    {language === "ar" ? link.labelArabic : link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}