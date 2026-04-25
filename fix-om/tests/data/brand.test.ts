import { describe, it, expect } from 'vitest';
import brandData from '@/content/brand.json';

describe('Brand Data', () => {
  it('has required fields', () => {
    expect(brandData.name).toBeDefined();
    expect(brandData.phone).toBeDefined();
    expect(brandData.whatsapp).toBeDefined();
    expect(brandData.instagram).toBeDefined();
  });

  it('has valid phone number', () => {
    expect(brandData.phone).toBe('71776636');
  });

  it('has valid whatsapp number', () => {
    expect(brandData.whatsapp).toBe('96871776636');
  });

  it('has valid instagram handle', () => {
    expect(brandData.instagram).toBe('FIX.OM');
  });

  it('has valid social URLs', () => {
    expect(brandData.social.instagram).toContain('instagram.com');
    expect(brandData.social.whatsapp).toContain('wa.me');
    expect(brandData.social.phone).toContain('tel:');
  });

  it('has valid location URL', () => {
    expect(brandData.locationUrl).toContain('linktr.ee');
  });

  it('has valid operating hours', () => {
    expect(brandData.hours.open).toBe('08:00');
    expect(brandData.hours.close).toBe('23:00');
    expect(brandData.hours.timezone).toBe('UTC+4');
  });

  it('has tagline in both languages', () => {
    expect(brandData.tagline).toBeDefined();
    expect(brandData.taglineArabic).toBeDefined();
  });
});