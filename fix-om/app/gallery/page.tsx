"use client";

import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useBilingual } from "@/lib/hooks/use-bilingual";
import galleryData from "@/content/gallery.json";

interface GalleryImage {
  src: string;
  alt: string;
  size: "small" | "medium" | "large";
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
  const getGridClass = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "medium":
        return "md:col-span-1 md:row-span-1";
      default:
        return "";
    }
  };

  return (
<motion.div
      className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-500 hover:scale-110"
      />
      <div className="absolute inset-0 bg-obsidian/0 hover:bg-obsidian/10 transition-colors duration-300" />
    </motion.div>
  );
});

export default function GalleryPage() {
  const { language } = useBilingual();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const images: GalleryImage[] = useMemo(() => 
    galleryData.images.map((img) => ({
      ...img,
      size: img.size as "small" | "medium" | "large",
    })), 
  []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main id="main-content" className="pt-32 pb-16 px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
<h1 className="text-5xl md:text-7xl font-bold text-primary">
              {language === "en" ? "Gallery" : "الصور"}
            </h1>
          <p className="mt-4 text-subtext text-lg">
            {language === "en" 
              ? "A visual journey through our world" 
              : "رحلة بصرية عبر عالمنا"}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
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
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-2xl p-8 inline-block">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {language === "en" ? "Follow us on Instagram" : "تابعنا على إنستغرام"}
            </h3>
            <p className="text-subtext mb-6">
              @{language === "en" ? "Stay updated with our latest creations" : "ابق على اطلاع بأحدث إبداعاتنا"}
            </p>
            <Button variant="outline" className="gap-2">
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
              @FIX.OM
            </Button>
          </div>
        </motion.div>
      </main>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-[4/3] md:aspect-video rounded-xl overflow-hidden">
                  <Image
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