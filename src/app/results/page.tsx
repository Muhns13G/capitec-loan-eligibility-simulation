'use client';

import { useLoanResult } from '@/hooks/useLoanResult';
import { ApprovedView } from '@/components/results/approved-view';
import { DeclinedView } from '@/components/results/declined-view';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Breadcrumb } from '@/components/a11y/accessibility-components';

export default function ResultsPage() {
  const { result, loading, error } = useLoanResult();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
        <Card
          className="w-full max-w-md"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          aria-label="Loading application"
        >
          <CardContent className="flex flex-col items-center p-12">
            <div className="relative">
              <Spinner className="h-16 w-16 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-ping">
                  <div
                    className="h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-transparent"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
            <h1 className="mt-6 animate-pulse text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Processing Your Application
            </h1>
            <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">
              Analyzing your application and calculating eligibility...
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
        <Card
          className="w-full max-w-md"
          role="alertdialog"
          aria-labelledby="error-title"
          aria-describedby="error-message"
        >
          <CardContent className="flex flex-col items-center p-12">
            <AlertTriangle
              className="h-12 w-12 text-red-600 dark:text-red-400"
              aria-hidden="true"
            />
            <h1
              id="error-title"
              className="mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50"
            >
              Error Loading Results
            </h1>
            <p id="error-message" className="mt-2 text-center text-zinc-600 dark:text-zinc-400">
              {error}
            </p>
            <a
              href="/apply"
              className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
              aria-label="Start new application"
            >
              Start New Application
            </a>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center p-12">
            <AlertTriangle
              className="h-12 w-12 text-zinc-600 dark:text-zinc-400"
              aria-hidden="true"
            />
            <h1 className="mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              No Results Found
            </h1>
            <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">
              Please complete the loan application form to see your eligibility results.
            </p>
            <a
              href="/apply"
              className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
              aria-label="Start loan application"
            >
              Start Application
            </a>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <>
      <style jsx global>{`
        .no-focus-outline {
          outline: 2px solid #3b82f6;
        }
        .focus-visible:focus-visible {
          outline: 2px solid #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }
      `}</style>
      <main
        id="results-content"
        className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950"
      >
        <div className="w-full max-w-4xl space-y-8">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Results' }]} />

          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  Eligibility Results
                </h2>
                <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                  {result.eligibilityResult.isEligible
                    ? 'Great news! You meet our eligibility criteria.'
                    : 'Unfortunately, you do not meet our current eligibility criteria.'}
                </p>
              </div>

              {result.eligibilityResult.isEligible ? (
                <ApprovedView result={result} />
              ) : (
                <DeclinedView />
              )}

              <Card className="mt-8 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
                <CardContent className="p-6 text-sm text-zinc-700 dark:text-zinc-300">
                  <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    Important Notice
                  </h3>
                  <ul className="list-disc space-y-2 text-left text-sm text-zinc-600 dark:text-zinc-400">
                    <li>
                      This is a prototype loan eligibility simulator for demonstration purposes only
                    </li>
                    <li>
                      All calculations use internal mock data and do not contact any credit bureaus
                    </li>
                    <li>
                      Results are not binding and do not constitute a loan offer from Capitec Bank
                    </li>
                    <li>
                      Contact Capitec Bank directly for official loan applications and accurate
                      eligibility assessments
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">Loan Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Maximum Amount</p>
                      <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {result.recommendedLoan.maxAmount
                          ? formatCurrency(result.recommendedLoan.maxAmount)
                          : 'N/A'}
                      </p>
                    </div>

                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Approved Amount</p>
                      <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-500">
                        {result.recommendedLoan.recommendedAmount
                          ? formatCurrency(result.recommendedLoan.recommendedAmount)
                          : 'N/A'}
                      </p>
                    </div>

                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Interest Rate</p>
                      <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {result.recommendedLoan.interestRate
                          ? `${result.recommendedLoan.interestRate}%`
                          : 'N/A'}
                      </p>
                    </div>

                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Loan Term</p>
                      <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {result.recommendedLoan.loanTerm
                          ? `${result.recommendedLoan.loanTerm} months`
                          : 'N/A'}
                      </p>
                    </div>

                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Monthly Payment</p>
                      <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {result.recommendedLoan.monthlyPayment
                          ? formatCurrency(result.recommendedLoan.monthlyPayment)
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {result.eligibilityResult.isEligible && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-zinc-700 dark:text-zinc-300">
                  Congratulations! Based on your information, you qualify for our loan products.
                  Here are your next steps:
                </p>
                <div>
                  <a
                    href="/calculator"
                    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                  >
                    Calculate Loan
                  </a>
                  <span className="text-zinc-600 dark:text-zinc-400"> or</span>
                  <a
                    href="/apply"
                    className="inline-flex items-center rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800"
                  >
                    Apply Again
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
