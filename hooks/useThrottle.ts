import { useCallback, useRef } from 'react';

type ThrottleCallback<T extends unknown[]> = (...args: T) => void;

export function useThrottle<T extends unknown[]>(
  callback: ThrottleCallback<T>,
  delay: number
) {
  const lastCall = useRef(0);

  return useCallback(
    (...args: T) => {
      const now = new Date().getTime();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );
}
