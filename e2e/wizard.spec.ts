import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Loan Application Wizard
 *
 * Tests the complete user flow from start to results
 */
test.describe('Loan Application Wizard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/apply');
  });

  test('completes full application flow successfully', async ({ page }) => {
    // Step 1: Personal Information
    await expect(page.getByRole('heading', { name: 'Personal Information' })).toBeVisible();

    await page.getByLabel(/age/i).fill('35');
    await page.getByLabel(/employment duration/i).fill('24');
    await page.getByLabel(/employment status/i).selectOption('employed');

    await page.getByRole('button', { name: /continue to employment/i }).click();

    // Step 2: Employment Details
    await expect(page.getByRole('heading', { name: 'Employment Details' })).toBeVisible();

    await page.getByLabel(/employer name/i).fill('ABC Company');
    await page.getByLabel(/job title/i).fill('Software Developer');
    await page.getByLabel(/industry/i).fill('Technology');

    await page.getByRole('button', { name: /continue to financial info/i }).click();

    // Step 3: Financial Information
    await expect(page.getByRole('heading', { name: 'Financial Information' })).toBeVisible();

    await page.getByLabel(/monthly income/i).fill('25000');
    await page.getByLabel(/monthly expenses/i).fill('10000');
    await page.getByLabel(/existing monthly debt/i).fill('2000');

    await page.getByRole('button', { name: /continue to loan details/i }).click();

    // Step 4: Loan Details
    await expect(page.getByRole('heading', { name: 'Loan Details' })).toBeVisible();

    await page.getByLabel(/requested loan amount/i).fill('100000');

    // Select loan purpose
    await page.getByLabel(/loan purpose/i).selectOption('home_improvement');

    await page.getByRole('button', { name: /review application/i }).click();

    // Step 5: Review
    await expect(page.getByRole('heading', { name: 'Review' })).toBeVisible();
    await expect(page.getByText('ABC Company')).toBeVisible();
    await expect(page.getByText('Software Developer')).toBeVisible();

    // Submit application
    await page.getByRole('button', { name: /submit application/i }).click();

    // Results page
    await expect(page).toHaveURL('/results');
    await expect(page.getByRole('heading', { name: /eligibility results/i })).toBeVisible();
  });

  test('validates required fields on personal info step', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Personal Information' })).toBeVisible();

    // Try to submit without filling required fields
    await page.getByRole('button', { name: /continue to employment/i }).click();

    // Should still be on the same page
    await expect(page.getByRole('heading', { name: 'Personal Information' })).toBeVisible();

    // Fill in valid data
    await page.getByLabel(/age/i).fill('35');
    await page.getByLabel(/employment duration/i).fill('24');

    // Now should be able to proceed
    await page.getByRole('button', { name: /continue to employment/i }).click();
    await expect(page.getByRole('heading', { name: 'Employment Details' })).toBeVisible();
  });

  test('navigates back through wizard steps', async ({ page }) => {
    // Complete step 1
    await page.getByLabel(/age/i).fill('35');
    await page.getByLabel(/employment duration/i).fill('24');
    await page.getByRole('button', { name: /continue to employment/i }).click();

    // Should be on step 2
    await expect(page.getByRole('heading', { name: 'Employment Details' })).toBeVisible();

    // Navigate back to step 1 (using the back button)
    await page.getByRole('button', { name: /back/i }).click();

    // Should be back on step 1 with data preserved
    await expect(page.getByRole('heading', { name: 'Personal Information' })).toBeVisible();
    await expect(page.getByLabel(/age/i)).toHaveValue('35');
    await expect(page.getByLabel(/employment duration/i)).toHaveValue('24');
  });

  test('validates age range', async ({ page }) => {
    await page.getByLabel(/age/i).fill('17'); // Below minimum
    await page.getByLabel(/employment duration/i).fill('24');
    await page.getByRole('button', { name: /continue to employment/i }).click();

    // Should show validation error
    await expect(page.getByText(/age must be at least 18/i)).toBeVisible();

    // Fix the age
    await page.getByLabel(/age/i).fill('35');
    await page.getByRole('button', { name: /continue to employment/i }).click();

    // Should proceed
    await expect(page.getByRole('heading', { name: 'Employment Details' })).toBeVisible();
  });

  test('displays loan calculation preview', async ({ page }) => {
    // Navigate to loan details step
    await page.getByLabel(/age/i).fill('35');
    await page.getByLabel(/employment duration/i).fill('24');
    await page.getByRole('button', { name: /continue to employment/i }).click();

    await page.getByLabel(/employer name/i).fill('ABC Company');
    await page.getByLabel(/job title/i).fill('Developer');
    await page.getByLabel(/industry/i).fill('Tech');
    await page.getByRole('button', { name: /continue to financial info/i }).click();

    await page.getByLabel(/monthly income/i).fill('25000');
    await page.getByLabel(/monthly expenses/i).fill('10000');
    await page.getByRole('button', { name: /continue to loan details/i }).click();

    // Now on loan details step
    await expect(page.getByRole('heading', { name: 'Loan Details' })).toBeVisible();

    // Enter loan amount
    await page.getByLabel(/requested loan amount/i).fill('100000');

    // Should display estimated monthly payment
    await expect(page.getByText(/estimated monthly payment/i)).toBeVisible();
  });
});
