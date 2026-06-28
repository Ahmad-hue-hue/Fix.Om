"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./logo";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { Reveal } from "@/components/layout/page-header";
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
    { icon: faMapMarkerAlt, href: locationUrl, label: "Map" },
  ];

  return (
    <footer className="border-t border-glass-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
          <Reveal>
            <Link href="/" className="inline-block">
              <Logo size="sm" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-subtext">
              {isArabic ? brandData.taglineArabic : brandData.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-subtext">
              {isArabic ? "روابط" : "Links"}
            </p>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-bone transition-colors hover:text-primary"
                  >
                    {isArabic ? link.ar : link.en}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-subtext">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-obsidian text-bone transition-colors hover:border-primary/30 hover:text-primary"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.16} className="mt-10 border-t border-glass-border pt-6">
          <p className="text-center text-xs text-subtext md:text-start">
            © {new Date().getFullYear()} {brandData.name}.{" "}
            {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
