import { useState, useCallback } from 'react';
import { STORAGE_KEY } from '../constants';
import type { Job } from '../types';

function readStorage(): Job[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(data: Job[]): string | null {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return null;
  } catch {
    return 'Storage quota exceeded. Please export and clear some data.';
  }
}

export function useLocalStorage() {
  const [items, setItemsRaw] = useState<Job[]>(readStorage);
  const [storageError, setStorageError] = useState<string | null>(null);

  const setItems = useCallback((updater: Job[] | ((prev: Job[]) => Job[])) => {
    setItemsRaw((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const error = writeStorage(next);
      setStorageError(error);
      return next;
    });
  }, []);

  return {
    items,
    setItems,
    storageError,
    clearStorageError: () => setStorageError(null),
  };
}
