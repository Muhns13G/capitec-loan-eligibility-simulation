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
        age: 0,
        employmentStatus: 'employed' as const,
        employmentDuration: 0,
      },
    },
  });

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
          helperText="Must be between 18 and 65"
          min={18}
          max={65}
          aria-required="true"
        />

        <FormInput
          id="employmentDuration"
          label={
            <>
              Employment Duration (months)
              <RequiredFieldIndicator />
            </>
          }
          type="number"
          placeholder="24"
          error={errors.personalInfo?.employmentDuration?.message}
          {...register('personalInfo.employmentDuration', { valueAsNumber: true })}
          helperText="Minimum 3 months required"
          min={3}
          max={480}
          aria-required="true"
        />
      </div>

      <FormInput
        id="employmentStatus"
        label={
          <>
            Employment Status
            <RequiredFieldIndicator />
          </>
        }
        error={errors.personalInfo?.employmentStatus?.message}
        {...register('personalInfo.employmentStatus')}
        as="select"
        helperText="Select your current employment status"
        aria-required="true"
      >
        <option value="employed">Employed</option>
        <option value="self_employed">Self Employed</option>
        <option value="unemployed">Unemployed</option>
        <option value="retired">Retired</option>
      </FormInput>

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
