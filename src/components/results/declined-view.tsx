'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, AlertTriangle, TrendingUp, Calculator } from 'lucide-react';

export function DeclinedView() {
  return (
    <div className="space-y-6">
      <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
        <CardContent className="flex items-center gap-4 p-6">
          <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
          <div>
            <h2 className="text-2xl font-bold text-red-900 dark:text-red-100">
              Application Not Approved
            </h2>
            <p className="text-red-800 dark:text-red-200">
              Based on our assessment, your loan application does not meet our current eligibility
              criteria.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Common Reasons for Decline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500" />
              <span>High debt-to-income ratio (above 50%)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500" />
              <span>Insufficient disposable income</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500" />
              <span>Short employment history (less than 3 months)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500" />
              <span>Low credit score (below 600)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500" />
              <span>Recent late payments or defaults</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            How to Improve Your Eligibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
            <h4 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">Reduce Your Debt</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Pay down existing debts, especially high-interest credit cards. Aim for a
              debt-to-income ratio below 40%.
            </p>
          </div>

          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
            <h4 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">
              Increase Your Income
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Consider additional income sources, salary increases, or side jobs. More disposable
              income improves your repayment capacity.
            </p>
          </div>

          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
            <h4 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">
              Build Your Credit Score
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Pay all bills on time, keep credit utilization below 30%, and avoid applying for too
              much credit at once.
            </p>
          </div>

          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
            <h4 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">
              Maintain Stable Employment
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Stable employment history (12+ months) shows financial reliability. Avoid frequent job
              changes if possible.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Calculator className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <div className="flex-1">
              <h3 className="mb-1 font-semibold text-blue-900 dark:text-blue-100">
                Try Our Loan Calculator
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                See how adjusting loan terms and amounts affects your monthly payments.
              </p>
            </div>
            <a
              href="/calculator"
              className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-6 py-2 text-sm font-medium whitespace-nowrap text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Use Calculator
            </a>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">Apply Again</h3>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            You can reapply after 30 days. In the meantime, use our tips to improve your financial
            situation.
          </p>
          <a
            href="/apply"
            className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 bg-transparent px-6 py-2 text-sm font-medium whitespace-nowrap text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800"
          >
            Start New Application
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
