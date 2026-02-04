'use client';

import { useEffect, useState } from 'react';
import type { EligibilityCheckResponse } from '@/types/loan';

export function useLoanResult(applicationId?: string) {
  const [result, setResult] = useState<EligibilityCheckResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResult() {
      try {
        setLoading(true);
        setError(null);

        const savedResult = localStorage.getItem('loan-wizard-result');
        if (savedResult) {
          const parsed = JSON.parse(savedResult);
          setResult(parsed);
          setLoading(false);
          return;
        }

        setError('No application result found. Please complete the application form.');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load result');
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [applicationId]);

  return { result, loading, error };
}
