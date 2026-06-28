"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LiveStatusBadge } from "@/components/home/live-status";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { staggerContainer, fadeUp, defaultTransition } from "@/lib/motion";
import menuData from "@/content/menu.json";
import brandData from "@/content/brand.json";

export default function Home() {
  const { language } = useBilingual();
  const isArabic = language === "ar";

  const brands = [
    { name: "Starbucks", src: "/brand-logos/starbucks-coffee.svg" },
    { name: "Double Coffee", src: "/brand-logos/double-coffee.svg" },
    { name: "Tully's", src: "/brand-logos/tully-s-coffee.svg" },
    { name: "Coffee Design", src: "/brand-logos/logo-coffee-design-1.svg" },
    { name: "Burger King", src: "/brand-logos/burger-king-4.svg" },
  ];

  const testimonials = [
    { name: "Ahmed Al", text: "Best coffee in Ad Driz!", textArabic: "أفضل قهوة في الدرزيز!", rating: 5 },
    { name: "Sarah K.", text: "Love the atmosphere!", textArabic: "أحب الأجواء!", rating: 5 },
    { name: "Omar B.", text: "Amazing cold brew!", textArabic: "كولد برو مدهش!", rating: 5 },
  ];

  const featuredItems = useMemo(
    () => menuData.categories.flatMap((c) => c.items).slice(0, 6),
    []
  );

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const highlights = [
    {
      value: isArabic ? "متخصصة" : "Specialty",
      label: isArabic ? "قهوة مختارة" : "Curated beans",
    },
    {
      value: "08–23",
      label: isArabic ? "ساعات يومياً" : "Daily hours",
    },
    {
      value: isArabic ? "الدرزيز" : "Ad Driz",
      label: isArabic ? "عُمان" : "Oman",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 hero-gradient" />

          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-primary/25 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-56 h-56 md:w-72 md:h-72 bg-cream/10 rounded-full blur-[96px]" />
          </motion.div>

          <motion.div
            className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} transition={defaultTransition}>
              <LiveStatusBadge />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={defaultTransition}
              className="mt-8 font-display text-[clamp(2.75rem,10vw,5.5rem)] font-bold tracking-tight leading-[0.95] text-white"
            >
              {isArabic ? (
                <>
                  <span className="block">أصلح</span>
                  <span className="block text-white/90">يومك</span>
                </>
              ) : (
                <>
                  <span className="block">FIX</span>
                  <span className="block text-white/90">YOUR DAY</span>
                </>
              )}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={defaultTransition}
              className="mt-5 text-lg sm:text-xl md:text-2xl font-medium text-white/90"
            >
              {isArabic ? "قهوه متخصصة" : "Speciality Coffee"}
            </motion.p>

            <motion.p
              variants={fadeUp}
              transition={defaultTransition}
              className="mt-4 text-sm sm:text-base md:text-lg text-white/70 max-w-lg mx-auto leading-relaxed"
            >
              {isArabic
                ? "قهوه متخصصة. معايرة دقيقة."
                : "Speciality Coffee. Precision Calibration."}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={defaultTransition}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <Link href="/menu">
                <Button size="lg" variant="hero">
                  {isArabic ? "استكشف القائمة" : "Explore Menu"}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="heroOutline">
                  {isArabic ? "زُرنا" : "Visit Us"}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 z-10 flex flex-wrap justify-center gap-4 md:gap-8 px-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                className="glass rounded-2xl px-4 py-3 text-center min-w-[100px]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
              >
                <p className="text-white font-semibold text-sm">{item.value}</p>
                <p className="text-white/60 text-xs mt-0.5">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <span className="text-white/50 text-xs uppercase tracking-widest">
              {isArabic ? "مرر" : "Scroll"}
            </span>
            <motion.div
              className="w-5 h-8 rounded-full border border-white/30 flex justify-center pt-1.5"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-1 h-2 rounded-full bg-white/60" />
            </motion.div>
          </motion.div>
        </section>

        {/* Brand partners marquee */}
        <section className="py-10 md:py-14 border-y border-glass-border bg-surface overflow-hidden">
          <SectionHeading
            eyebrow={isArabic ? "شركاؤنا" : "Partners"}
            title={isArabic ? "علامات نثق بها" : "Brands we work with"}
            align="center"
            className="mb-8"
          />
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
            <div className="marquee-track gap-12 md:gap-16 px-8">
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center h-12 md:h-14 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.src}
                    alt={brand.name}
                    className="h-8 md:h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured menu preview */}
        <section className="section-padding px-4 sm:px-6 bg-obsidian">
          <div className="max-w-6xl mx-auto">
            <SectionHeading
              eyebrow={isArabic ? "القائمة" : "Menu"}
              title={isArabic ? "مختاراتنا" : "Customer favorites"}
              description={
                isArabic
                  ? "مشروبات مصنوعة بدقة — من الإسبريسو إلى اللاتيه المتخصص."
                  : "Precision-crafted drinks — from espresso to signature lattes."
              }
            />

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {featuredItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  transition={defaultTransition}
                  whileHover={{ y: -4 }}
                  className="surface-card p-5 md:p-6 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-bone group-hover:text-primary transition-colors">
                        {isArabic ? item.nameArabic : item.name}
                      </h3>
                      <p className="text-sm text-subtext mt-1 line-clamp-2">
                        {isArabic ? item.descriptionArabic : item.description}
                      </p>
                    </div>
                    <span className="font-mono text-sm font-semibold text-primary whitespace-nowrap bg-cream px-2.5 py-1 rounded-full">
                      {item.price.toFixed(1)} OMR
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={defaultTransition}
            >
              <Link href="/menu">
                <Button variant="outline" size="lg">
                  {isArabic ? "عرض القائمة الكاملة" : "View full menu"}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Quick explore cards */}
        <section className="section-padding px-4 sm:px-6 bg-cream/50">
          <div className="max-w-6xl mx-auto">
            <SectionHeading
              eyebrow={isArabic ? "اكتشف" : "Discover"}
              title={isArabic ? "عالم FIX" : "The FIX experience"}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {[
                {
                  href: "/about",
                  title: isArabic ? "قصتنا" : "Our story",
                  desc: isArabic ? "من الحبة إلى الفنجان" : "From bean to cup",
                },
                {
                  href: "/gallery",
                  title: isArabic ? "الصور" : "Gallery",
                  desc: isArabic ? "أجواء المكان" : "Cafe atmosphere",
                },
                {
                  href: "/contact",
                  title: isArabic ? "تواصل" : "Contact",
                  desc: isArabic ? "زُرنا اليوم" : "Find us today",
                },
              ].map((card, index) => (
                <motion.div
                  key={card.href}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, ...defaultTransition }}
                >
                  <Link href={card.href} className="block h-full">
                    <div className="surface-card p-6 md:p-8 h-full gradient-border card-hover">
                      <span className="text-xs uppercase tracking-widest text-primary font-medium">
                        0{index + 1}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl font-semibold text-bone mt-3">
                        {card.title}
                      </h3>
                      <p className="text-subtext mt-2">{card.desc}</p>
                      <span className="inline-block mt-6 text-primary text-sm font-medium">
                        {isArabic ? "استكشف ←" : "Explore →"}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding px-4 sm:px-6 bg-surface">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              eyebrow={isArabic ? "آراء العملاء" : "Testimonials"}
              title={isArabic ? "ماذا يقول عملاؤنا" : "What our guests say"}
            />

            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl p-8 md:p-12 text-center bg-primary text-white shadow-elevated"
                >
                  <div className="flex justify-center gap-1 mb-5">
                    {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-cream" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg md:text-xl leading-relaxed text-white/95 italic max-w-2xl mx-auto">
                    &ldquo;{isArabic ? testimonials[currentTestimonial].textArabic : testimonials[currentTestimonial].text}&rdquo;
                  </p>
                  <p className="mt-6 font-semibold text-cream">
                    — {testimonials[currentTestimonial].name}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-primary w-8"
                      : "w-2 bg-glass-border hover:bg-primary/40"
                  }`}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Location CTA */}
        <section className="section-padding px-4 sm:px-6 bg-primary text-white">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={defaultTransition}
          >
            <p className="text-white/70 text-sm uppercase tracking-widest mb-3">
              {isArabic ? "موقعنا" : "Find us"}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              {isArabic ? "الدرزيز، عُمان" : "Ad Driz, Oman"}
            </h2>
            <p className="mt-4 text-white/80 text-base md:text-lg">
              {isArabic
                ? "مفتوح يومياً من 8 صباحاً حتى 11 مساءً"
                : "Open daily from 8:00 AM to 11:00 PM"}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={brandData.locationUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg">
                  {isArabic ? "افتح الخريطة" : "Get directions"}
                </Button>
              </a>
              <a href={`https://wa.me/${brandData.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button variant="heroOutline" size="lg">
                  {isArabic ? "واتساب" : "WhatsApp us"}
                </Button>
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
