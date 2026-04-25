import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { BilingualProvider, useBilingual } from '@/lib/hooks/use-bilingual';
import { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BilingualProvider>{children}</BilingualProvider>
);

describe('useBilingual', () => {
  it('provides language state', async () => {
    const { result } = renderHook(() => useBilingual(), { wrapper });
    
    await waitFor(() => {
      expect(result.current.language).toBeDefined();
      expect(['en', 'ar']).toContain(result.current.language);
    });
  });

  it('provides isRTL state', async () => {
    const { result } = renderHook(() => useBilingual(), { wrapper });
    
    await waitFor(() => {
      expect(result.current.isRTL).toBeDefined();
      expect(typeof result.current.isRTL).toBe('boolean');
    });
  });

  it('provides toggleLanguage function', async () => {
    const { result } = renderHook(() => useBilingual(), { wrapper });
    
    await waitFor(() => {
      expect(result.current.toggleLanguage).toBeDefined();
      expect(typeof result.current.toggleLanguage).toBe('function');
    });
  });

  it('provides setLanguage function', async () => {
    const { result } = renderHook(() => useBilingual(), { wrapper });
    
    await waitFor(() => {
      expect(result.current.setLanguage).toBeDefined();
      expect(typeof result.current.setLanguage).toBe('function');
    });
  });
});