import type {
  LoanApplication,
  EligibilityCheckResponse,
  CalculateRateResponse,
} from '@/types/loan';

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
    financialInfo,
    loanDetails: { requestedAmount, loanTerm },
  } = application;

  // Internal mock calculation - no external credit bureau calls
  // TODO: Replace with actual credit bureau API integration
  const dti =
    (financialInfo.monthlyExpenses + financialInfo.existingDebt) / financialInfo.monthlyIncome;
  const disposableIncome =
    financialInfo.monthlyIncome - financialInfo.monthlyExpenses - financialInfo.existingDebt;

  // Mock risk assessment
  let riskCategory: 'low' | 'medium' | 'high' | 'critical' = 'low';
  let approvalLikelihood = 85;
  let decisionReason = 'Strong income-to-expense ratio and manageable existing debt';

  if (dti > 0.5) {
    riskCategory = 'critical';
    approvalLikelihood = 10;
    decisionReason = 'Debt-to-income ratio exceeds acceptable limits';
  } else if (dti > 0.4) {
    riskCategory = 'high';
    approvalLikelihood = 35;
    decisionReason = 'High debt-to-income ratio requires additional review';
  } else if (dti > 0.3) {
    riskCategory = 'medium';
    approvalLikelihood = 60;
    decisionReason = 'Moderate debt levels with manageable repayment capacity';
  }

  const isEligible = approvalLikelihood >= 50;

  // Mock interest rate based on credit score
  const creditScore = financialInfo.creditScore || 650;
  let interestRate = 12.5;
  if (creditScore >= 750) interestRate = 10.5;
  else if (creditScore >= 700) interestRate = 11.5;
  else if (creditScore >= 650) interestRate = 12.5;
  else if (creditScore >= 600) interestRate = 14.5;
  else interestRate = 16.5;

  // Mock monthly payment calculation
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment =
    (requestedAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm))) /
    (Math.pow(1 + monthlyRate, loanTerm) - 1);

  const totalRepayment = monthlyPayment * loanTerm;

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
    },
    affordabilityAnalysis: {
      disposableIncome,
      debtToIncomeRatio: Number((dti * 100).toFixed(2)),
      loanToIncomeRatio: Number(((monthlyPayment / financialInfo.monthlyIncome) * 100).toFixed(2)),
      affordabilityScore:
        disposableIncome > 5000 ? 'good' : disposableIncome > 2000 ? 'fair' : 'poor',
    },
  };
}

// Factory for creating calculate rate responses
export function createMockCalculateRateResponse(
  loanAmount: number,
  loanTerm: number,
  creditScore?: number
): CalculateRateResponse {
  // Mock: Simulate interest rate calculation based on credit score
  // TODO: Replace with actual credit bureau API for precise rates
  const baseRate = 12.5;
  const scoreAdjustment = creditScore ? Math.max(-4, Math.min(6, (creditScore - 650) / 50)) : 0;
  const interestRate = Math.max(10.5, Math.min(18.5, baseRate + scoreAdjustment));

  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm))) /
    (Math.pow(1 + monthlyRate, loanTerm) - 1);

  const totalRepayment = monthlyPayment * loanTerm;
  const totalInterest = totalRepayment - loanAmount;

  // Generate amortization schedule
  const paymentSchedule = [];
  let balance = loanAmount;

  for (let month = 1; month <= loanTerm; month++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;

    paymentSchedule.push({
      month,
      payment: Number(monthlyPayment.toFixed(2)),
      principal: Number(principal.toFixed(2)),
      interest: Number(interest.toFixed(2)),
      balance: Number(Math.max(0, balance).toFixed(2)),
    });
  }

  return {
    interestRate: Number(interestRate.toFixed(2)),
    monthlyPayment: Number(monthlyPayment.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    totalRepayment: Number(totalRepayment.toFixed(2)),
    paymentSchedule,
  };
}
