import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AmortizationTable } from '@/components/calculator/amortization-table';
import type { AmortizationEntry } from '@/lib/calculations/loan';

expect.extend(toHaveNoViolations);

const mockSchedule: AmortizationEntry[] = [
  { month: 1, payment: 7589.47, principal: 5895.64, interest: 1693.83, balance: 144104.36 },
  { month: 2, payment: 7589.47, principal: 5937.16, interest: 1652.31, balance: 138167.2 },
];

describe('AmortizationTable - Accessibility Tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<AmortizationTable schedule={mockSchedule} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper table structure', () => {
    render(<AmortizationTable schedule={mockSchedule} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });
});

describe('AmortizationTable - Content Tests', () => {
  it('displays table headers', () => {
    render(<AmortizationTable schedule={mockSchedule} />);

    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(screen.getByText('Principal')).toBeInTheDocument();
    expect(screen.getByText('Interest')).toBeInTheDocument();
    expect(screen.getByText('Balance')).toBeInTheDocument();
  });

  it('displays schedule data', () => {
    render(<AmortizationTable schedule={mockSchedule} />);

    // Check for month numbers
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('handles empty schedule', () => {
    render(<AmortizationTable schedule={[]} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    // Table headers should still be present even with empty data
    expect(screen.getByText('Month')).toBeInTheDocument();
  });

  it('renders all rows', () => {
    render(<AmortizationTable schedule={mockSchedule} />);

    const rows = screen.getAllByRole('row');
    // Header row + 2 data rows
    expect(rows.length).toBe(3);
  });
});
