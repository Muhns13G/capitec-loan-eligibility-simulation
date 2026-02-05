'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/calculations/loan';
import { CheckCircle, Download, Printer } from 'lucide-react';
import type { EligibilityCheckResponse } from '@/types/loan';
import { exportAmortizationToCSV, printResults } from '@/lib/utils/export';
import { useState } from 'react';
import { ShareButton } from './share-button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ApprovedViewProps {
  result: EligibilityCheckResponse;
}

export function ApprovedView({ result }: ApprovedViewProps) {
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const schedule =
    result.recommendedLoan.monthlyPayment > 0
      ? Array.from({ length: 24 }, (_, i) => ({
          month: i + 1,
          payment: result.recommendedLoan.monthlyPayment,
          principal: result.recommendedLoan.monthlyPayment * (i / 24),
          interest:
            result.recommendedLoan.monthlyPayment -
            result.recommendedLoan.monthlyPayment * (i / 24),
          balance:
            result.affordabilityAnalysis.loanToIncomeRatio *
            result.affordabilityAnalysis.disposableIncome,
        }))
      : [];

  const handleExport = () => {
    exportAmortizationToCSV(
      schedule,
      result.recommendedLoan.recommendedAmount,
      result.recommendedLoan.interestRate,
      24
    );
  };

  const handlePrint = () => {
    printResults();
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
        <CardContent className="flex items-center gap-4 p-6">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          <div>
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-100">
              Congratulations! You&apos;re Eligible
            </h2>
            <p className="text-green-800 dark:text-green-200">
              {result.eligibilityResult.decisionReason}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Approval Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Approval Likelihood</span>
            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {result.eligibilityResult.approvalLikelihood}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Risk Category</span>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                result.eligibilityResult.riskCategory === 'low'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : result.eligibilityResult.riskCategory === 'medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}
            >
              {result.eligibilityResult.riskCategory.toUpperCase()}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Loan Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Recommended Amount</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {formatCurrency(result.recommendedLoan.recommendedAmount)}
              </p>
            </div>

            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Maximum Eligible Amount</p>
              <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-500">
                {formatCurrency(result.recommendedLoan.maxAmount)}
              </p>
            </div>

            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Interest Rate</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {result.recommendedLoan.interestRate}%
              </p>
            </div>

            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Monthly Payment</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {formatCurrency(result.recommendedLoan.monthlyPayment)}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Total Repayment Amount
              </span>
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-500">
                {formatCurrency(result.recommendedLoan.totalRepayment)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Affordability Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Disposable Income</p>
              <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {formatCurrency(result.affordabilityAnalysis.disposableIncome)}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Debt-to-Income Ratio</p>
              <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {result.affordabilityAnalysis.debtToIncomeRatio}%
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Loan-to-Income Ratio</p>
              <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {result.affordabilityAnalysis.loanToIncomeRatio}%
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Affordability Score</p>
            <p className="mt-2 text-xl font-bold text-zinc-900 capitalize dark:text-zinc-50">
              {result.affordabilityAnalysis.affordabilityScore}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Amortization Schedule (Preview)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Payment</TableHead>
                  <TableHead className="text-right">Principal</TableHead>
                  <TableHead className="text-right">Interest</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(showFullSchedule ? schedule : schedule.slice(0, 6)).map((entry) => (
                  <TableRow key={entry.month}>
                    <TableCell>{entry.month}</TableCell>
                    <TableCell className="text-right">{formatCurrency(entry.payment)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(entry.principal)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(entry.interest)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(entry.balance)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {showFullSchedule
                ? `Showing all ${schedule.length} payments`
                : `Showing first 6 payments of ${schedule.length} months`}
            </p>
            <Button
              variant="outline"
              onClick={() => setShowFullSchedule(!showFullSchedule)}
              className="flex items-center gap-2"
            >
              {showFullSchedule ? (
                <>
                  Show Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show Full Schedule <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4">
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
        <Button onClick={handlePrint} variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Print Results
        </Button>
        <ShareButton
          resultData={{
            approvalLikelihood: result.eligibilityResult.approvalLikelihood,
            monthlyPayment: result.recommendedLoan.monthlyPayment,
          }}
        />
      </div>

      <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
        <CardContent className="p-6">
          <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">Next Steps</h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>• Contact Capitec Bank to finalize your loan application</li>
            <li>• Prepare required documentation (ID proof, income statements)</li>
            <li>• Review loan terms and conditions carefully</li>
            <li>• Consider consulting a financial advisor for guidance</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
