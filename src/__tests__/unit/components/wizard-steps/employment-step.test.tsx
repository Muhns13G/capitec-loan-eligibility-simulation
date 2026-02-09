import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { EmploymentStep } from '@/components/wizard/steps/employment-step';
import { WizardProvider } from '@/contexts/wizard-context';

expect.extend(toHaveNoViolations);

describe('EmploymentStep - Accessibility Tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <WizardProvider>
        <EmploymentStep />
      </WizardProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper heading structure', () => {
    render(
      <WizardProvider>
        <EmploymentStep />
      </WizardProvider>
    );

    const heading = screen.getByRole('heading', { name: /employment details/i });
    expect(heading).toBeInTheDocument();
  });

  it('all form fields have proper labels', () => {
    render(
      <WizardProvider>
        <EmploymentStep />
      </WizardProvider>
    );

    expect(screen.getByLabelText(/employer name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/job title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/industry/i)).toBeInTheDocument();
  });
});

describe('EmploymentStep - Form Validation Tests', () => {
  it('submit button is present and enabled', () => {
    render(
      <WizardProvider>
        <EmploymentStep />
      </WizardProvider>
    );

    const submitButton = screen.getByRole('button', { name: /continue to financial info/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  it('all form fields are present', () => {
    render(
      <WizardProvider>
        <EmploymentStep />
      </WizardProvider>
    );

    expect(screen.getByLabelText(/employer name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/job title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/industry/i)).toBeInTheDocument();
  });
});

describe('EmploymentStep - User Interaction Tests', () => {
  it('allows data entry in form fields', () => {
    render(
      <WizardProvider>
        <EmploymentStep />
      </WizardProvider>
    );

    const employerInput = screen.getByLabelText(/employer name/i);
    fireEvent.change(employerInput, { target: { value: 'ABC Company' } });
    expect(employerInput).toHaveValue('ABC Company');

    const jobTitleInput = screen.getByLabelText(/job title/i);
    fireEvent.change(jobTitleInput, { target: { value: 'Software Developer' } });
    expect(jobTitleInput).toHaveValue('Software Developer');
  });

  it('has back button to navigate to previous step', () => {
    render(
      <WizardProvider>
        <EmploymentStep />
      </WizardProvider>
    );

    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toBeInTheDocument();
  });
});
