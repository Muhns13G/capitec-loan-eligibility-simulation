'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLoanComparison } from '@/hooks/useLoanCalculator';
import { formatCurrency } from '@/lib/calculations/loan';
import { Info } from 'lucide-react';

interface LoanComparisonProps {
  loanAmount: number;
  loanTerm: number;
}

export function LoanComparison({ loanAmount, loanTerm }: LoanComparisonProps) {
  const comparisons = useLoanComparison(loanAmount);

  return (
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
  );
}
