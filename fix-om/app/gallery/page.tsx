"use client";

import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { SafeImage } from "@/components/ui/safe-image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import { Reveal } from "@/components/layout/page-header";
import { fadeUp, staggerContainer, defaultTransition } from "@/lib/motion";
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
  onClick,
}: {
  image: GalleryImage;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      variants={fadeUp}
      transition={defaultTransition}
      onClick={onClick}
      className={`relative aspect-[3/4] overflow-hidden rounded-2xl text-start ${getGridClass(image.size)}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <SafeImage
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 hover:scale-105"
      />
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

      <main id="main-content" className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6">
        <PageHeader
          label={isArabic ? "الصور" : "Gallery"}
          title={isArabic ? "أجواء المكان" : "Inside the café"}
          description={
            isArabic ? "لمحة من عالمنا" : "A glimpse of our space and craft"
          }
        />

        <motion.div
          className="bento-grid"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {images.map((image) => (
            <GalleryItem
              key={image.src}
              image={image}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </motion.div>

        <Reveal className="mt-16 text-center">
          <div className="inline-flex flex-col items-center rounded-2xl border border-glass-border bg-surface px-8 py-8 shadow-soft">
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
        </Reveal>
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
