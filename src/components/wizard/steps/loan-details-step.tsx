'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CurrencyInput } from '@/components/ui/currency-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWizard } from '@/contexts/wizard-context';
import { loanApplicationSchema } from '@/lib/validation/schemas';

const LOAN_PURPOSES = [
  { value: 'debt_consolidation', label: 'Debt Consolidation' },
  { value: 'home_improvement', label: 'Home Improvement' },
  { value: 'education', label: 'Education' },
  { value: 'medical', label: 'Medical Expenses' },
  { value: 'other', label: 'Other' },
];

export function LoanDetailsStep() {
  const { formData, updateFormData, nextStep } = useWizard();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      loanApplicationSchema.pick({
        loanDetails: true,
      })
    ),
    defaultValues: {
      loanDetails: formData.loanDetails || {
        requestedAmount: 0,
        loanTerm: 24,
        loanPurpose: 'other' as const,
      },
    },
  });

  const requestedAmount = watch('loanDetails.requestedAmount');
  const loanTerm = watch('loanDetails.loanTerm');

  const estimatedRate = 12.5;
  const monthlyRate = estimatedRate / 100 / 12;
  const estimatedPayment =
    requestedAmount > 0 && loanTerm > 0
      ? (requestedAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm))) /
        (Math.pow(1 + monthlyRate, loanTerm) - 1)
      : 0;

  const onSubmit = (data: { loanDetails: unknown }) => {
    updateFormData({ loanDetails: data.loanDetails as NonNullable<typeof formData.loanDetails> });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Loan Details</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Specify loan amount and term you are looking for.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <CurrencyInput
          label="Requested Loan Amount"
          value={requestedAmount || 0}
          onChange={(value) => setValue('loanDetails.requestedAmount', value)}
          error={errors.loanDetails?.requestedAmount?.message}
          helperText="Range: R5,000 - R300,000"
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Loan Term (months)
          </label>
          <input
            type="number"
            placeholder="24"
            className="flex h-9 w-full items-center justify-center rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800"
            {...register('loanDetails.loanTerm', { valueAsNumber: true })}
          />
          {errors.loanDetails?.loanTerm && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {errors.loanDetails.loanTerm.message}
            </p>
          )}
        </div>
        <div>
          <label className="mt-2 mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Range: 6 - 60 months
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Loan Purpose
        </label>
        <select
          {...register('loanDetails.loanPurpose')}
          className="flex h-9 w-full items-center justify-center rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500 dark:border-zinc-800"
        >
          {LOAN_PURPOSES.map((purpose) => (
            <option key={purpose.value} value={purpose.value}>
              {purpose.label}
            </option>
          ))}
        </select>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-50">Quick Estimate</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Loan Amount</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                {requestedAmount > 0
                  ? new Intl.NumberFormat('en-ZA', {
                      style: 'currency',
                      currency: 'ZAR',
                      minimumFractionDigits: 2,
                    }).format(requestedAmount)
                  : '-'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Term</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                {loanTerm > 0 ? `${loanTerm} months` : '-'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Estimated Rate</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-50">{estimatedRate}%</span>
            </div>
            <div className="flex justify-between border-t border-zinc-200 pt-3 text-sm dark:border-zinc-800">
              <span className="text-zinc-600 dark:text-zinc-400">Est. Monthly Payment</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-500">
                {estimatedPayment > 0
                  ? new Intl.NumberFormat('en-ZA', {
                      style: 'currency',
                      currency: 'ZAR',
                      minimumFractionDigits: 2,
                    }).format(estimatedPayment)
                  : '-'}
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            * This is a preliminary estimate. Final rate and payment will be calculated based on
            your complete application.
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={nextStep} disabled={isSubmitting}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Review & Submit
        </Button>
      </div>
    </form>
  );
}
