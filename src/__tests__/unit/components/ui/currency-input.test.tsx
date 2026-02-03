import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CurrencyInput } from '@/components/ui/currency-input';

describe('CurrencyInput', () => {
  it('renders currency input correctly', () => {
    render(
      <CurrencyInput
        label="Amount"
        value={1000}
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
  });

  it('formats value as currency on blur', async () => {
    const handleChange = jest.fn();
    render(
      <CurrencyInput
        label="Amount"
        value={1000}
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText('Amount');
    await userEvent.clear(input);
    await userEvent.type(input, '1500');

    expect(handleChange).toHaveBeenCalledWith(1500);
  });

  it('handles zero value', () => {
    const handleChange = jest.fn();
    render(
      <CurrencyInput
        label="Amount"
        value={0}
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText('Amount') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('displays error message', () => {
    render(
      <CurrencyInput
        label="Amount"
        value={1000}
        onChange={() => {}}
        error="Amount is required"
      />
    );

    expect(screen.getByText('Amount is required')).toBeInTheDocument();
  });
});
