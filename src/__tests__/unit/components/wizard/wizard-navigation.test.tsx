import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { WizardNavigation } from '@/components/wizard/wizard-navigation';
import { WizardProvider } from '@/contexts/wizard-context';

expect.extend(toHaveNoViolations);

describe('WizardNavigation - Accessibility Tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <WizardProvider>
        <WizardNavigation />
      </WizardProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('back button is accessible on first step', () => {
    render(
      <WizardProvider>
        <WizardNavigation />
      </WizardProvider>
    );

    const backButtons = screen.getAllByRole('button');
    expect(backButtons.length).toBeGreaterThan(0);
  });

  it('next button is accessible', () => {
    render(
      <WizardProvider>
        <WizardNavigation />
      </WizardProvider>
    );

    const nextButton = screen.getByText('Next Step');
    expect(nextButton).toBeInTheDocument();
  });

  it('buttons have accessible labels', () => {
    render(
      <WizardProvider>
        <WizardNavigation />
      </WizardProvider>
    );

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeVisible();
      expect(button.textContent).toBeTruthy();
    });
  });
});

describe('WizardNavigation - Functionality Tests', () => {
  it('disables back button on first step', () => {
    render(
      <WizardProvider>
        <WizardNavigation />
      </WizardProvider>
    );

    const backButtons = screen.getAllByRole('button');
    expect(backButtons[0]).toBeDisabled();
  });

  it('isNextDisabled prop disables next button', () => {
    render(
      <WizardProvider>
        <WizardNavigation isNextDisabled={true} />
      </WizardProvider>
    );

    const nextButton = screen.getByText('Next Step');
    expect(nextButton).toBeDisabled();
  });
});
