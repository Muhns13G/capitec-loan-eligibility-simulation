'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CurrencyInput } from '@/components/ui/currency-input';
import { Button } from '@/components/ui/button';
import { useWizard } from '@/contexts/wizard-context';
import { loanApplicationSchema } from '@/lib/validation/schemas';

export function FinancialInfoStep() {
  const { formData, updateFormData, nextStep, prevStep } = useWizard();

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      loanApplicationSchema.pick({
        financialInfo: true,
      })
    ),
    defaultValues: {
      financialInfo: formData.financialInfo || {
        monthlyIncome: 0,
        monthlyExpenses: 0,
        existingDebt: 0,
        creditScore: undefined,
      },
    },
  });

  const monthlyIncome = watch('financialInfo.monthlyIncome');
  const monthlyExpenses = watch('financialInfo.monthlyExpenses');
  const existingDebt = watch('financialInfo.existingDebt');

  const disposableIncome = Math.max(
    0,
    (monthlyIncome || 0) - (monthlyExpenses || 0) - (existingDebt || 0)
  );

  const onSubmit = (data: { financialInfo: unknown }) => {
    updateFormData({
      financialInfo: data.financialInfo as NonNullable<typeof formData.financialInfo>,
    });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Financial Information
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Please provide your monthly income and expenses.
        </p>
      </div>

      <div className="space-y-4">
        <CurrencyInput
          label="Monthly Income (after tax)"
          value={monthlyIncome || 0}
          onChange={(value) => setValue('financialInfo.monthlyIncome', value)}
          error={errors.financialInfo?.monthlyIncome?.message}
          helperText="Minimum R5,000 required"
        />

        <CurrencyInput
          label="Monthly Expenses"
          value={monthlyExpenses || 0}
          onChange={(value) => setValue('financialInfo.monthlyExpenses', value)}
          error={errors.financialInfo?.monthlyExpenses?.message}
          helperText="Rent, utilities, groceries, etc."
        />

        <CurrencyInput
          label="Existing Monthly Debt"
          value={existingDebt || 0}
          onChange={(value) => setValue('financialInfo.existingDebt', value)}
          error={errors.financialInfo?.existingDebt?.message}
          helperText="Credit card, personal loan, bond payments, etc."
        />
      </div>

      <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Estimated Disposable Income
          </span>
          <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {new Intl.NumberFormat('en-ZA', {
              style: 'currency',
              currency: 'ZAR',
              minimumFractionDigits: 2,
            }).format(disposableIncome)}
          </span>
        </div>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          This is the amount available for loan repayment each month
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Continue to Loan Details
        </Button>
      </div>
    </form>
  );
}
