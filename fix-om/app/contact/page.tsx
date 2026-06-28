"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageBanner } from "@/components/layout/page-banner";
import { Reveal } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMapMarkerAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { fadeUp, staggerContainer, defaultTransition } from "@/lib/motion";
import { cafeImages } from "@/lib/images";
import brandData from "@/content/brand.json";

export default function ContactPage() {
  const { language } = useBilingual();
  const { phone, whatsapp, instagram, email, locationUrl } = brandData;
  const isArabic = language === "ar";

  const instagramUrl = instagram.startsWith("http")
    ? instagram
    : `https://instagram.com/${instagram}`;

  const channels = [
    {
      id: "call",
      icon: faPhone,
      label: isArabic ? "اتصل" : "Call",
      value: phone,
      href: `tel:${phone}`,
    },
    {
      id: "email",
      icon: faEnvelope,
      label: isArabic ? "بريد" : "Email",
      value: email,
      href: `mailto:${email}`,
    },
    {
      id: "whatsapp",
      icon: faWhatsapp,
      label: "WhatsApp",
      value: isArabic ? "رسالة" : "Message us",
      href: `https://wa.me/${whatsapp}`,
    },
    {
      id: "instagram",
      icon: faInstagram,
      label: "Instagram",
      value: "@fix.om",
      href: instagramUrl,
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian">
      <Header />

      <main id="main-content" className="mx-auto max-w-4xl px-4 pb-16 pt-24 sm:px-6">
        <PageBanner
          image={cafeImages.contactBanner}
          label={isArabic ? "تواصل" : "Contact"}
          title={isArabic ? "نحن هنا لمساعدتك" : "We're here to help"}
          description={
            isArabic ? "تواصل معنا أو زُرنا مباشرة" : "Reach out or visit us in person"
          }
        />

        <motion.div
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {channels.map((channel) => (
            <motion.a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              transition={defaultTransition}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center rounded-2xl border border-glass-border bg-surface p-5 text-center shadow-soft md:p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-primary">
                <FontAwesomeIcon icon={channel.icon} className="h-4 w-4" />
              </span>
              <span className="mt-3 text-sm font-semibold text-bone">{channel.label}</span>
              <span className="mt-1 text-xs text-subtext" dir="auto">
                {channel.value}
              </span>
            </motion.a>
          ))}
        </motion.div>

        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-glass-border bg-surface shadow-soft">
          <div className="relative aspect-[21/9] max-h-[200px] w-full">
            <Image
              src={cafeImages.space}
              alt={isArabic ? "موقع المقهى" : "Café location"}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent" />
          </div>
          <div className="p-6 md:p-10">
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold text-bone md:text-xl">
                {isArabic ? "الموقع" : "Location"}
              </h2>
            </div>
            <p className="mt-3 text-center text-subtext">
              {isArabic ? "الدرزيز، عُمان" : "Ad Driz, Oman"}
            </p>
            <p className="mt-2 text-center text-sm text-subtext">
              {isArabic ? "8:00 ص – 11:00 م يومياً" : "Open daily 8:00 AM – 11:00 PM"}
            </p>
            <div className="mt-6 flex justify-center">
              <a href={locationUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg">{isArabic ? "افتح الخريطة" : "Open in Maps"}</Button>
              </a>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
