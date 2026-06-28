"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StoreInfoBar } from "@/components/home/store-info-bar";
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
import { getItemImage, localPhotos } from "@/lib/images";
import menuData from "@/content/menu.json";
import brandData from "@/content/brand.json";

const galleryPreview = [
  { src: localPhotos.homeGallery1, alt: "Interior" },
  { src: localPhotos.homeGallery2, alt: "Barista" },
  { src: localPhotos.homeGallery3, alt: "Atmosphere" },
  { src: localPhotos.homeGallery4, alt: "Latte art" },
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
        .flatMap((c) => c.items.slice(0, 2).map((item) => ({ ...item, categoryId: c.id })))
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
        <section className="relative isolate min-h-[92svh] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/50 to-primary-dark/20" />

          <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
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
                className="mt-3 font-display text-[2.75rem] font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {isArabic ? "أصلح يومك" : "Your Day, Fixed"}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                transition={defaultTransition}
                className="mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg"
              >
                {isArabic ? brandData.taglineArabic : brandData.tagline}
              </motion.p>
              <motion.div
                variants={fadeUp}
                transition={defaultTransition}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Link href="/menu" className="w-full sm:w-auto">
                  <Button size="lg" variant="hero" className="w-full sm:min-w-[160px]">
                    {isArabic ? "القائمة" : "View Menu"}
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" variant="heroOutline" className="w-full sm:min-w-[160px]">
                    {isArabic ? "زُرنا" : "Find Us"}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="h-8 w-5 rounded-full border border-white/30 p-1">
              <motion.div
                className="mx-auto h-1.5 w-1 rounded-full bg-white/70"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </section>

        <StoreInfoBar />

        {/* Popular picks */}
        <section className="section-padding">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              className="mb-10 flex items-end justify-between gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={scrollTransition}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {isArabic ? "الأكثر طلباً" : "Popular picks"}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-bone sm:text-3xl">
                  {isArabic ? "من قائمتنا" : "From our menu"}
                </h2>
              </div>
              <Link
                href="/menu"
                className="text-sm font-semibold text-primary transition-colors hover:text-primary-light"
              >
                {isArabic ? "عرض الكل →" : "See all →"}
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {featuredItems.map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ ...scrollTransition, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="overflow-hidden rounded-2xl border border-glass-border bg-surface shadow-soft transition-shadow hover:shadow-card"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                    <SafeImage
                      src={getItemImage(item.categoryId, item.id, i)}
                      alt={isArabic ? item.nameArabic : item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <span className="absolute end-2.5 top-2.5 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-bold text-primary shadow-sm">
                      {item.price.toFixed(1)} OMR
                    </span>
                  </div>
                  <div className="p-3.5 sm:p-4">
                    <h3 className="text-sm font-semibold text-bone line-clamp-1 sm:text-base">
                      {isArabic ? item.nameArabic : item.name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-subtext line-clamp-2 sm:text-sm">
                      {isArabic ? item.descriptionArabic : item.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery preview */}
        <section className="border-y border-glass-border bg-surface section-padding">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <motion.div
              className="mb-8 flex items-end justify-between gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={scrollTransition}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {isArabic ? "الصور" : "Gallery"}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-bone sm:text-3xl">
                  {isArabic ? "أجواء FIX" : "Life at FIX"}
                </h2>
              </div>
              <Link
                href="/gallery"
                className="text-sm font-semibold text-primary transition-colors hover:text-primary-light"
              >
                {isArabic ? "عرض المعرض →" : "View gallery →"}
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {galleryPreview.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  variants={revealScale}
                  transition={{ ...scrollTransition, delay: i * 0.08 }}
                  className={`relative overflow-hidden rounded-2xl ring-1 ring-glass-border ${
                    i === 0 ? "col-span-2 aspect-[16/10] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[280px]" : "aspect-square"
                  }`}
                >
                  <Link href="/gallery" className="group block h-full w-full">
                    <SafeImage
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary-dark/0 transition-colors duration-300 group-hover:bg-primary-dark/20" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About teaser */}
        <section className="section-padding">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center md:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={scrollTransition}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                {isArabic ? "عنّا" : "About us"}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-bone sm:text-3xl md:text-4xl">
                {isArabic ? "معايرة دقيقة في كل فنجان" : "Precision in every cup"}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-subtext md:text-lg">
                {isArabic
                  ? "نحضّر قهوتنا المتخصصة بعناية في أجواء هادئة بالدرزيز — مكان للتركيز، المحادثة، والاستمتاع."
                  : "Specialty coffee, carefully prepared in a calm space in Ad Driz — built for focus, conversation, and great taste."}
              </p>
              <Link href="/about" className="mt-7 inline-block">
                <Button variant="outline">{isArabic ? "اقرأ المزيد" : "Learn more"}</Button>
              </Link>
            </motion.div>

            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card ring-1 ring-glass-border md:aspect-[4/5]"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={revealScale}
              transition={scrollTransition}
              whileHover={{ scale: 1.01 }}
            >
              <SafeImage
                src={localPhotos.homeAbout}
                alt={isArabic ? "تحضير القهوة" : "Coffee craft"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Reviews */}
        <section className="border-t border-glass-border bg-surface section-padding">
          <div className="mx-auto max-w-xl px-4 sm:px-6">
            <motion.div
              className="text-center"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={scrollTransition}
            >
              <h2 className="font-display text-2xl font-bold text-bone sm:text-3xl">
                {isArabic ? "آراء العملاء" : "Guest reviews"}
              </h2>
            </motion.div>

            <div className="relative mt-8 min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={reviewIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-glass-border bg-obsidian p-7 text-center shadow-soft sm:p-8"
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
        <section className="relative overflow-hidden section-padding">
          <div className="absolute inset-0">
            <SafeImage
              src={localPhotos.homeGallery3}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-obsidian/70" />
          </div>
          <motion.div
            className="relative mx-auto max-w-6xl px-4 text-center sm:px-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={scrollTransition}
          >
            <h2 className="font-display text-2xl font-bold text-bone sm:text-3xl">
              {isArabic ? "زُرنا اليوم" : "Visit us today"}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-subtext">
              {isArabic ? "الدرزيز، عُمان · يومياً 8 ص – 11 م" : "Ad Driz, Oman · Daily 8 AM – 11 PM"}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={brandData.locationUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg">{isArabic ? "الاتجاهات" : "Get directions"}</Button>
              </a>
              <a href={`https://wa.me/${brandData.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">{isArabic ? "واتساب" : "WhatsApp"}</Button>
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
