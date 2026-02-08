'use client';

import { useWizard } from '@/contexts/wizard-context';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const STEP_LABELS = ['Personal Info', 'Employment', 'Financial', 'Loan Details', 'Review'];

export function WizardProgress() {
  const { currentStep, stepCount } = useWizard();

  const progressPercentage = ((currentStep + 1) / stepCount) * 100;

  return (
    <div className="space-y-4">
      <Progress
        value={progressPercentage}
        aria-label={`Application progress: ${progressPercentage}% complete`}
      />

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
                  'flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all duration-300',
                  isPast &&
                    'cursor-pointer bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600',
                  isActive &&
                    'bg-blue-600 text-white ring-4 ring-blue-200 dark:bg-blue-500 dark:ring-blue-700',
                  isNext &&
                    'border-2 border-zinc-300 bg-white text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400'
                )}
              >
                {isPast ? '✓' : index + 1}
              </div>
              <span
                className={cn(
                  'text-center text-xs transition-colors duration-300',
                  isActive && 'font-semibold text-zinc-900 dark:text-zinc-50',
                  isPast && 'text-zinc-700 dark:text-zinc-300',
                  isNext && 'text-zinc-400 dark:text-zinc-600'
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
