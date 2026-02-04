'use client';

import { CurrencyInput } from '@/components/ui/currency-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';
import { useLoanComparison } from '@/hooks/useLoanCalculator';
import { formatCurrency } from '@/lib/calculations/loan';
import { Calculator, TrendingUp, Info } from 'lucide-react';

interface LoanCalculatorProps {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  onLoanAmountChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onLoanTermChange: (value: number) => void;
  onReset: () => void;
}

export function LoanCalculator({
  loanAmount,
  interestRate,
  loanTerm,
  onLoanAmountChange,
  onInterestRateChange,
  onLoanTermChange,
  onReset,
}: LoanCalculatorProps) {
  const result = useLoanCalculator({ loanAmount, interestRate, loanTerm });
  const comparisons = useLoanComparison(loanAmount);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <CurrencyInput
                label="Loan Amount"
                value={loanAmount}
                onChange={onLoanAmountChange}
                helperText="R5,000 - R300,000"
              />
              <input
                type="range"
                min={5000}
                max={300000}
                step={5000}
                value={loanAmount}
                onChange={(e) => onLoanAmountChange(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 dark:bg-zinc-800"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Interest Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={8.5}
                  max={18.5}
                  step={0.5}
                  value={interestRate}
                  onChange={(e) => onInterestRateChange(Number(e.target.value))}
                  className="flex h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                />
                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-zinc-500">
                  %
                </span>
              </div>
              <input
                type="range"
                min={8.5}
                max={18.5}
                step={0.5}
                value={interestRate}
                onChange={(e) => onInterestRateChange(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 dark:bg-zinc-800"
              />
              <p className="mt-1 text-xs text-zinc-500">Range: 8.5% - 18.5%</p>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Loan Term: {loanTerm} months ({Math.floor(loanTerm / 12)} years)
            </label>
            <input
              type="range"
              min={6}
              max={60}
              step={6}
              value={loanTerm}
              onChange={(e) => onLoanTermChange(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 dark:bg-zinc-800"
            />
            <div className="mt-2 flex justify-between text-xs text-zinc-500">
              <span>6 months</span>
              <span>60 months</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Calculation Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Monthly Payment</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {formatCurrency(result.monthlyPayment)}
              </p>
            </div>

            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Interest</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {formatCurrency(result.totalInterest)}
              </p>
            </div>

            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Repayment</p>
              <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-500">
                {formatCurrency(result.totalRepayment)}
              </p>
            </div>
          </div>

          <Button onClick={onReset} variant="outline" className="w-full">
            Reset Calculator
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Loan Term Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="py-3 text-left font-medium text-zinc-700 dark:text-zinc-300">
                    Term
                  </th>
                  <th className="py-3 text-left font-medium text-zinc-700 dark:text-zinc-300">
                    Monthly Payment
                  </th>
                  <th className="py-3 text-left font-medium text-zinc-700 dark:text-zinc-300">
                    Total Repayment
                  </th>
                  <th className="py-3 text-left font-medium text-zinc-700 dark:text-zinc-300">
                    Total Interest
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((comparison) => (
                  <tr
                    key={comparison.term}
                    className={`border-b border-zinc-100 transition-colors hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-800 ${
                      comparison.term === loanTerm ? 'bg-blue-50 font-medium dark:bg-blue-950' : ''
                    }`}
                  >
                    <td className="py-3">{comparison.term} months</td>
                    <td className="py-3">{formatCurrency(comparison.monthlyPayment)}</td>
                    <td className="py-3">{formatCurrency(comparison.totalRepayment)}</td>
                    <td className="py-3">{formatCurrency(comparison.totalInterest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
