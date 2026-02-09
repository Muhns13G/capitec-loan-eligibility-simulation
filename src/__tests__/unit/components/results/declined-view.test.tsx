import { render, screen } from '@testing-library/react';
import { DeclinedView } from '@/components/results/declined-view';

describe('DeclinedView - Accessibility Tests', () => {
  it('has proper heading structure', () => {
    render(<DeclinedView />);

    const mainHeading = screen.getByRole('heading', { name: /not approved/i });
    expect(mainHeading).toBeInTheDocument();
  });
});

describe('DeclinedView - Content Tests', () => {
  it('displays declination message', () => {
    render(<DeclinedView />);

    expect(screen.getByText(/Application Not Approved/i)).toBeInTheDocument();
  });

  it('displays common reasons for decline', () => {
    render(<DeclinedView />);

    expect(screen.getByText(/Common Reasons for Decline/i)).toBeInTheDocument();
  });

  it('lists all decline reasons', () => {
    render(<DeclinedView />);

    expect(screen.getByText(/High debt-to-income ratio/i)).toBeInTheDocument();
    expect(screen.getByText(/Insufficient disposable income/i)).toBeInTheDocument();
    expect(screen.getByText(/Short employment history/i)).toBeInTheDocument();
    expect(screen.getByText(/Low credit score/i)).toBeInTheDocument();
    expect(screen.getByText(/Recent late payments/i)).toBeInTheDocument();
  });
});

describe('DeclinedView - User Interaction Tests', () => {
  it('has how to improve section', () => {
    render(<DeclinedView />);

    expect(screen.getByText(/How to Improve Your Eligibility/i)).toBeInTheDocument();
  });

  it('has tips for improving eligibility', () => {
    render(<DeclinedView />);

    expect(screen.getByText(/Reduce Your Debt/i)).toBeInTheDocument();
    expect(screen.getByText(/Increase Your Income/i)).toBeInTheDocument();
    expect(screen.getByText(/Build Your Credit Score/i)).toBeInTheDocument();
    expect(screen.getByText(/Maintain Stable Employment/i)).toBeInTheDocument();
  });

  it('has calculator link', () => {
    render(<DeclinedView />);

    const calculatorLink = screen.getByRole('link', { name: /use calculator/i });
    expect(calculatorLink).toBeInTheDocument();
    expect(calculatorLink.getAttribute('href')).toBe('/calculator');
  });

  it('has apply again link', () => {
    render(<DeclinedView />);

    const applyLink = screen.getByRole('link', { name: /start new application/i });
    expect(applyLink).toBeInTheDocument();
    expect(applyLink.getAttribute('href')).toBe('/apply');
  });
});
