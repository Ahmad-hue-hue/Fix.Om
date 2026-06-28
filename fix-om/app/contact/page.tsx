"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMapMarkerAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faInstagram, faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { fadeUp, staggerContainer, defaultTransition } from "@/lib/motion";
import brandData from "@/content/brand.json";

export default function ContactPage() {
  const { language } = useBilingual();
  const { phone, whatsapp, instagram, email, address, locationUrl } = brandData;
  const isArabic = language === "ar";

  const instagramUrl = instagram.startsWith("http")
    ? instagram
    : `https://instagram.com/${instagram}`;

  const contactActions = [
    {
      id: "call",
      icon: faPhone,
      label: isArabic ? "اتصل الآن" : "Call Now",
      sublabel: phone,
      href: `tel:${phone}`,
      className: "bg-primary text-white hover:bg-primary-light",
    },
    {
      id: "email",
      icon: faEnvelope,
      label: isArabic ? "بريد إلكتروني" : "Email",
      sublabel: email,
      href: `mailto:${email}`,
      className: "bg-bone text-white hover:bg-bone/90",
    },
    {
      id: "whatsapp",
      icon: faWhatsapp,
      label: isArabic ? "واتساب" : "WhatsApp",
      sublabel: isArabic ? "أرسل رسالة" : "Send a message",
      href: `https://wa.me/${whatsapp}`,
      className: "bg-[#25D366] text-white hover:opacity-90",
    },
    {
      id: "instagram",
      icon: faInstagram,
      label: "Instagram",
      sublabel: "@FIX.OM",
      href: instagramUrl,
      className: "bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 text-white hover:opacity-90",
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian">
      <Header />

      <main id="main-content" className="pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow={isArabic ? "FIX" : "Contact"}
            title={isArabic ? "تواصل معنا" : "Get in Touch"}
            description={
              isArabic ? "نود أن نسمع منك" : "We'd love to hear from you"
            }
          />

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {contactActions.map((action) => (
              <motion.a
                key={action.id}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                transition={defaultTransition}
                className={`flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl ${action.className} transition-all duration-300 shadow-soft`}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={action.icon} className="w-8 h-8 md:w-10 md:h-10 mb-3" />
                <span className="text-sm md:text-base font-semibold text-center" dir="auto">
                  {action.label}
                </span>
                <span className="text-xs opacity-80 mt-1 text-center" dir="auto">
                  {action.sublabel}
                </span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="surface-card p-6 md:p-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...defaultTransition }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-primary" />
              <h2 className="text-xl md:text-2xl font-semibold text-bone">
                {isArabic ? "زُرنا" : "Visit Us"}
              </h2>
            </div>

            <p className="text-center text-subtext text-base md:text-lg mb-8">
              {address || (isArabic ? "الدرزيز، عُمان" : "Ad Driz, Oman")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={locationUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  <FontAwesomeIcon icon={faApple} className="w-5 h-5" />
                  {isArabic ? "خرائط آبل" : "Apple Maps"}
                </Button>
              </a>
              <a href={locationUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="lg" className="gap-2 w-full sm:w-auto">
                  <FontAwesomeIcon icon={faGoogle} className="w-5 h-5" />
                  {isArabic ? "خرائط غوغل" : "Google Maps"}
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.p
            className="mt-10 text-center text-subtext"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={defaultTransition}
          >
            {isArabic
              ? "مفتوح يومياً من 8:00 صباحاً حتى 11:00 مساءً"
              : "Open daily from 8:00 AM to 11:00 PM"}
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
