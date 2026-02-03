'use client';

import { useWizard } from '@/contexts/wizard-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function WizardNavigation({
  onNext,
  onBack,
  isNextDisabled,
}: {
  onNext?: () => void;
  onBack?: () => void;
  isNextDisabled?: boolean;
}) {
  const { currentStep, stepCount, prevStep, isSubmitting } = useWizard();

  const isFirstStep = currentStep === 0;
  const isReviewStep = currentStep === stepCount;

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    prevStep();
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={isFirstStep || isSubmitting}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Button
        onClick={handleNext}
        disabled={isNextDisabled || isSubmitting}
      >
        {isReviewStep ? 'Submit Application' : 'Next Step'}
        {!isReviewStep && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
}
