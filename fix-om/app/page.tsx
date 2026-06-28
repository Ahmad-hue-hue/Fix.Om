"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StoreInfoBar } from "@/components/home/store-info-bar";
import { PopularPicks } from "@/components/home/popular-picks";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { SafeImage } from "@/components/ui/safe-image";
import { Button } from "@/components/ui/button";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import {
  fadeUp,
  staggerContainer,
  defaultTransition,
  revealScale,
  scrollTransition,
  viewportOnce,
} from "@/lib/motion";
import { localPhotos } from "@/lib/images";
import menuData from "@/content/menu.json";
import brandData from "@/content/brand.json";

const galleryPreview = [
  { src: localPhotos.homeGallery1, alt: "Interior" },
  { src: localPhotos.homeGallery2, alt: "Barista" },
  { src: localPhotos.homeGallery3, alt: "Atmosphere" },
];

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
      menuData.categories
        .flatMap((c) => c.items.slice(0, 1).map((item) => ({ ...item, categoryId: c.id })))
        .slice(0, 8),
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
        {/* Hero */}
        <section className="relative isolate min-h-[90svh] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full scale-105 object-cover"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-primary-dark/30" />

          <div className="relative z-10 mx-auto flex min-h-[90svh] max-w-6xl flex-col justify-end px-4 pb-20 pt-28 sm:px-6 sm:pb-24">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-2xl"
            >
              <motion.div
                variants={fadeUp}
                transition={defaultTransition}
                className="mb-6 flex flex-wrap gap-2"
              >
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md">
                  {isArabic ? "الدرزيز، عُمان" : "Ad Driz, Oman"}
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md">
                  {isArabic ? "8 ص – 11 م" : "8 AM – 11 PM"}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={defaultTransition}
                className="font-display text-[2.75rem] font-bold leading-[0.98] tracking-tight text-white sm:text-6xl md:text-7xl"
              >
                {isArabic ? (
                  "أصلح يومك"
                ) : (
                  <>
                    Your Day,
                    <br />
                    <span className="text-white/90">Fixed.</span>
                  </>
                )}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={defaultTransition}
                className="mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
              >
                {isArabic ? brandData.taglineArabic : brandData.tagline}
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={defaultTransition}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Link href="/menu" className="w-full sm:w-auto">
                  <Button size="lg" variant="hero" className="w-full sm:min-w-[168px]">
                    {isArabic ? "القائمة" : "View Menu"}
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" variant="heroOutline" className="w-full sm:min-w-[168px]">
                    {isArabic ? "زُرنا" : "Find Us"}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <StoreInfoBar />

        <PopularPicks items={featuredItems} isArabic={isArabic} />

        <GalleryPreview photos={galleryPreview} isArabic={isArabic} />

        {/* About */}
        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={scrollTransition}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {isArabic ? "عنّا" : "About us"}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-bone sm:text-4xl">
                {isArabic ? "معايرة دقيقة في كل فنجان" : "Precision in every cup"}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-subtext md:text-lg">
                {isArabic
                  ? "نحضّر قهوتنا المتخصصة بعناية في أجواء هادئة بالدرزيز."
                  : "Specialty coffee, carefully prepared in a calm space in Ad Driz."}
              </p>
              <Link href="/about" className="mt-8 inline-block">
                <Button variant="outline">{isArabic ? "اقرأ المزيد" : "Learn more"}</Button>
              </Link>
            </motion.div>

            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elevated ring-1 ring-glass-border"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={revealScale}
              transition={scrollTransition}
            >
              <SafeImage
                src={localPhotos.homeAbout}
                alt={isArabic ? "تحضير القهوة" : "Coffee craft"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Reviews */}
        <section className="border-y border-glass-border bg-surface py-16 md:py-20">
          <div className="mx-auto max-w-lg px-4 sm:px-6">
            <motion.p
              className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={scrollTransition}
            >
              {isArabic ? "آراء العملاء" : "Guest reviews"}
            </motion.p>

            <div className="relative mt-8 min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={reviewIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <p className="font-display text-xl leading-relaxed text-bone sm:text-2xl">
                    &ldquo;{isArabic ? testimonials[reviewIndex].textArabic : testimonials[reviewIndex].text}&rdquo;
                  </p>
                  <footer className="mt-5 text-sm font-medium text-subtext">
                    {testimonials[reviewIndex].name}
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex justify-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setReviewIndex(i)}
                  className={`h-1 rounded-full transition-all ${i === reviewIndex ? "w-6 bg-primary" : "w-1.5 bg-glass-border"}`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Visit */}
        <section className="py-16 md:py-24">
          <motion.div
            className="mx-auto max-w-6xl px-4 sm:px-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={revealScale}
            transition={scrollTransition}
          >
            <div className="relative overflow-hidden rounded-3xl bg-primary-dark px-6 py-14 text-center shadow-elevated sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute inset-0 opacity-30">
                <SafeImage
                  src={localPhotos.homeGallery5}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/90 to-primary-dark/75" />

              <div className="relative">
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {isArabic ? "زُرنا اليوم" : "Visit us today"}
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-white/75">
                  {isArabic ? "الدرزيز، عُمان" : "Ad Driz, Oman"}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a href={brandData.locationUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="hero">
                      {isArabic ? "الاتجاهات" : "Get directions"}
                    </Button>
                  </a>
                  <a href={`https://wa.me/${brandData.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="heroOutline">
                      {isArabic ? "واتساب" : "WhatsApp"}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
