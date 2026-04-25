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
          <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian to-obsidian/80" />
          
          <motion.div 
            className="absolute inset-0 opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
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
              className="mt-8 text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-tight leading-none"
            >
              <span className="block">FIX</span>
              <span className="block text-gradient-gold">YOUR DAY</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="mt-8 text-xl sm:text-2xl md:text-3xl text-subtext font-light"
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
            className={`absolute bottom-8 ${isRTL ? 'left-8' : 'right-8'} hidden md:flex flex-col items-center gap-4`}
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-gold to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            />
            <span className="text-xs text-subtext writing-vertical-lr rotate-180">
              {language === "en" ? "SCROLL" : "مرر"}
            </span>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="22" height="38" rx="11" stroke="#F5F5F7" strokeWidth="1.5" strokeOpacity="0.5"/>
                <motion.circle 
                  cx="12" 
                  cy="12" 
                  r="3" 
                  fill="#D4AF37"
                  animate={{ cy: [8, 14, 8], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
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