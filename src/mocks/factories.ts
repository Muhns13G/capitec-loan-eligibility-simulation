import type {
  LoanApplication,
  EligibilityCheckResponse,
  CalculateRateResponse,
} from '@/types/loan';
import {
  calculateMonthlyPayment,
  calculateDTI,
  calculateDisposableIncome,
  calculateAffordabilityScore,
  calculateLTI,
  calculateRiskCategory,
  calculateApprovalLikelihood,
  generateAmortizationSchedule,
  type LoanParams,
} from '@/lib/calculations/loan';

// Factory for creating mock loan applications
export function createMockLoanApplication(
  overrides: Partial<LoanApplication> = {}
): LoanApplication {
  return {
    personalInfo: {
      age: 35,
      employmentStatus: 'employed',
      employmentDuration: 24,
      ...overrides.personalInfo,
    },
    financialInfo: {
      monthlyIncome: 25000.0,
      monthlyExpenses: 15000.0,
      existingDebt: 5000.0,
      creditScore: 650,
      ...overrides.financialInfo,
    },
    loanDetails: {
      requestedAmount: 150000.0,
      loanTerm: 24,
      loanPurpose: 'home_improvement',
      ...overrides.loanDetails,
    },
  };
}

// Factory for creating eligibility responses
export function createMockEligibilityResponse(
  application: LoanApplication
): EligibilityCheckResponse {
  const {
    personalInfo,
    financialInfo,
    loanDetails: { requestedAmount, loanTerm },
  } = application;

  // Use calculation engine
  const dti = calculateDTI(
    financialInfo.monthlyExpenses + financialInfo.existingDebt,
    financialInfo.monthlyIncome
  );

  const disposableIncome = calculateDisposableIncome(
    financialInfo.monthlyIncome,
    financialInfo.monthlyExpenses,
    financialInfo.existingDebt
  );

  // Use calculation engine for risk assessment
  // TODO: Replace with actual credit bureau API integration
  const riskCategory = calculateRiskCategory({
    dti,
    creditScore: financialInfo.creditScore,
    employmentDuration: personalInfo.employmentDuration,
  });

  const approvalLikelihood = calculateApprovalLikelihood({
    riskCategory,
    creditScore: financialInfo.creditScore,
    dti,
  });

  const isEligible = approvalLikelihood >= 50;

  // Calculate interest rate based on credit score (internal mock)
  // TODO: Replace with actual rate calculation from loan products
  const creditScore = financialInfo.creditScore || 650;
  let interestRate = 12.5;
  if (creditScore >= 750) interestRate = 10.5;
  else if (creditScore >= 700) interestRate = 11.5;
  else if (creditScore >= 650) interestRate = 12.5;
  else if (creditScore >= 600) interestRate = 14.5;
  else interestRate = 16.5;

  // Use calculation engine for payment
  const loanParams: LoanParams = {
    principal: requestedAmount,
    annualRate: interestRate,
    termMonths: loanTerm,
  };

  const monthlyPayment = calculateMonthlyPayment(loanParams);
  const totalRepayment = monthlyPayment * loanTerm;

  const affordabilityScore = calculateAffordabilityScore(dti, disposableIncome);
  const loanToIncomeRatio = calculateLTI(monthlyPayment, financialInfo.monthlyIncome);

  const decisionReason =
    approvalLikelihood >= 80
      ? 'Strong income-to-expense ratio and manageable existing debt'
      : approvalLikelihood >= 60
        ? 'Moderate debt levels with manageable repayment capacity'
        : approvalLikelihood >= 40
          ? 'High debt-to-income ratio requires additional review'
          : 'Debt-to-income ratio exceeds acceptable limits';

  return {
    eligibilityResult: {
      isEligible,
      approvalLikelihood,
      riskCategory,
      decisionReason,
    },
    recommendedLoan: {
      maxAmount: Math.min(300000, financialInfo.monthlyIncome * 10),
      recommendedAmount: isEligible ? requestedAmount : 0,
      interestRate,
      monthlyPayment,
      totalRepayment,
      loanTerm,
    },
    affordabilityAnalysis: {
      disposableIncome,
      debtToIncomeRatio: dti,
      loanToIncomeRatio,
      affordabilityScore,
    },
  };
}

// Factory for creating calculate rate responses
export function createMockCalculateRateResponse(
  loanAmount: number,
  loanTerm: number,
  creditScore?: number
): CalculateRateResponse {
  // Calculate interest rate based on credit score
  // TODO: Replace with actual credit bureau API for precise rates
  const baseRate = 12.5;
  const scoreAdjustment = creditScore ? Math.max(-4, Math.min(4, (creditScore - 650) / 50)) : 0;
  const interestRate = Math.max(10.5, Math.min(18.5, baseRate - scoreAdjustment));

  const loanParams: LoanParams = {
    principal: loanAmount,
    annualRate: interestRate,
    termMonths: loanTerm,
  };

  const monthlyPayment = calculateMonthlyPayment(loanParams);
  const totalRepayment = monthlyPayment * loanTerm;
  const totalInterest = totalRepayment - loanAmount;
  const paymentSchedule = generateAmortizationSchedule(loanParams);

  return {
    interestRate: Number(interestRate.toFixed(2)),
    monthlyPayment: Number(monthlyPayment.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    totalRepayment: Number(totalRepayment.toFixed(2)),
    paymentSchedule,
  };
}
