import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { FormInput } from '@/components/ui/form-input';

expect.extend(toHaveNoViolations);

describe('FormInput Component - Accessibility Tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <FormInput label="Test Input" placeholder="Enter value" onChange={() => {}} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper label association', () => {
    render(<FormInput label="Email Address" placeholder="Enter email" onChange={() => {}} />);

    const input = screen.getByLabelText('Email Address');
    expect(input).toBeInTheDocument();
  });
});

describe('FormInput Component - Functionality Tests', () => {
  it('renders with label', () => {
    render(<FormInput label="Name" placeholder="Enter name" onChange={() => {}} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(
      <FormInput
        label="Password"
        placeholder="Enter password"
        helperText="Must be at least 8 characters"
        onChange={() => {}}
      />
    );

    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(
      <FormInput
        label="Email"
        placeholder="Enter email"
        error="Invalid email format"
        onChange={() => {}}
      />
    );

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  it('has required attribute when specified', () => {
    render(
      <FormInput label="Required Field" placeholder="Enter value" required onChange={() => {}} />
    );

    const input = screen.getByLabelText('Required Field');
    expect(input).toHaveAttribute('required');
  });

  it('renders as disabled when specified', () => {
    render(
      <FormInput label="Disabled Field" placeholder="Enter value" disabled onChange={() => {}} />
    );

    const input = screen.getByLabelText('Disabled Field');
    expect(input).toBeDisabled();
  });

  it('renders as readonly when specified', () => {
    render(
      <FormInput label="Readonly Field" value="readonly value" readOnly onChange={() => {}} />
    );

    const input = screen.getByLabelText('Readonly Field');
    expect(input).toHaveAttribute('readonly');
  });
});
