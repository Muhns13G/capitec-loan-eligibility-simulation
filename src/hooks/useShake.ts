'use client';

import { useState, useCallback } from 'react';

export function useShake() {
  const [isShaking, setIsShaking] = useState(false);

  const shake = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }, []);

  return { isShaking, shake };
}
