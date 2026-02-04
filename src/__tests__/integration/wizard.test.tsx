import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WizardProvider } from '@/contexts/wizard-context';
import { PersonalInfoStep } from '@/components/wizard/steps/personal-info-step';

function TestWizard() {
  return (
    <WizardProvider>
      <PersonalInfoStep />
    </WizardProvider>
  );
}

describe('Wizard Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should navigate through steps correctly', async () => {
    render(<TestWizard />);

    // Step 1: Personal Info
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Continue to Employment')).toBeInTheDocument();

    // Fill in valid data
    const ageInput = screen.getByLabelText(/age/i);
    const durationInput = screen.getByLabelText(/employment duration/i);

    fireEvent.change(ageInput, { target: { value: '35' } });
    fireEvent.change(durationInput, { target: { value: '24' } });

    // Submit step
    fireEvent.click(screen.getByText('Continue to Employment'));

    // Verify data was saved
    await waitFor(() => {
      expect(localStorage.getItem('loan-wizard-data')).toBeTruthy();
    });
  });

  it('should validate form fields', async () => {
    render(<TestWizard />);

    // Try to submit with invalid data
    const submitButton = screen.getByText('Continue to Employment');
    fireEvent.click(submitButton);

    // Show validation errors (using actual error text from component)
    await waitFor(() => {
      expect(screen.getByText(/Age must be at least 18/)).toBeInTheDocument();
    });
  });

  it('should save data to localStorage', async () => {
    const testData = {
      personalInfo: {
        age: 35,
        employmentStatus: 'employed',
        employmentDuration: 24,
      },
    };

    localStorage.setItem('loan-wizard-data', JSON.stringify(testData));

    render(<TestWizard />);

    // Check if data was loaded
    await waitFor(() => {
      const ageInput = screen.getByLabelText(/age/i) as HTMLInputElement;
      expect(ageInput.value).toBe('35');
    });
  });
});
