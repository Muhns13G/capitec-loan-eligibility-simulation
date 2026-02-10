import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ApprovedView } from '@/components/results/approved-view';
import type { EligibilityCheckResponse } from '@/types/loan';

expect.extend(toHaveNoViolations);

const mockResult: EligibilityCheckResponse = {
  eligibilityResult: {
    isEligible: true,
    approvalLikelihood: 85,
    riskCategory: 'low',
    decisionReason: 'Excellent credit score and stable employment',
  },
  recommendedLoan: {
    maxAmount: 300000,
    recommendedAmount: 150000,
    interestRate: 12.5,
    monthlyPayment: 7589.47,
    totalRepayment: 182147.28,
    loanTerm: 24,
  },
  affordabilityAnalysis: {
    disposableIncome: 25000,
    debtToIncomeRatio: 30,
    loanToIncomeRatio: 40,
    affordabilityScore: 'excellent',
  },
};

describe('ApprovedView - Accessibility Tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ApprovedView result={mockResult} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper heading structure', () => {
    render(<ApprovedView result={mockResult} />);

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);

    const mainHeading = screen.getByRole('heading', { name: /congratulations/i });
    expect(mainHeading).toBeInTheDocument();
  });
});

describe('ApprovedView - Content Tests', () => {
  it('displays congratulatory message', () => {
    render(<ApprovedView result={mockResult} />);

    expect(screen.getByText(/Congratulations! You're Eligible/i)).toBeInTheDocument();
  });

  it('displays approval likelihood section', () => {
    render(<ApprovedView result={mockResult} />);

    expect(screen.getByText(/Approval Likelihood/i)).toBeInTheDocument();
    // The percentage is rendered but animated, just verify the section exists
    const section = screen.getByText(/Approval Likelihood/i).closest('div');
    expect(section).toBeInTheDocument();
  });

  it('displays recommended loan details', () => {
    render(<ApprovedView result={mockResult} />);

    expect(screen.getByText(/Recommended Amount/i)).toBeInTheDocument();
    expect(screen.getByText(/12.5%/i)).toBeInTheDocument();
  });

  it('displays risk category', () => {
    render(<ApprovedView result={mockResult} />);

    expect(screen.getByText(/Risk Category/i)).toBeInTheDocument();
    expect(screen.getByText('LOW')).toBeInTheDocument();
  });
});

describe('ApprovedView - User Interaction Tests', () => {
  it('has share button', () => {
    render(<ApprovedView result={mockResult} />);

    const shareButton = screen.getByRole('button', { name: /Share Results/i });
    expect(shareButton).toBeInTheDocument();
  });

  it('has export and print buttons', () => {
    render(<ApprovedView result={mockResult} />);

    expect(screen.getByRole('button', { name: /Export CSV/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Print/i })).toBeInTheDocument();
  });
});
