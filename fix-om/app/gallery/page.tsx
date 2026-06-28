"use client";

import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SafeImage } from "@/components/ui/safe-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { fadeUp, staggerContainer, defaultTransition } from "@/lib/motion";
import galleryData from "@/content/gallery.json";
import brandData from "@/content/brand.json";

interface GalleryImage {
  src: string;
  alt: string;
  size: "small" | "medium" | "large";
}

function getGridClass(size: string) {
  switch (size) {
    case "large":
      return "md:col-span-2 md:row-span-2";
    case "medium":
      return "md:col-span-1 md:row-span-1";
    default:
      return "md:col-span-1";
  }
}

const GalleryItem = memo(function GalleryItem({
  image,
  onClick,
  index,
}: {
  image: GalleryImage;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ ...defaultTransition, delay: (index % 6) * 0.05 }}
      className={`relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group ${getGridClass(image.size)}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <SafeImage
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bone/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white text-sm font-medium">{image.alt}</p>
      </div>
    </motion.div>
  );
});

export default function GalleryPage() {
  const { language } = useBilingual();
  const { instagram } = brandData;
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

  const instagramUrl = instagram.startsWith("http")
    ? instagram
    : `https://instagram.com/${instagram}`;

  return (
    <div className="min-h-screen bg-obsidian">
      <Header />

      <main id="main-content" className="pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow={isArabic ? "FIX" : "Visuals"}
            title={isArabic ? "الصور" : "Gallery"}
            description={
              isArabic
                ? "رحلة بصرية عبر عالمنا"
                : "A visual journey through our world"
            }
          />

          <motion.div
            className="bento-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {images.map((image, index) => (
              <GalleryItem
                key={image.src}
                image={image}
                index={index}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </motion.div>

          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={defaultTransition}
          >
            <div className="surface-card p-8 md:p-10 inline-block max-w-md w-full">
              <h3 className="font-display text-2xl font-semibold text-bone mb-3">
                {isArabic ? "تابعنا على إنستغرام" : "Follow us on Instagram"}
              </h3>
              <p className="text-subtext mb-6">
                {isArabic
                  ? "ابق على اطلاع بأحدث إبداعاتنا"
                  : "Stay updated with our latest creations"}
              </p>
              <motion.a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-light transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                @fix.om
              </motion.a>
            </div>
          </motion.div>
        </div>
      </main>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none">
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden bg-bone/5">
                  <SafeImage
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-center text-white/80 mt-4 text-sm">{selectedImage.alt}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
