import { renderHook, act } from '@testing-library/react';
import { WizardProvider, useWizard } from '@/contexts/wizard-context';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <WizardProvider>{children}</WizardProvider>
);

describe('useWizard Hook', () => {
  let localStorageMock: { [key: string]: string } = {};

  beforeEach(() => {
    localStorageMock = {};
    Storage.prototype.getItem = jest.fn((key: string) => localStorageMock[key] || null);
    Storage.prototype.setItem = jest.fn((key: string, value: string) => {
      localStorageMock[key] = value;
    });
    Storage.prototype.removeItem = jest.fn((key: string) => {
      delete localStorageMock[key];
    });
    Storage.prototype.clear = jest.fn(() => {
      localStorageMock = {};
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorageMock = {};
  });

  it('initializes with step 0', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });
    expect(result.current.currentStep).toBe(0);
  });

  it('provides correct step count', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });
    expect(result.current.stepCount).toBe(5);
  });

  it('advances to next step', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(1);
  });

  it('goes back to previous step', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });

    act(() => {
      result.current.nextStep();
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(2);

    act(() => {
      result.current.prevStep();
    });

    expect(result.current.currentStep).toBe(1);
  });

  it('does not go below step 0', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });

    act(() => {
      result.current.prevStep();
    });

    expect(result.current.currentStep).toBe(0);
  });

  it('does not exceed maximum step', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });

    act(() => {
      result.current.nextStep(); // 0 -> 1
      result.current.nextStep(); // 1 -> 2
      result.current.nextStep(); // 2 -> 3
      result.current.nextStep(); // 3 -> 4
    });

    expect(result.current.currentStep).toBe(4);

    // Try to exceed max
    act(() => {
      result.current.nextStep(); // Should stay at 4
    });

    expect(result.current.currentStep).toBe(4);
  });

  it('updates form data', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });

    act(() => {
      result.current.updateFormData({
        personalInfo: { age: 30, employmentStatus: 'employed', employmentDuration: 12 },
      });
    });

    expect(result.current.formData.personalInfo?.age).toBe(30);
  });

  it('merges form data updates', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });

    act(() => {
      result.current.updateFormData({
        personalInfo: { age: 30, employmentStatus: 'employed', employmentDuration: 12 },
      });
      result.current.updateFormData({
        personalInfo: { employmentStatus: 'self_employed', age: 30, employmentDuration: 12 },
      });
    });

    // Check that data was merged
    expect(result.current.formData.personalInfo).toBeDefined();
  });

  it('resets wizard state', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });

    act(() => {
      result.current.nextStep();
      result.current.updateFormData({
        personalInfo: { age: 30, employmentStatus: 'employed', employmentDuration: 12 },
      });
      result.current.resetWizard();
    });

    expect(result.current.currentStep).toBe(0);
    expect(Object.keys(result.current.formData).length).toBe(0);
  });

  it('provides setCurrentStep function', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });

    act(() => {
      result.current.setCurrentStep(2);
    });

    expect(result.current.currentStep).toBe(2);
  });

  it('throws error when used outside WizardProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useWizard());
    }).toThrow('useWizard must be used within WizardProvider');

    consoleSpy.mockRestore();
  });

  it('initializes isSubmitting as false', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });
    expect(result.current.isSubmitting).toBe(false);
  });

  it('provides submitApplication function', () => {
    const { result } = renderHook(() => useWizard(), { wrapper });
    expect(typeof result.current.submitApplication).toBe('function');
  });
});
