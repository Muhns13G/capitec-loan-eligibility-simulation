/**
 * @jest-environment node
 */

import { TEST_SERVER_URL } from '@/test-utils/test-server';

describe('API Integration: Products', () => {
  it('should return list of loan products', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/products`);
    expect(response.ok).toBe(true);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('products');
    expect(Array.isArray(data.data.products)).toBe(true);
    expect(data.data.products.length).toBeGreaterThan(0);
  });

  it('should return product details with valid structure', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/products`);
    const data = await response.json();

    const firstProduct = data.data.products[0];
    expect(firstProduct).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      minAmount: expect.any(Number),
      maxAmount: expect.any(Number),
      minTerm: expect.any(Number),
      maxTerm: expect.any(Number),
      interestRateRange: expect.objectContaining({
        min: expect.any(Number),
        max: expect.any(Number),
      }),
      purposes: expect.arrayContaining([expect.any(String)]),
    });
  });

  it('should return personal loan product', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/products`);
    const data = await response.json();

    const personalLoan = data.data.products.find((p: { id: string }) => p.id === 'personal_loan');
    expect(personalLoan).toBeDefined();
    expect(personalLoan.name).toBe('Personal Loan');
    expect(personalLoan.minAmount).toBe(5000);
    expect(personalLoan.maxAmount).toBe(300000);
  });

  it('should return vehicle loan product', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/products`);
    const data = await response.json();

    const vehicleLoan = data.data.products.find((p: { id: string }) => p.id === 'vehicle_loan');
    expect(vehicleLoan).toBeDefined();
    expect(vehicleLoan.name).toBe('Vehicle Finance');
    expect(vehicleLoan.minAmount).toBe(50000);
    expect(vehicleLoan.maxAmount).toBe(1500000);
  });

  it('should return 405 for POST requests', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    expect(response.status).toBe(405);
    const data = await response.json();
    expect(data.error).toBe('Method not allowed');
  });

  it('should return 405 for PUT requests', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/products`, {
      method: 'PUT',
    });

    expect(response.status).toBe(405);
  });

  it('should return 405 for DELETE requests', async () => {
    const response = await fetch(`${TEST_SERVER_URL}/api/loans/products`, {
      method: 'DELETE',
    });

    expect(response.status).toBe(405);
  });
});
