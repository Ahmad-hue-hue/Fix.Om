"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./logo";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import brandData from "@/content/brand.json";

const quickLinksEn = ["Home", "Menu", "About", "Gallery", "Contact"];
const quickLinksAr = ["الرئيسية", "القائمة", "عن الفيكس", "الصور", "اتصل بنا"];
const quickLinksHrefs = ["/", "/menu", "/about", "/gallery", "/contact"];

export function Footer() {
  const { language } = useBilingual();
  const { instagram, phone, whatsapp, email, locationUrl, address } = brandData;
  const isArabic = language === "ar";
  const quickLinks = isArabic ? quickLinksAr : quickLinksEn;

  return (
    <footer className="bg-obsidian border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 md:py-12">
        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {/* Logo & Tagline */}
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Logo size="sm" />
            <p className="mt-3 text-subtext text-sm">
              {isArabic ? "قهوه متخصصة. معايرة دقيقة." : "Speciality Coffee. Precision Calibration."}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-primary font-semibold mb-3">
              {isArabic ? "روابط سريعة" : "Quick Links"}
            </h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link, index) => (
                <Link
                  key={link}
                  href={quickLinksHrefs[index]}
                  className="text-subtext hover:text-primary transition-colors text-sm"
                >
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-primary font-semibold mb-3">
              {isArabic ? "تواصل معنا" : "Connect"}
            </h4>
            <div className="flex gap-4">
              {instagram && (
                <motion.a
                  href={instagram.startsWith("http") ? instagram : `https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-primary hover:text-white transition-all duration-300"
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
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-primary hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                </motion.a>
              )}
              {phone && (
                <motion.a
                  href={`tel:${phone}`}
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-primary hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                </motion.a>
              )}
              {email && (
                <motion.a
                  href={`mailto:${email}`}
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-primary hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-glass-border" />

          {/* Contact Info */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {locationUrl && (
              <a
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-subtext hover:text-primary transition-colors text-sm"
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4" />
                <span>{address || (isArabic ? "الدرزيز، عُمان" : "Ad Driz, Oman")}</span>
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-subtext hover:text-primary transition-colors text-sm"
              >
                <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                <span>{phone}</span>
              </a>
            )}
            <div className="flex items-center gap-2 text-subtext text-sm">
              <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
              <span>{isArabic ? "مفتوح يومياً 7ص - 5م" : "Open Daily 7AM - 5PM"}</span>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-subtext text-xs">
              © {new Date().getFullYear()} <span className="text-primary">FIX</span> Speciality Coffee. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
          </motion.div>
        </div>

        {/* Desktop Layout (original) */}
        <div className="hidden md:grid grid-cols-3 gap-8 items-start">
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Logo size="sm" />
            <p className="mt-4 text-subtext text-sm">
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
            <h4 className="text-primary font-semibold mb-4">
              {isArabic ? "روابط سريعة" : "Quick Links"}
            </h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link, index) => (
                <Link
                  key={link}
                  href={quickLinksHrefs[index]}
                  className="text-subtext hover:text-primary transition-colors text-sm"
                >
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-primary font-semibold mb-4">
              {isArabic ? "تواصل معنا" : "Connect"}
            </h4>
            <div className="flex gap-4">
              {instagram && (
                <motion.a
                  href={instagram.startsWith("http") ? instagram : `https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-primary hover:text-white transition-all duration-300"
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
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-primary hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                </motion.a>
              )}
              {phone && (
                <motion.a
                  href={`tel:${phone}`}
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-primary hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                </motion.a>
              )}
              {email && (
                <motion.a
                  href={`mailto:${email}`}
                  className="w-10 h-10 rounded-full bg-glass flex items-center justify-center text-bone hover:bg-primary hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </motion.div>

          <motion.div
            className="col-span-3 mt-8 pt-8 border-t border-glass-border text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-subtext text-sm">
              © {new Date().getFullYear()} <span className="text-primary">FIX</span> Speciality Coffee. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}