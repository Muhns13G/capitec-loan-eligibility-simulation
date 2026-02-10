'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface CapitecLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  variant?: 'default' | 'white' | 'compact';
}

export function CapitecLogo({ className, variant = 'default', ...props }: CapitecLogoProps) {
  const forceWhite = variant === 'white';
  // In dark mode (or when forced), text becomes white; otherwise black
  // We use currentColor so Tailwind dark: can override it cleanly

  if (variant === 'compact') {
    // Compact version - just the icon (red and blue curved shapes)
    return (
      <svg
        viewBox="0 0 186 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('h-10 w-auto', className)}
        {...props}
      >
        {/* Red curved shape (left side) */}
        <path
          d="M99.9 0H0v41.9c0 15 12.2 27.1 27.2 27.1h52.2c18.7 0 34 15.3 34 34v39.6c36.2-6 64-35.5 64-70.8C177.4 32.3 142.5 0 99.9 0z"
          fill="#E63934"
        />
        {/* Blue curved shape (creates the C) */}
        <path
          d="M139.8 74.3H87.7c-18.7 0-34-15.1-34-33.8V0C13.3 2.3-19.2 33.7-19.2 71.7c0 39.5 34.9 71.9 77.5 71.9h108.5v-42.2c0-17.1-12.2-29.4-27.2-29.4"
          fill="#00466E"
          transform="translate(17 0)"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="-817.2 411.8 984 144.3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'h-8 w-auto',
        forceWhite ? 'text-white' : 'text-[#1D1D1B] dark:text-white',
        className
      )}
      {...props}
    >
      {/* Red shape */}
      <path
        d="M-617,411.8h-99.9v41.9c0,15,12.2,27.1,27.2,27.1h52.2c18.7,0,34,15.3,34,34v39.6c36.2-6,64-35.5,64-70.8C-539.5,444.1-574.4,411.8-617,411.8"
        fill="#E63934"
      />

      {/* Blue shape */}
      <path
        d="M-658.4,486.1h-52.1c-18.7,0-34-15.1-34-33.8v-40.4c-40.4,2.3-72.8,33.7-72.8,71.7c0,39.5,34.9,71.9,77.5,71.9h108.5v-42.2C-631.2,498.4-643.4,486.1-658.4,486.1"
        fill="#00466E"
      />

      {/* "capitec" text – uses currentColor so it follows the svg text-* classes */}
      <g transform="translate(74.962 6.852)">
        <path
          fill="currentColor"
          d="M91.8,497.2c-11.2,16-30.1,20.9-48,20.9c-30.6,0-56-15.9-56-40.6c0-23.7,25.3-40.5,56.9-40.5c14.6,0,28.8,2.7,39.9,12.6l0.9,0.8c0.5,0.4,1,1,1.5,1.5c0.7,0.7,1.2,1.2,1.2,1.2c-1.3,1.4-2.6,2.2-3.8,2.5c-1.3,0.4-2.6,0.3-3.6,0c-2.1-0.7-3.5-2.2-3.5-2.2c-7.8-7.5-17.4-10.2-28.1-10.2c-22.7,0-37.3,12.9-37.3,34.8c0,19.3,11.4,30.6,30.6,32.5c1.8,0.3,3.8,0.5,6,0.5c3.4,0,6.7-0.4,9.9-1.1c4.3-0.8,8.4-2.2,12.2-4.3c5.6-2.9,10.5-6.7,13.8-11.3L91.8,497.2L91.8,497.2z M-488.2,518c-30.6,0-56-15.9-56-40.6c0-23.7,25.3-40.5,56.9-40.5c14.6,0,28.8,2.7,39.9,12.6l0.9,0.8c0.5,0.4,1,1,1.5,1.5c0.6,0.7,1.2,1.2,1.2,1.2c-1.3,1.4-2.6,2.2-3.8,2.5c-1.3,0.4-2.6,0.3-3.6,0c-1.3-0.4-2.6-1.2-3.5-2.2c-7.8-7.5-17.4-10.2-28.1-10.2c-22.7,0-37.3,12.9-37.3,34.8c0,19.3,11.4,30.6,30.6,32.5c1.8,0.3,3.8,0.5,6,0.5c3.3,0,6.7-0.4,10-1.1c4.3-0.8,8.4-2.2,12.2-4.3c5.7-2.9,10.5-6.7,13.8-11.3l7.3,3C-451.4,513.2-470.3,518-488.2,518z M-243.4,461.5c0,12.8-12.7,23.7-30.6,23.7h-25.9v-3.4c0-1.9,1.6-3.5,3.5-3.5h11.8c10.2,0,18.6-7.5,18.6-16.6c0-9.1-8.4-16.6-18.6-16.6h-18.6v71.5h-22.4v-78.4h51.7C-256.1,438.3-243.4,448.7-243.4,461.5L-243.4,461.5z M-92.8,438.3l68.1,0v6.9h-45.6v26.3h42.6v6.8h-42.6v31.6h45.6v6.9h-68.1C-92.8,516.7-92.8,438.3-92.8,438.3z M-363,516.7l-14.6-24.5h-30.3l3-5.3c0.6-0.9,1.7-1.5,2.8-1.5l20.3,0l-12.9-21.7l-31.3,53.1h-11.5l48.2-80.5l50.2,80.5H-363L-363,516.7z M-116.9,438.3l9.5,0v6.8h-30.1v71.5h-22.3v-71.5l-30.2,0l0-6.9L-116.9,438.3L-116.9,438.3z M-227.1,516.5h22.6v-78.3h-22.6V516.5L-227.1,516.5z"
        />
      </g>
    </svg>
  );
}
