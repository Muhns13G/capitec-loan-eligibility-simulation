'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CurrencyInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  label?: string;
  error?: string;
  helperText?: string;
  value: number;
  onChange: (value: number) => void;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, label, error, helperText, value, onChange, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const [displayValue, setDisplayValue] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);

    // Format for display (with thousand separators)
    const formatForDisplay = (num: number): string => {
      if (num === 0 || isNaN(num)) return '';
      return new Intl.NumberFormat('en-ZA').format(num);
    };

    // Initialize display value
    React.useEffect(() => {
      if (!isFocused) {
        setDisplayValue(formatForDisplay(value));
      }
    }, [value, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Allow only digits and at most one decimal point
      // First, remove all non-digit, non-dot characters
      let cleaned = inputValue.replace(/[^\d.]/g, '');

      // Ensure only one decimal point
      const parts = cleaned.split('.');
      if (parts.length > 2) {
        cleaned = parts[0] + '.' + parts.slice(1).join('');
      }

      // Limit to 2 decimal places
      if (parts[1] && parts[1].length > 2) {
        cleaned = parts[0] + '.' + parts[1].slice(0, 2);
      }

      setDisplayValue(cleaned);

      if (cleaned === '' || cleaned === '.') {
        onChange(0);
        return;
      }

      const parsedValue = parseFloat(cleaned);
      if (!isNaN(parsedValue)) {
        onChange(parsedValue);
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
      // Show raw number without formatting when focused
      if (value > 0) {
        setDisplayValue(value.toString());
      }
    };

    const handleBlur = () => {
      setIsFocused(false);
      // Format with thousand separators when blurred
      setDisplayValue(formatForDisplay(value));
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-zinc-500 dark:text-zinc-400">
            R
          </span>
          <input
            id={inputId}
            type="text"
            inputMode="decimal"
            className={cn(
              'flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 pl-8 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300',
              error && 'border-red-500 focus-visible:ring-red-500',
              className
            )}
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={ref}
            aria-invalid={error ? 'true' : undefined}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{helperText}</p>
        )}
      </div>
    );
  }
);
CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };
