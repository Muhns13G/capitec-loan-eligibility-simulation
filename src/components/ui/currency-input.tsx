'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
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
    const [displayValue, setDisplayValue] = React.useState(
      value > 0 ? value.toFixed(2) : ''
    );

    React.useEffect(() => {
      setDisplayValue(value > 0 ? value.toFixed(2) : '');
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/[^\d.]/g, '');
      setDisplayValue(newValue);

      if (newValue === '') {
        onChange(0);
        return;
      }

      const parsedValue = parseFloat(newValue);
      if (!isNaN(parsedValue)) {
        onChange(parsedValue);
      }
    };

    const handleBlur = () => {
      if (value > 0) {
        setDisplayValue(value.toFixed(2));
      }
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
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500 dark:text-zinc-400">
            R
          </span>
          <Input
            id={inputId}
            type="text"
            inputMode="decimal"
            className={cn('pl-8', className)}
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={ref}
            aria-invalid={error ? 'true' : undefined}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };
