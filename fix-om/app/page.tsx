"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StoreInfoBar } from "@/components/home/store-info-bar";
import { Reveal } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { fadeUp, staggerContainer, defaultTransition } from "@/lib/motion";
import { cafeImages, getItemImage } from "@/lib/images";
import menuData from "@/content/menu.json";
import brandData from "@/content/brand.json";

export default function Home() {
  const { language } = useBilingual();
  const isArabic = language === "ar";

  const testimonials = [
    { name: "Ahmed Al", text: "Best coffee in Ad Driz!", textArabic: "أفضل قهوة في الدرزيز!" },
    { name: "Sarah K.", text: "Love the atmosphere!", textArabic: "أحب الأجواء!" },
    { name: "Omar B.", text: "Amazing cold brew!", textArabic: "كولد برو مدهش!" },
  ];

  const featuredItems = useMemo(
    () =>
      menuData.categories.flatMap((c) =>
        c.items.slice(0, 2).map((item, i) => ({ ...item, categoryId: c.id, index: i }))
      ).slice(0, 8),
    []
  );

  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setReviewIndex((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(t);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-obsidian">
      <Header />

      <main id="main-content">
        {/* Hero — Mobbin-style full-bleed image */}
        <section className="relative isolate min-h-[88svh] overflow-hidden">
          <Image
            src={cafeImages.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/55 to-primary-dark/30" />

          <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-xl"
            >
              <motion.p
                variants={fadeUp}
                transition={defaultTransition}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70"
              >
                {isArabic ? "قهوه متخصصة" : "Speciality Coffee"}
              </motion.p>
              <motion.h1
                variants={fadeUp}
                transition={defaultTransition}
                className="mt-3 font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
              >
                {isArabic ? "أصلح يومك" : "Your Day, Fixed"}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                transition={defaultTransition}
                className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg"
              >
                {isArabic ? brandData.taglineArabic : brandData.tagline}
              </motion.p>
              <motion.div
                variants={fadeUp}
                transition={defaultTransition}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Link href="/menu" className="w-full sm:w-auto">
                  <Button size="lg" variant="hero" className="w-full sm:min-w-[148px]">
                    {isArabic ? "القائمة" : "View Menu"}
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" variant="heroOutline" className="w-full sm:min-w-[148px]">
                    {isArabic ? "زُرنا" : "Find Us"}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <StoreInfoBar />

        {/* Popular picks — image cards */}
        <section className="section-padding">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {isArabic ? "الأكثر طلباً" : "Popular picks"}
                </p>
                <h2 className="mt-1 text-2xl font-bold text-bone sm:text-3xl">
                  {isArabic ? "من قائمتنا" : "From our menu"}
                </h2>
              </div>
              <Link
                href="/menu"
                className="text-sm font-semibold text-primary hover:text-primary-light"
              >
                {isArabic ? "عرض الكل →" : "See all →"}
              </Link>
            </Reveal>

            <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1 scrollbar-hide snap-x snap-mandatory sm:-mx-6 sm:px-6">
              {featuredItems.map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...defaultTransition, delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl border border-glass-border bg-surface shadow-soft sm:w-[240px]"
                >
                  <div className="relative aspect-square overflow-hidden bg-cream">
                    <Image
                      src={getItemImage(item.categoryId, item.index + i)}
                      alt={isArabic ? item.nameArabic : item.name}
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                    <span className="absolute end-2.5 top-2.5 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-bold text-primary">
                      {item.price.toFixed(1)} OMR
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-bone line-clamp-1">
                      {isArabic ? item.nameArabic : item.name}
                    </h3>
                    <p className="mt-1 text-sm text-subtext line-clamp-2 leading-relaxed">
                      {isArabic ? item.descriptionArabic : item.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* About teaser */}
        <section className="border-y border-glass-border bg-surface section-padding">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center md:gap-16">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {isArabic ? "عنّا" : "About us"}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-bone sm:text-3xl">
                {isArabic ? "معايرة دقيقة في كل فنجان" : "Precision in every cup"}
              </h2>
              <p className="mt-4 text-subtext leading-relaxed">
                {isArabic
                  ? "نحضّر قهوتنا المتخصصة بعناية في أجواء هادئة بالدرزيز."
                  : "Specialty coffee, carefully prepared in a calm space in Ad Driz."}
              </p>
              <Link href="/about" className="mt-6 inline-block">
                <Button variant="outline">{isArabic ? "اقرأ المزيد" : "Learn more"}</Button>
              </Link>
            </Reveal>

            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={defaultTransition}
            >
              <Image
                src={cafeImages.craft}
                alt={isArabic ? "تحضير القهوة" : "Coffee craft"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Reviews */}
        <section className="section-padding">
          <div className="mx-auto max-w-xl px-4 sm:px-6">
            <Reveal className="text-center">
              <h2 className="text-2xl font-bold text-bone sm:text-3xl">
                {isArabic ? "آراء العملاء" : "Guest reviews"}
              </h2>
            </Reveal>

            <div className="relative mt-8 min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={reviewIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-glass-border bg-surface p-7 text-center shadow-soft sm:p-8"
                >
                  <p className="text-base leading-relaxed text-bone sm:text-lg">
                    &ldquo;{isArabic ? testimonials[reviewIndex].textArabic : testimonials[reviewIndex].text}&rdquo;
                  </p>
                  <footer className="mt-4 text-sm font-medium text-subtext">
                    {testimonials[reviewIndex].name}
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex justify-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setReviewIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === reviewIndex ? "w-5 bg-primary" : "w-1.5 bg-glass-border"}`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Visit CTA */}
        <section className="border-t border-glass-border bg-surface section-padding">
          <Reveal className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold text-bone sm:text-3xl">
              {isArabic ? "زُرنا" : "Visit us"}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-subtext">
              {isArabic ? "الدرزيز، عُمان" : "Ad Driz, Oman"}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={brandData.locationUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg">{isArabic ? "الاتجاهات" : "Get directions"}</Button>
              </a>
              <a href={`https://wa.me/${brandData.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">{isArabic ? "واتساب" : "WhatsApp"}</Button>
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
