import React from 'react';

/**
 * SkipNavigation Component
 *
 * WCAG 2.4.1 Bypass Blocks - Provides a way to skip repetitive content
 * Allows keyboard users to jump directly to main content
 */
export function SkipNavigation() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
    >
      Skip to main content
    </a>
  );
}

/**
 * VisuallyHidden Component
 *
 * Hides content visually but keeps it accessible to screen readers
 * Used for providing context that is visually apparent but needs screen reader text
 */
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

/**
 * LiveRegion Component
 *
 * WCAG 4.1.3 Status Messages - Announces dynamic content changes
 * Used for error messages, success notifications, and status updates
 */
interface LiveRegionProps {
  children: React.ReactNode;
  assertive?: boolean;
  id?: string;
}

export function LiveRegion({ children, assertive = false, id }: LiveRegionProps) {
  return (
    <div
      id={id}
      role="status"
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  );
}

/**
 * ErrorSummary Component
 *
 * WCAG 3.3.1 Error Identification - Groups error messages at the top of forms
 * Allows users to quickly identify and navigate to errors
 */
interface ErrorSummaryProps {
  errors: Record<string, string | undefined>;
  title?: string;
}

export function ErrorSummary({ errors, title = 'There is a problem' }: ErrorSummaryProps) {
  const errorEntries = Object.entries(errors).filter(([, value]) => value);

  if (errorEntries.length === 0) return null;

  return (
    <div
      role="alert"
      aria-labelledby="error-summary-title"
      className="mb-6 rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-950"
    >
      <h2
        id="error-summary-title"
        className="mb-2 text-lg font-semibold text-red-900 dark:text-red-100"
      >
        {title}
      </h2>
      <ul className="list-inside list-disc space-y-1">
        {errorEntries.map(([field, message]) => (
          <li key={field}>
            <a
              href={`#${field}`}
              className="text-red-700 underline hover:text-red-900 dark:text-red-300 dark:hover:text-red-100"
            >
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * FieldError Component
 *
 * WCAG 3.3.1 Error Identification - Associates error messages with form fields
 */
interface FieldErrorProps {
  id: string;
  message?: string;
}

export function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p id={id} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
      {message}
    </p>
  );
}

/**
 * RequiredFieldIndicator Component
 *
 * WCAG 3.3.2 Labels or Instructions - Indicates required fields
 */
export function RequiredFieldIndicator() {
  return (
    <span aria-label="required" className="ml-1 text-red-500">
      *
    </span>
  );
}

/**
 * PageHeader Component
 *
 * WCAG 2.4.6 Headings and Labels - Consistent heading structure
 */
interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{title}</h1>
      {description && (
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">{description}</p>
      )}
    </div>
  );
}

/**
 * Breadcrumb Component
 *
 * WCAG 2.4.8 Location - Shows user location within site hierarchy
 */
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span aria-hidden="true" className="mx-2">
                /
              </span>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="hover:text-zinc-900 hover:underline dark:hover:text-zinc-50"
              >
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className="font-medium text-zinc-900 dark:text-zinc-50">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * ProgressIndicator Component
 *
 * WCAG 1.3.1 Info and Relationships - Progress indicator with proper ARIA
 */
interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function ProgressIndicator({ currentStep, totalSteps, steps }: ProgressIndicatorProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuetext={`Step ${currentStep + 1} of ${totalSteps}: ${steps[currentStep]}`}
      aria-label="Application progress"
      className="mb-6"
    >
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-zinc-900 dark:text-zinc-50">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-zinc-600 dark:text-zinc-400">{steps[currentStep]}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

/**
 * AnnouncementRegion Component
 *
 * Global live region for screen reader announcements
 * Should be mounted once at the app level
 */
export function AnnouncementRegion() {
  return (
    <div
      id="announcement-region"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      role="status"
    />
  );
}

/**
 * Helper function to announce messages to screen readers
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const region = document.getElementById('announcement-region');
  if (region) {
    region.setAttribute('aria-live', priority);
    region.textContent = message;
    // Clear after announcement
    setTimeout(() => {
      region.textContent = '';
    }, 1000);
  }
}

/**
 * KeyboardShortcuts Component
 *
 * WCAG 2.1.4 Character Key Shortcuts - Documents available shortcuts
 */
export function KeyboardShortcuts() {
  return (
    <div className="sr-only">
      <h2>Keyboard Shortcuts</h2>
      <ul>
        <li>Alt + T: Open notifications</li>
        <li>Tab: Navigate to next element</li>
        <li>Shift + Tab: Navigate to previous element</li>
        <li>Enter or Space: Activate button or link</li>
        <li>Escape: Close modal or cancel action</li>
      </ul>
    </div>
  );
}

/**
 * LoadingState Component
 *
 * WCAG 4.1.3 Status Messages - Announces loading states
 */
interface LoadingStateProps {
  message: string;
  progress?: number;
}

export function LoadingState({ message, progress }: LoadingStateProps) {
  return (
    <div role="status" aria-live="polite" className="sr-only">
      {message}
      {progress !== undefined && ` ${Math.round(progress)}% complete`}
    </div>
  );
}

/**
 * ConfirmationDialog Component
 *
 * WCAG 1.3.5 Identify Input Purpose - Confirmation dialogs with clear actions
 */
interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export function ConfirmationDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-zinc-900">
        <h2
          id="confirm-title"
          className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50"
        >
          {title}
        </h2>
        <p id="confirm-message" className="mb-6 text-zinc-600 dark:text-zinc-400">
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default {
  SkipNavigation,
  VisuallyHidden,
  LiveRegion,
  ErrorSummary,
  FieldError,
  RequiredFieldIndicator,
  PageHeader,
  Breadcrumb,
  ProgressIndicator,
  AnnouncementRegion,
  announce,
  KeyboardShortcuts,
  LoadingState,
  ConfirmationDialog,
};
