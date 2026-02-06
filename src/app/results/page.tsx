'use client';

import { useLoanResult } from '@/hooks/useLoanResult';
import { ApprovedView } from '@/components/results/approved-view';
import { DeclinedView } from '@/components/results/declined-view';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function ResultsPage() {
  const { result, loading, error } = useLoanResult();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center p-12">
            <div className="relative">
              <Spinner className="h-16 w-16 text-blue-600 dark:text-blue-400" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-ping">
                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-transparent" />
                </div>
              </div>
            </div>
            <h1 className="mt-6 animate-pulse text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Processing Your Application
            </h1>
            <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">
              Analyzing your application and calculating eligibility...
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
              <div className="flex gap-1">
                <span
                  className="flex h-2 w-2 animate-bounce rounded-full bg-blue-600"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="flex h-2 w-2 animate-bounce rounded-full bg-blue-600"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="flex h-2 w-2 animate-bounce rounded-full bg-blue-600"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center p-12">
            <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
            <h1 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Error Loading Results
            </h1>
            <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">{error}</p>
            <a
              href="/apply"
              className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
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
            <AlertTriangle className="h-12 w-12 text-zinc-600 dark:text-zinc-400" />
            <h1 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              No Results Found
            </h1>
            <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">
              Please complete the loan application form to see your eligibility results.
            </p>
            <a
              href="/apply"
              className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
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
        @media print {
          body {
            background: white !important;
            color: black !important;
          }

          .no-print {
            display: none !important;
          }

          .print-only {
            display: block !important;
          }

          @page {
            margin: 1cm;
          }

          a[href]:after {
            content: ' (' attr(href) ')';
          }
        }
      `}</style>

      <main className="flex min-h-screen flex-col items-center bg-zinc-50 p-8 dark:bg-zinc-950 print:bg-white print:text-black">
        <div className="w-full max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Eligibility Results
            </h1>
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

          <Card className="mt-8">
            <CardContent className="p-6 text-sm text-zinc-600 dark:text-zinc-400">
              <p className="font-semibold">Important Notice:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
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
        </div>
      </main>
    </>
  );
}
