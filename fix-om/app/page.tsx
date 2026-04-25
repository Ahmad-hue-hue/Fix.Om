"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LiveStatusBadge } from "@/components/home/live-status";
import { Button } from "@/components/ui/button";
import { useBilingual } from "@/lib/hooks/use-bilingual";

export default function Home() {
  const { language } = useBilingual();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian to-obsidian/80" />
          
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[96px]" />
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <LiveStatusBadge />
            </motion.div>

            <motion.h1
              className="mt-8 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              FIX YOUR DAY
            </motion.h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-subtext"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {language === "en" 
                ? "Speciality Coffee. Precision Calibration." 
                : "قهوه متخصصة. معايرة دقيقة."}
            </motion.p>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/menu">
                <Button size="lg" className="text-base">
                  {language === "en" ? "Explore the Menu →" : "استكشف القائمة →"}
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 1.2, duration: 0.5 },
              y: { delay: 1.5, duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="22" height="38" rx="11" stroke="#F5F5F7" strokeWidth="2"/>
              <motion.circle 
                cx="12" 
                cy="12" 
                r="3" 
                fill="#D4AF37"
                animate={{ cy: [8, 14, 8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}