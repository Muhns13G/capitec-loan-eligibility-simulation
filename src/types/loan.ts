// Personal Information
export interface PersonalInfo {
  age: number;
  employmentStatus: EmploymentStatus;
  employmentDuration: number; // months
}

export interface EmploymentDetails {
  employerName: string;
  jobTitle: string;
  industry: string;
}

export type EmploymentStatus = 'employed' | 'self_employed' | 'unemployed' | 'retired';

// Financial Information
export interface FinancialInfo {
  monthlyIncome: number;
  monthlyExpenses: number;
  existingDebt: number;
  creditScore?: number;
}

// Loan Details
export interface LoanDetails {
  requestedAmount: number;
  loanTerm: number;
  loanPurpose: LoanPurpose;
}

export type LoanPurpose =
  | 'debt_consolidation'
  | 'home_improvement'
  | 'education'
  | 'medical'
  | 'other'
  | 'new_vehicle'
  | 'used_vehicle';

// Loan Application
export interface LoanApplication {
  personalInfo: PersonalInfo;
  financialInfo: FinancialInfo;
  loanDetails: LoanDetails;
}

// Eligibility Result
export interface EligibilityResult {
  isEligible: boolean;
  approvalLikelihood: number;
  riskCategory: RiskCategory;
  decisionReason: string;
}

export type RiskCategory = 'low' | 'medium' | 'high' | 'critical';

// Recommended Loan
export interface RecommendedLoan {
  maxAmount: number;
  recommendedAmount: number;
  interestRate: number;
  monthlyPayment: number;
  totalRepayment: number;
}

// Affordability Analysis
export interface AffordabilityAnalysis {
  disposableIncome: number;
  debtToIncomeRatio: number;
  loanToIncomeRatio: number;
  affordabilityScore: 'excellent' | 'good' | 'fair' | 'poor';
}

// Payment Schedule Entry
export interface PaymentScheduleEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

// Loan Product
export interface LoanProduct {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  interestRateRange: {
    min: number;
    max: number;
  };
  purposes: LoanPurpose[];
}

// Validation Rules
export interface ValidationRule {
  min?: number;
  max?: number;
  required: boolean;
  errorMessage: string;
  options?: string[];
}

export interface ValidationRules {
  personalInfo: {
    age: ValidationRule;
    employmentStatus: ValidationRule & { options: string[] };
    employmentDuration: ValidationRule;
  };
  financialInfo: {
    monthlyIncome: ValidationRule;
    monthlyExpenses: ValidationRule;
    creditScore: ValidationRule;
  };
  loanDetails: {
    requestedAmount: ValidationRule;
    loanTerm: ValidationRule;
  };
}

// API Response Types
export interface EligibilityCheckResponse {
  eligibilityResult: EligibilityResult;
  recommendedLoan: RecommendedLoan;
  affordabilityAnalysis: AffordabilityAnalysis;
}

export interface ProductsResponse {
  products: LoanProduct[];
}

export interface CalculateRateResponse {
  interestRate: number;
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  paymentSchedule: PaymentScheduleEntry[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  error: string;
  details?: ValidationError[];
}
