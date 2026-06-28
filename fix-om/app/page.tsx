"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StoreInfoBar } from "@/components/home/store-info-bar";
import { Button } from "@/components/ui/button";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { defaultTransition } from "@/lib/motion";
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
    () => menuData.categories.flatMap((c) => c.items).slice(0, 8),
    []
  );

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-obsidian">
      <Header />

      <main id="main-content">
        {/* Hero — bottom-aligned content, no overlapping layers */}
        <section className="relative isolate min-h-[88svh]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/50 to-primary-dark/30" />

          <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-white/70">
                {isArabic ? "قهوه متخصصة" : "Speciality Coffee"}
              </p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                {isArabic ? (
                  <>FIX — أصلح يومك</>
                ) : (
                  <>
                    FIX
                    <br />
                    YOUR DAY
                  </>
                )}
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
                {isArabic
                  ? brandData.taglineArabic
                  : brandData.tagline}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/menu" className="w-full sm:w-auto">
                  <Button size="lg" variant="hero" className="w-full sm:min-w-[160px]">
                    {isArabic ? "عرض القائمة" : "View Menu"}
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" variant="heroOutline" className="w-full sm:min-w-[160px]">
                    {isArabic ? "الموقع والاتصال" : "Find Us"}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <StoreInfoBar />

        {/* Featured menu — horizontal scroll, Mobbin-style product row */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-bone sm:text-3xl">
                  {isArabic ? "الأكثر طلباً" : "Popular picks"}
                </h2>
                <p className="mt-1 text-sm text-subtext sm:text-base">
                  {isArabic ? "من قائمتنا" : "From our menu"}
                </p>
              </div>
              <Link
                href="/menu"
                className="shrink-0 text-sm font-semibold text-primary hover:text-primary-light"
              >
                {isArabic ? "الكل ←" : "See all →"}
              </Link>
            </div>

            <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide snap-x snap-mandatory sm:-mx-6 sm:px-6">
              {featuredItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ ...defaultTransition, delay: index * 0.04 }}
                  className="w-[260px] shrink-0 snap-start rounded-2xl border border-glass-border bg-surface p-5 shadow-soft"
                >
                  <div className="mb-4 flex h-28 items-center justify-center rounded-xl bg-cream/80">
                    <span className="text-3xl" aria-hidden="true">☕</span>
                  </div>
                  <h3 className="font-semibold text-bone line-clamp-1">
                    {isArabic ? item.nameArabic : item.name}
                  </h3>
                  <p className="mt-1 text-sm text-subtext line-clamp-2 leading-relaxed">
                    {isArabic ? item.descriptionArabic : item.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-primary">
                    {item.price.toFixed(1)} OMR
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* About snippet */}
        <section className="border-y border-glass-border bg-surface py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                {isArabic ? "عن FIX" : "About FIX"}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-bone sm:text-3xl">
                {isArabic ? "معايرة دقيقة في كل فنجان" : "Precision in every cup"}
              </h2>
              <p className="mt-4 text-subtext leading-relaxed">
                {isArabic
                  ? "نحضّر قهوتنا المتخصصة بعناية — من الإسبريسو إلى التحضير بالتقطير — في أجواء هادئة في الدرزيز."
                  : "We craft specialty coffee with care — from espresso to pour-over — in a calm space in Ad Driz."}
              </p>
              <Link href="/about" className="mt-6 inline-block">
                <Button variant="outline">{isArabic ? "اقرأ المزيد" : "Read more"}</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: "/gallery", label: isArabic ? "الصور" : "Gallery" },
                { href: "/menu", label: isArabic ? "القائمة" : "Menu" },
                { href: "/contact", label: isArabic ? "اتصل بنا" : "Contact" },
                { href: brandData.instagramUrl, label: "Instagram", external: true },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex min-h-[88px] items-center justify-center rounded-2xl border border-glass-border bg-obsidian px-4 text-center text-sm font-semibold text-bone transition-colors hover:border-primary/30 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-bone sm:text-3xl">
              {isArabic ? "آراء العملاء" : "Guest reviews"}
            </h2>

            <div className="relative mt-8 min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={currentTestimonial}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-glass-border bg-surface p-8 text-center shadow-soft"
                >
                  <p className="text-base leading-relaxed text-bone sm:text-lg">
                    &ldquo;{isArabic ? testimonials[currentTestimonial].textArabic : testimonials[currentTestimonial].text}&rdquo;
                  </p>
                  <footer className="mt-4 text-sm font-medium text-subtext">
                    {testimonials[currentTestimonial].name}
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentTestimonial ? "w-6 bg-primary" : "w-1.5 bg-glass-border"
                  }`}
                  aria-label={`Review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Visit */}
        <section className="border-t border-glass-border bg-surface py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
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
                <Button size="lg" variant="outline">
                  {isArabic ? "واتساب" : "WhatsApp"}
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
