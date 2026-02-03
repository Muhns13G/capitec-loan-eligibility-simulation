'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { useWizard } from '@/contexts/wizard-context';
import { loanApplicationSchema } from '@/lib/validation/schemas';

export function PersonalInfoStep() {
  const { formData, updateFormData, nextStep } = useWizard();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const onSubmit = (data: { personalInfo: unknown }) => {
    updateFormData(data as Partial<typeof formData>);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Personal Information
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Please provide your personal details to get started.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormInput
          label="Age"
          type="number"
          placeholder="35"
          error={errors.personalInfo?.age?.message}
          {...register('personalInfo.age', { valueAsNumber: true })}
          helperText="Must be between 18 and 65"
        />

        <FormInput
          label="Employment Duration (months)"
          type="number"
          placeholder="24"
          error={errors.personalInfo?.employmentDuration?.message}
          {...register('personalInfo.employmentDuration', { valueAsNumber: true })}
          helperText="Minimum 3 months required"
        />
      </div>

      <FormInput
        label="Employment Status"
        error={errors.personalInfo?.employmentStatus?.message}
        {...register('personalInfo.employmentStatus')}
        as="select"
        helperText="Select your current employment status"
      >
        <option value="employed">Employed</option>
        <option value="self_employed">Self Employed</option>
        <option value="unemployed">Unemployed</option>
        <option value="retired">Retired</option>
      </FormInput>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        Continue to Employment
      </Button>
    </form>
  );
}
