/**
 * @jest-environment node
 */

import { TEST_SERVER_URL } from '@/test-utils/test-server';

/**
 * Integration tests for loan eligibility API endpoint
 */

describe('API Integration: Eligibility', () => {
  const API_URL = `${TEST_SERVER_URL}/api/loans/eligibility`;

  it('should return eligibility result for valid application', async () => {
    const requestBody = {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        age: 35,
        employmentStatus: 'employed',
        employmentDuration: 24,
      },
      employmentDetails: {
        employerName: 'Test Corp',
        jobTitle: 'Software Developer',
        industry: 'Technology',
      },
      financialInfo: {
        monthlyIncome: 50000,
        monthlyExpenses: 10000,
        existingDebt: 2000,
        creditScore: 750,
      },
      loanDetails: {
        requestedAmount: 150000,
        loanTerm: 24,
        loanPurpose: 'home_improvement',
      },
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    expect(response.ok).toBe(true);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('eligibilityResult');
    expect(data.data).toHaveProperty('recommendedLoan');
    expect(data.data).toHaveProperty('affordabilityAnalysis');
    expect(data.data.eligibilityResult.isEligible).toBe(true);
  });

  it('should reject invalid request body', async () => {
    const invalidBody = {
      personalInfo: {
        age: 16, // Invalid: below minimum
        employmentStatus: 'invalid', // Invalid: not enum value
        employmentDuration: 1, // Invalid: below minimum
      },
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidBody),
    });

    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.error).toBe('Invalid request body');
  });

  it('should handle high DTI applications', async () => {
    const highDTIBody = {
      personalInfo: {
        firstName: 'Jane',
        lastName: 'Smith',
        age: 35,
        employmentStatus: 'employed',
        employmentDuration: 24,
      },
      employmentDetails: {
        employerName: 'Test Corp',
        jobTitle: 'Manager',
        industry: 'Retail',
      },
      financialInfo: {
        monthlyIncome: 10000,
        monthlyExpenses: 8000,
        existingDebt: 4000, // DTI = 120% (very high)
        creditScore: 500,
      },
      loanDetails: {
        requestedAmount: 150000,
        loanTerm: 24,
        loanPurpose: 'home_improvement',
      },
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(highDTIBody),
    });

    expect(response.ok).toBe(true);

    const data = await response.json();
    expect(data.data.eligibilityResult.isEligible).toBe(false);
    expect(data.data.eligibilityResult.riskCategory).toBe('critical');
  });

  it('should return 405 for GET requests', async () => {
    const response = await fetch(API_URL, {
      method: 'GET',
    });

    expect(response.status).toBe(405);
  });

  it('should validate required fields', async () => {
    const incompleteBody = {
      personalInfo: {
        age: 35,
      },
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incompleteBody),
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid request body');
  });
});
