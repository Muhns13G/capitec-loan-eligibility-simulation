import { useEffect, useRef } from 'react';

/**
 * Hook to announce messages to screen readers
 * Using a visually hidden element with aria-live
 */
export function useAnnouncer() {
  const announcementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      const element = announcementRef.current;
      if (element) {
        element.textContent = '';
      }
    };
  }, []);

  const announce = (message: string, _priority: 'polite' | 'assertive' = 'polite') => {
    if (announcementRef.current) {
      // Clear the content first to trigger re-announcement on same message
      announcementRef.current.textContent = '';
      // Use setTimeout to ensure the browser processes the clear first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (announcementRef.current) {
            announcementRef.current.textContent = message;
          }
        });
      });
    }
  };

  return { announcementRef, announce };
}
