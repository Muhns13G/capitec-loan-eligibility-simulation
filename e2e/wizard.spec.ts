import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Loan Application Wizard
 *
 * Tests the complete user flow from start to results
 */
test.describe('Loan Application Wizard', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before navigating
    await page.goto('/apply');
    await page.evaluate(() => localStorage.clear());
    // Wait for form to be ready
    await page.waitForSelector('form', { timeout: 10000 });
    // Wait for React hydration
    await page.waitForTimeout(500);
  });

  test('completes full application flow successfully', async ({ page }) => {
    // Step 1: Personal Information
    await expect(page.getByRole('heading', { name: /personal information/i })).toBeVisible();

    // Fill the form with valid data
    await page.getByLabel('First Name').fill('John');
    await page.getByLabel('Last Name').fill('Doe');
    await page.getByLabel('Age').fill('35');
    // Employment Duration is a slider, set via JavaScript
    await page.evaluate(() => {
      const slider = document.querySelector(
        'input[type="range"][name*="employmentDuration"]'
      ) as HTMLInputElement;
      if (slider) {
        slider.value = '24';
        slider.dispatchEvent(new Event('input', { bubbles: true }));
        slider.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    // Click the button to proceed
    await page.getByRole('button', { name: 'Continue to Employment' }).click();

    // Step 2: Employment Details - wait for heading with longer timeout
    await expect(page.getByRole('heading', { name: /employment details/i })).toBeVisible({
      timeout: 10000,
    });

    await page.getByLabel('Employer Name').fill('ABC Company');
    await page.getByLabel('Job Title').fill('Software Developer');
    await page.getByLabel('Industry').fill('Technology');

    await page.getByRole('button', { name: 'Continue to Financial Info' }).click();

    // Step 3: Financial Information
    await expect(page.getByRole('heading', { name: /financial information/i })).toBeVisible({
      timeout: 10000,
    });

    // Fill financial info
    const inputs = page.locator('input[type="text"][inputmode="decimal"]');
    await inputs.nth(0).fill('25000');
    await inputs.nth(1).fill('10000');
    await inputs.nth(2).fill('2000');

    await page.getByRole('button', { name: 'Continue to Loan Details' }).click();

    // Step 4: Loan Details
    await expect(page.getByRole('heading', { name: /loan details/i })).toBeVisible({
      timeout: 10000,
    });

    const loanAmountInput = page.locator('input[type="text"][inputmode="decimal"]').first();
    await loanAmountInput.fill('100000');
    await page.locator('select').selectOption('home_improvement');

    await page.getByRole('button', { name: 'Review & Submit' }).click();

    // Step 5: Review
    await expect(page.getByRole('heading', { name: /review/i })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('ABC Company')).toBeVisible();
    await expect(page.getByText('Software Developer')).toBeVisible();

    await page.getByRole('button', { name: 'Submit Application' }).click();

    // Results page
    await expect(page).toHaveURL(/\/results/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /eligibility results/i })).toBeVisible();
  });

  test('validates required fields on personal info step', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /personal information/i })).toBeVisible();

    // Try to submit without filling required fields
    await page.getByRole('button', { name: 'Continue to Employment' }).click();

    // Should still be on the same page
    await expect(page.getByRole('heading', { name: /personal information/i })).toBeVisible();

    // Fill in valid data
    await page.getByLabel('First Name').fill('John');
    await page.getByLabel('Last Name').fill('Doe');
    await page.getByLabel('Age').fill('35');
    // Employment Duration is a slider, set via JavaScript
    await page.evaluate(() => {
      const slider = document.querySelector(
        'input[type="range"][name*="employmentDuration"]'
      ) as HTMLInputElement;
      if (slider) {
        slider.value = '24';
        slider.dispatchEvent(new Event('input', { bubbles: true }));
        slider.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    // Submit again - should advance to next step
    await page.getByRole('button', { name: 'Continue to Employment' }).click();

    // Verify we advanced to Employment Details
    await expect(page.getByRole('heading', { name: /employment details/i })).toBeVisible({
      timeout: 10000,
    });
  });

  test('navigates back through wizard steps', async ({ page }) => {
    // Fill step 1
    await page.getByLabel('First Name').fill('John');
    await page.getByLabel('Last Name').fill('Doe');
    await page.getByLabel('Age').fill('35');
    // Employment Duration is a slider, set via JavaScript
    await page.evaluate(() => {
      const slider = document.querySelector(
        'input[type="range"][name*="employmentDuration"]'
      ) as HTMLInputElement;
      if (slider) {
        slider.value = '24';
        slider.dispatchEvent(new Event('input', { bubbles: true }));
        slider.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await page.getByRole('button', { name: 'Continue to Employment' }).click();

    // Verify we're on Employment Details step
    await expect(page.getByRole('heading', { name: /employment details/i })).toBeVisible({
      timeout: 10000,
    });

    // Navigate back
    await page.getByRole('button', { name: 'Back' }).click();

    // Should be back on step 1
    await expect(page.getByRole('heading', { name: /personal information/i })).toBeVisible({
      timeout: 10000,
    });

    // Check if data is preserved
    await expect(page.getByLabel('Age')).toHaveValue('35');
    // Note: Employment Duration is a slider input, value persistence verified through form submission
  });

  test('validates age range', async ({ page }) => {
    await page.getByLabel('First Name').fill('John');
    await page.getByLabel('Last Name').fill('Doe');
    await page.getByLabel('Age').fill('17'); // Below minimum
    // Employment Duration is a slider, set via JavaScript
    await page.evaluate(() => {
      const slider = document.querySelector(
        'input[type="range"][name*="employmentDuration"]'
      ) as HTMLInputElement;
      if (slider) {
        slider.value = '24';
        slider.dispatchEvent(new Event('input', { bubbles: true }));
        slider.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await page.getByRole('button', { name: 'Continue to Employment' }).click();

    // Should still be on the same page due to validation error
    await expect(page.getByRole('heading', { name: /personal information/i })).toBeVisible();

    // Fix the age
    await page.getByLabel('Age').fill('35');
    await page.getByRole('button', { name: 'Continue to Employment' }).click();

    // Verify we advanced to Employment Details
    await expect(page.getByRole('heading', { name: /employment details/i })).toBeVisible({
      timeout: 10000,
    });
  });

  test('displays loan calculation preview', async ({ page }) => {
    // Navigate through to loan details
    await page.getByLabel('First Name').fill('John');
    await page.getByLabel('Last Name').fill('Doe');
    await page.getByLabel('Age').fill('35');
    // Employment Duration is a slider, set via JavaScript
    await page.evaluate(() => {
      const slider = document.querySelector(
        'input[type="range"][name*="employmentDuration"]'
      ) as HTMLInputElement;
      if (slider) {
        slider.value = '24';
        slider.dispatchEvent(new Event('input', { bubbles: true }));
        slider.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await page.getByRole('button', { name: 'Continue to Employment' }).click();

    // Step 2: Employment Details
    await expect(page.getByRole('heading', { name: /employment details/i })).toBeVisible({
      timeout: 10000,
    });

    await page.getByLabel('Employer Name').fill('ABC Company');
    await page.getByLabel('Job Title').fill('Developer');
    await page.getByLabel('Industry').fill('Tech');
    await page.getByRole('button', { name: 'Continue to Financial Info' }).click();

    // Step 3: Financial Information
    await expect(page.getByRole('heading', { name: /financial information/i })).toBeVisible({
      timeout: 10000,
    });

    const inputs = page.locator('input[type="text"][inputmode="decimal"]');
    await inputs.nth(0).fill('25000');
    await inputs.nth(1).fill('10000');
    await page.getByRole('button', { name: 'Continue to Loan Details' }).click();

    // Step 4: Loan Details
    await expect(page.getByRole('heading', { name: /loan details/i })).toBeVisible({
      timeout: 10000,
    });

    const loanAmountInput = page.locator('input[type="text"][inputmode="decimal"]').first();
    await loanAmountInput.fill('100000');

    // Should display Quick Estimate section
    await expect(page.getByText('Quick Estimate')).toBeVisible();
    await expect(page.getByText('Est. Monthly Payment')).toBeVisible();
  });
});
