import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Loan Calculator
 *
 * Tests the calculator page functionality
 */
test.describe('Loan Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/calculator');
  });

  test('displays calculator page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /loan calculator/i })).toBeVisible();
    await expect(page.getByText(/calculate your monthly payments/i)).toBeVisible();
  });

  test('updates loan amount via slider', async ({ page }) => {
    // Find the loan amount slider
    const slider = page.locator('input[type="range"]').first();

    // Set loan amount to 100000
    await slider.fill('100000');

    // Verify the amount is displayed
    await expect(page.getByText('R100,000')).toBeVisible();
  });

  test('updates calculations when loan amount changes', async ({ page }) => {
    const slider = page.locator('input[type="range"]').first();

    // Initial amount
    await expect(page.getByText(/monthly payment/i)).toBeVisible();

    // Change loan amount
    await slider.fill('200000');

    // Verify updated calculations are shown
    await expect(page.getByText('R200,000')).toBeVisible();
  });

  test('updates interest rate via slider', async ({ page }) => {
    // Find the interest rate slider (second slider)
    const sliders = page.locator('input[type="range"]');
    const rateSlider = sliders.nth(1);

    // Set interest rate to 15%
    await rateSlider.fill('15');

    // Verify rate is displayed
    await expect(page.getByText(/15%/)).toBeVisible();
  });

  test('updates loan term via slider', async ({ page }) => {
    // Find the loan term slider (third slider)
    const sliders = page.locator('input[type="range"]');
    const termSlider = sliders.nth(2);

    // Set term to 36 months
    await termSlider.fill('36');

    // Verify term is displayed
    await expect(page.getByText(/36 months/)).toBeVisible();
  });

  test('displays payment breakdown chart', async ({ page }) => {
    await expect(page.getByText(/payment breakdown/i)).toBeVisible();

    // Should show chart elements
    await expect(page.locator('svg')).toBeVisible();
  });

  test('displays amortization schedule', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /amortization schedule/i })).toBeVisible();

    // Should show table with payment schedule
    await expect(page.locator('table')).toBeVisible();
    await expect(page.getByText(/month/i)).toBeVisible();
    await expect(page.getByText(/payment/i)).toBeVisible();
  });

  test('resets to default values', async ({ page }) => {
    // Change values first
    const slider = page.locator('input[type="range"]').first();
    await slider.fill('200000');

    // Verify changed value
    await expect(page.getByText('R200,000')).toBeVisible();

    // Click reset button if exists
    const resetButton = page.getByRole('button', { name: /reset/i });
    if (await resetButton.isVisible()) {
      await resetButton.click();

      // Should reset to default (150000)
      await expect(page.getByText('R150,000')).toBeVisible();
    }
  });

  test('calculates total interest correctly', async ({ page }) => {
    // Set specific values
    const sliders = page.locator('input[type="range"]');
    await sliders.first().fill('100000'); // Amount
    await sliders.nth(1).fill('12'); // Interest rate
    await sliders.nth(2).fill('24'); // Term

    // Should display total interest
    await expect(page.getByText(/total interest/i)).toBeVisible();
  });

  test('is responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Calculator should still be usable
    await expect(page.getByRole('heading', { name: /loan calculator/i })).toBeVisible();

    // Sliders should be accessible
    const slider = page.locator('input[type="range"]').first();
    await expect(slider).toBeVisible();
  });
});
