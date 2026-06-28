/** Unsplash imagery — verified IDs, globally deduplicated per visible batch. */

const unsplash = (id: string, w = 800, h?: number) => {
  const base = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
  return h ? `${base}&h=${h}` : base;
};

/** All IDs verified HTTP 200 against images.unsplash.com */
export const masterPool = [
  "photo-1511920170033-f8396924c348",
  "photo-1509042239860-f550ce710b93",
  "photo-1470337458703-46ad1756a187",
  "photo-1578662996442-48f60103fc96",
  "photo-1556679343-c7306c1976bc",
  "photo-1546173159-315724a31696",
  "photo-1536935338788-846bb9981813",
  "photo-1544145945-f90425340c7e",
  "photo-1571934811356-5cc061b6821f",
  "photo-1600271886742-f049cd451bba",
  "photo-1603569283847-aa295f0d016a",
  "photo-1523362628745-0c100150b504",
  "photo-1578985545062-69928b1d9587",
  "photo-1563729784474-d77dbb933a9e",
  "photo-1488477181946-6428a0291777",
  "photo-1554118811-1e0d58224f24",
] as const;

/** Local café photos for home, about accents, and gallery hero */
export const localPhotos = {
  homeAbout: "/assets/WhatsApp Image 2026-04-24 at 5.46.57 PM.jpeg",
  homeGallery1: "/assets/WhatsApp Image 2026-04-24 at 5.46.34 PM.jpeg",
  homeGallery2: "/assets/WhatsApp Image 2026-04-25 at 12.09.04 AM.jpeg",
  homeGallery3: "/assets/WhatsApp Image 2026-04-24 at 5.47.33 PM.jpeg",
  homeGallery4: "/assets/WhatsApp Image 2026-04-24 at 5.47.15 PM.jpeg",
  homeGallery5: "/assets/WhatsApp Image 2026-04-24 at 5.48.19 PM.jpeg",
  homeGallery6: "/assets/WhatsApp Image 2026-04-24 at 5.45.39 PM.jpeg",
  galleryHero: "/assets/WhatsApp Image 2026-04-24 at 5.48.19 PM.jpeg",
  aboutHero: "/assets/WhatsApp Image 2026-04-24 at 5.45.25 PM.jpeg",
} as const;

export const pageImages = {
  homeAbout: localPhotos.homeAbout,
  contact: unsplash(masterPool[15], 1200),
  menu: unsplash(masterPool[1], 1200),
  about: localPhotos.aboutHero,
  gallery: localPhotos.galleryHero,
} as const;

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function poolUrl(index: number, seed: string): string {
  const id = masterPool[index % masterPool.length];
  const w = 640 + (hashString(seed) % 4) * 120;
  const h = 720 + (hashString(`${seed}:h`) % 4) * 100;
  return unsplash(id, w, h);
}

/** Assign unique images within a visible group (carousel, category grid, etc.) */
export function assignUniqueImages(
  items: { categoryId: string; itemId: string }[]
): string[] {
  const used = new Set<number>();

  return items.map((item, i) => {
    let idx =
      (hashString(`${item.categoryId}:${item.itemId}`) + i * 7919) %
      masterPool.length;

    for (let attempt = 0; attempt < masterPool.length; attempt += 1) {
      if (!used.has(idx)) break;
      idx = (idx + 1) % masterPool.length;
    }

    used.add(idx);
    return poolUrl(idx, `${item.categoryId}:${item.itemId}:${i}`);
  });
}

/** Stable image for a single item (may repeat across full menu — pool is limited) */
export function getItemImage(categoryId: string, itemId: string, itemIndex = 0): string {
  const idx =
    (hashString(`${categoryId}:${itemId}`) + itemIndex * 13) % masterPool.length;
  return poolUrl(idx, `${categoryId}:${itemId}:${itemIndex}`);
}
