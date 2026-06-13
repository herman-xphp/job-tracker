import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';
import type { Job } from '../types';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return empty array when storage is empty', () => {
    const { result } = renderHook(() => useLocalStorage());
    expect(result.current.items).toEqual([]);
  });

  it('should read existing data from localStorage', () => {
    const data: Job[] = [{ id: '1', company: 'Google', position: 'SWE', date: '2025-01-01', status: 'Applied' }];
    localStorage.setItem('job-tracker-data', JSON.stringify(data));
    const { result } = renderHook(() => useLocalStorage());
    expect(result.current.items).toEqual(data);
  });

  it('should return empty array on corrupt JSON', () => {
    localStorage.setItem('job-tracker-data', 'not-json');
    const { result } = renderHook(() => useLocalStorage());
    expect(result.current.items).toEqual([]);
  });

  it('should return empty array if stored value is not an array', () => {
    localStorage.setItem('job-tracker-data', JSON.stringify({ foo: 'bar' }));
    const { result } = renderHook(() => useLocalStorage());
    expect(result.current.items).toEqual([]);
  });

  it('should persist items to localStorage on set', () => {
    const { result } = renderHook(() => useLocalStorage());
    const newJob: Job = { id: '1', company: 'Meta', position: 'PM', date: '2025-01-01', status: 'Applied' };
    act(() => {
      result.current.setItems([newJob]);
    });
    expect(result.current.items).toEqual([newJob]);
    const stored = JSON.parse(localStorage.getItem('job-tracker-data')!);
    expect(stored).toEqual([newJob]);
  });

  it('should support updater function', () => {
    const { result } = renderHook(() => useLocalStorage());
    act(() => {
      result.current.setItems([{ id: '1', company: 'A', position: 'B', date: '2025-01-01', status: 'Applied' }]);
    });
    act(() => {
      result.current.setItems((prev) => [...prev, { id: '2', company: 'C', position: 'D', date: '2025-01-02', status: 'Applied' }]);
    });
    expect(result.current.items).toHaveLength(2);
  });
});
