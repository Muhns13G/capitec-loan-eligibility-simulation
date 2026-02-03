import {
  calculateMonthlyPayment,
  calculateTotalInterest,
  calculateTotalRepayment,
  generateAmortizationSchedule,
  calculateDTI,
  calculateDisposableIncome,
  calculateAffordabilityScore,
  calculateLTI,
  calculateRiskCategory,
  calculateApprovalLikelihood,
  formatCurrency,
  roundCurrency,
  roundPercentage,
} from '@/lib/calculations/loan';

describe('Loan Calculations', () => {
  describe('calculateMonthlyPayment', () => {
    it('calculates monthly payment correctly', () => {
      const payment = calculateMonthlyPayment({
        principal: 100000,
        annualRate: 12.5,
        termMonths: 24,
      });
      expect(payment).toBeCloseTo(4730.73, 2);
    });

    it('handles zero interest rate', () => {
      const payment = calculateMonthlyPayment({
        principal: 100000,
        annualRate: 0,
        termMonths: 12,
      });
      expect(payment).toBeCloseTo(8333.33, 2);
    });

    it('throws error for negative principal', () => {
      expect(() =>
        calculateMonthlyPayment({
          principal: -100000,
          annualRate: 12.5,
          termMonths: 24,
        })
      ).toThrow('Invalid loan parameters');
    });

    it('throws error for negative rate', () => {
      expect(() =>
        calculateMonthlyPayment({
          principal: 100000,
          annualRate: -5,
          termMonths: 24,
        })
      ).toThrow('Invalid loan parameters');
    });

    it('throws error for zero term', () => {
      expect(() =>
        calculateMonthlyPayment({
          principal: 100000,
          annualRate: 12.5,
          termMonths: 0,
        })
      ).toThrow('Invalid loan parameters');
    });

    it('calculates payment for large loan', () => {
      const payment = calculateMonthlyPayment({
        principal: 300000,
        annualRate: 10.5,
        termMonths: 60,
      });
      expect(payment).toBeCloseTo(6448.17, 2);
    });
  });

  describe('calculateTotalInterest', () => {
    it('calculates total interest correctly', () => {
      const interest = calculateTotalInterest({
        principal: 100000,
        annualRate: 12.5,
        termMonths: 24,
      });
      const monthlyPayment = calculateMonthlyPayment({
        principal: 100000,
        annualRate: 12.5,
        termMonths: 24,
      });
      const expectedInterest = monthlyPayment * 24 - 100000;
      expect(interest).toBeCloseTo(expectedInterest, 2);
    });

    it('returns zero interest for zero rate', () => {
      const interest = calculateTotalInterest({
        principal: 100000,
        annualRate: 0,
        termMonths: 12,
      });
      expect(interest).toBe(0);
    });
  });

  describe('calculateTotalRepayment', () => {
    it('calculates total repayment correctly', () => {
      const repayment = calculateTotalRepayment({
        principal: 100000,
        annualRate: 12.5,
        termMonths: 24,
      });
      const monthlyPayment = calculateMonthlyPayment({
        principal: 100000,
        annualRate: 12.5,
        termMonths: 24,
      });
      expect(repayment).toBeCloseTo(monthlyPayment * 24, 2);
    });
  });

  describe('generateAmortizationSchedule', () => {
    it('generates correct amortization schedule', () => {
      const schedule = generateAmortizationSchedule({
        principal: 100000,
        annualRate: 12.5,
        termMonths: 12,
      });

      expect(schedule).toHaveLength(12);
      expect(schedule[0].month).toBe(1);
      expect(schedule[11].month).toBe(12);
      expect(schedule[11].balance).toBe(0);
    });

    it('ensures last payment clears balance', () => {
      const schedule = generateAmortizationSchedule({
        principal: 100000,
        annualRate: 12.5,
        termMonths: 24,
      });
      expect(schedule[schedule.length - 1].balance).toBe(0);
    });

    it('throws error for invalid parameters', () => {
      expect(() =>
        generateAmortizationSchedule({
          principal: -100000,
          annualRate: 12.5,
          termMonths: 24,
        })
      ).toThrow('Invalid loan parameters');
    });
  });

  describe('calculateDTI', () => {
    it('calculates DTI correctly', () => {
      const dti = calculateDTI(5000, 25000);
      expect(dti).toBe(20);
    });

    it('handles zero debt', () => {
      const dti = calculateDTI(0, 25000);
      expect(dti).toBe(0);
    });

    it('throws error for zero income', () => {
      expect(() => calculateDTI(5000, 0)).toThrow('Monthly income must be positive');
    });
  });

  describe('calculateDisposableIncome', () => {
    it('calculates disposable income correctly', () => {
      const disposable = calculateDisposableIncome(25000, 15000, 5000);
      expect(disposable).toBe(5000);
    });

    it('handles negative disposable income', () => {
      const disposable = calculateDisposableIncome(15000, 15000, 5000);
      expect(disposable).toBe(-5000);
    });
  });

  describe('calculateAffordabilityScore', () => {
    it('returns excellent for high disposable income and low DTI', () => {
      const score = calculateAffordabilityScore(25, 15000);
      expect(score).toBe('excellent');
    });

    it('returns good for moderate DTI and disposable income', () => {
      const score = calculateAffordabilityScore(35, 7500);
      expect(score).toBe('good');
    });

    it('returns fair for higher DTI', () => {
      const score = calculateAffordabilityScore(45, 4000);
      expect(score).toBe('fair');
    });

    it('returns poor for high DTI and low disposable income', () => {
      const score = calculateAffordabilityScore(55, 1000);
      expect(score).toBe('poor');
    });
  });

  describe('calculateLTI', () => {
    it('calculates LTI correctly', () => {
      const lti = calculateLTI(7089.50, 25000);
      expect(lti).toBeCloseTo(28.36, 2);
    });

    it('throws error for zero income', () => {
      expect(() => calculateLTI(5000, 0)).toThrow('Monthly income must be positive');
    });
  });

  describe('calculateRiskCategory', () => {
    it('returns low risk for good metrics', () => {
      const risk = calculateRiskCategory({
        dti: 20,
        creditScore: 750,
        employmentDuration: 24,
      });
      expect(risk).toBe('low');
    });

    it('returns medium risk for moderate metrics', () => {
      const risk = calculateRiskCategory({
        dti: 35,
        creditScore: 650,
        employmentDuration: 12,
      });
      expect(risk).toBe('medium');
    });

    it('returns high risk for concerning metrics', () => {
      const risk = calculateRiskCategory({
        dti: 45,
        creditScore: 600,
        employmentDuration: 6,
      });
      expect(risk).toBe('high');
    });

    it('returns critical risk for poor metrics', () => {
      const risk = calculateRiskCategory({
        dti: 55,
        creditScore: 500,
        employmentDuration: 3,
      });
      expect(risk).toBe('critical');
    });
  });

  describe('calculateApprovalLikelihood', () => {
    it('returns high likelihood for low risk', () => {
      const likelihood = calculateApprovalLikelihood({
        riskCategory: 'low',
        creditScore: 750,
        dti: 20,
      });
      expect(likelihood).toBeGreaterThan(80);
    });

    it('returns low likelihood for critical risk', () => {
      const likelihood = calculateApprovalLikelihood({
        riskCategory: 'critical',
        creditScore: 500,
        dti: 55,
      });
      expect(likelihood).toBeLessThan(30);
    });

    it('clamps likelihood between 0 and 100', () => {
      const low = calculateApprovalLikelihood({
        riskCategory: 'critical',
        creditScore: 300,
        dti: 80,
      });
      const high = calculateApprovalLikelihood({
        riskCategory: 'low',
        creditScore: 850,
        dti: 10,
      });
      expect(low).toBeGreaterThanOrEqual(0);
      expect(low).toBeLessThanOrEqual(100);
      expect(high).toBeGreaterThanOrEqual(0);
      expect(high).toBeLessThanOrEqual(100);
    });
  });

  describe('formatCurrency', () => {
    it('formats currency correctly', () => {
      // South African format uses spaces as thousand separators and comma as decimal
      expect(formatCurrency(1234.56)).toMatch(/R\s*1[\s\xa0]234[,.]56/);
      expect(formatCurrency(1000000)).toMatch(/R\s*1[\s\xa0]000[\s\xa0]000[,.]00/);
      expect(formatCurrency(0)).toMatch(/R[\s\xa0]*0[,.]00/);
    });
  });

  describe('roundCurrency', () => {
    it('rounds to 2 decimal places', () => {
      expect(roundCurrency(1234.5678)).toBe(1234.57);
      expect(roundCurrency(1234.5644)).toBe(1234.56);
      expect(roundCurrency(1234.5)).toBe(1234.50);
    });
  });

  describe('roundPercentage', () => {
    it('rounds to 2 decimal places', () => {
      expect(roundPercentage(45.6789)).toBe(45.68);
      expect(roundPercentage(45.6744)).toBe(45.67);
    });
  });
});
