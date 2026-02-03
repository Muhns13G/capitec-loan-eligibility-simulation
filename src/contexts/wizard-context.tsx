'use client';

import * as React from 'react';
import type { LoanApplicationInput } from '@/lib/validation/schemas';

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
}

const WizardContext = React.createContext<WizardContextValue | undefined>(undefined);

const WIZARD_STEPS = 4;

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = React.useState<WizardStep>(0);
  const [formData, setFormData] = React.useState<Partial<LoanApplicationInput>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('loan-wizard-data');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load saved form data:', error);
      }
    }
  }, []);

  React.useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('loan-wizard-data', JSON.stringify(formData));
    }
  }, [formData]);

  const nextStep = () => {
    if (currentStep < WIZARD_STEPS) {
      setCurrentStep((prev) => (prev + 1) as WizardStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => (prev - 1) as WizardStep);
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
    try {
      const response = await fetch('/api/loans/eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      localStorage.removeItem('loan-wizard-data');
      window.location.href = '/results';
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
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
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard() {
  const context = React.useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within WizardProvider');
  }
  return context;
}
