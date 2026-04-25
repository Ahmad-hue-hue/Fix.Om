import { describe, it, expect } from 'vitest';
import menuData from '@/content/menu.json';

describe('Menu Data', () => {
  it('has three categories', () => {
    expect(menuData.categories).toHaveLength(3);
  });

  it('has caffeine category with items', () => {
    const caffeine = menuData.categories.find(c => c.id === 'caffeine');
    expect(caffeine).toBeDefined();
    expect(caffeine?.items).toHaveLength(4);
  });

  it('has refreshments category with items', () => {
    const refreshments = menuData.categories.find(c => c.id === 'refreshments');
    expect(refreshments).toBeDefined();
    expect(refreshments?.items).toHaveLength(3);
  });

  it('has desserts category with items', () => {
    const desserts = menuData.categories.find(c => c.id === 'desserts');
    expect(desserts).toBeDefined();
    expect(desserts?.items).toHaveLength(3);
  });

  it('all items have required fields', () => {
    menuData.categories.forEach(category => {
      category.items.forEach(item => {
        expect(item.id).toBeDefined();
        expect(item.name).toBeDefined();
        expect(item.nameArabic).toBeDefined();
        expect(item.price).toBeDefined();
        expect(typeof item.price).toBe('number');
        expect(item.price).toBeGreaterThan(0);
      });
    });
  });

  it('dessert items have images', () => {
    const desserts = menuData.categories.find(c => c.id === 'desserts');
    desserts?.items.forEach(item => {
      expect(item.image).toBeDefined();
    });
  });

  it('has correct category names in English', () => {
    const caffeine = menuData.categories.find(c => c.id === 'caffeine');
    const refreshments = menuData.categories.find(c => c.id === 'refreshments');
    const desserts = menuData.categories.find(c => c.id === 'desserts');

    expect(caffeine?.name).toBe('Caffeine');
    expect(refreshments?.name).toBe('Refreshments');
    expect(desserts?.name).toBe('Desserts');
  });

  it('has correct category names in Arabic', () => {
    const caffeine = menuData.categories.find(c => c.id === 'caffeine');
    const refreshments = menuData.categories.find(c => c.id === 'refreshments');
    const desserts = menuData.categories.find(c => c.id === 'desserts');

    expect(caffeine?.nameArabic).toBe('الكافيين');
    expect(refreshments?.nameArabic).toBe('المشروبات المنعشة');
    expect(desserts?.nameArabic).toBe('الحلويات');
  });

  it('prices are in OMR currency', () => {
    menuData.categories.forEach(category => {
      category.items.forEach(item => {
        expect(item.price).toBeGreaterThanOrEqual(2.0);
        expect(item.price).toBeLessThanOrEqual(10.0);
      });
    });
  });
});