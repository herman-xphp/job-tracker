import { useState, useCallback, useRef } from 'react';
import { TOAST_DURATION } from '../constants';

export function useToast() {
  const [toast, setToast] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(msg);
    timerRef.current = setTimeout(() => setToast(null), TOAST_DURATION);
  }, []);

  return { toast, showToast };
}
