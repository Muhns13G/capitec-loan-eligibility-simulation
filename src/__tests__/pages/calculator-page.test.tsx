import { render, screen } from '@testing-library/react';
import CalculatorPage from '@/app/calculator/page';

// Mock the heavy chart components
jest.mock('@/components/calculator/payment-breakdown-chart', () => ({
  PaymentBreakdownChart: () => <div data-testid="payment-breakdown-chart">Chart</div>,
}));

jest.mock('@/components/calculator/amortization-table', () => ({
  AmortizationTable: () => <div data-testid="amortization-table">Table</div>,
}));

describe('CalculatorPage', () => {
  it('renders the calculator page', () => {
    render(<CalculatorPage />);
    expect(screen.getByRole('heading', { name: /loan calculator/i })).toBeInTheDocument();
  });

  it('displays breadcrumb navigation', () => {
    render(<CalculatorPage />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  it('has loan calculator heading', () => {
    render(<CalculatorPage />);
    expect(screen.getByRole('heading', { name: /loan calculator/i })).toBeInTheDocument();
  });

  it('displays payment breakdown section when there are results', () => {
    render(<CalculatorPage />);
    // Payment breakdown card is conditionally rendered based on monthlyPayment > 0
    // CardTitle renders as a div, not a heading, so use getByText
    expect(screen.getByText(/payment breakdown/i)).toBeInTheDocument();
  });

  it('has reset button', () => {
    render(<CalculatorPage />);
    expect(screen.getByRole('button', { name: /reset calculator/i })).toBeInTheDocument();
  });

  it('has link to apply page', () => {
    render(<CalculatorPage />);
    const applyLinks = screen.getAllByRole('link', { name: /start application/i });
    expect(applyLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('displays ready to apply section', () => {
    render(<CalculatorPage />);
    expect(screen.getByRole('heading', { name: /ready to apply/i })).toBeInTheDocument();
  });
});
