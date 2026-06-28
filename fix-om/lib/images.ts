/** Unsplash photos for menu product cards only */

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

export function stripEmoji(text: string): string {
  return text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "").trim();
}

export function getItemImage(categoryId: string): string {
  return categoryImages[categoryId] ?? categoryImages["coffee-hot-cold"];
}
