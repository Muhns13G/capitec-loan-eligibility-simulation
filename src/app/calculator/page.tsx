'use client';

import { useState } from 'react';
import { LoanCalculator } from '@/components/calculator/loan-calculator';
import { PaymentBreakdownChart } from '@/components/calculator/payment-breakdown-chart';
import { AmortizationTable } from '@/components/calculator/amortization-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';

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
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 p-8 dark:bg-zinc-950">
      <div className="w-full max-w-5xl space-y-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Loan Calculator
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Calculate your loan payments and view detailed amortization schedules
          </p>
        </div>

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
                  <PaymentBreakdownChart result={result} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {result.amortizationSchedule.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <AmortizationTable schedule={result.amortizationSchedule} />
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
