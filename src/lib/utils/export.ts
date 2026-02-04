import type { PaymentScheduleEntry } from '@/types/loan';

export function exportAmortizationToCSV(
  schedule: PaymentScheduleEntry[],
  loanAmount: number,
  interestRate: number,
  termMonths: number
): void {
  const headers = ['Month', 'Payment', 'Principal', 'Interest', 'Balance'];

  const rows = schedule.map((entry) => [
    entry.month,
    entry.payment.toFixed(2),
    entry.principal.toFixed(2),
    entry.interest.toFixed(2),
    entry.balance.toFixed(2),
  ]);

  rows.push([]);
  rows.push(['Summary']);
  rows.push(['Loan Amount', loanAmount.toFixed(2)]);
  rows.push(['Interest Rate (%)', interestRate.toFixed(2)]);
  rows.push(['Term (months)', termMonths.toString()]);
  rows.push(['Total Repayment', schedule.reduce((sum, e) => sum + e.payment, 0).toFixed(2)]);
  rows.push(['Total Interest', schedule.reduce((sum, e) => sum + e.interest, 0).toFixed(2)]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `loan-amortization-${Date.now()}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printResults(): void {
  window.print();
}
