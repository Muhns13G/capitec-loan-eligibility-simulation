'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';
import { formatCurrency } from '@/lib/calculations/loan';
import { Calculator, TrendingUp, Clock } from 'lucide-react';

export function CalculatorPreview() {
  const [loanAmount, setLoanAmount] = useState(150000);
  const [loanTerm, setLoanTerm] = useState(24);

  const result = useLoanCalculator({
    loanAmount,
    interestRate: 12.5,
    loanTerm,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="calculator-preview-card mx-auto max-w-md rounded-2xl border border-zinc-200 bg-white p-5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="mb-4 flex items-center justify-center">
        <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-lg">
          <Calculator className="h-4.5 w-4.5" />
        </div>
      </div>

      <div className="space-y-5">
        {/* Loan Amount Slider */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Loan Amount
            </label>
            <span className="text-primary font-semibold">{formatCurrency(loanAmount)}</span>
          </div>
          <input
            type="range"
            min={5000}
            max={300000}
            step={5000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 dark:bg-zinc-700"
          />
        </div>

        {/* Loan Term Slider */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Term</label>
            <span className="text-primary font-semibold">{loanTerm} months</span>
          </div>
          <input
            type="range"
            min={6}
            max={60}
            step={6}
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 dark:bg-zinc-700"
          />
        </div>

        {/* Result */}
        <div className="from-primary/5 dark:from-primary/10 rounded-xl bg-gradient-to-r to-transparent p-3.5">
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <TrendingUp className="text-primary h-3.5 w-3.5" />
            Estimated Monthly
          </div>
          <div className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {formatCurrency(result.monthlyPayment)}
          </div>
          <div className="mt-1.5 flex items-center gap-4 text-[11px] text-zinc-500">
            <span className="flex items-center gap-1">
              <Clock className="h-2.5 w-2.5" />
              {loanTerm} months
            </span>
            <span>12.5% interest</span>
          </div>
        </div>

        <a
          href="/calculator"
          className="bg-primary hover:bg-primary/90 block w-full rounded-lg px-4 py-2 text-center text-sm font-medium text-white transition"
        >
          Use Full Calculator
        </a>
      </div>
    </motion.div>
  );
}
