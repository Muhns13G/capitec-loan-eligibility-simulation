'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { useWizard } from '@/contexts/wizard-context';
import { loanApplicationSchema } from '@/lib/validation/schemas';

export function EmploymentStep() {
  const { formData, updateFormData, nextStep, prevStep } = useWizard();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      loanApplicationSchema.pick({
        employmentDetails: true,
      })
    ),
    defaultValues: {
      employmentDetails: formData.employmentDetails || {
        employerName: '',
        jobTitle: '',
        industry: '',
      },
    },
  });

  const onSubmit = (data: unknown) => {
    updateFormData(data as Partial<typeof formData>);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Employment Details
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Tell us about your current employment situation.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormInput
          label="Employer Name"
          placeholder="ABC Company"
          error={errors.employmentDetails?.employerName?.message}
          {...register('employmentDetails.employerName')}
        />

        <FormInput
          label="Job Title"
          placeholder="Software Developer"
          error={errors.employmentDetails?.jobTitle?.message}
          {...register('employmentDetails.jobTitle')}
        />
      </div>

      <FormInput
        label="Industry"
        placeholder="Technology"
        error={errors.employmentDetails?.industry?.message}
        {...register('employmentDetails.industry')}
        helperText="e.g., Technology, Finance, Healthcare"
      />

      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Continue to Financial Info
        </Button>
      </div>
    </form>
  );
}
