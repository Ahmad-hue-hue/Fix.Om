"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeroStrip } from "@/components/ui/page-hero-strip";
import { SafeImage } from "@/components/ui/safe-image";
import { Button } from "@/components/ui/button";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { pageImages } from "@/lib/images";
import {
  revealFromLeft,
  revealFromRight,
  revealScale,
  scrollTransition,
  viewportOnce,
} from "@/lib/motion";

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
      "A minimalist sanctuary designed for focus and conversation. Clean, intentional, and inviting.",
    descriptionArabic:
      "ملاذ مصمم ببساطة للتركيز والمحادثة. نظيف ومتعمد وودود.",
    image: "/assets/WhatsApp Image 2026-04-24 at 5.46.34 PM.jpeg",
  },
];

export default function AboutPage() {
  const { language } = useBilingual();
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen bg-obsidian">
      <Header />

      <main id="main-content" className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <PageHeroStrip
          image={pageImages.about}
          label={isArabic ? "قصتنا" : "Our story"}
          title={isArabic ? "من الحبة إلى الفنجان" : "From bean to cup"}
          description={
            isArabic
              ? "حيث تلتقي الدقة والشغف في كل فنجان."
              : "Where precision meets passion in every cup."
          }
        />

        <div className="space-y-20 md:space-y-28">
          {aboutSections.map((section, index) => {
            const imageFirst = index % 2 === 0;
            const imageVariant = imageFirst ? revealFromLeft : revealFromRight;
            const textVariant = imageFirst ? revealFromRight : revealFromLeft;

            return (
              <section
                key={section.id}
                className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                  !imageFirst ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <motion.div
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card ring-1 ring-glass-border"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  variants={imageVariant}
                  transition={scrollTransition}
                  whileHover={{ scale: 1.02 }}
                >
                  <SafeImage
                    src={section.image}
                    alt={isArabic ? section.titleArabic : section.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 to-transparent" />
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  variants={textVariant}
                  transition={{ ...scrollTransition, delay: 0.1 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-bold text-bone sm:text-3xl md:text-4xl">
                    {isArabic ? section.titleArabic : section.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-subtext md:text-lg">
                    {isArabic ? section.descriptionArabic : section.description}
                  </p>
                </motion.div>
              </section>
            );
          })}
        </div>

        <motion.div
          className="mt-20 overflow-hidden rounded-2xl border border-glass-border bg-surface p-8 text-center shadow-card md:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={revealScale}
          transition={scrollTransition}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {isArabic ? "زُرنا" : "Visit us"}
          </p>
          <h3 className="mt-2 text-xl font-bold text-bone sm:text-2xl">
            {isArabic ? "نود رؤيتك في FIX" : "We'd love to see you at FIX"}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-subtext">
            {isArabic ? "الدرزيز، عُمان" : "Ad Driz, Oman"}
          </p>
          <Link href="/contact" className="mt-6 inline-block">
            <Button size="lg">{isArabic ? "تواصل معنا" : "Get in touch"}</Button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
