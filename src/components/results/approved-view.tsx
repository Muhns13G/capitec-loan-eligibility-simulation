'use client';

import { motion, type Variants } from 'framer-motion';
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
import { formatCurrency, generateAmortizationSchedule } from '@/lib/calculations/loan';
import { CheckCircle, Download, Printer, TrendingUp, Wallet, Percent } from 'lucide-react';
import type { EligibilityCheckResponse } from '@/types/loan';
import { exportAmortizationToCSV, printResults } from '@/lib/utils/export';
import { useState } from 'react';
import { ShareButton } from './share-button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import { GaugeChart } from '@/components/ui/gauge-chart';
import { useCountUp } from '@/hooks/useCountUp';

interface ApprovedViewProps {
  result: EligibilityCheckResponse;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ApprovedView({ result }: ApprovedViewProps) {
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const approvalPercentage = useCountUp({
    end: result.eligibilityResult.approvalLikelihood,
    duration: 1500,
    suffix: '%',
  });
  const dtiPercentage = useCountUp({
    end: Math.round(result.affordabilityAnalysis.debtToIncomeRatio * 100) / 100,
    decimals: 1,
    duration: 1500,
    suffix: '%',
  });

  // Use the CORRECT amortization calculation from loan.ts
  const schedule =
    result.recommendedLoan.monthlyPayment > 0
      ? generateAmortizationSchedule({
          principal: result.recommendedLoan.recommendedAmount,
          annualRate: result.recommendedLoan.interestRate,
          termMonths: result.recommendedLoan.loanTerm,
        })
      : [];

  // Calculate total interest
  const totalInterest =
    result.recommendedLoan.totalRepayment - result.recommendedLoan.recommendedAmount;

  // Pie chart data for payment breakdown
  const pieData = [
    {
      name: 'Principal',
      value: result.recommendedLoan.recommendedAmount,
      color: '#00466E',
    },
    {
      name: 'Interest',
      value: totalInterest,
      color: '#E51718',
    },
  ];

  // Bar chart data for first 12 months
  const barData = schedule.slice(0, 12).map((entry) => ({
    month: `M${entry.month}`,
    principal: entry.principal,
    interest: entry.interest,
  }));

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Success Banner */}
      <motion.div variants={itemVariants}>
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:border-green-900 dark:from-green-950 dark:to-emerald-950">
          <CardContent className="flex items-center gap-4 p-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
            >
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </motion.div>
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
      </motion.div>

