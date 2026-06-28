"use client";

import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeroStrip } from "@/components/ui/page-hero-strip";
import { SafeImage } from "@/components/ui/safe-image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import {
  revealScale,
  scrollTransition,
  viewportTight,
  fadeUp,
} from "@/lib/motion";
import { pageImages } from "@/lib/images";
import galleryData from "@/content/gallery.json";
import brandData from "@/content/brand.json";

type GalleryCategory = "all" | "coffee" | "space" | "food";

interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
  featured?: boolean;
}

const filters: { id: GalleryCategory; en: string; ar: string }[] = [
  { id: "all", en: "All", ar: "الكل" },
  { id: "coffee", en: "Coffee", ar: "قهوة" },
  { id: "space", en: "Space", ar: "المكان" },
  { id: "food", en: "Food", ar: "طعام" },
];

const GalleryItem = memo(function GalleryItem({
  image,
  index,
  tall,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  tall?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      initial="hidden"
      whileInView="visible"
      viewport={viewportTight}
      variants={revealScale}
      transition={{ ...scrollTransition, delay: (index % 6) * 0.06 }}
      onClick={onClick}
      className={`gallery-item group relative w-full overflow-hidden rounded-2xl text-start shadow-soft ring-1 ring-glass-border ${
        tall ? "gallery-item-tall" : ""
      }`}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
    >
      <SafeImage
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/15 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
        <p className="text-sm font-medium text-white drop-shadow-sm">{image.alt}</p>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <FontAwesomeIcon icon={faExpand} className="h-3 w-3" />
        </span>
      </div>
    </motion.button>
  );
});

export default function GalleryPage() {
  const { language } = useBilingual();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("all");
  const isArabic = language === "ar";

  const images: GalleryImage[] = useMemo(
    () =>
      galleryData.images.map((img) => ({
        ...img,
        category: img.category as GalleryCategory,
      })),
    []
  );

  const featured = useMemo(() => images.filter((img) => img.featured).slice(0, 3), [images]);

  const filtered = useMemo(
    () => (activeFilter === "all" ? images : images.filter((img) => img.category === activeFilter)),
    [images, activeFilter]
  );

  return (
    <div className="min-h-screen bg-obsidian">
      <Header />

      <main id="main-content" className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <PageHeroStrip
          image={pageImages.gallery}
          label={isArabic ? "الصور" : "Gallery"}
          title={isArabic ? "أجواء المكان" : "Inside the café"}
          description={
            isArabic ? "لمحة من عالمنا — قهوة، مكان، وطعام" : "Coffee, space, and craft — captured at FIX"
          }
        />

        {featured.length >= 3 && (
          <motion.section
            className="mb-10 grid grid-cols-12 gap-3 md:mb-14 md:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewportTight}
            variants={fadeUp}
            transition={scrollTransition}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(featured[0])}
              className="group relative col-span-12 aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-glass-border md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[360px]"
            >
              <SafeImage
                src={featured[0].src}
                alt={featured[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 to-transparent" />
              <p className="absolute bottom-4 start-4 text-lg font-semibold text-white">
                {featured[0].alt}
              </p>
            </button>
            <button
              type="button"
              onClick={() => setSelectedImage(featured[1])}
              className="group relative col-span-6 aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-glass-border md:col-span-5"
            >
              <SafeImage
                src={featured[1].src}
                alt={featured[1].alt}
                fill
                sizes="40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </button>
            <button
              type="button"
              onClick={() => setSelectedImage(featured[2])}
              className="group relative col-span-6 aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-glass-border md:col-span-5"
            >
              <SafeImage
                src={featured[2].src}
                alt={featured[2].alt}
                fill
                sizes="40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </button>
          </motion.section>
        )}

        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? "bg-primary text-white shadow-soft"
                  : "border border-glass-border bg-surface text-subtext hover:border-primary/30 hover:text-bone"
              }`}
            >
              {isArabic ? filter.ar : filter.en}
            </button>
          ))}
        </div>

        <motion.div layout className="gallery-masonry">
          <AnimatePresence mode="popLayout">
            {filtered.map((image, index) => (
              <GalleryItem
                key={image.src}
                image={image}
                index={index}
                tall={index % 5 === 0}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportTight}
          transition={scrollTransition}
        >
          <div className="inline-flex flex-col items-center rounded-2xl border border-glass-border bg-surface px-8 py-10 shadow-card">
            <FontAwesomeIcon icon={faInstagram} className="h-8 w-8 text-primary" />
            <p className="mt-4 text-lg font-semibold text-bone">
              {isArabic ? "تابعنا على إنستغرام" : "Follow @fix.om"}
            </p>
            <p className="mt-2 max-w-sm text-sm text-subtext">
              {isArabic
                ? "شاهد آخر التحديثات والعروض اليومية"
                : "Daily updates, specials, and behind-the-bar moments"}
            </p>
            <motion.a
              href={brandData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="gap-2">
                <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
                Instagram
              </Button>
            </motion.a>
          </div>
        </motion.div>
      </main>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <div className="relative aspect-[4/3] max-h-[85vh] w-full overflow-hidden rounded-2xl bg-primary-dark/90 ring-1 ring-white/10 md:aspect-video">
                  <SafeImage
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="mt-3 text-center text-sm text-white/80">{selectedImage.alt}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
