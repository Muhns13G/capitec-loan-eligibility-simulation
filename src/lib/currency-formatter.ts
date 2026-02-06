/**
 * Currency Formatting Utilities for South African Rand (ZAR)
 *
 * Provides comprehensive currency handling functions including:
 * - Formatting with SA locale
 * - Parsing user input
 * - Input display formatting
 */

/**
 * Formats a number as South African Rand currency
 * @param value - The numeric value to format
 * @returns Formatted string (e.g., "R 50,000.00")
 */
export function formatCurrencyZAR(value: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Parses a formatted currency string back to number
 * Handles various input formats: "50000", "R 50000", "50,000", "50 000", "50.000,00" (European), etc.
 * @param value - The string to parse
 * @returns Parsed number or NaN if invalid
 */
export function parseCurrencyZAR(value: string): number {
  if (!value || value.trim() === '') return NaN;

  const original = value.trim();

  // Check if it's European format (e.g., "50.000,00" where dot is thousand separator and comma is decimal)
  // European format has more dots than commas, or the last comma comes after the last dot
  const europeanFormat =
    original.includes('.') &&
    original.includes(',') &&
    original.indexOf(',') > original.lastIndexOf('.');

  let numericOnly: string;

  if (europeanFormat) {
    // European format: remove dots (thousand separators) and replace comma with decimal point
    numericOnly = original
      .replace(/\./g, '')
      .replace(/,/g, '.')
      .replace(/[^\d.]/g, '');
  } else {
    // US/SA format: remove everything except digits and decimal point
    numericOnly = original.replace(/[^\d.]/g, '');

    // Remove extra decimal points, keep only the last one
    const dotIndex = numericOnly.lastIndexOf('.');
    if (dotIndex !== numericOnly.indexOf('.')) {
      numericOnly =
        numericOnly.substring(0, dotIndex).replace(/\./g, '') + numericOnly.substring(dotIndex);
    }
  }

  if (numericOnly === '' || numericOnly === '.') return NaN;

  // Parse the cleaned value
  const parsed = parseFloat(numericOnly);
  return isNaN(parsed) ? NaN : parsed;
}

/**
 * Formats input value for display in currency input field
 * Preserves user input during typing while formatting
 * @param value - The string to format for display
 * @returns Formatted string with thousand separators or empty string
 */
export function formatInputCurrency(value: string): string {
  if (!value || value.trim() === '') return '';

  // Remove non-numeric characters except decimal point
  const numericValue = value.replace(/[^\d.]/g, '');

  if (numericValue === '' || numericValue === '.') return numericValue;

  // Parse and validate
  const number = parseFloat(numericValue);
  if (isNaN(number)) return '';

  // Format with thousand separators (SA locale)
  return new Intl.NumberFormat('en-ZA').format(number);
}

/**
 * Formats a number with thousand separators (South African format)
 * @param value - The numeric value to format
 * @returns Formatted string (e.g., "50,000")
 */
export function formatNumberWithSeparator(value: number): string {
  return new Intl.NumberFormat('en-ZA').format(value);
}

/**
 * Validates if a string represents a valid currency amount
 * @param value - The string to validate
 * @param minAmount - Minimum allowed amount (default: 5000)
 * @param maxAmount - Maximum allowed amount (default: 300000)
 * @returns Object with isValid flag and error message if invalid
 */
export function validateCurrencyAmount(
  value: string,
  minAmount: number = 5000,
  maxAmount: number = 300000
): { isValid: boolean; error?: string } {
  const parsed = parseCurrencyZAR(value);

  if (isNaN(parsed)) {
    return { isValid: false, error: 'Please enter a valid amount' };
  }

  if (parsed < minAmount) {
    return { isValid: false, error: `Minimum amount is ${formatCurrencyZAR(minAmount)}` };
  }

  if (parsed > maxAmount) {
    return { isValid: false, error: `Maximum amount is ${formatCurrencyZAR(maxAmount)}` };
  }

  return { isValid: true };
}

/**
 * Displays currency value in a user-friendly format for labels/headers
 * Uses abbreviated format for large values
 * @param value - The numeric value to format
 * @returns Formatted string (e.g., "R 50K", "R 250K")
 */
export function displayAbbreviatedCurrency(value: number): string {
  if (value >= 1000000) {
    return `R ${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `R ${(value / 1000).toFixed(0)}K`;
  }
  return formatCurrencyZAR(value);
}
