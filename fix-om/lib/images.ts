/** Unsplash imagery for menu products and page accents (gallery keeps local assets). */

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categoryImages: Record<string, string> = {
  "coffee-hot-cold": unsplash("photo-1511920170033-f8396924c348"),
  "fix-special": unsplash("photo-1461884713569-c488349cf2aa"),
  "filtered-coffee": unsplash("photo-1497935586351-67de888ed577"),
  tea: unsplash("photo-1564890369478-c89ca6d344ce"),
  mojito: unsplash("photo-1551538827-9ab036437798"),
  "milkshakes-smoothies": unsplash("photo-1572490122747-3969b75c909e"),
  "fresh-juices": unsplash("photo-1600271886742-f049cd451bba"),
  water: unsplash("photo-1523362628745-0c100150b504"),
  desserts: unsplash("photo-1578985545062-69928b1d9587"),
};

export const pageImages = {
  homeAbout: unsplash("photo-1514434751162-6e6ae8cc582f", 900),
  contact: unsplash("photo-1554118811-1e0d58224f24", 1200),
  menu: unsplash("photo-1509042239860-f550ce710b93", 1200),
  about: unsplash("photo-1447933601403-0c668de566e9", 1200),
} as const;

export function getItemImage(categoryId: string): string {
  return categoryImages[categoryId] ?? categoryImages["coffee-hot-cold"];
}
