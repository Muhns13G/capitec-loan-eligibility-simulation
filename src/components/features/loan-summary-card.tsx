'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface LoanSummaryCardProps {
  title: string;
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export function LoanSummaryCard({
  title,
  monthlyPayment,
  totalInterest,
  totalRepayment,
  loanAmount,
  interestRate,
  loanTerm,
}: LoanSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Monthly Payment
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {formatCurrency(monthlyPayment)}
            </p>
          </div>

          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Total Interest
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {formatCurrency(totalInterest)}
            </p>
          </div>

          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Total Repayment
            </p>
            <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-500">
              {formatCurrency(totalRepayment)}
            </p>
          </div>
        </div>

        <div className="space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">
              Loan Amount
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              {formatCurrency(loanAmount)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">
              Interest Rate
            </span>
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              {interestRate}%
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Term</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              {loanTerm} months ({Math.floor(loanTerm / 12)} years)
            </span>
          </div>

          <div className="border-t border-zinc-200 pt-2 dark:border-zinc-800">
            <div className="flex justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Total Cost of Credit
              </span>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">
                {formatCurrency(totalInterest)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
