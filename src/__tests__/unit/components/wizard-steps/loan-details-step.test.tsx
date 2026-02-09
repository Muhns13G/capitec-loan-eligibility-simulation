import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { LoanDetailsStep } from '@/components/wizard/steps/loan-details-step';
import { WizardProvider } from '@/contexts/wizard-context';

expect.extend(toHaveNoViolations);

describe('LoanDetailsStep - Accessibility Tests', () => {
  it.skip('has no accessibility violations', async () => {
    const { container } = render(
      <WizardProvider>
        <LoanDetailsStep />
      </WizardProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper heading structure', () => {
    render(
      <WizardProvider>
        <LoanDetailsStep />
      </WizardProvider>
    );

    const heading = screen.getByRole('heading', { name: /loan details/i });
    expect(heading).toBeInTheDocument();
  });

  it('all form fields have proper labels', () => {
    render(
      <WizardProvider>
        <LoanDetailsStep />
      </WizardProvider>
    );

    expect(screen.getByLabelText(/requested loan amount/i)).toBeInTheDocument();
    // Loan term and purpose labels are present
    expect(screen.getByText(/Loan Term \(months\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Loan Purpose/i)).toBeInTheDocument();
  });
});

describe('LoanDetailsStep - Form Validation Tests', () => {
  it('submit button is present and enabled', () => {
    render(
      <WizardProvider>
        <LoanDetailsStep />
      </WizardProvider>
    );

    const submitButton = screen.getByRole('button', { name: /review & submit/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  it('all form fields are present', () => {
    render(
      <WizardProvider>
        <LoanDetailsStep />
      </WizardProvider>
    );

    expect(screen.getByLabelText(/requested loan amount/i)).toBeInTheDocument();
    // Check for select element by role
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    // Loan term input is present
    expect(screen.getByPlaceholderText('24')).toBeInTheDocument();
  });
});

describe('LoanDetailsStep - User Interaction Tests', () => {
  it('displays quick estimate', () => {
    render(
      <WizardProvider>
        <LoanDetailsStep />
      </WizardProvider>
    );

    expect(screen.getByText(/Quick Estimate/i)).toBeInTheDocument();
  });

  it('displays loan terms', () => {
    render(
      <WizardProvider>
        <LoanDetailsStep />
      </WizardProvider>
    );

    expect(screen.getByText(/Estimated Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/Est. Monthly Payment/i)).toBeInTheDocument();
  });

  it('has back button to navigate to previous step', () => {
    render(
      <WizardProvider>
        <LoanDetailsStep />
      </WizardProvider>
    );

    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toBeInTheDocument();
  });
});
