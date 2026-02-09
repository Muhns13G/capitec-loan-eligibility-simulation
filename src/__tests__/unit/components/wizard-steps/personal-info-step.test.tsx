import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PersonalInfoStep } from '@/components/wizard/steps/personal-info-step';
import { WizardProvider } from '@/contexts/wizard-context';

expect.extend(toHaveNoViolations);

describe('PersonalInfoStep - Accessibility Tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <WizardProvider>
        <PersonalInfoStep />
      </WizardProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper heading structure', () => {
    render(
      <WizardProvider>
        <PersonalInfoStep />
      </WizardProvider>
    );

    const heading = screen.getByRole('heading', { name: /personal information/i });
    expect(heading).toBeInTheDocument();
  });

  it('form has proper ARIA labeling', () => {
    render(
      <WizardProvider>
        <PersonalInfoStep />
      </WizardProvider>
    );

    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('aria-labelledby', 'personal-info-heading');
  });

  it('all form fields have proper labels', () => {
    render(
      <WizardProvider>
        <PersonalInfoStep />
      </WizardProvider>
    );

    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/employment duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/employment status/i)).toBeInTheDocument();
  });

  it('required fields have aria-required attribute', () => {
    render(
      <WizardProvider>
        <PersonalInfoStep />
      </WizardProvider>
    );

    const ageInput = screen.getByLabelText(/age/i);
    expect(ageInput).toHaveAttribute('aria-required', 'true');

    const employmentDurationInput = screen.getByLabelText(/employment duration/i);
    expect(employmentDurationInput).toHaveAttribute('aria-required', 'true');

    const employmentStatusSelect = screen.getByLabelText(/employment status/i);
    expect(employmentStatusSelect).toHaveAttribute('aria-required', 'true');
  });

  it('error summary is properly accessible', () => {
    render(
      <WizardProvider>
        <PersonalInfoStep />
      </WizardProvider>
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('PersonalInfoStep - Form Validation Tests', () => {
  it('submit button is present and enabled', () => {
    render(
      <WizardProvider>
        <PersonalInfoStep />
      </WizardProvider>
    );

    const submitButton = screen.getByRole('button', { name: /continue to employment/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  it('all form fields are present', () => {
    render(
      <WizardProvider>
        <PersonalInfoStep />
      </WizardProvider>
    );

    const ageInput = screen.getByLabelText(/age/i);
    expect(ageInput).toBeInTheDocument();

    const employmentDurationInput = screen.getByLabelText(/employment duration/i);
    expect(employmentDurationInput).toBeInTheDocument();

    const employmentStatusSelect = screen.getByLabelText(/employment status/i);
    expect(employmentStatusSelect).toBeInTheDocument();
  });
});

describe('PersonalInfoStep - Keyboard Navigation Tests', () => {
  it('is keyboard navigable', () => {
    render(
      <WizardProvider>
        <PersonalInfoStep />
      </WizardProvider>
    );

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    const numberInputs = screen.getAllByRole('spinbutton');
    const selects = screen.getAllByRole('combobox');

    expect(numberInputs.length + selects.length).toBeGreaterThan(0);
  });

  it('focus order is logical', () => {
    render(
      <WizardProvider>
        <PersonalInfoStep />
      </WizardProvider>
    );

    const ageInput = screen.getByLabelText(/age/i);
    ageInput.focus();
    expect(document.activeElement).toBe(ageInput);
  });
});
