/** Curated Unsplash imagery for FIX café (Mobbin-style product cards & banners). */

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const cafeImages = {
  hero: unsplash("photo-1442512595331-e89e73853f86", 1920),
  menuBanner: unsplash("photo-1509042239860-f550ce710b93", 1600),
  aboutBanner: unsplash("photo-1497935586351-67de888ed577", 1600),
  galleryBanner: unsplash("photo-1501339847422-ac426a332ccb", 1600),
  contactBanner: unsplash("photo-1554118811-1e0d58224f24", 1600),
  origin: unsplash("photo-1447933601403-0c668de566e9", 900),
  craft: unsplash("photo-1514434751162-6e6ae8cc582f", 900),
  space: unsplash("photo-1554118811-1e0d58224f24", 900),
} as const;

/** Per-category drink/food imagery pools */
export const categoryImages: Record<string, string[]> = {
  "coffee-hot-cold": [
    unsplash("photo-1509042239860-f550ce710b93"),
    unsplash("photo-1514434751162-6e6ae8cc582f"),
    unsplash("photo-1461023058943-07fbbe16a84d"),
    unsplash("photo-1511920170033-f8396924c348"),
  ],
  "fix-special": [
    unsplash("photo-1517704974628-05e78e27a5ad"),
    unsplash("photo-1578662996442-48f60103fc96"),
    unsplash("photo-1556679343-c7306c1976bc"),
  ],
  "filtered-coffee": [
    unsplash("photo-1497935586351-67de888ed577"),
    unsplash("photo-1511920170033-f8396924c348"),
    unsplash("photo-1447933601403-0c668de566e9"),
  ],
  tea: [
    unsplash("photo-1564890369478-c89ca6d344ce"),
    unsplash("photo-1556679343-c7306c1976bc"),
    unsplash("photo-1571934811356-5cc061b6821f"),
  ],
  mojito: [
    unsplash("photo-1551538827-9ab036437798"),
    unsplash("photo-1546173159-315724a31696"),
    unsplash("photo-1536935338788-846bb9981813"),
  ],
  "milkshakes-smoothies": [
    unsplash("photo-1572490122747-3969b75c909e"),
    unsplash("photo-1622597467836-f2979b7ae784"),
    unsplash("photo-1613478223719-2ab118b79670"),
  ],
  "fresh-juices": [
    unsplash("photo-1622597467836-f2979b7ae784"),
    unsplash("photo-1613478223719-2ab118b79670"),
    unsplash("photo-1600271886742-f049cd451bba"),
  ],
  water: [
    unsplash("photo-1548839140-29a7491751cf"),
    unsplash("photo-1523362628745-0c100150b504"),
  ],
  desserts: [
    unsplash("photo-1558961363-fa8fdf41db29"),
    unsplash("photo-1578985545062-69928b1d9587"),
    unsplash("photo-1563729784474-d77dbb933a9e"),
    unsplash("photo-1606313564200-e75d5e30476f"),
  ],
};

export const galleryImages = [
  { src: unsplash("photo-1442512595331-e89e73853f86"), alt: "Café interior", size: "large" as const },
  { src: unsplash("photo-1509042239860-f550ce710b93"), alt: "Latte art", size: "medium" as const },
  { src: unsplash("photo-1495474472287-4d44bcf4d1f6"), alt: "Coffee workspace", size: "medium" as const },
  { src: unsplash("photo-1514434751162-6e6ae8cc582f"), alt: "Pour over", size: "small" as const },
  { src: unsplash("photo-1501339847422-ac426a332ccb"), alt: "Café seating", size: "large" as const },
  { src: unsplash("photo-1554118811-1e0d58224f24"), alt: "Bar counter", size: "medium" as const },
  { src: unsplash("photo-1461023058943-07fbbe16a84d"), alt: "Iced coffee", size: "small" as const },
  { src: unsplash("photo-1447933601403-0c668de566e9"), alt: "Coffee beans", size: "large" as const },
  { src: unsplash("photo-1558961363-fa8fdf41db29"), alt: "Pastry display", size: "medium" as const },
  { src: unsplash("photo-1578662996442-48f60103fc96"), alt: "Specialty drink", size: "small" as const },
  { src: unsplash("photo-1556679343-c7306c1976bc"), alt: "Tea service", size: "large" as const },
  { src: unsplash("photo-1511920170033-f8396924c348"), alt: "Espresso shot", size: "medium" as const },
];

export function stripEmoji(text: string): string {
  return text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "").trim();
}

export function getCategoryImage(categoryId: string, index = 0): string {
  const pool = categoryImages[categoryId] ?? categoryImages["coffee-hot-cold"];
  return pool[index % pool.length];
}

export function getItemImage(categoryId: string, itemIndex: number): string {
  return getCategoryImage(categoryId, itemIndex);
}
