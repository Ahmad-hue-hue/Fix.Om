"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useBilingual } from "@/lib/hooks/use-bilingual";

const aboutSections = [
  {
    id: "origin",
    title: "The Origin",
    titleArabic: "المصدر",
    description: "We source our beans from the finest single-origin farms across the world. Every batch is carefully selected for its unique flavor profile and ethical farming practices.",
    descriptionArabic: "نحصل على حبوبنا من أفضل المزارع ذات الأصل الواحد في العالم. يتم اختيار كل دفعة بعناية لتحقيق ملف النكهة الفريد والممارسات الزراعية الأخلاقية.",
    image: "/assets/WhatsApp Image 2026-04-25 at 12.09.04 AM.jpeg",
  },
  {
    id: "craft",
    title: "The Craft",
    titleArabic: "الحرفية",
    description: "Our brewing methods are a testament to precision. From V60 pour-overs to Aeropress and cold brew, each cup is crafted with patience and expertise.",
    descriptionArabic: "طرق التحضير لدينا هي دليل على الدقة. من صب في 60 إلى إيروس بريس وكولد برو، كل فنجان مصنوع بالصبر والخبرة.",
    image: "/assets/WhatsApp Image 2026-04-24 at 5.46.57 PM.jpeg",
  },
  {
    id: "space",
    title: "The Space",
    titleArabic: "المكان",
    description: "A minimalist sanctuary designed for focus and conversation. Our space embodies the philosophy of obsidian minimalism—clean, intentional, and inviting.",
    descriptionArabic: "ملاذ مصمم بسيولة للتركيز والمحادثة. يجسد مكاننا فلسفة الحد الأدنى من السائد - نظيف ومتعمد ودعوب.",
    image: "/assets/WhatsApp Image 2026-04-24 at 5.46.34 PM.jpeg",
  },
];

function ScrollRevealSection({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  delay?: number 
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const { language } = useBilingual();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  return (
    <div className="min-h-screen" ref={containerRef}>
      <Header />
      
      <main id="main-content" className="pt-24 pb-12">
        <motion.div 
          className="text-center px-3 sm:px-4 mb-16 md:mb-24"
          style={{ opacity }}
        >
          <motion.span
            className="text-primary text-xs sm:text-sm uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {language === "en" ? "Our Story" : "قصتنا"}
          </motion.span>
          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-3 md:mt-4 text-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {language === "en" ? "The Fix" : "الفيكس"}
          </motion.h1>
          <motion.p
            className="mt-4 md:mt-6 text-base sm:text-xl text-subtext max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {language === "en"
              ? "Where precision meets passion in every cup."
              : "حيث تلتقي الدقة والشغف في كل فنجان."}
          </motion.p>
        </motion.div>

        <div className="space-y-16 md:space-y-32">
          {aboutSections.map((section, index) => (
            <ScrollRevealSection key={section.id} delay={index * 0.15}>
              <section className="max-w-7xl mx-auto px-3 sm:px-4">
                <div className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6 md:gap-24`}>
                  <motion.div 
                    className="flex-1 relative w-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] rounded-xl md:rounded-2xl overflow-hidden">
                      <Image
                        src={section.image}
                        alt={language === "en" ? section.title : section.titleArabic}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/10 to-transparent" />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <motion.span
                      className="text-primary text-xs sm:text-sm uppercase tracking-widest"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      {language === "en" ? "0" + (index + 1) : "٠" + (index + 1)}
                    </motion.span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 md:mt-4 text-primary">
                      {language === "en" ? section.title : section.titleArabic}
                    </h2>
                    <p className="mt-3 md:mt-6 text-sm sm:text-base md:text-lg text-subtext leading-relaxed">
                      {language === "en" ? section.description : section.descriptionArabic}
                    </p>
                  </div>
                </div>
              </section>
            </ScrollRevealSection>
          ))}
        </div>

        <motion.div
          className="mt-32 text-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-primary">
            {language === "en" 
              ? "Visit us and experience the difference" 
              : "زربنا واختبر الفرق"}
          </h3>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}