'use client';

import { useMemo } from 'react';
import type { AmortizationEntry } from '@/lib/calculations/loan';
import {
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculateTotalRepayment,
  generateAmortizationSchedule,
} from '@/lib/calculations/loan';

export interface CalculatorState {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export interface CalculatorResult {
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  amortizationSchedule: AmortizationEntry[];
  isCalculating: boolean;
}

export function useLoanCalculator(state: CalculatorState): CalculatorResult {
  const result = useMemo(() => {
    const { loanAmount, interestRate, loanTerm } = state;

    if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
      return {
        monthlyPayment: 0,
        totalInterest: 0,
        totalRepayment: 0,
        amortizationSchedule: [],
        isCalculating: false,
      };
    }

    try {
      const monthlyPayment = calculateMonthlyPayment({
        principal: loanAmount,
        annualRate: interestRate,
        termMonths: loanTerm,
      });

      const totalInterest = calculateTotalInterest({
        principal: loanAmount,
        annualRate: interestRate,
        termMonths: loanTerm,
      });

      const totalRepayment = calculateTotalRepayment({
        principal: loanAmount,
        annualRate: interestRate,
        termMonths: loanTerm,
      });

      const amortizationSchedule = generateAmortizationSchedule({
        principal: loanAmount,
        annualRate: interestRate,
        termMonths: loanTerm,
      });

      return {
        monthlyPayment,
        totalInterest,
        totalRepayment,
        amortizationSchedule,
        isCalculating: false,
      };
    } catch {
      return {
        monthlyPayment: 0,
        totalInterest: 0,
        totalRepayment: 0,
        amortizationSchedule: [],
        isCalculating: false,
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loanAmount, state.interestRate, state.loanTerm]);

  return result;
}

const COMPARISON_TERMS = [12, 24, 36, 48, 60];
const COMPARISON_RATE = 12.5;

export function useLoanComparison(baseLoanAmount: number) {
  const comparisons = useMemo(() => {
    return COMPARISON_TERMS.map((term) => {
      const monthlyPayment = calculateMonthlyPayment({
        principal: baseLoanAmount,
        annualRate: COMPARISON_RATE,
        termMonths: term,
      });

      const totalRepayment = monthlyPayment * term;
      const totalInterest = totalRepayment - baseLoanAmount;

      return {
        term,
        monthlyPayment,
        totalRepayment,
        totalInterest,
      };
    });
  }, [baseLoanAmount]);

  return comparisons;
}
