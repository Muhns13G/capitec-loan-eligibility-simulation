import { renderHook, waitFor } from '@testing-library/react';
import { useLoanResult } from '@/hooks/useLoanResult';

describe('useLoanResult Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('initializes with null result', () => {
    const { result } = renderHook(() => useLoanResult());
    expect(result.current.result).toBeNull();
  });

  it('returns result from localStorage', async () => {
    const mockResult = {
      eligibilityResult: { isEligible: true },
      recommendedLoan: { amount: 100000 },
    };
    localStorage.setItem('loan-wizard-result', JSON.stringify(mockResult));

    const { result } = renderHook(() => useLoanResult());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.result).toEqual(mockResult);
    expect(result.current.error).toBeNull();
  });

  it('returns error when no result found', async () => {
    const { result } = renderHook(() => useLoanResult());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      'No application result found. Please complete the application form.'
    );
    expect(result.current.result).toBeNull();
  });

  it('returns error for invalid JSON', async () => {
    localStorage.setItem('loan-wizard-result', 'invalid json');

    const { result } = renderHook(() => useLoanResult());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.result).toBeNull();
  });

  it('clears error when valid result is loaded', async () => {
    const mockResult = { eligibilityResult: { isEligible: true } };
    localStorage.setItem('loan-wizard-result', JSON.stringify(mockResult));

    const { result } = renderHook(() => useLoanResult());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
  });

  it('handles applicationId parameter', () => {
    const mockResult = { eligibilityResult: { isEligible: true } };
    localStorage.setItem('loan-wizard-result', JSON.stringify(mockResult));

    const { result } = renderHook(() => useLoanResult('test-id'));

    // Should still work with applicationId
    expect(result.current.result).toEqual(mockResult);
  });

  it('returns null result initially', () => {
    const { result } = renderHook(() => useLoanResult());
    expect(result.current.result).toBeNull();
  });

  it('eventually sets loading to false', async () => {
    const { result } = renderHook(() => useLoanResult());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
