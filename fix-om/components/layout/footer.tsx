"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/motion";
import brandData from "@/content/brand.json";

const quickLinks = [
  { href: "/", en: "Home", ar: "الرئيسية" },
  { href: "/menu", en: "Menu", ar: "القائمة" },
  { href: "/about", en: "About", ar: "عنّا" },
  { href: "/gallery", en: "Gallery", ar: "الصور" },
  { href: "/contact", en: "Contact", ar: "اتصل بنا" },
];

export function Footer() {
  const { language } = useBilingual();
  const { phone, whatsapp, email, locationUrl } = brandData;
  const isArabic = language === "ar";

  const socialLinks = [
    { icon: faInstagram, href: brandData.instagramUrl, label: "Instagram" },
    { icon: faWhatsapp, href: `https://wa.me/${whatsapp}`, label: "WhatsApp" },
    { icon: faPhone, href: `tel:${phone}`, label: "Phone" },
    { icon: faEnvelope, href: `mailto:${email}`, label: "Email" },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden bg-primary-dark text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
        <motion.div
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp} transition={defaultTransition} className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Logo size="sm" variant="light" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {isArabic ? brandData.taglineArabic : brandData.tagline}
            </p>
            <Link href="/menu" className="mt-6 inline-block">
              <Button size="sm" variant="hero" className="bg-white text-primary hover:bg-cream">
                {isArabic ? "القائمة" : "View Menu"}
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} transition={defaultTransition}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              {isArabic ? "روابط" : "Explore"}
            </p>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/85 transition-colors hover:text-white"
                  >
                    {isArabic ? link.ar : link.en}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} transition={defaultTransition}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              {isArabic ? "ساعات العمل" : "Hours"}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              <li className="flex items-start gap-2.5">
                <FontAwesomeIcon icon={faClock} className="mt-0.5 h-3.5 w-3.5 text-white/50" />
                <span>{isArabic ? "يومياً 8:00 ص – 11:00 م" : "Daily 8:00 AM – 11:00 PM"}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-0.5 h-3.5 w-3.5 text-white/50" />
                <span>{isArabic ? "الدرزيز، عُمان" : "Ad Driz, Oman"}</span>
              </li>
              <li>
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white underline-offset-4 hover:underline"
                >
                  {isArabic ? "افتح الخريطة" : "Get directions"}
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} transition={defaultTransition}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              {isArabic ? "تواصل" : "Connect"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Phone" || item.label === "Email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-white/30 hover:bg-white/10"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
            <p className="mt-4 text-sm text-white/70" dir="ltr">
              {phone}
            </p>
            <p className="mt-1 text-sm text-white/70" dir="ltr">
              {email}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="text-center text-xs text-white/50 md:text-start">
            © {new Date().getFullYear()} {brandData.name}.{" "}
            {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <p className="text-xs text-white/40">
            {isArabic ? "قهوه متخصصة · الدرزيز" : "Speciality Coffee · Ad Driz"}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
