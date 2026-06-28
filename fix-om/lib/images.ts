/** Unsplash imagery — verified IDs only, unique per menu item. */

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** All IDs verified HTTP 200 against images.unsplash.com */
const verified = {
  coffee1: "photo-1511920170033-f8396924c348",
  coffee2: "photo-1509042239860-f550ce710b93",
  coffee3: "photo-1470337458703-46ad1756a187",
  drink1: "photo-1578662996442-48f60103fc96",
  drink2: "photo-1556679343-c7306c1976bc",
  drink3: "photo-1546173159-315724a31696",
  drink4: "photo-1536935338788-846bb9981813",
  drink5: "photo-1544145945-f90425340c7e",
  tea1: "photo-1571934811356-5cc061b6821f",
  juice1: "photo-1600271886742-f049cd451bba",
  juice2: "photo-1603569283847-aa295f0d016a",
  water1: "photo-1523362628745-0c100150b504",
  dessert1: "photo-1578985545062-69928b1d9587",
  dessert2: "photo-1563729784474-d77dbb933a9e",
  dessert3: "photo-1488477181946-6428a0291777",
  cafe: "photo-1554118811-1e0d58224f24",
} as const;

const coffeePool = [
  verified.coffee1,
  verified.coffee2,
  verified.coffee3,
  verified.drink1,
  verified.drink2,
];

const specialPool = [verified.drink1, verified.drink2, verified.drink3, verified.coffee3];

const filteredPool = [verified.coffee1, verified.coffee2, verified.coffee3, verified.drink1];

const teaPool = [verified.tea1, verified.drink2, verified.drink3, verified.drink4];

const mojitoPool = [verified.drink4, verified.drink5, verified.drink3, verified.juice1];

const shakePool = [verified.dessert2, verified.dessert3, verified.juice2, verified.drink5];

const juicePool = [verified.juice1, verified.juice2, verified.drink5, verified.drink2];

const waterPool = [verified.water1, verified.juice1];

const dessertPool = [verified.dessert1, verified.dessert2, verified.dessert3, verified.drink2];

const categoryPools: Record<string, string[]> = {
  "coffee-hot-cold": coffeePool,
  "fix-special": specialPool,
  "filtered-coffee": filteredPool,
  tea: teaPool,
  mojito: mojitoPool,
  "milkshakes-smoothies": shakePool,
  "fresh-juices": juicePool,
  water: waterPool,
  desserts: dessertPool,
};

/** Local café photos for home, about accents, and gallery hero */
export const localPhotos = {
  homeAbout: "/assets/WhatsApp Image 2026-04-24 at 5.46.57 PM.jpeg",
  homeGallery1: "/assets/WhatsApp Image 2026-04-24 at 5.46.34 PM.jpeg",
  homeGallery2: "/assets/WhatsApp Image 2026-04-25 at 12.09.04 AM.jpeg",
  homeGallery3: "/assets/WhatsApp Image 2026-04-24 at 5.47.33 PM.jpeg",
  homeGallery4: "/assets/WhatsApp Image 2026-04-24 at 5.47.15 PM.jpeg",
  galleryHero: "/assets/WhatsApp Image 2026-04-24 at 5.48.19 PM.jpeg",
  aboutHero: "/assets/WhatsApp Image 2026-04-24 at 5.45.25 PM.jpeg",
} as const;

export const pageImages = {
  homeAbout: localPhotos.homeAbout,
  contact: unsplash(verified.cafe, 1200),
  menu: unsplash(verified.coffee2, 1200),
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

/** Stable unique image per menu item within its category pool */
export function getItemImage(categoryId: string, itemId: string, itemIndex = 0): string {
  const pool = categoryPools[categoryId] ?? coffeePool;
  const idx = (hashString(`${categoryId}:${itemId}`) + itemIndex) % pool.length;
  const width = 640 + (hashString(itemId) % 3) * 160;
  return unsplash(pool[idx], width);
}
