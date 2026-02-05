/**
 * @jest-environment node
 */

import { TEST_SERVER_URL } from '@/test-utils/test-server';

describe('API Integration: Calculate Rate', () => {
  it('should calculate loan rate for valid input', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/calculate-rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        loanAmount: 100000,
        loanTerm: 36,
        creditScore: 700,
        loanType: 'personal_loan',
      }),
    });

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('monthlyPayment');
    expect(data.data).toHaveProperty('totalInterest');
    expect(data.data).toHaveProperty('totalRepayment');
    expect(data.data).toHaveProperty('interestRate');
    expect(typeof data.data.monthlyPayment).toBe('number');
    expect(typeof data.data.totalInterest).toBe('number');
    expect(typeof data.data.interestRate).toBe('number');
  });

  it('should return error for invalid loan amount', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/calculate-rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        loanAmount: -1000,
        loanTerm: 36,
        creditScore: 700,
        loanType: 'personal_loan',
      }),
    });

    expect(response.ok).toBe(false);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid request body');
  });

  it('should return error for invalid loan term', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/calculate-rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        loanAmount: 100000,
        loanTerm: 0,
        creditScore: 700,
        loanType: 'personal_loan',
      }),
    });

    expect(response.status).toBe(400);
  });

  it('should return error for invalid credit score', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/calculate-rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        loanAmount: 100000,
        loanTerm: 36,
        creditScore: 1000, // Above max
        loanType: 'personal_loan',
      }),
    });

    expect(response.status).toBe(400);
  });

  it('should return error for missing required fields', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/calculate-rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        loanAmount: 100000,
        loanType: 'personal_loan',
        // Missing loanTerm and creditScore
      }),
    });

    expect(response.status).toBe(400);
  });

  it('should return 405 for GET requests', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/calculate-rate`, {
      method: 'GET',
    });

    expect(response.status).toBe(405);
  });
});
