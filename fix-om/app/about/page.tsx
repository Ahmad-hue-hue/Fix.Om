"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageBanner } from "@/components/layout/page-banner";
import { Reveal } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { cafeImages } from "@/lib/images";
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
    image: cafeImages.origin,
  },
  {
    id: "craft",
    title: "The Craft",
    titleArabic: "الحرفية",
    description:
      "Our brewing methods are a testament to precision. From V60 pour-overs to Aeropress and cold brew, each cup is crafted with patience and expertise.",
    descriptionArabic:
      "طرق التحضير لدينا هي دليل على الدقة. من صب V60 إلى إيروبرس وكولد برو، كل فنجان مصنوع بالصبر والخبرة.",
    image: cafeImages.craft,
  },
  {
    id: "space",
    title: "The Space",
    titleArabic: "المكان",
    description:
      "A minimalist sanctuary designed for focus and conversation. Clean, intentional, and inviting.",
    descriptionArabic:
      "ملاذ مصمم ببساطة للتركيز والمحادثة. نظيف ومتعمد وودود.",
    image: cafeImages.space,
  },
];

export default function AboutPage() {
  const { language } = useBilingual();
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen bg-obsidian">
      <Header />

      <main id="main-content" className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <PageBanner
          image={cafeImages.aboutBanner}
          label={isArabic ? "قصتنا" : "Our story"}
          title={isArabic ? "من الحبة إلى الفنجان" : "From bean to cup"}
          description={
            isArabic
              ? "حيث تلتقي الدقة والشغف في كل فنجان."
              : "Where precision meets passion in every cup."
          }
        />

        <div className="space-y-16 md:space-y-24">
          {aboutSections.map((section, index) => (
            <Reveal key={section.id} delay={index * 0.06}>
              <section
                className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                  index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <motion.div
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card"
                  whileHover={{ scale: 1.01 }}
                  transition={defaultTransition}
                >
                  <Image
                    src={section.image}
                    alt={isArabic ? section.titleArabic : section.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-bone sm:text-3xl md:text-4xl">
                    {isArabic ? section.titleArabic : section.title}
                  </h2>
                  <p className="mt-4 text-subtext leading-relaxed">
                    {isArabic ? section.descriptionArabic : section.description}
                  </p>
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <Link href="/contact">
            <Button size="lg">{isArabic ? "تواصل معنا" : "Get in touch"}</Button>
          </Link>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
