import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLiveStatus } from '@/lib/hooks/use-live-status';

describe('useLiveStatus', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-25T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    const { result } = renderHook(() => useLiveStatus());
    expect(result.current).toBeDefined();
  });

  it('has isOpen property', () => {
    const { result } = renderHook(() => useLiveStatus());
    expect(result.current.isOpen).toBeDefined();
    expect(typeof result.current.isOpen).toBe('boolean');
  });

  it('has statusText property', () => {
    const { result } = renderHook(() => useLiveStatus());
    expect(result.current.statusText).toBeDefined();
    expect(typeof result.current.statusText).toBe('string');
  });

  it('has nextOpenTime property', () => {
    const { result } = renderHook(() => useLiveStatus());
    expect(result.current.nextOpenTime).toBeDefined();
    expect(typeof result.current.nextOpenTime).toBe('string');
  });

  it('has currentTime property', () => {
    const { result } = renderHook(() => useLiveStatus());
    expect(result.current.currentTime).toBeDefined();
    expect(typeof result.current.currentTime).toBe('string');
  });

  it('is open at noon (12:00)', () => {
    vi.setSystemTime(new Date('2026-04-25T12:00:00'));
    const { result } = renderHook(() => useLiveStatus());
    expect(result.current.isOpen).toBe(true);
  });
});