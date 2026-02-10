'use client';

import { WizardProvider, useWizard } from '@/contexts/wizard-context';
import { WizardProgress } from '@/components/wizard/wizard-progress';
import { PersonalInfoStep } from '@/components/wizard/steps/personal-info-step';
import { EmploymentStep } from '@/components/wizard/steps/employment-step';
import { FinancialInfoStep } from '@/components/wizard/steps/financial-info-step';
import { LoanDetailsStep } from '@/components/wizard/steps/loan-details-step';
import { ReviewStep } from '@/components/wizard/steps/review-step';
import { Card, CardContent } from '@/components/ui/card';
import { WizardStepTransition } from '@/components/wizard/wizard-step-transition';
import { Breadcrumb } from '@/components/a11y/accessibility-components';
import { SaveStatusIndicator } from '@/components/wizard/save-status-indicator';

function WizardContent() {
  const { currentStep } = useWizard();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex justify-end">
          <SaveStatusIndicator />
        </div>
        <WizardProgress />
      </div>

      <Card>
        <CardContent className="pt-6">
          <WizardStepTransition>
            {currentStep === 0 && <PersonalInfoStep />}
            {currentStep === 1 && <EmploymentStep />}
            {currentStep === 2 && <FinancialInfoStep />}
            {currentStep === 3 && <LoanDetailsStep />}
            {currentStep === 4 && <ReviewStep />}
          </WizardStepTransition>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 p-8 dark:bg-zinc-950">
      <div className="w-full max-w-3xl">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Apply' }]} />

        <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Loan Application
        </h1>

        <WizardProvider>
          <WizardContent />
        </WizardProvider>
      </div>
    </main>
  );
}
