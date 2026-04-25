"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faInstagram, faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import brandData from "@/content/brand.json";

export default function ContactPage() {
  const { language } = useBilingual();
  const { phone, whatsapp, instagram, address } = brandData;

  const contactActions = [
    {
      id: "call",
      icon: faPhone,
      label: language === "en" ? "Call Now" : "اتصل الآن",
      sublabel: phone,
      href: `tel:${phone}`,
      color: "bg-gold text-obsidian hover:bg-gold-light",
      brandIcon: null,
    },
    {
      id: "whatsapp",
      icon: faWhatsapp,
      label: language === "en" ? "WhatsApp" : "واتساب",
      sublabel: language === "en" ? "Send a message" : "أرسل رسالة",
      href: `https://wa.me/${whatsapp}`,
      color: "bg-green-500 text-white hover:bg-green-600",
      brandIcon: null,
    },
    {
      id: "instagram",
      icon: faInstagram,
      label: "Instagram",
      sublabel: "@FIX.OM",
      href: instagram.startsWith("http") ? instagram : `https://instagram.com/${instagram}`,
      color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white hover:opacity-90",
      brandIcon: null,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main id="main-content" className="pt-32 pb-16 px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            {language === "en" ? "Get in Touch" : "تواصل معنا"}
          </h1>
          <p className="mt-4 text-subtext text-lg">
            {language === "en" 
              ? "We'd love to hear from you" 
              : "نود أن نسمع منك"}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {contactActions.map((action, index) => (
              <motion.a
                key={action.id}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center p-8 rounded-2xl ${action.color} transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={action.icon} className="w-10 h-10 mb-4" />
                <span className="text-lg font-semibold">{action.label}</span>
                <span className="text-sm opacity-80 mt-1">{action.sublabel}</span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6 text-gold" />
              <h2 className="text-2xl font-semibold">
                {language === "en" ? "Visit Us" : "زربنا"}
              </h2>
            </div>
            
            <p className="text-center text-subtext text-lg mb-8">
              {address || (language === "en" ? "Oman" : "عُمان")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="gap-2">
                <FontAwesomeIcon icon={faApple} className="w-5 h-5" />
                {language === "en" ? "Apple Maps" : "خرائط آبل"}
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <FontAwesomeIcon icon={faGoogle} className="w-5 h-5" />
                {language === "en" ? "Google Maps" : "خرائط غوغل"}
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-subtext">
              {language === "en" 
                ? "Open daily from 8:00 AM to 11:00 PM" 
                : "مفتوح يومياً من الساعة 8 صباحاً حتى 11 مساءً"}
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}