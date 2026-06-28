/** Unsplash imagery — unique pools per category, keyed by item id. */

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const coffeePool = [
  "photo-1511920170033-f8396924c348",
  "photo-1509042239860-f550ce710b93",
  "photo-1461023058943-07fbbe16a84d",
  "photo-1514434751162-6e6ae8cc582f",
  "photo-1495474472287-4d44bcf4d1f6",
  "photo-1517704974628-05e78e27a5ad",
  "photo-1572442388796-11668a67e53d",
  "photo-1485808191679-5f86510681a3",
  "photo-1503754345166-0c6db8fd093a",
  "photo-1515823662972-f56767b8bf16",
  "photo-1534778101176-778e24052741",
  "photo-1442512595331-e89e73853f86",
];

const specialPool = [
  "photo-1461884713569-c488349cf2aa",
  "photo-1578662996442-48f60103fc96",
  "photo-1556679343-c7306c1976bc",
  "photo-1546173159-315724a31696",
  "photo-1622597467836-f2979b7ae784",
  "photo-1613478223719-2ab118b79670",
];

const filteredPool = [
  "photo-1497935586351-67de888ed577",
  "photo-1447933601403-0c668de566e9",
  "photo-1511920170033-f8396924c348",
  "photo-1509042239860-f550ce710b93",
  "photo-1495474472287-4d44bcf4d1f6",
  "photo-1514434751162-6e6ae8cc582f",
];

const teaPool = [
  "photo-1564890369478-c89ca6d344ce",
  "photo-1571934811356-5cc061b6821f",
  "photo-1556679343-c7306c1976bc",
  "photo-1544787219-7bdb902cc92f",
  "photo-1597318181400-3f973795b9d8",
  "photo-1576092768241-dec231879fc4",
];

const mojitoPool = [
  "photo-1551538827-9ab036437798",
  "photo-1536935338788-846bb9981813",
  "photo-1546173159-315724a31696",
  "photo-1622480067850-269a292b0c76",
  "photo-1436752948497-179efd39d3d2",
  "photo-1544145945-f90425340c7e",
];

const shakePool = [
  "photo-1572490122747-3969b75c909e",
  "photo-1578662996442-48f60103fc96",
  "photo-1622597467836-f2979b7ae784",
  "photo-1613478223719-2ab118b79670",
  "photo-1551024709-8f23be0a86f4",
  "photo-1570197788417-154f2280ed59",
];

const juicePool = [
  "photo-1600271886742-f049cd451bba",
  "photo-1622597467836-f2979b7ae784",
  "photo-1613478223719-2ab118b79670",
  "photo-1603569283847-aa295f0d016a",
  "photo-1523677011783-c91d1bbe2f89",
];

const waterPool = [
  "photo-1523362628745-0c100150b504",
  "photo-1548839140-29a7491751cf",
];

const dessertPool = [
  "photo-1578985545062-69928b1d9587",
  "photo-1558961363-fa8fdf41db29",
  "photo-1563729784474-d77dbb933a9e",
  "photo-1606313564200-e75d5e30476f",
  "photo-1488477181946-6428a0291777",
  "photo-1571116865096-7e8b78142f08",
  "photo-1586985289688-ca5cf59d3ff9",
  "photo-1565958011703-44f9827ba187",
  "photo-1606890737304-57ea1fda6295",
];

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

export const pageImages = {
  homeAbout: unsplash("photo-1514434751162-6e6ae8cc582f", 900),
  contact: unsplash("photo-1554118811-1e0d58224f24", 1200),
  menu: unsplash("photo-1509042239860-f550ce710b93", 1200),
  about: unsplash("photo-1447933601403-0c668de566e9", 1200),
  gallery: unsplash("photo-1501339847422-ac426a332ccb", 1200),
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
  const idx = (hashString(itemId) + itemIndex) % pool.length;
  return unsplash(pool[idx]);
}
