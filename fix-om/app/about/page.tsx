"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SafeImage } from "@/components/ui/safe-image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { defaultTransition } from "@/lib/motion";

const aboutSections = [
  {
    id: "origin",
    title: "The Origin",
    titleArabic: "المصدر",
    description:
      "We source our beans from the finest single-origin farms across the world. Every batch is carefully selected for its unique flavor profile and ethical farming practices.",
    descriptionArabic:
      "نحصل على حبوبنا من أفضل المزارع ذات الأصل الواحد في العالم. يتم اختيار كل دفعة بعناية لتحقيق ملف النكهة الفريد والممارسات الزراعية الأخلاقية.",
    image: "/assets/WhatsApp Image 2026-04-25 at 12.09.04 AM.jpeg",
  },
  {
    id: "craft",
    title: "The Craft",
    titleArabic: "الحرفية",
    description:
      "Our brewing methods are a testament to precision. From V60 pour-overs to Aeropress and cold brew, each cup is crafted with patience and expertise.",
    descriptionArabic:
      "طرق التحضير لدينا هي دليل على الدقة. من صب V60 إلى إيروبрес وكولد برو، كل فنجان مصنوع بالصبر والخبرة.",
    image: "/assets/WhatsApp Image 2026-04-24 at 5.46.57 PM.jpeg",
  },
  {
    id: "space",
    title: "The Space",
    titleArabic: "المكان",
    description:
      "A minimalist sanctuary designed for focus and conversation. Our space embodies the philosophy of obsidian minimalism—clean, intentional, and inviting.",
    descriptionArabic:
      "ملاذ مصمم ببساطة للتركيز والمحادثة. يجسد مكاننا فلسفة البساطة — نظيف ومتعمد وودود.",
    image: "/assets/WhatsApp Image 2026-04-24 at 5.46.34 PM.jpeg",
  },
];

function ScrollRevealSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const { language } = useBilingual();
  const containerRef = useRef(null);
  const isArabic = language === "ar";
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.4]);

  return (
    <div className="min-h-screen bg-obsidian" ref={containerRef}>
      <Header />

      <main id="main-content" className="pt-28 pb-16">
        <motion.div
          className="text-center px-4 sm:px-6 mb-16 md:mb-24"
          style={{ opacity }}
        >
          <motion.p
            className="text-primary text-xs sm:text-sm uppercase tracking-[0.2em] font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {isArabic ? "قصتنا" : "Our Story"}
          </motion.p>
          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-4 text-bone"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            {isArabic ? "الفيكس" : "The Fix"}
          </motion.h1>
          <motion.p
            className="mt-5 text-base sm:text-lg md:text-xl text-subtext max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {isArabic
              ? "حيث تلتقي الدقة والشغف في كل فنجان."
              : "Where precision meets passion in every cup."}
          </motion.p>
        </motion.div>

        <div className="space-y-20 md:space-y-32">
          {aboutSections.map((section, index) => (
            <ScrollRevealSection key={section.id} delay={index * 0.1}>
              <section className="max-w-6xl mx-auto px-4 sm:px-6">
                <div
                  className={`flex flex-col ${
                    index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                  } items-center gap-8 md:gap-16 lg:gap-20`}
                >
                  <motion.div
                    className="flex-1 relative w-full"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-elevated">
                      <SafeImage
                        src={section.image}
                        alt={isArabic ? section.titleArabic : section.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bone/20 via-transparent to-transparent" />
                    </div>
                  </motion.div>

                  <div className="flex-1 text-center md:text-start">
                    <span className="text-primary text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 text-bone">
                      {isArabic ? section.titleArabic : section.title}
                    </h2>
                    <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-subtext leading-relaxed">
                      {isArabic ? section.descriptionArabic : section.description}
                    </p>
                  </div>
                </div>
              </section>
            </ScrollRevealSection>
          ))}
        </div>

        <motion.div
          className="mt-24 md:mt-32 text-center px-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={defaultTransition}
        >
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-bone mb-6">
            {isArabic
              ? "زُرنا واختبر الفرق"
              : "Visit us and experience the difference"}
          </h3>
          <Link href="/contact">
            <Button size="lg">{isArabic ? "تواصل معنا" : "Get in touch"}</Button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
