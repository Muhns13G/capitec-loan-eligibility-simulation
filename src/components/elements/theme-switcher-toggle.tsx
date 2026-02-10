'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

interface ThemeSwitcherToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function ThemeSwitcherToggle({ className, ...props }: ThemeSwitcherToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!mounted) {
    return (
      <div className={cn('flex items-center space-x-2', className)} {...props}>
        <div className="bg-input h-6 w-10 animate-pulse rounded-full" />
      </div>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';

  return (
    <div className={cn('flex items-center space-x-2', className)} {...props}>
      <button
        type="button"
        onClick={toggleTheme}
        className={`focus:ring-primary relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
          isDark ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <span className="sr-only">Toggle theme</span>
        <span
          className={`bg-background inline-block h-4 w-4 transform rounded-full transition duration-200 ease-in-out ${
            isDark ? 'translate-x-6' : 'translate-x-1'
          }`}
        >
          {isDark ? (
            <MoonIcon className="text-foreground mt-0.5 ml-0.5 h-3 w-3" />
          ) : (
            <SunIcon className="text-foreground mt-0.5 ml-0.5 h-3 w-3" />
          )}
        </span>
      </button>
    </div>
  );
}
