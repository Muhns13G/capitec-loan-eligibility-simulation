import { renderHook } from '@testing-library/react';
import { useLoanCalculator, useLoanComparison } from '@/hooks/useLoanCalculator';

describe('useLoanCalculator Hook', () => {
  it('calculates monthly payment correctly', () => {
    const { result } = renderHook(() =>
      useLoanCalculator({
        loanAmount: 100000,
        interestRate: 12.5,
        loanTerm: 24,
      })
    );

    expect(result.current.monthlyPayment).toBeGreaterThan(0);
    expect(typeof result.current.monthlyPayment).toBe('number');
  });

  it('calculates total interest correctly', () => {
    const { result } = renderHook(() =>
      useLoanCalculator({
        loanAmount: 100000,
        interestRate: 12.5,
        loanTerm: 24,
      })
    );

    expect(result.current.totalInterest).toBeGreaterThan(0);
    expect(typeof result.current.totalInterest).toBe('number');
  });

  it('calculates total repayment correctly', () => {
    const { result } = renderHook(() =>
      useLoanCalculator({
        loanAmount: 100000,
        interestRate: 12.5,
        loanTerm: 24,
      })
    );

    const expectedTotal = result.current.monthlyPayment * 24;
    expect(result.current.totalRepayment).toBeCloseTo(expectedTotal, 2);
  });

  it('generates amortization schedule', () => {
    const { result } = renderHook(() =>
      useLoanCalculator({
        loanAmount: 100000,
        interestRate: 12.5,
        loanTerm: 24,
      })
    );

    expect(result.current.amortizationSchedule).toHaveLength(24);
    expect(result.current.amortizationSchedule[0]).toHaveProperty('month');
    expect(result.current.amortizationSchedule[0]).toHaveProperty('payment');
    expect(result.current.amortizationSchedule[0]).toHaveProperty('balance');
  });

  it('handles zero interest rate', () => {
    const { result } = renderHook(() =>
      useLoanCalculator({
        loanAmount: 120000,
        interestRate: 0,
        loanTerm: 12,
      })
    );

    expect(result.current.monthlyPayment).toBe(10000);
    expect(result.current.totalInterest).toBe(0);
  });

  it('handles zero loan amount', () => {
    const { result } = renderHook(() =>
      useLoanCalculator({
        loanAmount: 0,
        interestRate: 12.5,
        loanTerm: 24,
      })
    );

    expect(result.current.monthlyPayment).toBe(0);
    expect(result.current.totalInterest).toBe(0);
    expect(result.current.amortizationSchedule).toHaveLength(0);
  });

  it('handles negative loan amount', () => {
    const { result } = renderHook(() =>
      useLoanCalculator({
        loanAmount: -1000,
        interestRate: 12.5,
        loanTerm: 24,
      })
    );

    expect(result.current.monthlyPayment).toBe(0);
    expect(result.current.totalInterest).toBe(0);
  });

  it('handles zero loan term', () => {
    const { result } = renderHook(() =>
      useLoanCalculator({
        loanAmount: 100000,
        interestRate: 12.5,
        loanTerm: 0,
      })
    );

    expect(result.current.monthlyPayment).toBe(0);
    expect(result.current.totalInterest).toBe(0);
    expect(result.current.amortizationSchedule).toHaveLength(0);
  });

  it('recalculates when dependencies change', () => {
    const { result, rerender } = renderHook(
      ({ loanAmount, interestRate, loanTerm }) =>
        useLoanCalculator({ loanAmount, interestRate, loanTerm }),
      {
        initialProps: {
          loanAmount: 100000,
          interestRate: 12.5,
          loanTerm: 24,
        },
      }
    );

    const initialPayment = result.current.monthlyPayment;

    rerender({
      loanAmount: 200000,
      interestRate: 12.5,
      loanTerm: 24,
    });

    expect(result.current.monthlyPayment).toBeGreaterThan(initialPayment);
  });

  it('sets isCalculating to false after calculation', () => {
    const { result } = renderHook(() =>
      useLoanCalculator({
        loanAmount: 100000,
        interestRate: 12.5,
        loanTerm: 24,
      })
    );

    expect(result.current.isCalculating).toBe(false);
  });
});

describe('useLoanComparison Hook', () => {
  it('returns comparison for different loan terms', () => {
    const { result } = renderHook(() => useLoanComparison(100000));

    expect(result.current).toHaveLength(5);
    expect(result.current[0].term).toBe(12);
    expect(result.current[1].term).toBe(24);
    expect(result.current[2].term).toBe(36);
    expect(result.current[3].term).toBe(48);
    expect(result.current[4].term).toBe(60);
  });

  it('calculates monthly payment for each term', () => {
    const { result } = renderHook(() => useLoanComparison(100000));

    result.current.forEach((comparison) => {
      expect(comparison.monthlyPayment).toBeGreaterThan(0);
      expect(typeof comparison.monthlyPayment).toBe('number');
    });
  });

  it('calculates total repayment for each term', () => {
    const { result } = renderHook(() => useLoanComparison(100000));

    result.current.forEach((comparison) => {
      expect(comparison.totalRepayment).toBeGreaterThan(0);
      expect(typeof comparison.totalRepayment).toBe('number');
    });
  });

  it('calculates total interest for each term', () => {
    const { result } = renderHook(() => useLoanComparison(100000));

    result.current.forEach((comparison) => {
      expect(comparison.totalInterest).toBeGreaterThan(0);
      expect(typeof comparison.totalInterest).toBe('number');
    });
  });

  it('higher term results in lower monthly payment', () => {
    const { result } = renderHook(() => useLoanComparison(100000));

    const monthly12 = result.current.find((c) => c.term === 12)?.monthlyPayment;
    const monthly60 = result.current.find((c) => c.term === 60)?.monthlyPayment;

    expect(monthly60).toBeLessThan(monthly12!);
  });

  it('longer term results in higher total interest', () => {
    const { result } = renderHook(() => useLoanComparison(100000));

    const interest12 = result.current.find((c) => c.term === 12)?.totalInterest;
    const interest60 = result.current.find((c) => c.term === 60)?.totalInterest;

    expect(interest60).toBeGreaterThan(interest12!);
  });

  it('updates when base loan amount changes', () => {
    const { result, rerender } = renderHook((baseLoanAmount) => useLoanComparison(baseLoanAmount), {
      initialProps: 100000,
    });

    const initialPayment = result.current[0].monthlyPayment;

    rerender(200000);

    expect(result.current[0].monthlyPayment).toBeGreaterThan(initialPayment);
  });
});
