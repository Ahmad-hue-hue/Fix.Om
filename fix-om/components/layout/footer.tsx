"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./logo";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import brandData from "@/content/brand.json";

const quickLinksEn = ["Home", "Menu", "About", "Gallery", "Contact"];
const quickLinksAr = ["الرئيسية", "القائمة", "عن الفيكس", "الصور", "اتصل بنا"];
const quickLinksHrefs = ["/", "/menu", "/about", "/gallery", "/contact"];

export function Footer() {
  const { language } = useBilingual();
  const { instagram, phone, whatsapp, email } = brandData;
  const isArabic = language === "ar";
  const quickLinks = isArabic ? quickLinksAr : quickLinksEn;

  return (
    <footer className="bg-obsidian border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Logo size="sm" />
            <p className="mt-3 md:mt-4 text-subtext text-xs sm:text-sm text-center md:text-left">
              {isArabic ? "قهوه متخصصة. معايرة دقيقة." : "Speciality Coffee. Precision Calibration."}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-bone font-semibold mb-3 md:mb-4">
              {isArabic ? "روابط سريعة" : "Quick Links"}
            </h4>
            <div className="flex flex-col gap-1.5 md:gap-2">
              {quickLinks.map((link, index) => (
                <Link
                  key={link}
                  href={quickLinksHrefs[index]}
                  className="text-subtext hover:text-gold transition-colors text-xs sm:text-sm"
                >
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center md:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-bone font-semibold mb-3 md:mb-4">
              {isArabic ? "تواصل معنا" : "Connect"}
            </h4>
            <div className="flex gap-3 md:gap-4">
              {instagram && (
                <motion.a
                  href={instagram.startsWith("http") ? instagram : `https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-gold hover:text-obsidian transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                </motion.a>
              )}
              {whatsapp && (
                <motion.a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-gold hover:text-obsidian transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                </motion.a>
              )}
              {phone && (
                <motion.a
                  href={`tel:${phone}`}
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-gold hover:text-obsidian transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                </motion.a>
              )}
              {email && (
                <motion.a
                  href={`mailto:${email}`}
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-gold hover:text-obsidian transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-glass-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-subtext text-xs sm:text-sm">
            © {new Date().getFullYear()} FIX Speciality Coffee. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}