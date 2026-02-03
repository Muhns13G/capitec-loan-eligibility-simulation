'use client';

import { WizardProvider, useWizard } from '@/contexts/wizard-context';
import { WizardProgress } from '@/components/wizard/wizard-progress';
import { PersonalInfoStep } from '@/components/wizard/steps/personal-info-step';
import { EmploymentStep } from '@/components/wizard/steps/employment-step';
import { Card, CardContent } from '@/components/ui/card';

function WizardContent() {
  const { currentStep } = useWizard();

  return (
    <div className="space-y-8">
      <WizardProgress />

      <Card>
        <CardContent className="pt-6">
          {currentStep === 0 && <PersonalInfoStep />}
          {currentStep === 1 && <EmploymentStep />}
          {currentStep === 2 && (
            <div className="p-8 text-center">
              <p className="text-zinc-600 dark:text-zinc-400">
                Financial info step coming in Sprint 7...
              </p>
            </div>
          )}
          {currentStep === 3 && (
            <div className="p-8 text-center">
              <p className="text-zinc-600 dark:text-zinc-400">
                Loan details step coming in Sprint 7...
              </p>
            </div>
          )}
          {currentStep === 4 && (
            <div className="p-8 text-center">
              <p className="text-zinc-600 dark:text-zinc-400">
                Review step coming in Sprint 7...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-50 p-8 dark:bg-zinc-950">
      <div className="w-full max-w-3xl">
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
