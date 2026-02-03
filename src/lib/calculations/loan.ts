/**
 * Loan calculation utilities
 * Internal calculations only - no external API calls
 */

export interface LoanParams {
  principal: number;
  annualRate: number; // percentage, e.g., 12.5 for 12.5%
  termMonths: number;
}

export interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/**
 * Calculate monthly payment using standard amortization formula
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 * Where:
 * M = Monthly payment
 * P = Principal (loan amount)
 * r = Monthly interest rate (annual rate / 12 / 100)
 * n = Number of payments (term in months)
 */
export function calculateMonthlyPayment({
  principal,
  annualRate,
  termMonths,
}: LoanParams): number {
  if (principal <= 0 || annualRate < 0 || termMonths <= 0) {
    throw new Error('Invalid loan parameters');
  }

  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return principal / termMonths;
  }

  const compound = Math.pow(1 + monthlyRate, termMonths);
  const monthlyPayment =
    principal * (monthlyRate * compound) / (compound - 1);

  return roundCurrency(monthlyPayment);
}

/**
 * Calculate total interest paid over the loan term
 */
export function calculateTotalInterest({
  principal,
  annualRate,
  termMonths,
}: LoanParams): number {
  const monthlyPayment = calculateMonthlyPayment({
    principal,
    annualRate,
    termMonths,
  });

  const totalRepayment = monthlyPayment * termMonths;
  const totalInterest = totalRepayment - principal;

  return roundCurrency(totalInterest);
}

/**
 * Calculate total repayment (principal + interest)
 */
export function calculateTotalRepayment({
  principal,
  annualRate,
  termMonths,
}: LoanParams): number {
  const totalInterest = calculateTotalInterest({
    principal,
    annualRate,
    termMonths,
  });

  return roundCurrency(principal + totalInterest);
}

/**
 * Generate amortization schedule for the loan term
 */
export function generateAmortizationSchedule({
  principal,
  annualRate,
  termMonths,
}: LoanParams): AmortizationEntry[] {
  if (principal <= 0 || annualRate < 0 || termMonths <= 0) {
    throw new Error('Invalid loan parameters');
  }

  const monthlyPayment = calculateMonthlyPayment({
    principal,
    annualRate,
    termMonths,
  });

  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  const schedule: AmortizationEntry[] = [];

  for (let month = 1; month <= termMonths; month++) {
    const interest = roundCurrency(balance * monthlyRate);
    const principalPayment = roundCurrency(monthlyPayment - interest);
    balance = roundCurrency(balance - principalPayment);

    // Ensure last payment clears the balance
    if (month === termMonths) {
      balance = 0;
    }

    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest,
      balance: Math.max(0, balance),
    });
  }

  return schedule;
}

/**
 * Calculate Debt-to-Income (DTI) ratio
 * DTI = (Monthly Debt Payments / Monthly Income) * 100
 */
export function calculateDTI(
  monthlyDebtPayments: number,
  monthlyIncome: number
): number {
  if (monthlyIncome <= 0) {
    throw new Error('Monthly income must be positive');
  }

  return roundPercentage((monthlyDebtPayments / monthlyIncome) * 100);
}

/**
 * Calculate disposable income
 * Disposable Income = Monthly Income - Monthly Expenses - Existing Debt
 */
export function calculateDisposableIncome(
  monthlyIncome: number,
  monthlyExpenses: number,
  existingDebt: number
): number {
  return roundCurrency(monthlyIncome - monthlyExpenses - existingDebt);
}

/**
 * Calculate affordability score based on DTI and disposable income
 */
export function calculateAffordabilityScore(
  dti: number,
  disposableIncome: number
): 'excellent' | 'good' | 'fair' | 'poor' {
  if (dti < 30 && disposableIncome > 10000) {
    return 'excellent';
  }
  if (dti < 40 && disposableIncome > 5000) {
    return 'good';
  }
  if (dti < 50 && disposableIncome > 2000) {
    return 'fair';
  }
  return 'poor';
}

/**
 * Calculate Loan-to-Income (LTI) ratio
 * LTI = (Monthly Loan Payment / Monthly Income) * 100
 */
export function calculateLTI(
  monthlyLoanPayment: number,
  monthlyIncome: number
): number {
  if (monthlyIncome <= 0) {
    throw new Error('Monthly income must be positive');
  }

  return roundPercentage((monthlyLoanPayment / monthlyIncome) * 100);
}

/**
 * Calculate risk category based on multiple factors
 * Internal mock - no external credit bureau calls
 * TODO: Replace with actual risk assessment from credit bureau
 */
export function calculateRiskCategory({
  dti,
  creditScore,
  employmentDuration,
}: {
  dti: number;
  creditScore?: number;
  employmentDuration: number;
}): 'low' | 'medium' | 'high' | 'critical' {
  let riskScore = 0;

  // DTI contribution
  if (dti > 50) riskScore += 3;
  else if (dti > 40) riskScore += 2;
  else if (dti > 30) riskScore += 1;

  // Credit score contribution (if available)
  if (creditScore) {
    if (creditScore < 550) riskScore += 3;
    else if (creditScore < 650) riskScore += 2;
    else if (creditScore < 750) riskScore += 1;
  }

  // Employment duration contribution
  if (employmentDuration < 6) riskScore += 2;
  else if (employmentDuration < 12) riskScore += 1;

  // Determine category
  if (riskScore >= 6) return 'critical';
  if (riskScore >= 4) return 'high';
  if (riskScore >= 2) return 'medium';
  return 'low';
}

/**
 * Calculate approval likelihood based on risk factors
 * Internal mock - no external credit bureau calls
 * TODO: Replace with actual approval model
 */
export function calculateApprovalLikelihood({
  riskCategory,
  creditScore,
  dti,
}: {
  riskCategory: 'low' | 'medium' | 'high' | 'critical';
  creditScore?: number;
  dti: number;
}): number {
  let likelihood = 90;

  // Risk category penalty
  const riskPenalties = {
    critical: -70,
    high: -50,
    medium: -30,
    low: 0,
  };
  likelihood += riskPenalties[riskCategory];

  // DTI penalty
  if (dti > 50) likelihood -= 15;
  else if (dti > 40) likelihood -= 10;
  else if (dti > 30) likelihood -= 5;

  // Credit score bonus
  if (creditScore) {
    if (creditScore >= 750) likelihood += 10;
    else if (creditScore >= 650) likelihood += 5;
  }

  return Math.max(0, Math.min(100, likelihood));
}

// Utility functions

/**
 * Round currency to 2 decimal places
 */
export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Round percentage to 2 decimal places
 */
export function roundPercentage(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Format number as South African Rand currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  }).format(value);
}
