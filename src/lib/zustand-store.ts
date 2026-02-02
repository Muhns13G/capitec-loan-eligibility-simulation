// lib/stores.ts
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PersonalInfo = {
  age: number;
  employment: string;
  duration: number;
};

type FinancialInfo = {
  income: number;
  expenses: number;
  debt: number;
  creditScore: number | null;
};

type LoanDetails = {
  amount: number;
  term: number;
  purpose: string;
};

type LoanFormData = {
  personalInfo: PersonalInfo;
  financialInfo: FinancialInfo;
  loanDetails: LoanDetails;
};

type EligibilityResult = {
  isEligible: boolean;
  likelihood: number; // 0-100
  riskCategory: 'low' | 'medium' | 'high';
};

type RecommendedLoan = {
  maxAmount: number;
  rate: number;
  monthlyPayment: number;
};

type AffordabilityAnalysis = {
  dti: number; // %
  disposableIncome: number;
  schedule: Array<{month: number; payment: number; balance: number}>;
};

type Results = {
  eligibilityResult: EligibilityResult;
  recommendedLoan: RecommendedLoan;
  affordabilityAnalysis: AffordabilityAnalysis;
};

interface LoanStore {
  step: number;
  formData: Partial<LoanFormData>;
  results: Results | null;
  setStep: (step: number) => void;
  updateForm: (data: Partial<LoanFormData>) => void;
  submit: () => Promise<void>;
}

export const useLoanStore = create<LoanStore>()(
  persist(
    (set, get) => ({
      step: 1,
      formData: {},
      results: null,
      setStep: (step) => set({ step }),
      updateForm: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
      submit: async () => {
        const { formData } = get();
        const currentFormData = formData; // Explicit use to avoid warning
        // Real calcs from currentFormData (RAG BUSINESS.md)
        const { financialInfo, loanDetails } = currentFormData;
        const { income = 0, expenses = 0, debt = 0, creditScore = 600 } = financialInfo || {};
        const { amount = 0, term = 12 } = loanDetails || {};
        const rate = 0.1; // 10% APR
        const monthlyRate = rate / 12;
        const emi = (amount * monthlyRate * (1 + monthlyRate) ** term) / ((1 + monthlyRate) ** term - 1);
        const dti = ((debt + emi) / income) * 100;
        const disposableIncome = income - expenses - emi;
        const riskCategory: 'low' | 'medium' | 'high' = (creditScore ?? 600) > 650 && dti < 30 ? 'low' : dti < 50 ? 'medium' : 'high';
        const isEligible = riskCategory !== 'high';
        const likelihood = isEligible ? (riskCategory === 'low' ? 90 : 75) : 20;

        const results: Results = {
          eligibilityResult: { isEligible, likelihood, riskCategory },
          recommendedLoan: { maxAmount: amount, rate: rate * 100, monthlyPayment: emi },
          affordabilityAnalysis: { dti, disposableIncome, schedule: [] },
        };
        set({ results, step: 4 });
      },
    }),
    { name: 'loan-store' }
  )
);

interface AuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),

    { name: 'auth-store' }
  )
);
