import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ApplyPage from '@/app/apply/page';
import { WizardProvider } from '@/contexts/wizard-context';

expect.extend(toHaveNoViolations);

describe('ApplyPage - Accessibility Tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <WizardProvider>
        <ApplyPage />
      </WizardProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper heading structure', () => {
    render(
      <WizardProvider>
        <ApplyPage />
      </WizardProvider>
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Loan Application');
  });

  it('has proper landmark regions', () => {
    render(
      <WizardProvider>
        <ApplyPage />
      </WizardProvider>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

describe('ApplyPage - Wizard Structure Tests', () => {
  it('renders wizard content area', () => {
    render(
      <WizardProvider>
        <ApplyPage />
      </WizardProvider>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
