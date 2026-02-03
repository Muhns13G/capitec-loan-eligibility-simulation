'use client';

import { useWizard } from '@/contexts/wizard-context';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const STEP_LABELS = [
  'Personal Info',
  'Employment',
  'Financial',
  'Loan Details',
];

export function WizardProgress() {
  const { currentStep, stepCount } = useWizard();

  const progressPercentage = ((currentStep + 1) / stepCount) * 100;

  return (
    <div className="space-y-4">
      <Progress value={progressPercentage} />

      <div className="flex items-center justify-between text-sm">
        {STEP_LABELS.map((label, index) => {
          const isActive = index === currentStep;
          const isPast = index < currentStep;
          const isNext = index > currentStep;

          return (
            <div
              key={label}
              className={cn(
                'flex flex-1 flex-col items-center gap-1',
                index < STEP_LABELS.length - 1 && 'mr-2'
              )}
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                  isActive &&
                    'bg-blue-600 text-white dark:bg-blue-500',
                  isPast &&
                    'bg-green-600 text-white dark:bg-green-500',
                  isNext &&
                    'border-2 border-zinc-300 bg-white text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400'
                )}
              >
                {isPast ? '✓' : index + 1}
              </div>
              <span
                className={cn(
                  'text-center text-xs',
                  isActive &&
                    'font-medium text-zinc-900 dark:text-zinc-50',
                  isPast &&
                    'text-zinc-600 dark:text-zinc-400',
                  isNext &&
                    'text-zinc-400 dark:text-zinc-600'
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
