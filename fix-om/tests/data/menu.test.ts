import { describe, it, expect } from 'vitest';
import menuData from '@/content/menu.json';

describe('Menu Data', () => {
  it('has nine categories', () => {
    expect(menuData.categories).toHaveLength(9);
  });

  it('has coffee-hot-cold category with items', () => {
    const coffee = menuData.categories.find(c => c.id === 'coffee-hot-cold');
    expect(coffee).toBeDefined();
    expect(coffee?.items.length).toBeGreaterThan(0);
  });

  it('has fix-special category with items', () => {
    const fixSpecial = menuData.categories.find(c => c.id === 'fix-special');
    expect(fixSpecial).toBeDefined();
    expect(fixSpecial?.items.length).toBeGreaterThan(0);
  });

  it('has desserts category with items', () => {
    const desserts = menuData.categories.find(c => c.id === 'desserts');
    expect(desserts).toBeDefined();
    expect(desserts?.items.length).toBeGreaterThan(0);
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

  it('has correct category names in English', () => {
    const coffee = menuData.categories.find(c => c.id === 'coffee-hot-cold');
    const desserts = menuData.categories.find(c => c.id === 'desserts');

    expect(coffee?.name).toContain('Coffee');
    expect(desserts?.name).toBe('🍰 Desserts');
  });

  it('has correct category names in Arabic', () => {
    const coffee = menuData.categories.find(c => c.id === 'coffee-hot-cold');
    const desserts = menuData.categories.find(c => c.id === 'desserts');

    expect(coffee?.nameArabic).toContain('قهوة');
    expect(desserts?.nameArabic).toBe('🍰 حلويات');
  });

  it('prices are valid OMR amounts', () => {
    menuData.categories.forEach(category => {
      category.items.forEach(item => {
        expect(item.price).toBeGreaterThanOrEqual(0.1);
        expect(item.price).toBeLessThanOrEqual(10.0);
      });
    });
  });

  it('all categories have bilingual names', () => {
    menuData.categories.forEach(category => {
      expect(category.name).toBeTruthy();
      expect(category.nameArabic).toBeTruthy();
    });
  });
});
