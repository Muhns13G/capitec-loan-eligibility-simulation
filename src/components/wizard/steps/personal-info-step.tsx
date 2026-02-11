'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { useWizard } from '@/contexts/wizard-context';
import { loanApplicationSchema } from '@/lib/validation/schemas';
import { ErrorSummary, RequiredFieldIndicator } from '@/components/a11y/accessibility-components';

export function PersonalInfoStep() {
  const { formData, updateFormData, nextStep } = useWizard();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(
      loanApplicationSchema.pick({
        personalInfo: true,
      })
    ),
    defaultValues: {
      personalInfo: formData.personalInfo || {
        firstName: '',
        lastName: '',
        age: 18,
        employmentStatus: 'employed' as const,
        employmentDuration: 3,
      },
    },
  });

  // Watch employmentDuration for display updates
  const employmentDuration = watch('personalInfo.employmentDuration') ?? 3;

  React.useEffect(() => {
    if (formData.personalInfo) {
      reset({
        personalInfo: formData.personalInfo,
      });
    }
  }, [formData.personalInfo, reset]);

  const onSubmit = (data: { personalInfo: unknown }) => {
    updateFormData(data as Partial<typeof formData>);
    nextStep();
  };

  // Collect errors for error summary
  const formErrors: Record<string, string | undefined> = {
    firstName: errors.personalInfo?.firstName?.message,
    lastName: errors.personalInfo?.lastName?.message,
    age: errors.personalInfo?.age?.message,
    employmentDuration: errors.personalInfo?.employmentDuration?.message,
    employmentStatus: errors.personalInfo?.employmentStatus?.message,
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      aria-labelledby="personal-info-heading"
    >
      <ErrorSummary errors={formErrors} />

      <div>
        <h2
          id="personal-info-heading"
          className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Personal Information
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Please provide your personal details to get started. Fields marked with{' '}
          <RequiredFieldIndicator /> are required.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormInput
          id="firstName"
          label={
            <>
              First Name
              <RequiredFieldIndicator />
            </>
          }
          type="text"
          placeholder="John"
          error={errors.personalInfo?.firstName?.message}
          {...register('personalInfo.firstName')}
          helperText="Enter your first name"
          aria-required="true"
        />

        <FormInput
          id="lastName"
          label={
            <>
              Last Name
              <RequiredFieldIndicator />
            </>
          }
          type="text"
          placeholder="Doe"
          error={errors.personalInfo?.lastName?.message}
          {...register('personalInfo.lastName')}
          helperText="Enter your last name"
          aria-required="true"
        />
      </div>

      <div className="max-w-[200px]">
        <FormInput
          id="age"
          label={
            <>
              Age
              <RequiredFieldIndicator />
            </>
          }
          type="number"
          placeholder="35"
          error={errors.personalInfo?.age?.message}
          {...register('personalInfo.age', { valueAsNumber: true })}
          helperText="18-65 years"
          min={18}
          max={65}
          aria-required="true"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Employment Duration
          <RequiredFieldIndicator />
        </label>
        <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
          {(() => {
            const months = employmentDuration;
            const years = Math.floor(months / 12);
            const remainingMonths = months % 12;
            if (years === 0) return `${months} months`;
            if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
            return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
          })()}
        </p>
        <input
          type="range"
          min={3}
          max={120}
          step={3}
          {...register('personalInfo.employmentDuration', { valueAsNumber: true })}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 dark:bg-zinc-800"
          aria-label="Adjust employment duration"
          aria-required="true"
        />
        <div className="mt-2 flex justify-between text-xs text-zinc-500">
          <span>3 months</span>
          <span>10 years</span>
        </div>
        {errors.personalInfo?.employmentDuration && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.personalInfo.employmentDuration.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="employmentStatus"
          className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Employment Status
          <RequiredFieldIndicator />
        </label>
        <select
          id="employmentStatus"
          {...register('personalInfo.employmentStatus')}
          className="flex h-9 w-full items-center justify-center rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800"
          aria-required="true"
          aria-invalid={errors.personalInfo?.employmentStatus ? 'true' : undefined}
        >
          <option value="employed">Employed</option>
          <option value="self_employed">Self Employed</option>
          <option value="unemployed">Unemployed</option>
          <option value="retired">Retired</option>
        </select>
        {errors.personalInfo?.employmentStatus && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.personalInfo.employmentStatus.message}
          </p>
        )}
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Select your current employment status
        </p>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
        aria-label="Continue to employment details step"
      >
        Continue to Employment
      </Button>
    </form>
  );
}