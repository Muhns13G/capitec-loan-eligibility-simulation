import { render, screen } from '@testing-library/react';
import { ReviewStep } from '@/components/wizard/steps/review-step';

// Mock the wizard context
jest.mock('@/contexts/wizard-context', () => ({
  useWizard: () => ({
    formData: {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        age: 35,
        employmentStatus: 'employed',
        employmentDuration: 24,
      },
      employmentDetails: {
        employerName: 'ABC Company',
        jobTitle: 'Developer',
        industry: 'Technology',
      },
      financialInfo: {
        monthlyIncome: 25000,
        monthlyExpenses: 10000,
        existingDebt: 2000,
      },
      loanDetails: {
        requestedAmount: 100000,
        loanTerm: 24,
        loanPurpose: 'home_improvement',
      },
    },
    currentStep: 4,
    setStep: jest.fn(),
    submitApplication: jest.fn(),
    isSubmitting: false,
  }),
}));

describe('ReviewStep', () => {
  it('renders the review step', () => {
    render(<ReviewStep />);
    expect(screen.getByRole('heading', { name: /review/i })).toBeInTheDocument();
  });

  it('displays personal information', () => {
    render(<ReviewStep />);
    // The component displays age, not the name
    expect(screen.getByText(/35/)).toBeInTheDocument();
    expect(screen.getByText(/years old/)).toBeInTheDocument();
  });

  it('displays employment details', () => {
    render(<ReviewStep />);
    expect(screen.getByText(/abc company/i)).toBeInTheDocument();
  });

  it('displays loan details', () => {
    render(<ReviewStep />);
    // Loan amount is formatted as currency with ZAR format
    expect(screen.getByText(/Requested Amount/)).toBeInTheDocument();
    // Check that loan term is displayed (may appear multiple times)
    expect(screen.getAllByText(/24 months/).length).toBeGreaterThan(0);
  });

  it('has submit button', () => {
    render(<ReviewStep />);
    expect(screen.getByRole('button', { name: /submit application/i })).toBeInTheDocument();
  });

  it('has back button', () => {
    render(<ReviewStep />);
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });
});
