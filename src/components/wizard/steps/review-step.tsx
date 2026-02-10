'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWizard } from '@/contexts/wizard-context';
import type { WizardStep } from '@/contexts/wizard-context';
import { Check, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CollapsibleCard } from '@/components/ui/collapsible-card';

export function ReviewStep() {
  const {
    formData,
    currentStep,
    setCurrentStep,
    prevStep,
    isSubmitting,
    submitApplication,
    error,
    clearError,
    retrySubmission,
  } = useWizard();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleEdit = (step: number) => {
    setCurrentStep(step as WizardStep);
  };

  const handleSubmit = async () => {
    try {
      clearError();
      await submitApplication();
      setIsSuccess(true);
      setTimeout(() => {
        setIsNavigating(true);
        window.location.href = '/results';
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit application';
      toast.error('Submission Failed', {
        description: errorMessage,
        action: {
          label: 'Try Again',
          onClick: () => retrySubmission(),
        },
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error('Submission Failed', {
        description: error,
        action: {
          label: 'Try Again',
          onClick: () => retrySubmission(),
        },
      });
    }
  }, [error, retrySubmission]);

  const { personalInfo, financialInfo, loanDetails, employmentDetails } = formData;

  const disposableIncome =
    (financialInfo?.monthlyIncome || 0) -
    (financialInfo?.monthlyExpenses || 0) -
    (financialInfo?.existingDebt || 0);

  const dti =
    ((financialInfo?.monthlyExpenses || 0) + (financialInfo?.existingDebt || 0)) /
    (financialInfo?.monthlyIncome || 1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Review & Submit</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Please review your application details before submitting.
        </p>
      </div>

      <div className="space-y-4">
        <CollapsibleCard
          title="Personal Information"
          stepIndex={0}
          currentStep={currentStep}
          onEdit={handleEdit}
          defaultOpen={true}
        >
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Age</span>
              <span className="font-medium">{personalInfo?.age} years old</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Employment Status</span>
              <span className="font-medium capitalize">
                {personalInfo?.employmentStatus?.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Employment Duration</span>
              <span className="font-medium">{personalInfo?.employmentDuration} months</span>
            </div>
            {employmentDetails && (
              <>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Employer Name</span>
                  <span className="font-medium">{employmentDetails.employerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Job Title</span>
                  <span className="font-medium">{employmentDetails.jobTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Industry</span>
                  <span className="font-medium">{employmentDetails.industry}</span>
                </div>
              </>
            )}
          </div>
        </CollapsibleCard>

        <CollapsibleCard
          title="Financial Information"
          stepIndex={1}
          currentStep={currentStep}
          onEdit={handleEdit}
          defaultOpen={true}
        >
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Monthly Income</span>
              <span className="font-medium">
                {new Intl.NumberFormat('en-ZA', {
                  style: 'currency',
                  currency: 'ZAR',
                  minimumFractionDigits: 2,
                }).format(financialInfo?.monthlyIncome || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Monthly Expenses</span>
              <span className="font-medium">
                {new Intl.NumberFormat('en-ZA', {
                  style: 'currency',
                  currency: 'ZAR',
                  minimumFractionDigits: 2,
                }).format(financialInfo?.monthlyExpenses || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Existing Debt</span>
              <span className="font-medium">
                {new Intl.NumberFormat('en-ZA', {
                  style: 'currency',
                  currency: 'ZAR',
                  minimumFractionDigits: 2,
                }).format(financialInfo?.existingDebt || 0)}
              </span>
            </div>
            {financialInfo?.creditScore && (
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Credit Score</span>
                <span className="font-medium">{financialInfo.creditScore}</span>
              </div>
            )}
            <div className="border-t border-zinc-200 pt-2 dark:border-zinc-800">
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Disposable Income</span>
                <span className="font-bold text-green-600">
                  {new Intl.NumberFormat('en-ZA', {
                    style: 'currency',
                    currency: 'ZAR',
                    minimumFractionDigits: 2,
                  }).format(disposableIncome)}
                </span>
              </div>
            </div>
          </div>
        </CollapsibleCard>

        <CollapsibleCard
          title="Loan Details"
          stepIndex={2}
          currentStep={currentStep}
          onEdit={handleEdit}
          defaultOpen={true}
        >
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Requested Amount</span>
              <span className="font-medium">
                {new Intl.NumberFormat('en-ZA', {
                  style: 'currency',
                  currency: 'ZAR',
                  minimumFractionDigits: 2,
                }).format(loanDetails?.requestedAmount || 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Loan Term</span>
              <span className="font-medium">{loanDetails?.loanTerm} months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">Loan Purpose</span>
              <span className="font-medium capitalize">
                {loanDetails?.loanPurpose?.replace('_', ' ')}
              </span>
            </div>
          </div>
        </CollapsibleCard>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Financial Health Check</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {disposableIncome > 5000 && dti < 0.4 && (
              <div className="flex items-start gap-3 rounded-lg bg-green-50 p-3 dark:bg-green-950">
                <Check className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100">
                    Good Financial Standing
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Your disposable income and debt-to-income ratio are in a healthy range for loan
                    approval.
                  </p>
                </div>
              </div>
            )}

            {disposableIncome > 2000 && disposableIncome <= 5000 && (
              <div className="flex items-start gap-3 rounded-lg bg-yellow-50 p-3 dark:bg-yellow-950">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <p className="font-medium text-yellow-900 dark:text-yellow-100">
                    Moderate Financial Standing
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Your application may be subject to additional review based on your disposable
                    income.
                  </p>
                </div>
              </div>
            )}

            {disposableIncome < 2000 && (
              <div className="flex items-start gap-3 rounded-lg bg-red-50 p-3 dark:bg-red-950">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600 dark:text-red-400" />
                <div>
                  <p className="font-medium text-red-900 dark:text-red-100">
                    Limited Financial Capacity
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Your disposable income is low, which may affect loan approval. Consider reducing
                    expenses or increasing income before applying.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="rounded-lg bg-zinc-50 p-4 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          <p className="font-semibold">Important Notice:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>This is a prototype loan eligibility simulator</li>
            <li>All calculations use internal mock data only</li>
            <li>No credit bureau checks are performed</li>
            <li>Results are for demonstration purposes only</li>
            <li>Contact Capitec Bank directly for official loan applications</li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={isSubmitting || isSuccess || isNavigating}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || isNavigating}
          size="lg"
          className={`btn-morph ${isSuccess ? 'success' : ''}`}
        >
          <span className="btn-text">
            {isSubmitting
              ? 'Submitting...'
              : isNavigating
                ? 'Redirecting...'
                : 'Submit Application'}
          </span>
          <span className="btn-icon">
            <Check className="h-5 w-5" />
          </span>
        </Button>
      </div>
    </div>
  );
}
