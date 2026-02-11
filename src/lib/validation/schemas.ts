import { z } from 'zod';

// Personal Info Schema
const employmentStatusEnum = z.enum([
  'employed',
  'self_employed',
  'unemployed',
  'retired',
] as const);

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  age: z.number().min(18, 'Age must be at least 18').max(65, 'Age must not exceed 65'),
  employmentStatus: employmentStatusEnum,
  employmentDuration: z.number().min(3, 'Minimum 3 months employment required'),
});

// Financial Info Schema
const employmentDetailsSchema = z.object({
  employerName: z.string().min(2, 'Employer name required'),
  jobTitle: z.string().min(2, 'Job title required'),
  industry: z.string().min(2, 'Industry required'),
});
const financialInfoSchema = z.object({
  monthlyIncome: z.number().min(5000, 'Minimum monthly income of R5,000 required'),
  monthlyExpenses: z.number().min(0, 'Expenses cannot be negative'),
  existingDebt: z.number().min(0, 'Debt cannot be negative'),
  creditScore: z
    .number()
    .min(300, 'Credit score must be at least 300')
    .max(850, 'Credit score must not exceed 850')
    .optional(),
});

// Loan Details Schema
const loanDetailsSchema = z.object({
  requestedAmount: z
    .number()
    .min(5000, 'Loan amount must be at least R5,000')
    .max(300000, 'Loan amount must not exceed R300,000'),
  loanTerm: z
    .number()
    .min(6, 'Loan term must be at least 6 months')
    .max(60, 'Loan term must not exceed 60 months'),
  loanPurpose: z.enum([
    'debt_consolidation',
    'home_improvement',
    'education',
    'medical',
    'other',
  ] as const),
});

// Loan Application Schema
export const loanApplicationSchema = z.object({
  personalInfo: personalInfoSchema,
  employmentDetails: employmentDetailsSchema,
  financialInfo: financialInfoSchema,
  loanDetails: loanDetailsSchema,
});

// Calculate Rate Schema
export const calculateRateSchema = z.object({
  loanAmount: z
    .number()
    .min(5000, 'Loan amount must be at least R5,000')
    .max(300000, 'Loan amount must not exceed R300,000'),
  loanTerm: z
    .number()
    .min(6, 'Loan term must be at least 6 months')
    .max(60, 'Loan term must not exceed 60 months'),
  creditScore: z
    .number()
    .min(300, 'Credit score must be at least 300')
    .max(850, 'Credit score must not exceed 850')
    .optional(),
  loanType: z.enum(['personal_loan', 'vehicle_loan']),
});

// Type inference
export type LoanApplicationInput = z.infer<typeof loanApplicationSchema>;
export type CalculateRateInput = z.infer<typeof calculateRateSchema>;
