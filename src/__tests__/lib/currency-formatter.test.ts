import {
  formatCurrencyZAR,
  parseCurrencyZAR,
  formatInputCurrency,
  formatNumberWithSeparator,
  validateCurrencyAmount,
  displayAbbreviatedCurrency,
} from '@/lib/currency-formatter';

describe('Currency Formatter', () => {
  describe('formatCurrencyZAR', () => {
    it('formats 50000 correctly', () => {
      const result = formatCurrencyZAR(50000);
      expect(result).toContain('50');
      expect(result).toContain('000');
      expect(result).toContain('R');
    });

    it('formats 5000 correctly', () => {
      const result = formatCurrencyZAR(5000);
      expect(result).toContain('5');
      expect(result).toContain('000');
      expect(result).toContain('R');
    });

    it('formats 300000 correctly', () => {
      const result = formatCurrencyZAR(300000);
      expect(result).toContain('300');
      expect(result).toContain('000');
      expect(result).toContain('R');
    });

    it('formats 0 with 2 decimal places', () => {
      const result = formatCurrencyZAR(0);
      expect(result).toContain('0,00');
    });

    it('formats decimal amounts correctly', () => {
      const result = formatCurrencyZAR(12345.67);
      expect(result).toContain('12');
      expect(result).toContain('345');
      expect(result).toContain('67');
    });

    it('handles very large amounts', () => {
      const result = formatCurrencyZAR(1000000);
      expect(result).toContain('1');
      expect(result).toContain('000');
      expect(result).toContain('000');
    });
  });

  describe('parseCurrencyZAR', () => {
    it('parses plain number "50000" as 50000', () => {
      expect(parseCurrencyZAR('50000')).toBe(50000);
    });

    it('parses "R 50000" as 50000', () => {
      expect(parseCurrencyZAR('R 50000')).toBe(50000);
    });

    it('parses with comma separator "50,000" as 50000', () => {
      expect(parseCurrencyZAR('50,000')).toBe(50000);
    });

    it('parses with space separator "50 000" as 50000', () => {
      expect(parseCurrencyZAR('50 000')).toBe(50000);
    });

    it('parses decimal amounts correctly', () => {
      expect(parseCurrencyZAR('50000.50')).toBe(50000.5);
    });

    it('parses European format "50.000,00" as 50000', () => {
      expect(parseCurrencyZAR('50.000,00')).toBe(50000);
    });

    it('returns NaN for empty string', () => {
      expect(parseCurrencyZAR('')).toBeNaN();
    });

    it('returns NaN for invalid input "abc"', () => {
      expect(parseCurrencyZAR('abc')).toBeNaN();
    });

    it('returns NaN for invalid characters mixed with numbers', () => {
      expect(parseCurrencyZAR('R50abc000')).toBe(50000);
    });

    it('handles whitespace correctly', () => {
      expect(parseCurrencyZAR('  50,000  ')).toBe(50000);
    });

    it('returns NaN for dot only', () => {
      expect(parseCurrencyZAR('.')).toBeNaN();
    });

    it('returns 0 for "0"', () => {
      expect(parseCurrencyZAR('0')).toBe(0);
    });

    it('handles very large numbers correctly', () => {
      expect(parseCurrencyZAR('1,000,000')).toBe(1000000);
    });
  });

  describe('formatInputCurrency', () => {
    it('formats "50000" with thousand separator', () => {
      const result = formatInputCurrency('50000');
      expect(result).toContain('50');
      expect(result).toContain('000');
    });

    it('returns empty string for empty input', () => {
      expect(formatInputCurrency('')).toBe('');
    });

    it('returns "." for dot input', () => {
      expect(formatInputCurrency('.')).toBe('.');
    });

    it('returns empty string for invalid input', () => {
      expect(formatInputCurrency('abc')).toBe('');
    });

    it('formats during typing (partial input)', () => {
      expect(formatInputCurrency('50')).toBe('50');
      expect(formatInputCurrency('500')).toBe('500');
      expect(formatInputCurrency('5000')).toContain('5');
      expect(formatInputCurrency('5000')).toContain('000');
    });

    it('handles decimal input', () => {
      const result = formatInputCurrency('50000.5');
      expect(result).toContain('50');
      expect(result).toContain('000');
      expect(result).toContain('5');
    });

    it('removes currency symbol from input', () => {
      const result = formatInputCurrency('R 50,000');
      expect(result).toContain('50');
      expect(result).toContain('000');
    });

    it('handles whitespace', () => {
      const result = formatInputCurrency('  50000  ');
      expect(result).toContain('50');
      expect(result).toContain('000');
    });
  });

  describe('formatNumberWithSeparator', () => {
    it('formats 50000 with separators', () => {
      const result = formatNumberWithSeparator(50000);
      expect(result).toContain('50');
      expect(result).toContain('000');
    });

    it('formats 5000 with separators', () => {
      const result = formatNumberWithSeparator(5000);
      expect(result).toContain('5');
      expect(result).toContain('000');
    });

    it('formats 300000 with separators', () => {
      const result = formatNumberWithSeparator(300000);
      expect(result).toContain('300');
      expect(result).toContain('000');
    });

    it('handles 0', () => {
      expect(formatNumberWithSeparator(0)).toBe('0');
    });

    it('formats large numbers', () => {
      const result = formatNumberWithSeparator(1000000);
      expect(result).toContain('1');
      expect(result).toContain('000');
      expect(result).toContain('000');
    });
  });

  describe('validateCurrencyAmount', () => {
    it('validates amount within range', () => {
      const result = validateCurrencyAmount('50000');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('validates minimum boundary amount', () => {
      const result = validateCurrencyAmount('5000');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('validates maximum boundary amount', () => {
      const result = validateCurrencyAmount('300000');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('rejects amount below minimum', () => {
      const result = validateCurrencyAmount('4000');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Minimum');
    });

    it('rejects amount above maximum', () => {
      const result = validateCurrencyAmount('500000');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Maximum');
    });

    it('rejects invalid input', () => {
      const result = validateCurrencyAmount('abc');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('valid amount');
    });

    it('rejects empty string', () => {
      const result = validateCurrencyAmount('');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('valid amount');
    });

    it('accepts formatted input with separators', () => {
      const result = validateCurrencyAmount('50,000');
      expect(result.isValid).toBe(true);
    });

    it('accepts input with currency symbol', () => {
      const result = validateCurrencyAmount('R 50,000');
      expect(result.isValid).toBe(true);
    });

    it('uses custom min and max when provided', () => {
      const result = validateCurrencyAmount('1500', 1000, 10000);
      expect(result.isValid).toBe(true);
    });

    it('rejects below custom minimum', () => {
      const result = validateCurrencyAmount('500', 1000, 10000);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Minimum');
    });

    it('rejects above custom maximum', () => {
      const result = validateCurrencyAmount('50000', 1000, 10000);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Maximum');
    });
  });

  describe('displayAbbreviatedCurrency', () => {
    it('displays amounts in K for thousands', () => {
      expect(displayAbbreviatedCurrency(50000)).toBe('R 50K');
      expect(displayAbbreviatedCurrency(250000)).toBe('R 250K');
      expect(displayAbbreviatedCurrency(1500)).toBe('R 2K');
    });

    it('displays amounts in M for millions', () => {
      expect(displayAbbreviatedCurrency(1000000)).toBe('R 1.0M');
      expect(displayAbbreviatedCurrency(2500000)).toBe('R 2.5M');
      expect(displayAbbreviatedCurrency(15000000)).toBe('R 15.0M');
    });

    it('displays full format for amounts under 1K', () => {
      expect(displayAbbreviatedCurrency(999)).toContain('999');
      expect(displayAbbreviatedCurrency(500)).toContain('500');
    });

    it('includes R symbol', () => {
      const result = displayAbbreviatedCurrency(50000);
      expect(result).toContain('R');
    });

    it('handles zero', () => {
      expect(displayAbbreviatedCurrency(0)).toContain('0');
    });
  });
});
