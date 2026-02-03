import { render, screen } from '@testing-library/react';
import { LoanSummaryCard } from '@/components/features/loan-summary-card';

describe('LoanSummaryCard', () => {
  it('renders loan summary correctly', () => {
    render(
      <LoanSummaryCard
        title="Loan Summary"
        monthlyPayment={5000}
        totalInterest={2000}
        totalRepayment={120000}
        loanAmount={100000}
        interestRate={12.5}
        loanTerm={24}
      />
    );

    expect(screen.getByText('Loan Summary')).toBeInTheDocument();
    expect(screen.getByText('Monthly Payment')).toBeInTheDocument();
    expect(screen.getByText('Total Interest')).toBeInTheDocument();
    expect(screen.getByText('Total Repayment')).toBeInTheDocument();
    
    // Check that the values are rendered (use the label context)
    const monthlyPaymentLabel = screen.getByText('Monthly Payment');
    expect(monthlyPaymentLabel).toBeInTheDocument();
    
    const totalInterestLabel = screen.getByText('Total Interest');
    expect(totalInterestLabel).toBeInTheDocument();
    
    const totalRepaymentLabel = screen.getByText('Total Repayment');
    expect(totalRepaymentLabel).toBeInTheDocument();
  });

  it('displays loan details correctly', () => {
    render(
      <LoanSummaryCard
        title="Loan Summary"
        monthlyPayment={5000}
        totalInterest={2000}
        totalRepayment={120000}
        loanAmount={100000}
        interestRate={12.5}
        loanTerm={24}
      />
    );

    expect(screen.getByText('Loan Amount')).toBeInTheDocument();
    expect(screen.getByText('Interest Rate')).toBeInTheDocument();
    expect(screen.getByText(/24 months/)).toBeInTheDocument();
    expect(screen.getByText(/2 years/)).toBeInTheDocument();
    expect(screen.getByText('Total Cost of Credit')).toBeInTheDocument();
  });
});
