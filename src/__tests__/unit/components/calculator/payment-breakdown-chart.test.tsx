import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PaymentBreakdownChart } from '@/components/calculator/payment-breakdown-chart';
import type { CalculatorResult } from '@/hooks/useLoanCalculator';

expect.extend(toHaveNoViolations);

const mockResult: CalculatorResult = {
  monthlyPayment: 7589.47,
  totalInterest: 32147.28,
  totalRepayment: 182147.28,
  amortizationSchedule: [
    { month: 1, payment: 7589.47, principal: 5895.64, interest: 1693.83, balance: 144104.36 },
    { month: 2, payment: 7589.47, principal: 5937.16, interest: 1652.31, balance: 138167.2 },
  ],
  isCalculating: false,
};

describe('PaymentBreakdownChart - Accessibility Tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<PaymentBreakdownChart result={mockResult} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('PaymentBreakdownChart - Content Tests', () => {
  it('renders chart with aria-label', () => {
    render(<PaymentBreakdownChart result={mockResult} />);

    const chart = screen.getByRole('img');
    expect(chart).toBeInTheDocument();
    expect(chart).toHaveAttribute(
      'aria-label',
      'Payment breakdown chart showing principal and interest portions'
    );
  });

  it('renders responsive container', () => {
    render(<PaymentBreakdownChart result={mockResult} />);

    const container = document.querySelector('.recharts-responsive-container');
    expect(container).toBeInTheDocument();
  });
});
