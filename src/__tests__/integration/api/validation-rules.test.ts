/**
 * @jest-environment node
 */

import { TEST_SERVER_URL } from '@/test-utils/test-server';

describe('API Integration: Validation Rules', () => {
  it('should return validation rules structure', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/validation-rules`);
    expect(response.ok).toBe(true);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('personalInfo');
    expect(data.data).toHaveProperty('financialInfo');
    expect(data.data).toHaveProperty('loanDetails');
  });

  it('should return age validation rules', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/validation-rules`);
    const data = await response.json();

    expect(data.data.personalInfo.age).toMatchObject({
      min: 18,
      max: 65,
      required: true,
      errorMessage: expect.any(String),
    });
  });

  it('should return employment status validation rules', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/validation-rules`);
    const data = await response.json();

    expect(data.data.personalInfo.employmentStatus).toMatchObject({
      required: true,
      options: expect.arrayContaining(['employed', 'self_employed', 'unemployed', 'retired']),
      errorMessage: expect.any(String),
    });
  });

  it('should return employment duration validation rules', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/validation-rules`);
    const data = await response.json();

    expect(data.data.personalInfo.employmentDuration).toMatchObject({
      min: 3,
      required: true,
      errorMessage: expect.any(String),
    });
  });

  it('should return monthly income validation rules', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/validation-rules`);
    const data = await response.json();

    expect(data.data.financialInfo.monthlyIncome).toMatchObject({
      min: 5000,
      required: true,
      errorMessage: expect.stringContaining('R5,000'),
    });
  });

  it('should return credit score validation rules', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/validation-rules`);
    const data = await response.json();

    expect(data.data.financialInfo.creditScore).toMatchObject({
      min: 300,
      max: 850,
      required: false,
      errorMessage: expect.any(String),
    });
  });

  it('should return loan amount validation rules', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/validation-rules`);
    const data = await response.json();

    expect(data.data.loanDetails.requestedAmount).toMatchObject({
      min: 5000,
      max: 300000,
      required: true,
      errorMessage: expect.stringContaining('R5,000'),
    });
  });

  it('should return loan term validation rules', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/validation-rules`);
    const data = await response.json();

    expect(data.data.loanDetails.loanTerm).toMatchObject({
      min: 6,
      max: 60,
      required: true,
      errorMessage: expect.any(String),
    });
  });

  it('should return 405 for POST requests', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/validation-rules`, {
      method: 'POST',
    });

    expect(response.status).toBe(405);
    const data = await response.json();
    expect(data.error).toBe('Method not allowed');
  });

  it('should return 405 for PUT requests', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/validation-rules`, {
      method: 'PUT',
    });

    expect(response.status).toBe(405);
  });

  it('should return 405 for DELETE requests', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/validation-rules`, {
      method: 'DELETE',
    });

    expect(response.status).toBe(405);
  });
});