      {/* Approval Metrics */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-primary h-5 w-5" />
              Approval Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Approval Likelihood with animated progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Approval Likelihood
                </span>
                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {approvalPercentage}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${result.eligibilityResult.approvalLikelihood}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                />
              </div>
            </div>

            {/* Risk Category */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Risk Category</span>
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                  result.eligibilityResult.riskCategory === 'low'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : result.eligibilityResult.riskCategory === 'medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}
              >
                {result.eligibilityResult.riskCategory.toUpperCase()}
              </motion.span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Loan Details Grid */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="text-primary h-5 w-5" />
              Recommended Loan Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <motion.div
                className="rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-4 dark:from-zinc-900 dark:to-zinc-800"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Recommended Amount</p>
                <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {formatCurrency(result.recommendedLoan.recommendedAmount)}
                </p>
              </motion.div>

              <motion.div
                className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 dark:from-blue-950 dark:to-blue-900"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="text-sm text-blue-700 dark:text-blue-300">Maximum Amount</p>
                <p className="mt-1 text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {formatCurrency(result.recommendedLoan.maxAmount)}
                </p>
              </motion.div>

              <motion.div
                className="rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-4 dark:from-zinc-900 dark:to-zinc-800"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Interest Rate</p>
                <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {result.recommendedLoan.interestRate}%
                </p>
              </motion.div>

              <motion.div
                className="rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-4 dark:from-zinc-900 dark:to-zinc-800"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Monthly Payment</p>
                <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {formatCurrency(result.recommendedLoan.monthlyPayment)}
                </p>
              </motion.div>
            </div>

            <motion.div
              className="border-primary/20 from-primary/5 dark:border-primary/30 mt-6 rounded-xl border-2 bg-gradient-to-r to-transparent p-6"
              whileHover={{ borderColor: 'rgba(229, 23, 24, 0.4)' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Repayment</p>
                  <p className="text-primary mt-1 text-3xl font-bold">
                    {formatCurrency(result.recommendedLoan.totalRepayment)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Over {result.recommendedLoan.loanTerm} months
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    {formatCurrency(totalInterest)} in interest
                  </p>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="text-primary h-5 w-5" />
              Payment Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Pie Chart */}
              <div>
                <p className="mb-4 text-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Principal vs Interest
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1000}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => {
                        const numValue = typeof value === 'number' ? value : Number(value);
                        return [formatCurrency(numValue), ''];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 flex justify-center gap-6">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {item.name}: {formatCurrency(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar Chart */}
              <div>
                <p className="mb-4 text-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  First 12 Months Breakdown
                </p>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis
                      tickFormatter={(value) => `R${(value / 1000).toFixed(0)}k`}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value) => {
                        const numValue = typeof value === 'number' ? value : Number(value);
                        return [formatCurrency(numValue), ''];
                      }}
                    />
                    <Bar
                      dataKey="principal"
                      fill="#00466E"
                      name="Principal"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar dataKey="interest" fill="#E51718" name="Interest" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Affordability Analysis */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Affordability Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Disposable Income</p>
                <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {formatCurrency(result.affordabilityAnalysis.disposableIncome)}
                </p>
              </div>

              <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Debt-to-Income</p>
                <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {dtiPercentage}
                </p>
              </div>

              <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Loan-to-Income</p>
                <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {result.affordabilityAnalysis.loanToIncomeRatio}%
                </p>
              </div>
            </div>

            <div className="from-primary/10 via-primary/5 dark:from-primary/20 flex flex-col items-center justify-center rounded-xl bg-gradient-to-r to-transparent p-4">
              <GaugeChart
                value={
                  result.affordabilityAnalysis.affordabilityScore === 'excellent'
                    ? 90
                    : result.affordabilityAnalysis.affordabilityScore === 'good'
                      ? 75
                      : result.affordabilityAnalysis.affordabilityScore === 'fair'
                        ? 55
                        : 35
                }
                label="Affordability"
                size={220}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Amortization Schedule */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Amortization Schedule</CardTitle>
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
                      <TableCell className="text-right text-green-600 dark:text-green-400">
                        {formatCurrency(entry.principal)}
                      </TableCell>
                      <TableCell className="text-primary text-right">
                        {formatCurrency(entry.interest)}
                      </TableCell>
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
                  : `Showing first 6 of ${schedule.length} months`}
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
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
        <Button
          onClick={handleExport}
          variant="outline"
          className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
        <Button
          onClick={handlePrint}
          variant="outline"
          className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print Results
        </Button>
        <ShareButton
          resultData={{
            approvalLikelihood: result.eligibilityResult.approvalLikelihood,
            monthlyPayment: result.recommendedLoan.monthlyPayment,
          }}
        />
      </motion.div>

      {/* Mobile Sticky Action Buttons */}
      <div className="bg-background border-border mobile-sticky-actions fixed right-0 bottom-0 left-0 z-50 border-t p-4 shadow-lg sm:hidden">
        <div className="flex gap-2">
          <Button
            onClick={handleExport}
            variant="outline"
            className="flex-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            size="lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Export
          </Button>
          <Button
            onClick={handlePrint}
            variant="outline"
            className="flex-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            size="lg"
          >
            <Printer className="mr-2 h-5 w-5" />
            Print
          </Button>
          <div className="flex-1">
            <ShareButton
              resultData={{
                approvalLikelihood: result.eligibilityResult.approvalLikelihood,
                monthlyPayment: result.recommendedLoan.monthlyPayment,
              }}
            />
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <motion.div variants={itemVariants}>
        <Card className="border-primary/20 from-primary/5 dark:border-primary/30 bg-gradient-to-r to-transparent">
          <CardContent className="p-6">
            <h3 className="text-primary mb-3 font-semibold">Next Steps</h3>
            <ul className="space-y-3">
              {[
                'Contact Capitec Bank to finalize your loan application',
                'Prepare required documentation (ID proof, income statements)',
                'Review loan terms and conditions carefully',
                'Consider consulting a financial advisor for guidance',
              ].map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                >
                  <span className="bg-primary/10 text-primary mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                    {index + 1}
                  </span>
                  {step}
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
