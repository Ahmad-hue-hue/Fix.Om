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
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import {
  revealScale,
  scrollTransition,
  viewportTight,
  defaultTransition,
} from "@/lib/motion";
import { pageImages } from "@/lib/images";
import galleryData from "@/content/gallery.json";
import brandData from "@/content/brand.json";

interface GalleryImage {
  src: string;
  alt: string;
  size: "small" | "medium" | "large";
}

function getGridClass(size: string) {
  if (size === "large") return "md:col-span-2 md:row-span-2";
  return "md:col-span-1";
}

const GalleryItem = memo(function GalleryItem({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      initial="hidden"
      whileInView="visible"
      viewport={viewportTight}
      variants={revealScale}
      transition={{ ...scrollTransition, delay: (index % 8) * 0.05 }}
      onClick={onClick}
      className={`group relative aspect-[3/4] overflow-hidden rounded-2xl text-start shadow-soft ring-1 ring-glass-border ${getGridClass(image.size)}`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
    >
      <SafeImage
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
        <p className="text-sm font-medium text-white">{image.alt}</p>
      </div>
    </motion.button>
  );
});

export default function GalleryPage() {
  const { language } = useBilingual();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const isArabic = language === "ar";

  const images: GalleryImage[] = useMemo(
    () =>
      galleryData.images.map((img) => ({
        ...img,
        size: img.size as "small" | "medium" | "large",
      })),
    []
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
            isArabic ? "لمحة من عالمنا" : "A glimpse of our space and craft"
          }
        />

        <div className="bento-grid">
          {images.map((image, index) => (
            <GalleryItem
              key={`${image.src}-${index}`}
              image={image}
              index={index}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportTight}
          transition={scrollTransition}
        >
          <div className="inline-flex flex-col items-center rounded-2xl border border-glass-border bg-surface px-8 py-8 shadow-card">
            <p className="text-sm text-subtext">
              {isArabic ? "تابعنا على إنستغرام" : "Follow us on Instagram"}
            </p>
            <motion.a
              href={brandData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="gap-2">
                <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
                @fix.om
              </Button>
            </motion.a>
          </div>
        </motion.div>
      </main>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bone/5 md:aspect-video">
                  <SafeImage
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
