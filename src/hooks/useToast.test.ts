import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast } from './useToast';

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should start with null toast', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toast).toBeNull();
  });

  it('should show toast message', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.showToast('Hello');
    });
    expect(result.current.toast).toBe('Hello');
  });

  it('should clear toast after duration', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.showToast('Hello');
    });
    expect(result.current.toast).toBe('Hello');
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.toast).toBeNull();
  });

  it('should cancel previous timer when showing new toast', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.showToast('First');
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    act(() => {
      result.current.showToast('Second');
    });
    expect(result.current.toast).toBe('Second');
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.toast).toBe('Second');
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.toast).toBeNull();
  });
});
