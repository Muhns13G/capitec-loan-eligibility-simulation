'use client';

import { useState, Suspense, lazy } from 'react';
import { LoanCalculator } from '@/components/calculator/loan-calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';
import { Breadcrumb, PageHeader } from '@/components/a11y/accessibility-components';

// Lazy load heavy chart component to reduce initial bundle size
const PaymentBreakdownChart = lazy(() =>
  import('@/components/calculator/payment-breakdown-chart').then((mod) => ({
    default: mod.PaymentBreakdownChart,
  }))
);
const AmortizationTable = lazy(() =>
  import('@/components/calculator/amortization-table').then((mod) => ({
    default: mod.AmortizationTable,
  }))
);

export default function CalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(150000);
  const [interestRate, setInterestRate] = useState(12.5);
  const [loanTerm, setLoanTerm] = useState(24);

  const result = useLoanCalculator({ loanAmount, interestRate, loanTerm });

  const handleReset = () => {
    setLoanAmount(150000);
    setInterestRate(12.5);
    setLoanTerm(24);
  };

  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center bg-zinc-50 p-8 dark:bg-zinc-950"
    >
      <div className="w-full max-w-5xl space-y-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Calculator' }]} />
        <PageHeader
          title="Loan Calculator"
          description="Calculate your loan payments and view detailed amortization schedules"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <LoanCalculator
              loanAmount={loanAmount}
              interestRate={interestRate}
              loanTerm={loanTerm}
              onLoanAmountChange={setLoanAmount}
              onInterestRateChange={setInterestRate}
              onLoanTermChange={setLoanTerm}
              onReset={handleReset}
            />
          </div>

          <div className="space-y-6">
            {result.monthlyPayment > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense
                    fallback={
                      <div className="h-[300px] animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                    }
                  >
                    <PaymentBreakdownChart result={result} />
                  </Suspense>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {result.amortizationSchedule.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <Suspense
                fallback={
                  <div className="h-64 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                }
              >
                <AmortizationTable schedule={result.amortizationSchedule} />
              </Suspense>
            </CardContent>
          </Card>
        )}

        <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
          <CardContent className="p-6">
            <h3 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
              Ready to Apply?
            </h3>
            <p className="mb-4 text-blue-800 dark:text-blue-200">
              Get personalized rates based on your financial situation by completing our loan
              application form.
            </p>
            <a
              href="/apply"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Start Application
            </a>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
