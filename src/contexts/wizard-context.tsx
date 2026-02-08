'use client';

import * as React from 'react';
import type { LoanApplicationInput } from '@/lib/validation/schemas';
import { useAnnouncer } from '@/hooks/use-announcer';

type WizardStep = 0 | 1 | 2 | 3 | 4;

interface WizardContextValue {
  currentStep: WizardStep;
  stepCount: number;
  formData: Partial<LoanApplicationInput>;
  isSubmitting: boolean;
  setCurrentStep: (step: WizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<LoanApplicationInput>) => void;
  resetWizard: () => void;
  submitApplication: () => Promise<void>;
  error: string | null;
  clearError: () => void;
  retrySubmission: () => void;
}

const WizardContext = React.createContext<WizardContextValue | undefined>(undefined);

const WIZARD_STEPS = 5;
const STEP_LABELS = ['Personal Info', 'Employment', 'Financial', 'Loan Details', 'Review'];

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = React.useState<WizardStep>(0);
  const [formData, setFormData] = React.useState<Partial<LoanApplicationInput>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { announcementRef, announce } = useAnnouncer();

  React.useEffect(() => {
    const saved = localStorage.getItem('loan-wizard-data');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        // Silently ignore invalid saved data
      }
    }
  }, []);

  React.useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('loan-wizard-data', JSON.stringify(formData));
    }
  }, [formData]);

  // Announce step changes for accessibility
  React.useEffect(() => {
    const stepLabel = STEP_LABELS[currentStep];
    announce(`Moving to step ${currentStep + 1} of ${WIZARD_STEPS}: ${stepLabel}`);
  }, [currentStep, announce]);

  const nextStep = () => {
    if (currentStep < WIZARD_STEPS - 1) {
      setCurrentStep((prev) => (prev + 1) as WizardStep);
      window.dispatchEvent(new CustomEvent('wizard-step-change'));
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => (prev - 1) as WizardStep);
      window.dispatchEvent(new CustomEvent('wizard-step-change'));
    }
  };

  const updateFormData = (data: Partial<LoanApplicationInput>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setFormData({});
    localStorage.removeItem('loan-wizard-data');
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/loans/eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.error || errorData.message || 'Failed to submit application';
        throw new Error(errorMsg);
      }

      const responseData = await response.json();

      // Extract the actual result data from the API response wrapper
      const result = responseData.data || responseData;

      // Save the result to localStorage for the results page
      localStorage.setItem('loan-wizard-result', JSON.stringify(result));
      localStorage.removeItem('loan-wizard-data');
      window.location.href = '/results';
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit application';
      setError(errorMessage);
      console.error('Application submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const retrySubmission = () => {
    submitApplication();
  };

  const value: WizardContextValue = {
    currentStep,
    stepCount: WIZARD_STEPS,
    formData,
    isSubmitting,
    setCurrentStep,
    nextStep,
    prevStep,
    updateFormData,
    resetWizard,
    submitApplication,
    error,
    clearError,
    retrySubmission,
  };

  return (
    <WizardContext.Provider value={value}>
      {children}
      {/* Screen Reader Announcements */}
      <div ref={announcementRef} aria-live="polite" aria-atomic="true" className="sr-only" />
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = React.useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within WizardProvider');
  }
  return context;
}
