"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LiveStatusBadge } from "@/components/home/live-status";
import { Button } from "@/components/ui/button";
import { useBilingual } from "@/lib/hooks/use-bilingual";

export default function Home() {
  const { language, isRTL } = useBilingual();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main id="main-content">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-br from-obsidian/70 via-obsidian/50 to-obsidian/70" />
          
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[96px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[160px]" />
          </motion.div>

          <motion.div 
            className="relative z-10 text-center px-4 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <LiveStatusBadge />
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none"
            >
              <span className="block">FIX</span>
              <span className="block text-gradient-gold">YOUR DAY</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="mt-6 text-base sm:text-lg md:text-xl text-subtext font-light px-4"
            >
              {language === "en" 
                ? "Speciality Coffee. Precision Calibration." 
                : "قهوه متخصصة. معايرة دقيقة."}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-12">
              <Link href="/menu">
                <Button size="lg" className="text-lg px-8 py-6">
                  {language === "en" ? "Explore the Menu →" : "استكشف القائمة →"}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 z-10 w-full px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="flex flex-col md:flex-row gap-3 md:gap-8 text-xs sm:text-sm text-center justify-center">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.2 }}
              >
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-subtext">Open Daily 7AM - 10PM</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4 }}
              >
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-subtext">Al Mouj, Muscat</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className={`absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-6`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            {[
              { label: "Instagram", href: "https://instagram.com/fix.om" },
              { label: "Location", href: "https://linktr.ee/fix.om" },
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="writing-vertical-lr text-xs text-subtext hover:text-gold transition-colors"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 + index * 0.1 }}
                whileHover={{ x: -5 }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, staggerChildren: 0.15 }}
            >
              {[
                { title: "Premium Beans", desc: "Single origin, ethically sourced", icon: "☕" },
                { title: "Precision Brewing", desc: "V60, Aeropress, Cold Brew", icon: "⚗️" },
                { title: "Artisan Pastries", desc: "Freshly baked daily", icon: "🥐" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="glass rounded-2xl p-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-bone mb-2">{item.title}</h3>
                  <p className="text-subtext">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}