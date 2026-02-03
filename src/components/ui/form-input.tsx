'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  as?: 'input' | 'select';
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, helperText, as = 'input', id, children, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    if (as === 'select') {
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
          <select
            id={inputId}
            className={cn(
              "flex h-9 w-full items-center justify-center rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "dark:border-zinc-800",
              "aria-invalid:border-red-500 aria-invalid:ring-red-500",
              error && "border-red-500 dark:border-red-500",
              className
            )}
            aria-invalid={error ? 'true' : undefined}
            value={props.value}
            onChange={props.onChange}
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {children}
          </select>
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
        <Input
          id={inputId}
          type={props.type}
          className={cn(error && "border-red-500 dark:border-red-500", className)}
          value={props.value}
          onChange={props.onChange}
          ref={ref}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />
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
FormInput.displayName = 'FormInput';

export { FormInput };
